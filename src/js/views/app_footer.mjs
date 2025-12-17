/*
 *  Project name: PiCo WebComponents
 *  Author: MARCO PRATESI
 *  File name: pc_icon.mjs
 *  Description: Component to realize icons based on Google Font Symbols
 */

import { PiCoComponent } from "../pclib/cmps/pc_component.mjs";

export class AppFooter extends PiCoComponent {
  css() {
    return (
      super.css() + `
        :host {
          display: flex;
          padding: .5em 1em;
          background-color: var(--bgc);
        }
      `
    );
  }
  htm() {
    return `
        FOOTER
    `;
  }

  onCreation() {
    const root = this.shadowRoot;
  }
}

try { customElements.define("app-footer", AppFooter) } catch { }
