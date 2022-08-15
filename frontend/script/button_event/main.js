import { getCookie } from "../common/cookie.";
const account_button = document.querySelector('#account');
account_button.addEventListener("click", () => {
    if (!!getCookie("auth")) {
        alert("이미 로그인하였습니다.");
    }
    else {
        location.href = "views/login";
    }
});