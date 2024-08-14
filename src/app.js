import page from "../lib/page/page.mjs"
import { homeView } from "./views/homeView.js"
import { postView } from "./views/postView.js"


page("/", homeView)
page("/post", postView)

page.start()