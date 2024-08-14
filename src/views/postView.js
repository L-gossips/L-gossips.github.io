import {html, render} from "../../lib/lit/lit-html.js";
import { dataService } from "../service/dataService.js";
import page from "../../lib/page/page.mjs"

export async function postView(){
  const root = document.querySelector("main");

  const template = html`
    <form id="post-gossip" @submit=${onSubmit}>
      <label>Заглавие</label>
      <input type="text" name="title" required />
      
      <label>Клюка</label>
      <textarea name="description" required></textarea>

      <button type="submit">Submit</button>
    </form>
  `;

  render(template, root);
}

async function onSubmit(e){
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);

  const gossip = {
    title: formData.get("title"),
    description: formData.get("description"), 
  };

    try {
        await dataService.createGossip(gossip);
        page.redirect("/");
    } catch (error) {
        alert("Error: " + error.message);
  }
}
