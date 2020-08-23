"use strict";

//= devs/nav-widget.js
//= vendor/jquery.magnific-popup.js

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
    asNavFor: ".js-nav-slider",
  });
  $(".js-nav-slider").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: ".js-main-slider",
    focusOnSelect: true,
    prevArrow: ".js-sliders-prev",
    nextArrow: ".js-sliders-next",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  const $doc = $("html");

  $(".js-toggle-nav").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("menu-opened");
  });

  $(".js-btn-search").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("search-opened");
    $(".js-search-input").focus();
  });

  $(".js-posters").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
  });

  $doc.on("click", ".js-player-btn", function () {
    $(this)
      .parents(".js-player")
      .find(".js-player-iframe")
      .attr("src", $(this).data("iframe-src"));
    $(this).parents(".js-player").find(".js-player-overlay").hide();
  });

  $(".js-table-search-btn").on("click", function (e) {
    e.preventDefault();
    $(this)
      .parents(".js-table-search")
      .toggleClass("isOpened")
      .find(".js-table-search-input")
      .focus();
  });
});
