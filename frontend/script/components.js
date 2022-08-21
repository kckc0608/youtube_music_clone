"use strict";
export const Components = {};
if ('content' in document.createElement('template')) {
	Components.createMainItem = function(imageSource, desc, title, content, isMore = false) {
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

		return item;
	}

	Components.createSlider = function() {
		const slider = document.createElement('div');
		slider.setAttribute('class', 'horizontal_slider');
		slider.appendItem = function(imageSource, song, singer) {
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

			slider.appendChild(item);
		};

		return slider;
	};

	Components.createListSlider = function() {
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
				document.querySelector('body').style.overflow = "hidden";
				modal.addEventListener("click", function(){
					modal.style.display = "none";
					document.querySelector('body').style.overflow = "auto";
				});
			});

			item.addEventListener("click", () => {
				location.href = "views/song.html";
			});

			slider_container.lastChild.appendChild(item);
			list_slider.itemCount += 1;
		};

		return list_slider;
	};
}
else
{
	const main_content = document.querySelector('.content_area');
    main_content.innerHTML = "Can't get template";
}