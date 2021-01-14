"use strict";

// Recreating all HTML elements with DOM manipulation;
const sectHeader = document.createElement('section');
sectHeader.className = 'sect-header';
const header = document.createElement('h3');
header.innerHTML = 'HYF Repositories';
sectHeader.appendChild(header);
const selectMenu = document.createElement('select');
selectMenu.name = 'repo-selection';
selectMenu.id = 'repo-selection';
const optPlaceHolder = document.createElement('option');
optPlaceHolder.value = '';
optPlaceHolder.id = 'place-holder-option';
optPlaceHolder.innerHTML = 'Select a Repo...';
selectMenu.appendChild(optPlaceHolder);
sectHeader.appendChild(selectMenu);
document.body.appendChild(sectHeader);

const sectInfo = document.createElement('section');
sectInfo.className = 'sect-info';
const repoDetail = document.createElement('div');
repoDetail.className = 'repo-detail';
const form = document.createElement('form');

const formItem1 = document.createElement('div');
formItem1.className = 'form-item';
const formItem1Header = document.createElement('h3');
formItem1Header.innerHTML = 'Repository:';
const formItem1Para = document.createElement('p');
formItem1Para.id = 'repo-name';
formItem1.appendChild(formItem1Header);
formItem1.appendChild(formItem1Para);
form.appendChild(formItem1);

const formItem2 = document.createElement('div');
formItem2.className = 'form-item';
const formItem2Header = document.createElement('h3');
formItem2Header.innerHTML = 'Description:';
const formItem2Para = document.createElement('p');
formItem2Para.id = 'repo-desc';
formItem2.appendChild(formItem2Header);
formItem2.appendChild(formItem2Para);
form.appendChild(formItem2);

const formItem3 = document.createElement('div');
formItem3.className = 'form-item';
const formItem3Header = document.createElement('h3');
formItem3Header.innerHTML = 'Forks:';
const formItem3Para = document.createElement('p');
formItem3Para.id = 'repo-forks';
formItem3.appendChild(formItem3Header);
formItem3.appendChild(formItem3Para);
form.appendChild(formItem3);

const formItem4 = document.createElement('div');
formItem4.className = 'form-item';
const formItem4Header = document.createElement('h3');
formItem4Header.innerHTML = 'Updated:';
const formItem4Para = document.createElement('p');
formItem4Para.id = 'repo-update';
formItem4.appendChild(formItem4Header);
formItem4.appendChild(formItem4Para);
form.appendChild(formItem4);

repoDetail.appendChild(form);
sectInfo.appendChild(repoDetail);

const repoContrWrap = document.createElement('div');
repoContrWrap.className = 'repo-contr-wrap';

const contrHeadDiv = document.createElement('div');
contrHeadDiv.className = 'contr-head';
const contrHead = document.createElement('h3');
contrHead.innerHTML = 'Contributors';
contrHeadDiv.appendChild(contrHead);
repoContrWrap.appendChild(contrHeadDiv);

const repoContributors = document.createElement('div');
repoContributors.className = 'repo-contributors';
repoContrWrap.appendChild(repoContributors);
sectInfo.appendChild(repoContrWrap);
document.body.appendChild(sectInfo);

const sectFooter = document.createElement('section');
sectFooter.className = 'sect-footer';
const sectFooterPara = document.createElement('p');
sectFooterPara.innerHTML = 'HYF Repository';
sectFooter.appendChild(sectFooterPara);
document.body.appendChild(sectFooter);


// Declaring 'main' function
function main() {
  // Defining variables
  const repoSelection = document.querySelector('#repo-selection');
  const repoName = document.querySelector('#repo-name');
  const repoDesc = document.querySelector('#repo-desc');
  const repoForks = document.querySelector('#repo-forks');
  const repoUpdate = document.querySelector('#repo-update');
  
  const reposUrl = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  let reposData;
  
  // Function for errors
  function showError() {
    sectHeader.removeChild(selectMenu);
    document.body.removeChild(sectFooter);
    sectInfo.innerHTML = `
    <div style="padding: 1rem; width: 100%; margin-right: auto; margin-left: auto;
    background-color: #F8D7DA; color: red;">
    <h3>Network request failed</h3>
    </div>
    `;
  };
  
  // Function for appending repo names to the select menu.
  function setRepoListMenu(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      reposData = data; 
      reposData.forEach(repo => {
        const option = document.createElement("option");
        option.innerHTML = repo.name;
        repoSelection.appendChild(option);
      })
    })
    .catch(() => {
      showError();
    });
  };
  
  setRepoListMenu(reposUrl);

  // Function for hiding the place holder of the select menu.
  function hidePlaceHolderOption(){
    const placeHolderOption = document.querySelector("#place-holder-option");
    placeHolderOption.style.display = 'none';
  };

  // Function for showing the contributor details of the repo.
  function showContributors(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      repoContributors.innerHTML = '';
      
      data.forEach(contributor => {
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
        repoContributors.innerHTML += contr;
      });
    })
    .catch(() => {
      showError();
    })
  };

  // Function for showing all details of the repo.
  function showRepoDetails(selectedRepoName) {
    const selectedRepo = reposData.filter(repo => {
      if(selectedRepoName === repo.name) {
        return repo;
      };
    });
    repoName.innerHTML = selectedRepo[0].name;
    repoDesc.innerHTML = selectedRepo[0].description;
    repoForks.innerHTML = selectedRepo[0].forks;
    repoUpdate.innerHTML = selectedRepo[0].updated_at;
    
    const selectedRepoContrsUrl = selectedRepo[0].contributors_url;
    showContributors(selectedRepoContrsUrl);
  };

  repoSelection.addEventListener('change', (event) => {
    hidePlaceHolderOption();
    
    const currentSelectedRepoName = event.target.value;
    showRepoDetails(currentSelectedRepoName);
  });
};

window.addEventListener('load', main);