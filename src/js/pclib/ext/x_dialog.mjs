import { PiCoComponent } from "../cmps/pc_component.mjs";
import "../cmps/pc_button.mjs";
import "../cmps/pc_field.mjs";

export class XDialog extends PiCoComponent {
    css() {
        return super.css() + `
            :host {
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                left: 0%;
                top: 0%;
                width: 100%;
                height: 100%;
                padding: 10% 10% 10% 10%;
                transform: scale(0);
                transition: transform .5s;
            }
            content {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: hsla(0, 0%, 0%, .8);
                color: white;
                padding: 1em;
                border-radius: 1em;
            }
            content > * {
                box-sizing: border-box;
                text-align: center;
            }
            header {
                font-size: 1.5em;
                font-weight: 500;
                min-width: 15em;
            }
            message {
                width: 100%;
                padding: 0 3em;
                font-size: .9em;
                color: hsla(0,0%,100%,.8);
            }
            form {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: .2em;
                padding: 1em 1em .1em 1em;
            }
            fields {
                display: flex;
                flex-direction: column;
                gap: .2em;
            }
            pc-field {
                width: 100%;
                flex-direction: row;
            }
            pc-field::part(label) {
                color: white;
                min-width: 12em;
                padding: .1em .3em 0 .3em;
            }
            pc-field::part(input) {
                background-color: hsla(0, 0%, 100%, .1);
                color: white;
                width: 100%;
                padding: .1em .3em 0 .3em;
            }
            pc-field::part(input):focus {
                outline: 3px solid hsla(0, 0%, 100%, .5);
            }

            error {
                box-sizing: border-box;
                width: 100%;
                padding: 0 .3em;
                line-height: 1.5em;
                min-height: 1.8em;
                margin-bottom: .5em;
                font-size: .9em;
                background-color: hsla(0, 0%, 100%, .6);
                color: hsla(0,80%,40%,.8);
                visibility: hidden;
            }
            
            pc-button {
                background-color: hsla(0, 50%, 80%, .3);
            }
        `
    }
    htm() {
        return `
            <content>
                <header>Titolo</header>
                <message>messaggio</message>
                <form>
                    <fields>
                        <pc-field label="nome:"></pc-field>
                        <pc-field label="cognome:"></pc-field>
                    </fields>
                    <error></error>
                </form>
                <actions>
                    <pc-button id="confirm" text="Confirm"></pc-button>
                    <pc-button id="abort" text="Abort"></pc-button>
                    <pc-button id="cancel" text="Cancel"></pc-button>
                </actions>
            </content>
        `
    }

    onCreation() {
        super.onCreation()
        const root = this.shadowRoot
        this.$content = root.querySelector('content')
        this.$header = root.querySelector('header')
        this.$message = root.querySelector('message')
        this.$form = root.querySelector('form')
        this.$error = root.querySelector('error')
        this.$cancel = root.getElementById('cancel')
        this.$cancel.addEventListener('action', e => this.showError('error'))
        this.$confirm = root.getElementById('confirm')
        this.$confirm.addEventListener('action', e => this._confirm())
        this.$abort = root.getElementById('abort')
        this.$abort.addEventListener('action', e => this._abort())
        this.addEventListener('focus', e => this.hideError())
    }

    static get observedAttributes() {
        return [...PiCoComponent.observedAttributes, 'title']
    }
    _set_title(v) {
    }

    show() { this.style.transform = 'scale(1)' }
    hide() { this.style.transform = 'scale(0)' }
    _confirm() { }
    _abort() { }

    showError(err) {
        this.$error.style.visibility = 'visible'
        this.$error.innerHTML = err
    }
    hideError() {
        this.$error.style.visibility = 'hidden'
        this.$error.innerHTML = ''
    }


    info(msg) {
        this.$content.style.backgroundColor = 'hsla(140, 80%, 20%, .9)'
        this.$confirm.style.display = 'none'
        this.$abort.style.display = 'none'
        this.$cancel.style.display = 'inline-flex'
        this.$message.innerHTML = 'Inserisci il tuo nome e cognome'
        this.show()
    }
}

try { customElements.define('x-dialog', XDialog) } catch { }
