/*
 *  Project name: PiCo WebComponents
 *  Author: MARCO PRATESI
 *  File name: pc_icon.mjs
 *  Description: Component to realize icons based on Google Font Symbols
 */

import { PiCoComponent } from "../pclib/cmps/pc_component.mjs";

export class AppSplash extends PiCoComponent {
  css() {
    return (
      super.css() + `
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: hsl(0, 0%, 100%);
          height: 100%;
        }
      `
    );
  }
  htm() {
    return `
        <img src="./assets/images/pico_logo.png">
    `;
  }
}

try { customElements.define("app-splash", AppSplash) } catch { }
