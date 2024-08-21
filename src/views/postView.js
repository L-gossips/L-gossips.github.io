import { html, render } from "../../lib/lit/lit-html.js";
import { dataService } from "../service/dataService.js";
import page from "../../lib/page/page.mjs";
import { userService } from "../service/userService.js";

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
  
  const lastPostTime = localStorage.getItem("lastPostTime");
  const currentTime = new Date().getTime();
  
  // Check if the user has posted within the last 5 minutes
  if (lastPostTime && currentTime - lastPostTime < 5 * 60 * 1000) {
    const timeRemaining = Math.ceil((5 * 60 * 1000 - (currentTime - lastPostTime)) / 1000);
    const timeInMinutes = Math.floor(timeRemaining / 60);
    if(timeInMinutes === 0){
      alert(`Трябва да изчакаш ${timeRemaining} секунди преди отново да клюкариш!`);
      return;
    }
    alert(`Трябва да изчакаш ${timeInMinutes} минути преди отново да клюкариш!`);
    return;
  }

  let date = new Date();
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const date1 = new Date(currentDate.getTime() - offset);
  const dateStr = date1.toISOString();
  date = dateStr.slice(0, 10) + " " + dateStr.slice(11, 16);
  const author = userService.getUser().username;

  const gossip = {
    title: formData.get("title"),
    description: formData.get("description"), 
    creator: author,
    date
  };

  await dataService.createGossip(gossip);


    // Retrieve all gossips to check the count
    const allGossips = await dataService.getAllGossips();

    // If there are more than 51 gossips, delete the oldest one
    if (allGossips.length > 50) {
      const oldestGossip = allGossips.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
      await dataService.deleteGossip(oldestGossip.id);
    }

  // Save the current time as the last post time
  localStorage.setItem("lastPostTime", currentTime.toString());

  page.redirect("/");
}
