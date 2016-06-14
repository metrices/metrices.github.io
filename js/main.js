$(function () {
	'use strict';

	// page transitions
	$(".animsition").animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 2000,
		outDuration: 800,
		// linkElement           :   '.animsition-link',
		linkElement: 'a:not([target="_blank"]):not([href^=#]):not([class*="gallery-item"])',
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		unSupportCss: ['animation-duration',
			'-webkit-animation-duration',
			'-o-animation-duration'
		],
		overlay: false,
		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body'
	});

	// if element visible
	// ---------------------------------
	$.fn.isVisible = function () {
		var st = $(window).scrollTop(),
			wh = $(window).height(),
			tt = $(this).offset().top,
			th = $(this).height(),
			r;
		if (st + wh >= tt && tt + th >= st) {
			r = 1
		} else {
			r = 0
		}
		return r;
	};

	// smooth scroll
	// ---------------------------------
	$('.sscroll').on('click', function () {
		var ti = $(this).attr('href'),
			tt = $(ti).offset().top - 100;
		$('html, body').animate({
			scrollTop: tt
		}, 600);
		return false;
	});

	// scroll to top
	// ---------------------------------
	$(window).on('scroll', function () {
		var wh = $(window).height(),
			st = $(window).scrollTop();
		if (st >= wh * 0.7) {
			$('.to-top').fadeIn();
		} else {
			$('.to-top').fadeOut()
		}
	});
	$('.to-top').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	// parallax
	$.stellar({
		horizontalScrolling: false,
		responsive: true
	});

	// stellar fix - bg position on load
	if ($('[data-stellar-background-ratio]').length > 0) {
		setTimeout(function () {
			var st = $(window).scrollTop();
			$(window).scrollTop(st + 1);
			setTimeout(function () {
				$(window).scrollTop(st)
			}, 200)
		}, 200);
	};

	if ($('.hero-inner').length) {
		$(window).resize(function () {

			var hh = $('header').height();
			$('.hero-inner').css('top', hh);

			var hi = $('.hero-inner').height() / 2;
			$('.side-link').css('top', hh + hi);

		}).resize();
	}

	// MOBILE NAVIGATION
	$('.mob-nav').on('click', function () {
		$(this).find('i').toggleClass('fa-bars fa-minus');
		$('#topmenu').slideToggle();
		return false;
	});

	// side links
	$('.side-link').each(function () {
		var e = $(this);
		var h = Math.round(e.height());
		if ((h % 2) == 1) {
			e.css({
				height: '+=1'
			})
		}
	});

	// Hero slider
	// ---------------------------------
	if ($('.hero-slider').length) {
		$(window).resize(function () {
			$('.hero-slider .slide').height($('.hero-inner').height()).width($('.hero-inner').width());
		}).resize();

		$('.hero-slider').flexslider({
			animation: "slide",
			pauseOnAction: true,
			animationLoop: true,
			slideshow: true,
			slideshowSpeed: 4000,
			animationSpeed: 500,
			controlNav: true,
			directionNav: false
		});
	}

	// BLOG
	// ---------------------------------
	$(window).on('load', function () {
		$('.blog').imagesLoaded(function () {
			$('.blog').shuffle({
				"itemSelector": ".post"
			});
			// fix
			setTimeout(function () {
				$('.blog').shuffle('shuffle');
			}, 200);
		});
	});

	// PORTFOLIO
	// ---------------------------------
	$(window).on('load', function () {

		if ($('.portfolio.col-3').length) {
			$('.item').width(100 / 3 + '%');
			$('.item.wide, .item.wide-tall').width(100 * 2 / 3 + '%');
		}

		$('.portfolio').shuffle({
			"itemSelector": ".item",
			"delimeter": ','
		});

		// fix
		setTimeout(function () {
			$(window).resize();
		}, 200);

	});

	// spaces between items
	$('.portfolio[data-space]').each(function () {
		var space = $(this).data('space');
		$(this).find('.item-link').css({
			'margin': space
		});
		$('.portfolio').css({
			'margin-left': -space + 'px',
			'margin-right': -space + 'px'
		});
	});

	// FILTER
	$('.filter ul li').on('click', function () {
		var filter = $(this).data('group');
		$('.portfolio').shuffle('shuffle', filter);
		$('.filter ul li').removeClass('active');
		$(this).addClass('active');
	});

	$(window).on('load', function () {

		// skills
		// ---------------------------------
		$(window).on('scroll', function () {
			$('.skill').each(function () {
				if ($(this).isVisible() && !$(this).hasClass('animated')) {
					var p = $(this).find('.skill-bar').data('perc');
					$(this).find('.skill-bar').delay(200).animate({
						width: p + '%'
					});
					$(this).find('.skill-bar span').delay(2000).fadeIn('slow');
					$(this).addClass('animated');
				}
			});
		});

		// counters
		// ---------------------------------
		$(window).on('scroll', function () {
			$('.counter-num').each(function () {
				if ($(this).isVisible() && $(this).html() == '') {
					$(this).countTo({
						speed: 2500
					});
				}
			});
		});

		// fix
		// ---------------------------------
		setTimeout(function () {
			$(window).on('scroll');
		}, 300);

	});

	// tabs
	// ---------------------------------
	$('.tab-nav li').on('click', function () {

		if (!$(this).hasClass('active')) {
			var p = $(this).data('tabpanel');
			$(this).parents('.tabs').find('.tab-nav li').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-panels > div').fadeOut(0).removeClass('active');
			$(this).parents('.tabs').find(p).fadeIn().addClass('active');
		}

	});

	// toggles
	// ---------------------------------
	$('.toggle .toggle-title').on('click', function () {
		$(this).next('.toggle-content').slideToggle(200);
		$(this).parent('.toggle').toggleClass('active');
		return false;
	});

	// IMAGE POPUP
	// ---------------------------------
	// single
	$('.popup-image').magnificPopup({
		type: 'image',
		mainClass: 'mfp-fade',
		removalDelay: 300,
		closeOnContentClick: true,
		fixedContentPos: false,
		fixedBgPos: false
	});
	// gallery mode
	$('.gallery-item').magnificPopup({
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		fixedContentPos: false,
		type: 'image'
	});

	// GALLERY POPUP
	// ---------------------------------
	// for portfolio
	$('.popup-gallery').magnificPopup({
		delegate: '.filtered a',
		mainClass: 'mfp-fade',
		gallery: {
			enabled: true
		},
		fixedContentPos: false,
		type: 'image'
	});
	// single gallery
	$('.popup-single-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true
			},
			fixedContentPos: false,
			type: 'image'
		});
	});

})