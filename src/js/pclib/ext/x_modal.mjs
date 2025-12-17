import { PiCoContainer } from "../cmps/pc_container.mjs";
import { PiCoComponent } from "../cmps/pc_component.mjs";

export class XModal extends PiCoContainer {
    css() {
        return super.css() + `
            :host {
                position: fixed;
                display: block;
                left: 0%;
                top: 0%;
                width: 100%;
                height: 100%;
                padding: 10% 10% 10% 40%;
                transform: scale(0);
                transition: transform .5s;
            }

            content {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                background-color: hsla(0, 0%, 0%, .8);
                border-radius: 1em;
                color: white;
                padding: 1em;
            }
        `
    }
    htm() {
        return `
            <content>
                <close>X</close>
                MODAL
            </content>
        `
    }

    onCreation() {
        super.onCreation()
        const root = this.shadowRoot
        this.close = root.querySelector('close')
        this.close.addEventListener('click', e => this.style.transform = 'scale(0)')
    }

    static get observedAttributes() {
        return [...PiCoComponent.observedAttributes, 'title']
    }
    _set_title(v) {
    }
}

try { customElements.define('x-modal', XModal) } catch { }
