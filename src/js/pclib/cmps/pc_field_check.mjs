/*
 *  Project name: PiCo WebComponents
 *  Author: PIERO CORTE
 *  File name: pc_icon.mjs
 *  Description: Component to realize icons based on Google Font Symbols
 */

import { PiCoValuable } from './pc_valuable.mjs'
import './pc_check.mjs'

export class PiCoFieldCheck extends PiCoValuable {
    css() {
        return super.css() + `
            :host {
                position: relative;
                box-sizing: border-box;
                vertical-align: middle;
                display: inline-flex;
                align-items: start;
                width: fit-content;
                flex-direction: row;
                line-height: .9em;
                outline: none!important;
                gap:.3em;
            }
            label {
                box-sizing: border-box;
                flex: 1 1;
                font-variant: small-caps;
                font-size: .7em;
                text-align: right;
                color: hsl(0, 0%, 35%);
                white-space: nowrap;
            }
        `
    }
    htm() {
        return `
            <label part="label">label:</label>
            <pc-check part="check"></pc-check>
        `
    }
    onCreation() {
        this.check = this.shadowRoot.querySelector('pc-check')
        this.label = this.shadowRoot.querySelector('label')

        this.check.addEventListener('pce-blur', e => {
            let ne = new CustomEvent('pce-blur')
            ne.value = e.value
            ne.oldValue = e.oldValue == true
            ne.reason = e.reason
            this.dispatchEvent(ne)
        })
    }

    static get observedAttributes() {
        return [...PiCoValuable.observedAttributes, 'label', 'readonly']
    }
    _set_label(v) {
        this.label.innerHTML = v
    }
    _set_readonly(v) {
        this.check.setAttribute('readonly', v)
    }
}

try { customElements.define('pc-field-check', PiCoFieldCheck) } catch { }