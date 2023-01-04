window.addEventListener('DOMContentLoaded', function(){
	document.querySelector("h1").textContent = chrome.i18n.getMessage("extName");
	document.querySelector(".popup-description").textContent = chrome.i18n.getMessage("popupDescription");
	document.querySelector(".sns-accounts").textContent = chrome.i18n.getMessage("sns");
});