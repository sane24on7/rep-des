
// Открытие/закрытие модалки на нативном js
/*
document.addEventListener("DOMContentLoaded", function(event) {
	const modal = document.querySelector('.modal');
	const modalBtn = document.querySelectorAll('[data-toggle=modal]');
	const closeBtn = document.querySelector('.modal__close');
	const switchModal = () => {
		modal.classList.toggle('modal--visible');
	}

	modalBtn.forEach(element => {
		element.addEventListener('click', switchModal);
	});

	closeBtn.addEventListener('click', switchModal);

});
*/

// Открытие/закрытие модалки на jquery
$(document).ready(function () {
	var modal = $('.modal'),
			mdialog = $('.modal__dialog')
			modalBtn = $('[data-toggle="modal"]'),
			closeBtn = $('.modal__close'),
			btnScrollUp = $('.button__scroll-up'),
			btnScrollDown = $('.hero__scroll-down'),
			btnScrollUpLogo = $('.logo'),
			linkMain = $('.link__main'),
			linkFinProjects = $('.link__fin-projects'),
			linkTeam = $('.link__team'),
			linkContacts = $('.link__contacts');

	// Клик по кнопке вызывает модальное окно
	modalBtn.on('click', function () {
		modal.toggleClass('modal--visible');
	});

	// Клик по крестику закрывает модалку
	closeBtn.on('click', function () {
		modal.toggleClass('modal--visible');
	});

	// Модалка закрывается по Esc
	$(document).keydown(function (e) {
		if (e.which == 27) {
			modal.removeClass('modal--visible');
		}
	});

	// Модалка закрывается по клику по пустой области
	$(document).on('click', function (e) {
		if ($(e.target).hasClass('modal')) {
			modal.removeClass('modal--visible');
		}
	});

	// Кнопка Scroll-up появляется и исчезает при прокручивании
	$(document).scroll(function() {
		if($(this).scrollTop() > 500) {
			btnScrollUp.fadeIn();
		} else {
			btnScrollUp.fadeOut();
		};
	})

	// Анимация прокрутки вверх при нажатии на Scroll-up
	btnScrollUp.on('click', function() {
		$('body, html').animate({
			scrollTop: 0
			}, 1000);
			return false;
	});


	// Анимация прокрутки вниз при нажатии на кнопку листать вниз
	btnScrollDown.on('click', function(){
    $('body, html').animate({
      scrollTop: 900
    }, 1000);
    return false; 
	});

	// Анимация прокрутки до главной
	linkMain.on('click', function(){
		$('body, html').animate({
		  scrollTop: 0
		}, 1000);
		return false; 
		});
	
	// Анимация прокрутки до проектов
	linkFinProjects.on('click', function(){
		$('body, html').animate({
		  scrollTop: 900
		}, 1000);
		return false; 
		});

	// Анимация прокрутки до команды
	linkTeam.on('click', function(){
		$('body, html').animate({
		  scrollTop: 4800
		}, 1000);
		return false; 
		});

	// Анимация прокрутки до контактов
	linkContacts.on('click', function(){
		$('body, html').animate({
		  scrollTop: 5900
		}, 1000);
		return false; 
		});
	

	
	// Настройка свайпера в блоке Завершенные проекты
	var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				// when window width is >= 480px
				480: {
					slidesPerView: 1,
					spaceBetween: 30
				},
				// when window width is >= 640px
				640: {
					slidesPerView: 1,
					spaceBetween: 40
				}
			}
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	
	

	var next = $('.swiper-button-next');
	var prev = $('.swiper-button-prev');
	var bullets = $('.swiper-pagination');

	next.css('left', prev.width() + 20 + bullets.width() + 20)
	bullets.css('left', prev.width() + 20)
	// Элемент меню 


	new WOW().init();


	// jQuery.validator.setDefaults({
	// 	debug: true,
	// 	success: "valid"
	// });

	// Валидация формы модалки
	$('.modal__form').validate({
		rules: {
			userName: {
				required: true,
				rangelength: [2, 15]
			},
			userPhone: "required",
			userEmail: {
				required: true,
				email: true
			},
			modalPolicy: "required"
			
		},
		messages: {
			userName: {
				required: "Заполните поле",
				rangelength: "Имя должно иметь от 2 до 15 символов"
			},
			userPhone: "Заполните поле",
			userEmail: {
				required: "Заполните поле",
				email: "Введите корректный email"
			},
			modalPolicy: "Согласие обязательно"
		},
		errorClass: "invalid",
		errorElement: "div",
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: "send.php",
				data: $(form).serialize(),
				success: function (response) {
					console.log('Ajax сработал. Ответ сервера: ' + response);
					alert('Форма отправлена, мы свяжемся с вами через 10 минут');
					$(form)[0].reset();
					modal.removeClass('modal--visible');
				}
			});
		}
	});
	// Валидация формы control
	$('.control__form').validate({
		rules: {
			userName: {
				required: true,
				rangelength: [2, 15]
			},
			userPhone: "required",
			controlPolicy: "required"

		},
		messages: {
			userName: {
				required: "Заполните поле",
				rangelength: "Имя должно иметь от 2 до 15 символов"
			},
			userPhone: "Заполните поле",
			controlPolicy: "Согласие обязательно"
		},
		errorClass: "invalid",
		errorElement: "div",
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: "send.php",
				data: $(form).serialize(),
				success: function (response) {
					console.log('Ajax сработал. Ответ сервера: ' + response);
					alert('Форма отправлена, мы свяжемся с вами через 10 минут');
					$(form)[0].reset();
					modal.removeClass('modal--visible');
				}
			});
		}
	});
	// Валидация формы footer
	$('.footer__form').validate({
		rules: {
			userName: {
				required: true,
				rangelength: [2, 15]
			},
			userPhone: "required",
			footerPolicy: "required"

		},
		messages: {
			userName: {
				required: "Заполните поле",
				rangelength: "Имя должно иметь от 2 до 15 символов"
			},
			userPhone: "Заполните поле",
			footerPolicy: "Согласие обязательно"
		},
		errorClass: "invalid",
		errorElement: "div",
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: "send.php",
				data: $(form).serialize(),
				success: function (response) {
					console.log('Ajax сработал. Ответ сервера: ' + response);
					alert('Форма отправлена, мы свяжемся с вами через 10 минут');
					$(form)[0].reset();
					modal.removeClass('modal--visible');
				}
			});
		}
	});

	// маска для телефона
	$('[type=tel]').mask('+7(000) 000-00-00');

	// яндекс карты


	// Функция ymaps.ready() будет вызвана, когда
	// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
	ymaps.ready(function () {
		var myMap = new ymaps.Map('mapPC', {
			center: [47.244729, 39.723187],
			zoom: 19
			}, {	
				searchControlProvider: 'yandex#search'
				}),

				// Создаём макет содержимого.
				MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				),

				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
					hintContent: 'Студия Repair Design Project',
					balloonContent: 'Главный вход'
				}, {
						// Опции.
						// Необходимо указать данный тип макета.
						iconLayout: 'default#image',
						// Своё изображение иконки метки.
						iconImageHref: 'img/gps.png',
						// Размеры метки.
						iconImageSize: [42, 42],
						// Смещение левого верхнего угла иконки относительно
						// её "ножки" (точки привязки).
						iconImageOffset: [-5, -38]
				});
		myMap.behaviors.disable('scrollZoom');
		myMap.geoObjects.add(myPlacemark)
	});

	ymaps.ready(function () {
		var myMap = new ymaps.Map('mapMobile', {
			center: [47.244729, 39.723187],
			zoom: 19
			}, {
						
				searchControlProvider: 'yandex#search'
				}),

				// Создаём макет содержимого.
				MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				),

				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
					hintContent: 'Студия Repair Design Project',
					balloonContent: 'Главный вход'
				}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: 'img/gps.png',
					// Размеры метки.
					iconImageSize: [42, 42],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-5, -38]
				});
		myMap.behaviors.disable('scrollZoom');
		myMap.geoObjects
				.add(myPlacemark)
	});
	var player;
	$('.video__play').on('click', function onYouTubeIframeAPIReady(){
		player = new YT.Player('player', {
			height: '465',
			width: '100%',
			videoId: 'WXjoGnJUbz4',
			events: {
				'onReady': videoPlay
			}
		});
	});
	function videoPlay(event) {
		event.target.playVideo();
	}
});

