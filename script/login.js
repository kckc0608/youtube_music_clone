const login_form = document.querySelector('form');
const id_reg = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z]){4,15}$/;

// 8~16 자로, 특수문자 포함, 영어 또는 숫자.
const pw_reg = /^$/;

login_form.addEventListener("submit", (event) => {
    event.preventDefault();

    // validating form
    const id = login_form["id"].value;
	const pw = login_form["pw"].value;
		//alert(id_reg.test(id));
    if (!id_reg.test(id)) {
		// 잘못된 형식의 아이디를 입력한 경우, 폼 유효성 검사로 다시 입력하도록 안내하기
        alert("wrong id!");
        return false;
    }

	const data = {
		'id': id,
		'pw': pw,
	};

	//const url = 'http://api.everdu.ga/project/ym_music/login';
	const API_ADDRESS = 'http://everdu.ga/api/project/ym_clone/login';
	fetch(API_ADDRESS, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
//			'withCredentials': 'true',
		},
		body: JSON.stringify(data),
	}).then((response) => {
		return response.json();
	}).then((data) => {
		if (data.success)
		{
			alert("stop");
			window.location.href = '../';
		}
		else {
			alert(data.msg);
		}
	}).catch((err) => {
		console.log(err);
	});
});