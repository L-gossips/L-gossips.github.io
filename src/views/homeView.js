import {html, render} from "../../lib/lit/lit-html.js";
import { dataService } from "../service/dataService.js";
import { userService } from "../service/userService.js";

export async function homeView(){
const root = document.querySelector("main")
let gossips = (await dataService.getAllGossips()).results
gossips = gossips.reverse();
const template = renderTemplate(gossips);
render(template, root);
}

function renderTemplate(gossips){
  const user = userService.getUser();

return html`
${user ? html`
<div class="home-user">
<h1><span id="welcome">Здравей</span>, <span>${user.username}</span>!</h1>
<div>
<p>Подредба:<p>
<select @change=${onChange}>
  <option value="newest">Най-нови</option>
  <option value="oldest">Най-стари</option>
</select>
<div>
</div>
` : html``}
<section>
        <ul class="gossips">
            ${gossips.length > 0 ? gossips.map(gossip => html`
            <li>
            <img src="/img/pfp.jpg" alt="pfp" />
            <div class="gossip-inner-container">
              <div class="gossip-info">
              <h1>${gossip.title}</h1>
              <span><i>${gossip.date}</i></span>
              </div>
              <p class="post">
               ${gossip.description}
              </p>
            </div>
          </li>`): html`<p>Все още няма клюки</p>`}
        </ul>
      </section>
      <div id="post-btn">
        <a href="/post">+</a>
    </div>
`
}
function onChange(e){
e.preventDefault();
const value = e.target.value;
if(value === "newest"){
  const gossips = Array.from(document.querySelectorAll(".gossips li"));
  gossips.reverse().forEach(gossip => document.querySelector(".gossips").appendChild(gossip));
}else{
  const gossips = Array.from(document.querySelectorAll(".gossips li"));
  gossips.reverse().forEach(gossip => document.querySelector(".gossips").appendChild(gossip));
}
}
