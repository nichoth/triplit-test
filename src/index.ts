import { html } from 'htm/preact'
import { render } from 'preact'
import { createDebug } from '@nichoth/debug'
import { State } from './state.js'
import Router from './routes/index.js'
import '@nichoth/components/button-outline.css'
import './style.css'
import './z-index.css'

const router = Router()
const state = await State()
const debug = createDebug()

export function Example () {
    debug('rendering example...')
    const match = router.match(state.route.value)

    if (!match) {
        return html`<div class="404">
            <h1>404</h1>
        </div>`
    }

    const ChildNode = match.action(match, state.route)

    return html`<div class="content">
        <h1>hello</h1>

        <header>
            <nav>
                <ul class="nav">
                    <li class="${getClass('/aaa')}"><a href="/aaa">aaa</a></li>
                    <li class="${getClass('/bbb')}"><a href="/bbb">bbb</a></li>
                    <li class="${getClass('/ccc')}"><a href="/ccc">ccc</a></li>
                </ul>
            </nav>
        </header>

        <${ChildNode} state=${state} />
    </div>`
}

function getClass (href) {
    return location.pathname === href
}

render(html`<${Example} state=${state} />`, document.getElementById('root')!)
