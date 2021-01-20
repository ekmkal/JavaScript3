'use strict'

import * as mainVars from "../script.js";
import { showPage } from "./showPage.js";
import { showError } from "./showError.js";

function createContrPage(indexNum) {
    const page = document.createElement('a');
    page.innerHTML = indexNum/5 + 1;
    page.value = indexNum/5 + 1;
    page.className = 'page';
    mainVars.pageNumbers.appendChild(page);
};

export function showContributors(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        mainVars.repoContributors.innerHTML = '';
        mainVars.pageNumbers.innerHTML = '';

        for (let i=0; i < data.length; i++) {
            if(i % 5 === 0) createContrPage(i);
        };
        
        (data.length > 5) ? 
        mainVars.pagination.style.display = 'flex' : 
        mainVars.pagination.style.display = 'none';
        
        showPage(data, 1);
        let activePage = 1;
        
        function changePage(event) {
            const value = event.target.value;
            const pageNodes = mainVars.pageNumbers.childNodes;
            const lastPageNum = pageNodes.length;
        
            switch (value) {
                case ('backPage'):
                    if (activePage > 1) {
                        showPage(data, activePage - 1);
                        activePage -= 1;
                    } else {
                        showPage(data, lastPageNum);
                        activePage = lastPageNum;
                    };
                    break;
                case ('nextPage'):
                    if (activePage < lastPageNum) {
                        showPage(data, activePage + 1);
                        activePage += 1;
                    } else {
                        showPage(data, 1);
                        activePage = 1;
                    };
                    break;
                default:
                    showPage(data, parseInt(value));
                    activePage = parseInt(value);
                    break;
            };
        };

        mainVars.pagination.addEventListener('click', changePage);
    })
    .catch(() => {
        showError();
    })
}