const login_form = document.querySelector('form');

const id_reg = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z]){4,15}$/;

// 8~16 자로, 특수문자 포함, 영어 또는 숫자.
const pw_reg = /^$/;



login_form.addEventListener("submit", (event) => {
    // validating form
    const id = login_form["id"].value;
    alert(id_reg.test(id));
    if (!id_reg.test(id)) {
        alert("wrong id!");
        event.preventDefault();
        return false;
    }

    alert("right id!");
});