import { getCookie } from "../common/cookie.js";
const account_button = document.querySelector('#account');
account_button.addEventListener("click", () => {
    
    location.href = "views/login.html";
});