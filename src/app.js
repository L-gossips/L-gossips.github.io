import page from "../lib/page/page.mjs"
import { userService } from "./service/userService.js";
import { userUtils } from "./utils/userUtils.js";
import { commentView } from "./views/commentView.js";
import { enterView } from "./views/enterView.js";
import { homeView } from "./views/homeView.js"
import { loginView } from "./views/loginView.js";
import { postView } from "./views/postView.js"
import { registerView } from "./views/registerView.js";

page(updateCtx);
page("/", enterView)
page("/index.html", enterView)
page("/home", homeView)
page("/post", postView)
page("/comment/:id" , commentView)
page("/register", registerView)
page("/login", loginView)
page("/logout", logout)

page.start()
updateNav();

function updateCtx(ctx, next) {
  ctx.goTo = goTo;
  ctx.updateNav = updateNav;

  next();
}

function goTo(path) {
  page.redirect(path);
}

export function updateNav() {
  const user = userService.getUser();
  if (!user) {
    document.querySelectorAll(".user").forEach((x) => (x.style.display = "none"));
    document.querySelectorAll(".guest").forEach((x) => (x.style.display = "flex"));
  } else {
    document.querySelectorAll(".user").forEach((x) => (x.style.display = "flex"));
    document.querySelectorAll(".guest").forEach((x) => (x.style.display = "none"));
  }
}

async function logout() {
  await userUtils.logout();
  page.redirect("/");
  updateNav();
}
