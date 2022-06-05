if ('content' in document.createElement('template')) {

	const addContent = function(imageSource, desc, title, content, isMore = false) {
		// get main_content element to put new item
		const main_content = document.querySelector('.content_area');

		// get content template
		const template_content_item = document.querySelector('#t_content_item');

		// get new item from template
		const item = document.importNode(template_content_item.content, true);

		// set image
		if (!!imageSource) {
			item.querySelector('#item_image').style.display = "block";
			item.querySelector('#item_image').setAttribute('src', imageSource);
		}
		else {
			item.querySelector('#item_image').style.display = "none";
		}

		// set title & content
		item.querySelector('#item_about').textContent = desc;
		item.querySelector('#item_name').textContent = title;
		item.querySelector('#item_content').appendChild(content);

		// set more button
		if (isMore) {
			item.querySelector('#item_more').style.display = "block";
		}
		else {
			item.querySelector('#item_more').style.display = "none";
		}

		main_content.appendChild(item);
		return item;
	};

	const make_Slider = function() {
		const new_slider = document.createElement('div');
		new_slider.setAttribute('class', 'horizontal_slider');
		return new_slider;
	};

	const add_item = function(slider, imageSource, song, singer) {
		// get slider item template
		const template_slider_item = document.querySelector('#t_slider_item');
		const item = document.importNode(template_slider_item.content, true);

		if (!!imageSource) {
			item.querySelector('.slider_item_image').setAttribute('src', imageSource);
		}
		if (song !== undefined) {
			item.querySelector('.slider_item_song').textContent = song;
		}
		if (singer !== undefined) {
			item.querySelector('.slider_item_singer').textContent = singer;
		}
//		if (!!slider.qeurySelector('.slider_item') === false) {
//			item.style.marginLeft = 30;
//		}

		slider.appendChild(item);
	};

	const make_list_slider = function() {
		const list_slider = document.createElement('div');
		list_slider.setAttribute('class', 'horizaontal_list_slider');

		const slider_container = document.createElement('div');
		slider_container.setAttribute('class', 'list_slider_item_list');

		list_slider.appendChild(slider_container);

		// addItem Method
		list_slider.itemCount = 0;
		list_slider.addItem = function(imageSource, song, singer) {
			if (list_slider.itemCount % 4 === 0) {
				const list_container = document.createElement('div');
				list_container.setAttribute('class', 'list_slider_item');
				slider_container.appendChild(list_container);
			}

			const template_list_item = document.querySelector('#t_list_item');
			const item = document.importNode(template_list_item.content, true);

			if (!!imageSource)
			{
				item.querySelector('.list_item_image').setAttribute('src', imageSource);
			}
			if (!!song)
			{
				item.querySelector('.list_item_song').textContent = song;
			}
			if (!!singer)
			{
				item.querySelector('.list_item_singer').textContent = singer;
			}

			// click event set : modal open
			item.querySelector('#more_button').addEventListener("click", function(){
				const modal = document.querySelector('.modal_background');
				modal.style.display = "block";
				//document.querySelector('.content_area').style.overflow = "hidden";
				document.querySelector('body').style.overflow = "hidden";
				modal.addEventListener("click", function(){
					modal.style.display = "none";
					//document.querySelector('.content_area').style.overflow = "auto";
					document.querySelector('body').style.overflow = "auto";
				});
			});

			slider_container.lastChild.appendChild(item);
			list_slider.itemCount += 1;
		};

		return list_slider;
	};

	const API_ADDRESS = 'http://api.everdu.ga/project/ym_music/';

	// API 서버와 통신
	fetch(API_ADDRESS).then(res => res.text())
		.then(text => console.log(text));

	// 빠른 선곡
	const list_slider = make_list_slider();
	for (let i = 0; i < 14; i++) {
		list_slider.addItem("", "Re:wind", "이세계아이돌");
	}
	addContent(
		"",
		"이 노래로 뮤직 스테이션 시작하기",
		"빠른 선곡",
		list_slider
	);


	// 즐겨 듣는 음악
	let slider = make_Slider();
	addContent("", "", "즐겨 듣는 음악", slider);

	add_item(slider, "res/song/re_wind_album.jpeg", "RE : WIND", "이세계아이돌");
	for (let i = 0; i < 8; i++) {
    	add_item(slider);
    }

	// 밤에 어울리는 음악
	slider = make_Slider();
	add_item(slider, "", "노래", "가수");
	add_item(slider, "", "노래", "가수");
	add_item(slider, "", "노래", "가수");
	add_item(slider, "", "노래", "가수");
	add_item(slider, "", "노래", "가수");
	addContent("", "다시 듣기", "밤에 어울리는 음악", slider);

	// 아래 아티스트를 좋아한다면
	slider = make_Slider();
	add_item(slider, "", "song", "singer");

	addContent(
		"res/singer/Yorushika_Logo.jpg",
		"아래 아티스트를 좋아한다면",
		"Yorushika(ヨルシカ)",
		slider
	);

	addContent(
		"",
		"아래 아티스트를 좋아한다면",
		"삼월의 판타시아",
		slider
	);

	addContent(
		"",
		"아래 아티스트를 좋아한다면",
		"Mrs. GREEN APPLE",
		slider
	);

	// 아래 아티스트의 콘텐츠 더보기:
	slider = make_Slider();
	add_item(slider, "", "song", "kobasolo");
	add_item(slider, "", "song", "kobasolo");
	add_item(slider, "", "song", "kobasolo");
	add_item(slider, "", "song", "kobasolo");
	addContent("", "아래 아티스트의 콘텐츠 더보기:", "kobasolo", slider, true); // Yorushika
}
else
{
    let slider = document.querySelector('#slider_favorite_music');
    slider.innerHTML = 'No Data';
}
