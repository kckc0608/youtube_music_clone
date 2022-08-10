const login_form = document.querySelector('form');
login_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = login_form["id"].value;
	const pw = login_form["pw"].value;

	// validating form
	const id_reg = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z]){4,15}$/;
    if (!id_reg.test(id)) {
        alert("wrong id!");
        return false;
    }

	const data = {
		'id': id,
		'pw': pw,
	};

	const API_ADDRESS = 'http://everdu.ga/api/project/ym_clone/login';
	const FETCH_OPTION = {
		method: 'POST',
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	fetch(
		API_ADDRESS, 
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
			alert(data.msg);
		}
	})
	.catch((err) => {
		console.log(err);
	});
});