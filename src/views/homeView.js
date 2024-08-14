import {html, render} from "../../lib/lit/lit-html.js";
import { dataService } from "../service/dataService.js";

export async function homeView(){
const root = document.querySelector("main")
let gossips = (await dataService.getAllGossips()).results
for(let i = 0; i < 50; i++){
  const gossip = {
    title: `Test: ${[i]}`,
    description: `Test: ${[i]}`,
  }
  await dataService.createGossip(gossip)
}
if(gossips.length >50){
  for(let i = 0; i < 50; i++){
    await dataService.deleteGossip(gossips[i].objectId)
  }
}
gossips = gossips.reverse();
const template = renderTemplate(gossips);
render(template, root);
}

function renderTemplate(gossips){
return html`
<section>
        <ul class="gossips">
            ${gossips.length > 0 ? gossips.map(gossip => html`
            <li>
            <img src="/img/pfp.jpg" alt="pfp" />
            <div>
              <h1>${gossip.title}</h1>
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