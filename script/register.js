const register_form = document.querySelector('form');
register_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = register_form["id"].value;
	const pw = register_form["pw"].value;

    const data = {
        id,
        pw,
    };

    const API_ADDRESS = 'http://everdu.ga/api/project/ym_clone/register';
    const FETCH_OPTION = {
        method: 'POST',
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
    };

    fetch(API_ADDRESS, FETCH_OPTION)
    .then((response) => {
		return response.json();
	})
    .then((data) => {
		if (data.success) {
			window.location.href = './login';
		}
		else {
			alert(data.msg);
		}
	})
    .catch();
});