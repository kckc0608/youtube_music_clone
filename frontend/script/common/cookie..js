export const getCookie = function(key) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};
