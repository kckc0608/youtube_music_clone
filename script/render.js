import {Components} from './components.js';

const API_ADDRESS = 'http://everdu.ga/api/project/ym_clone/';
const FETCH_OPTION = {
	'withCredentials': true,
};

fetch(API_ADDRESS, FETCH_OPTION)
.then((res) => {
	if (res.ok)
		return res.json();
	})
.then((MainPageData) => {
	if (MainPageData.status === "success") {
		render(MainPageData);
	}
	else {
		alert("need login");	
	}
})
.catch((error) => {
	render_error(error);
});

const render = function(MainPageData) {

	const addItemToContentSection = function(item) {
		// get main_content element to put new item
		const main_content = document.querySelector('.content_area');
		main_content.appendChild(item);
	};

	// 빠른 선곡
	const list_slider = Components.createListSlider();
	const fastSelectList = MainPageData.fastStartList;
	
	for (let i = 0; i < fastSelectList.length; i++) {
		const item = fastSelectList[i];
		list_slider.addItem(item.imageDir, item.song, item.singer);
	}

	let item = Components.createMainItem("", "이 노래로 뮤직 스테이션 시작하기", "빠른 선곡", list_slider);
	addItemToContentSection(item);


	// 즐겨 듣는 음악
	const favoriteSlider = Components.createSlider();
	item = Components.createMainItem("", "", "즐겨 듣는 음악", favoriteSlider);
	addItemToContentSection(item);

	favoriteSlider.appendItem("res/song/re_wind_album.jpeg", "RE : WIND", "이세계아이돌");
	for (let i = 0; i < 8; i++) {
		favoriteSlider.appendItem();
	}

	// 밤에 어울리는 음악
	const nightRecommendSlider = Components.createSlider();
	nightRecommendSlider.appendItem("", "노래", "가수");
	nightRecommendSlider.appendItem("", "노래", "가수");
	nightRecommendSlider.appendItem("", "노래", "가수");
	nightRecommendSlider.appendItem("", "노래", "가수");
	nightRecommendSlider.appendItem("", "노래", "가수");
	nightRecommendSlider.appendItem("", "노래", "가수");
	
	item = Components.createMainItem("", "다시 듣기", "밤에 어울리는 음악", nightRecommendSlider);
	addItemToContentSection(item);

	// 아래 아티스트를 좋아한다면
	const slider = Components.createSlider();
	slider.appendItem("", "song", "singer");

	item = Components.createMainItem(
		"res/singer/Yorushika_Logo.jpg",
		"아래 아티스트를 좋아한다면",
		"Yorushika(ヨルシカ)",
		slider
	);
	addItemToContentSection(item);

	item = Components.createMainItem(
		"",
		"아래 아티스트를 좋아한다면",
		"삼월의 판타시아",
		slider
	);
	addItemToContentSection(item);

	item = Components.createMainItem(
		"",
		"아래 아티스트를 좋아한다면",
		"Mrs. GREEN APPLE",
		slider
	);
	addItemToContentSection(item);

	// 아래 아티스트의 콘텐츠 더보기:
	const moreAboutArtistSlider = Components.createSlider();
	moreAboutArtistSlider.appendItem("", "song", "kobasolo");
	moreAboutArtistSlider.appendItem("", "song", "kobasolo");
	moreAboutArtistSlider.appendItem("", "song", "kobasolo");
	moreAboutArtistSlider.appendItem("", "song", "kobasolo");
	moreAboutArtistSlider.appendItem("", "song", "kobasolo");

	item = Components.createMainItem(
		"", 
		"아래 아티스트의 콘텐츠 더보기:", 
		"kobasolo", 
		moreAboutArtistSlider, 
		true
	);

	addItemToContentSection(item);
};

const render_error = function(error) {
	const main_content = document.querySelector('.content_area');
	const divTag = document.createElement("div");
	const text = document.createTextNode(error);

	divTag.appendChild(text);

	main_content.appendChild(divTag);
};