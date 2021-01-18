'use strict'

import * as mainVars from "../script.js"

export function showError() {
    mainVars.sectHeader.removeChild(mainVars.selectMenu);
    document.body.removeChild(mainVars.sectFooter);
    mainVars.sectInfo.innerHTML = `
        <div style="padding: 1rem; width: 100%; margin-right: auto; margin-left: auto;
        background-color: #F8D7DA; color: red;">
            <h3>Network request failed</h3>
        </div>
    `;
}