/*
 *  Project name: PiCo WebComponents
 *  Author: PIERO CORTE
 *  File name: pc_label.mjs
 *  Description: Component to realize a label
 */

import { PiCoComponent } from '../pclib/cmps/pc_component.mjs'

export class AppMain extends PiCoComponent {
    css() {
        return super.css() + `
            :host {
                overflow: scroll;
            }
            content {
                display: block;
                box-sizing: border-box;
                height: 150%;
                padding: .5em 1em;
                background-color: var(--bgc);
            }
        `
    }
    htm() {
        return `
            <content>CONTENUTO</content>
        `
    }

    onCreation() {
        const root = this.shadowRoot
    }

}

try { customElements.define('app-main', AppMain) } catch { }