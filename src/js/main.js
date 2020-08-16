///////////////////////////////////////////////////VENDORS
"use strict";
/*
 = devs/map.js
= vendor/sprite-svg.js
= vendor/fotorama.js
= vendor/jquery.magnific-popup.js
= vendor/jquery.maskedinput.min.js
= vendor/jquery.pickmeup.min.js
= vendor/jquery.smoothscroll.js
= vendor/jquery.sticky.js
= vendor/parallax.min.js

*/

jQuery(document).ready(function ($) {
  // Sliders
  $(".js-main-slick").on("afterChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $(".js-main-slider-current-slide").text(currentSlide + 1);
    $(".js-main-slider-all-slides").text(slick.slideCount);
  });
  $(".js-main-slick").on("init", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $(".js-main-slider-current-slide").text(1);
    $(".js-main-slider-all-slides").text(slick.slideCount);
  });

  $(".js-main-slick").slick({
    prevArrow: ".js-main-slider-prev",
    nextArrow: ".js-main-slider-next",
    fade: true,
    autoplay: true,
  });
  
  $(".js-main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-nav-slider'
  });
  
  $(".js-nav-slider").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.js-main-slider',
    focusOnSelect: true,
    prevArrow: ".js-sliders-prev",
    nextArrow: ".js-sliders-next",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  });
  // xs: 576,
  // sm: 768,
  // md: 992,
  // lg: 1200,
  // Sliders

  //globals
  let $window = $(window),
    $doc = $("html"),
    $body = $("body");

  // //get scroll width
  //
  // function scrollWidth(){
  //     let div = $('<div>').css({
  //         position: "absolute",
  //         top: "0px",
  //         left: "0px",
  //         width: "100px",
  //         height: "100px",
  //         visibility: "hidden",
  //         overflow: "scroll"
  //     });
  //     $('body').eq(0).append(div);
  //     let width = div.get(0).offsetWidth - div.get(0).clientWidth;
  //     div.remove();
  //     return width;
  // }
  //
  // let scrollWidth = scrollWidth();

  // close by outer click

  // $doc.mouseup(function (e) {
  //   closeOut(e, elem, closeClass);
  // });

  function closeOut(e, elem, closeClass) {
    // e - event
    // elem - jquery element
    // closeClass - class tat hide element

    if (elem.hasClass(closeClass)) {
      return;
    }
    if (
      !elem.is(e.target) && // click outer element
      elem.has(e.target).length === 0
    ) {
      // and not his children
      elem.addClass(closeClass); // hide him
    }
  }

  //scroll to anchor
  $doc.on("click", ".btnAnchor", scrollToAnchor);

  function scrollToAnchor(e) {
    e.preventDefault();
    let id = $(this).data("href"),
      top = $(id).offset().top;

    $("body,html").animate(
      {
        scrollTop: top,
      },
      500
    );
  }

  let btnToggleNav = $(".toggle-nav");

  btnToggleNav.on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("opened");
    $($(this).data("href")).toggleClass("closed");
  });

  //modals
  let modalLink = $(".modal-link");

  //   modalLink.magnificPopup({
  //     type: 'inline',
  //     preloader: false,
  //     closeBtnInside: true,
  //     removalDelay: 200,
  //     mainClass: 'fade-zoom',
  //     callbacks: {
  //       beforeOpen: function() {
  //
  //       },
  //       afterClose: function() {
  //
  //       }
  //     }
  // });
});

//= devs/nav-widget.js
