import {render, html} from '../../lib/lit/lit-html.js'

let ctx = null
export function enterView(context) {
    ctx = context
    const root = document.querySelector("main")
    document.querySelector("nav").style.display = "none"
    document.querySelector("footer").style.display = "none"
    const template = html`
    <main>
    <section id="enter">
        <div class="form">
            <h2 id="enterHeader">Преди да влезеш в сайта</h2>
            <form class="login-form" @submit=${onSubmit}>
                <input type="password" name="keyWord" id="keyWord" placeholder="Ключова дума" autocomplete="keyWord" required></input>
                <button type="submit">продължи</button>
                <p class="message">Не знаеш за ключовата дума? Не си за тук :)</p>
            </form>
        </div>
    </section>
</main>
    `
    render(template, root)
}
function onSubmit(e) {
e.preventDefault()
const formData = new FormData(e.target)
const keyWord = String(formData.get('keyWord').trim())
if (!keyWord) {
return alert('Въведете ключова дума!')
}
if (keyWord !== '333') {
    return alert('Невалидна ключова дума!')
}

ctx.goTo('/home')
}