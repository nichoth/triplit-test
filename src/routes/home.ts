import { html } from 'htm/preact'
import { FunctionComponent } from 'preact'
import { ReactiveForm } from '@nichoth/components/htm/reactive-form'
import { TextInput } from '@nichoth/components/htm/text-input'
import Debug from '@nichoth/debug'
import { State } from '../state.js'
import '@nichoth/components/text-input.css'
import '@nichoth/components/button.css'

const debug = Debug()

export const HomeRoute:FunctionComponent<{
    state:Awaited<ReturnType<typeof State>>
}> = function HomeRoute ({ state }) {
    function handleSubmit (ev) {
        ev.preventDefault()

        const els = ev.target.elements
        const text = els['text'].value

        debug('submit text', text)
        State.AddTodo(state, text)
    }

    return html`<div class="route home">
        <${ReactiveForm} onSubmit=${handleSubmit}>
            <${TextInput} name="text" displayName="Something to do"
                required=${true} />
        <//>
    </div>`
}
