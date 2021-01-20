"use strict";

export {sectFooter, sectHeader, sectInfo, selectMenu, repoContributors, 
  pagination, pageNumbers, backPage, nextPage}

import { hidePlaceHolderOption } from "./util/hidePlaceHolder.js";
import { setRepoListMenu } from "./util/setRepoListMenu.js";
import { showRepoDetails } from "./util/showRepoDetails.js";

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
const pagination = document.createElement('div');
const backPage = document.createElement('a');
backPage.innerHTML = '&laquo';
backPage.className = 'scrollSymbols';
backPage.value = 'backPage';
pagination.appendChild(backPage);
const pageNumbers = document.createElement('div');
pageNumbers.className = 'pageNumbers';
pagination.appendChild(pageNumbers);
const nextPage = document.createElement('a');
nextPage.innerHTML = '&raquo';
nextPage.className = 'scrollSymbols';
nextPage.value = 'nextPage';
pagination.appendChild(nextPage);
pagination.className = 'pagination';
repoContrWrap.appendChild(pagination);
repoContrWrap.appendChild(repoContributors);
sectInfo.appendChild(repoContrWrap);
document.body.appendChild(sectInfo);

const sectFooter = document.createElement('section');
sectFooter.className = 'sect-footer';
const sectFooterPara = document.createElement('p');
sectFooterPara.innerHTML = 'HYF Repository';
sectFooter.appendChild(sectFooterPara);
document.body.appendChild(sectFooter);


function main() {
  const reposUrl = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  setRepoListMenu(reposUrl);

  document.querySelector('#repo-selection').addEventListener('change', (event) => {
    hidePlaceHolderOption();
    
    const currentSelectedRepoName = event.target.value;
    showRepoDetails(currentSelectedRepoName);
  });
};

window.addEventListener('load', main);