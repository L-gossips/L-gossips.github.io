import { html, render } from "../../lib/lit/lit-html.js";
import { dataService } from "../service/dataService.js";

let ctx = null;

export async function commentView(context) {
  ctx = context;
  const root = document.querySelector("main");
  const gossipId = location.pathname.split("/")[2];
  const gossip = await dataService.getGossipById(gossipId);
  const renderTemplate = renderPage(gossip);

  render(renderTemplate, root);
}
function renderPage(gossip) {
  console.log(gossip);
  if (gossip.comments === undefined) {
    gossip.comments = [];
  }
  return html`
      <div id="gossip-box">
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
      </div>
        <br class="br-line">
      ${gossip.comments.length > 0
        ? gossip.comments.map(
            (x) => html`
              <div class="comment">
                <div class="comment-inner-container">
                  <div class="comment-info">
                    <span><i>${x.date}</i></span>
                  </div>
                  <p class="post">${x.content}</p>
                </div>
              </div>
            `
          )
        : html`<h1>Все още коментари. Бъди първия!</h1>`}
      <br class="br-line">
      <form id="comment-form" @submit=${onSubmit}>
        <label>Коментар</label>
        <textarea name="content" required></textarea>
        <button type="submit">Качи</button>
      </form>
  `;
}
async function onSubmit(e) {
  e.preventDefault();

  // Get the form and extract data
  const form = e.target;
  const formData = new FormData(form);
  const content = formData.get("content");

  // Check if content is empty
  if (!content.trim()) {
    alert("Коментарът не може да бъде празен!");
    return;
  }

  // Extract gossipId from the URL
  const gossipId = location.pathname.split("/")[2];

  // Fetch gossip data by ID
  const gossipData = await dataService.getGossipById(gossipId);
  if (!gossipData) {
    console.error("Gossip data not found");
    return;
  }

  // Create a comment object with date and content
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const date = new Date(currentDate.getTime() - offset);
  const dateStr = date.toISOString();
  const comment = {
    content,
    date: dateStr.slice(0, 10) + " " + dateStr.slice(11, 16),
  };

  // Append the new comment to existing comments or create an array
  let comments = gossipData.comments || [];
  comments.push(comment);

  // Update the gossip on the server with the new comment
  try {
    await dataService.commentGossip(gossipId, { comments });
    // Clear the form after submitting
    form.reset();
    // Re-render the view after submitting the comment
    ctx.goTo(`/comment/${gossipId}`);
  } catch (error) {
    console.error("Failed to submit comment:", error);
    alert("Failed to submit comment: " + error.message);
  }
}

