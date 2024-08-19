import {render, html} from '../../lib/lit/lit-html.js'
import { userUtils } from '../utils/userUtils.js'

let ctx = null
export function loginView(context) {
ctx = context
const template = html`
        <!-- Login Page (Only for Guest users) -->
        <section id="login">
          <div class="form">
            <h2>Вход</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input type="text" name="email" id="email" placeholder="Псевдоним" autocomplete="email" required></input>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Парола"
                autocomplete="password" 
                required
              />
              <button type="submit">влез</button>
              <p class="message">
                Все още не си регистриран? <a href="/register"><i>Създай профил</i></a>
              </p>
            </form>
          </div>
        </section>

`
render(template, document.querySelector('main'))
}
async function onSubmit(e) {
e.preventDefault()
const formData = new FormData(e.target)
const username = String(formData.get('email').trim())
const password = String(formData.get('password').trim())
if (!username || !password) {
return alert('Всички полета са задължителни!')
}

const users = Object.values(await userUtils.getAll())[0]

const id = users.find(x => x.username === username).objectId
const data = {
  id,
  username,
  password,
  }

if (!users.find(x => x.username === data.username)) {
return alert('Невалиден username!')
}
if (!users.find(x => x.password === data.password)) {
return alert('Невалидна парола!')
}
await userUtils.login(data)

ctx.goTo('/')
ctx.updateNav()
}