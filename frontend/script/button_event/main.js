const account_button = document.querySelector('#account');
account_button.addEventListener("click", () => {
    //브라우저 단에서 쿠키 체크 후 쿠키가 있으면 로그인 된 것으로 간주

    // 만약 쿠키가 없으면 로그인 페이지로 이동
    location.href = "views/login";
});