import { html, render } from "../../lib/lit/lit-html.js";
import { dataService } from "../service/dataService.js";
import { userService } from "../service/userService.js";

export async function homeView() {
  const root = document.querySelector("main");
  let gossips = (await dataService.getAllGossips()).results;
  gossips = gossips.reverse(); // Initial order of gossips

  // Render the view with initial sorting
  const template = renderTemplate(gossips);
  render(template, root);
}

function renderTemplate(gossips) {
  const user = userService.getUser();

  return html`
    ${user
      ? html`
          <div class="home-user">
            <h1>
              <span id="welcome">Здравей</span>, <span>${user.username}</span>!
            </h1>
            <div>
              <p>Подредба:</p>
              <select @change=${onChange}>
                <option value="newest">Най-нови</option>
                <option value="oldest">Най-стари</option>
                <option value="likes">Най-харесвани</option>
              </select>
            </div>
          </div>
        `
      : html``}
    <section>
      <ul class="gossips">
        ${gossips.length > 0
          ? gossips.map(
              (gossip) => html`
                <li id=${gossip.objectId}>
                  <div class="gossip">
                    <img src="/img/pfp.jpg" alt="pfp" />
                    <div class="gossip-inner-container">
                      <div class="gossip-info">
                        <h1>${gossip.title}</h1>
                        <span><i>${gossip.date}</i></span>
                      </div>
                      <p class="post">${gossip.description}</p>
                    </div>
                  </div>
                  ${user
                    ? html`
                        <div class="gossip-buttons">
                          <p>
                            <i>коментари: <span>X</span></i>
                          </p>
                          <div>
                            <span @click=${onLike}>
                              ${gossip.likedBy &&
                                gossip.likedBy.includes(user.objectId) ? html`<ion-icon name="heart" style="color: #FA008A;"></ion-icon></ion-icon>` : html`<ion-icon name="heart-outline" style="color: black;"></ion-icon>`}
                            </span>
                            <span
                              ><i>${gossip.likes === undefined ? 0 : gossip.likes}</i
                              ></span
                            >
                          </div>
                        </div>
                      `
                    : html``}
                </li>
              `
            )
          : html`<p>Все още няма клюки</p>`}
      </ul>
    </section>
    <div id="post-btn">
      <a href="/post">+</a>
    </div>
  `;
}

async function onChange(e) {
  e.preventDefault();
  const value = e.target.value;
  let gossips = (await dataService.getAllGossips()).results;

  if (value === "likes") {
    gossips.sort((a, b) => {
      const aLikes = a.likes || 0;
      const bLikes = b.likes || 0;
      return bLikes - aLikes; // Sort in descending order
    });
  } else if (value === "newest") {
    gossips.reverse(); // Assuming that the initial order is oldest to newest
  }

  // Re-render the view with sorted gossips
  const root = document.querySelector("main");
  const template = renderTemplate(gossips);
  render(template, root);
}

async function onLike(e) {
  e.preventDefault();

  const gossipElement = e.target.closest("li");
  const gossipId = gossipElement.id;
  const user = userService.getUser();

  // Fetch gossip data by ID
  const gossipData = await dataService.getGossipById(gossipId);
  if (!gossipData) {
    console.error("Gossip data not found");
    return;
  }

  let likes = gossipData.likes || 0;
  let likedBy = gossipData.likedBy || [];

  // If user has already liked, return early
  if (likedBy.includes(user.objectId)) {
    alert("Вече сте харесали тази клюка!");
    return;
  }

  // Update likes and likedBy array
  likes++;
  likedBy.push(user.objectId);

  // Update the gossip on the server
  try {
    await dataService.likeGossip(gossipId, { likes, likedBy });
    // Re-render the view after liking
    homeView();
  } catch (error) {
    console.error("Failed to update likes:", error);
    alert("Failed to like gossip: " + error.message);
  }
}
