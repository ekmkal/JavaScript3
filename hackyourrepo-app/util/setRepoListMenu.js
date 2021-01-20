'use strict'

import * as mainVars from "../script.js"
import { showError } from "./showError.js"

export let reposData;

export function setRepoListMenu(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        reposData = data;

        data.forEach(repo => {
            const option = document.createElement("option");
            option.innerHTML = repo.name;
            mainVars.selectMenu.appendChild(option);
        });
    })
    .catch(() => {
        showError();
    });
}