/*
 *  Project name: PiCo WebComponents
 *  Author: MARCO PRATESI
 *  File name: pc_icon.mjs
 *  Description: Component to realize icons based on Google Font Symbols
 */

import { PiCoComponent } from "../pclib/cmps/pc_component.mjs";

export class PiCoPanel extends PiCoComponent {
  css() {
    return (
      super.css() + `
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: hsl(0, 0%, 100%);
        }
      `
    );
  }
  htm() {
    return `
        PANEL
    `;
  }
}

try { customElements.define("pc-panel", PiCoPanel) } catch { }
