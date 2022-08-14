function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function showAccountModal() {
    
}

const account_button = document.querySelector('#account');
account_button.addEventListener("click", () => {
    if(getCookie("auth") !== undefined)   
        showAccountModal();
    else
        location.href = "views/login"; // 'domain/login'

});