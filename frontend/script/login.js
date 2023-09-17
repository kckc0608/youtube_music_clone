import { API_ADDRESS } from "./common/environment.js";

const login_form = document.querySelector('form');
login_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = login_form["id"].value;
	const pw = login_form["pw"].value;

	// validating form
	const id_reg = /[a-zA-Z0-9]{1}\w{5,15}/g;
    if (!id_reg.test(id)) {
        ShowErrorMessage("아이디 형식이 맞지 않습니다.")
        return false;
    }

	const data = {
		'id': id,
		'pw': pw,
	};

	const FETCH_OPTION = {
		method: 'POST',
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	fetch(
		API_ADDRESS + "login", 
		FETCH_OPTION,
	)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		if (data.success) {
			window.location.href = '../';
		}
		else {
			ShowErrorMessage(data.msg);
			console.log(data);
		}
	})
	.catch((err) => {
		ShowErrorMessage(err);
		console.log(err);
	});
});

const ShowErrorMessage = function(errorMessage) {
	const error_msg_div = document.getElementById("error-msg");
	error_msg_div.style.visibility = "visible";
	error_msg_div.textContent = errorMessage;
};