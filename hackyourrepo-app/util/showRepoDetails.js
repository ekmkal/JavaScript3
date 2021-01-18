'use strict'

import { reposData } from "./setRepoListMenu.js";
import { showContributors } from "./showContributors.js";

// Function for showing all details of the repo.
export function showRepoDetails(selectedRepoName) {
    const selectedRepo = reposData.filter(repo => {
        if(selectedRepoName === repo.name) return repo;
    })[0];
    
    document.querySelector('#repo-name').innerHTML = selectedRepo.name;
    document.querySelector('#repo-desc').innerHTML = selectedRepo.description;
    document.querySelector('#repo-forks').innerHTML = selectedRepo.forks;
    document.querySelector('#repo-update').innerHTML = selectedRepo.updated_at;

    showContributors(selectedRepo.contributors_url);
};