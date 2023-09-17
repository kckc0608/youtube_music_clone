import { API_ADDRESS } from "./common/environment.js";

const register_form = document.querySelector('form');
register_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = register_form["id"].value;
	const pw = register_form["pw"].value;
	const pw_check = register_form["pw_check"].value;
	const nick = register_form["nick"].value;

    const data = {
        id,
        pw,
		nick
    };

	if (pw !== pw_check) {
		ShowErrorMessage("비밀번호 확인이 비밀번호와 다릅니다.");
		return false;
	}
    const FETCH_OPTION = {
      method: 'POST',
			credentials: "same-origin",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
    };

    fetch(API_ADDRESS+"register", FETCH_OPTION)
    .then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw Error("something went wrong");
		})
    .then((data) => {
		if (data.success) {
			window.location.href = './login.html';
		}
		else {
			if (data.msg == "ER_DUP_ENTRY") {
				ShowErrorMessage("이미 존재하는 아이디 입니다.");
			} else {
				ShowErrorMessage(data.msg);
			}
		
		}
	})
    .catch((error) => {
		console.log(error);
	});
});

const ShowErrorMessage = function(errorMessage) {
	const error_msg_div = document.getElementById("error-msg");
	error_msg_div.style.visibility = "visible";
	error_msg_div.textContent = errorMessage;
};