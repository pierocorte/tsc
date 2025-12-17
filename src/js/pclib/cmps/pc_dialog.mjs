/*
 *  Project name: PiCo WebComponents
 *  Author: PIERO CORTE
 *  File name: pc_label.mjs
 *  Description: Component to realize a label
 */

import { PiCoComponent } from '../cmps/pc_component.mjs'
import '../cmps/pc_button.mjs'
import i18next from '../utils/i18n.mjs'

class PiCoDialog extends PiCoComponent {
    css() {
        return super.css() + `
            :host {
                box-sizing: border-box;
                position: absolute;
                z-index: 999999;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 5px solid hsla(0, 0%, 10%, 1);
                background-color: hsla(0, 0%, 10%, .8);
                display: none;
                padding: 2.5em 1em;
                gap: .5em;
            }
            main {
                display: flex;
                box-sizing: border-box;
                flex: 1;
                background-color: var(--bgc);
                color: var(--fgc);
                overflow: hidden;
                width: 100%;
                padding: 1em;
            }
            ul  {
                font-size: 0.9em;
                padding-left: 1.2em;
            }
        `
    }
    htm() {
        return `
            <main><slot name="message"></slot></main>
            <actions>
                <pc-button text="cancel"></pc-button>
            </actions>
        `
    }

    onCreation() {
        let root = this.shadowRoot
        this.main = root.querySelector('main')
        this.cancelBtn = root.querySelector('pc-button[text=cancel]')
        this.cancelBtn.setAttribute('text', i18next.t('cancel'))
        this.cancelBtn.addEventListener('action', e => this.hide())
    }

    static get observedAttributes() {
        return [...PiCoComponent.observedAttributes, 'text']
    }

    get text() { return this.main.innerHTML }
    set text(v) {
        this.main.innerHTML = v
    }

    show() { this.style.display = 'flex' }
    hide() { this.style.display = 'none' }

    alert(msg) {
        Array.from(this.children).forEach(c => c.remove())
        let message = document.createElement('message')
        message.setAttribute('slot', 'message')
        message.innerHTML = msg
        this.appendChild(message)
        this.show()
    }
}

try { customElements.define('pc-dialog', PiCoDialog) } catch { }

const DIALOG = new PiCoDialog
document.body.appendChild(DIALOG)
export default DIALOG