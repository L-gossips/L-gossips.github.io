import {render, html} from '../../lib/lit/lit-html.js'
import { userUtils } from '../utils/userUtils.js'

let ctx = null
export function registerView(context) {
ctx = context
const template = html`
        <!-- Register Page (Only for Guest users) -->
        <section id="register">
          <div class="form">
            <h2>Регистрация</h2>
            <form class="register-form" @submit=${onSubmit}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="Псевдоним"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="Парола"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="Повтори парола"
              />
              <button type="submit">регистрирай се</button>
              <p class="message">Вече си регистриран? <a href="/login"><i>Влез в профила си</i></a></p>
            </form>
          </div>
        </section>

`
render(template, document.querySelector('main'))
}
async function onSubmit(e) {
e.preventDefault()
const formData = new FormData(e.target)
const username = formData.get('email').trim()
const password = formData.get('password').trim()
const rePass = formData.get('re-password').trim()
if (!username || !password || !rePass) {
return alert('Всички полета са задължителни!')
}
if (password !== rePass) {
return alert('Паролите не съвпадат!')
}
await userUtils.register(username, password)
ctx.goTo('/home')
ctx.updateNav()
}
