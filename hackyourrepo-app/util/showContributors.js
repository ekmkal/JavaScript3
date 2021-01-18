'use strict'

import * as mainVars from "../script.js";
import { showPage } from "./showPage.js";
import { showError } from "./showError.js";

// Function for showing the contributor details of the repo.
export function showContributors(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        mainVars.repoContributors.innerHTML = '';
        mainVars.pageNumbers.innerHTML = '';
        
        for (let i=0; i < data.length; i++) {
            if(i % 5 === 0){
                const page = document.createElement('a');
                page.innerHTML = i/5 + 1;
                page.value = i/5 + 1;
                page.className = 'page';
                mainVars.pageNumbers.appendChild(page);
            };
        };
        
        mainVars.pagination.style.display = 'flex';
        
        showPage(data, 0);

        mainVars.pageNumbers.addEventListener('click', (event) => {
            showPage(data, (event.target.value - 1));
        });

        mainVars.backPage.addEventListener('click', () => {
            const pageNodes = mainVars.pageNumbers.childNodes;
            const lastPageIndex = parseInt(Object.keys(pageNodes).pop());

            for (let key of Object.keys(pageNodes)) {
                // if(pageNodes[key].className === 'active') {
                //     if (key > 0) {
                //         console.log(key);
                //         showPage(data, (key - 1));
                //     } else {
                //         console.log(lastPageIndex);
                //         showPage(data, lastPageIndex);
                //     };
                // };

                if (pageNodes[0].className === 'active') {
                    console.log(lastPageIndex);
                    showPage(data, lastPageIndex);
                } else if(pageNodes[key].className === 'active' && key >= 1) {
                    console.log(key);
                    showPage(data, (key - 1));
                };
            };
        });

        mainVars.nextPage.addEventListener('click', () => {
            const pageNodes = mainVars.pageNumbers.childNodes;
            const lastPageIndex = parseInt(Object.keys(pageNodes).pop());

            for (let key of Object.keys(pageNodes)) {
                if(pageNodes[key].className === 'active') {
                    if (key < lastPageIndex) {
                        console.log(lastPageIndex);
                        showPage(data, (key + 1));
                    } else {
                        // const lastPageIndex = parseInt(Object.keys(pageNodes).pop());
                        showPage(data, 0);
                    };
                };
            };
        });
    })
    .catch(() => {
        showError();
    })
}