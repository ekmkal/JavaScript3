'use strict'

import * as mainVars from "../script.js";

export function showPage(arrayOfData, pageNumber) {
    mainVars.repoContributors.innerHTML = '';

    mainVars.pageNumbers.childNodes.forEach(childPage => {
        childPage.className = 'page';
    });
    mainVars.pageNumbers.childNodes[pageNumber].className = 'active';

    arrayOfData.slice((pageNumber * 5), ((pageNumber +1) * 5)).forEach(contributor => {
        const contr = `
            <div class="contr">
                <img src="${contributor.avatar_url}" alt="contributor-avatar">
                <div class="name">
                    <p>${contributor.login}</p>
                </div>
                <div class="repo-number">
                    <p>${contributor.contributions}</p>
                </div>
            </div>
        `;
        mainVars.repoContributors.innerHTML += contr;
    });
}