///////////////////////////////////////////////////VENDORS
'use strict';
/*
 = devs/map.js
= vendor/sprite-svg.js
= vendor/fotorama.js
= vendor/jquery.magnific-popup.js
= vendor/jquery.maskedinput.min.js
= vendor/jquery.pickmeup.min.js
= vendor/jquery.smoothscroll.js
= vendor/jquery.sticky.js
= vendor/slick.min.js
= vendor/parallax.min.js
= vendor/wow.min.js
*/

jQuery(document).ready(function($) {

  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  var ieVersion = detectIE();
  // console.log(ieVersion);

  //////////////////////////////////////////////////// Mediaquery
  // window.matchMedia("(max-width: 400px)").matches


  console.log("ready!");


  //get max height
  function getMax(elems) {
    var max = elems.eq(0).outerHeight();
    elems.each(function () {
      max = ( $(this).outerHeight() > max ) ? $(this).outerHeight() : max;
    });
    return max;
  }

  
  //globals
  let $window = $(window),
    $doc = $('html'),
    $body = $('body');

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
    if (!elem.is(e.target) // click outer element
      &&
      elem.has(e.target).length === 0) { // and not his children
      elem.addClass(closeClass); // hide him
    }
  }


  //scroll to anchor
  let btnAnchor = $('.btnAnchor');
  $doc.on('click', '.btnAnchor', scrollToAnchor);

  function scrollToAnchor(e) {
    e.preventDefault();
    let id = $(this).data('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top
    }, 500);
  };

  //nav

  //debounce
  //   let scrollTimeout;
  //   window.addEventListener('scroll', function(evt){
  //     clearTimeout(scrollTimeout);
  //     scrollTimeout = setTimeout(function(){
  //
  //     }, 100);
  //  });

  //sticky nav
  // $(window).scroll(function() {
  //
  //
  //     let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  //     let nav = $('.nav');
  //     if (nav.length != 0) {
  //       if (scrolled >= 250) {
  //           nav.addClass('fixed');
  //       }
  //       if (scrolled >= 350) {
  //           nav.addClass('shown');
  //       }
  //       if (scrolled <= 300) {
  //           nav.removeClass('shown');
  //           nav.removeClass('fixed');
  //       }
  //     }
  // });

  let btnToggleNav = $('.toggle-nav');

  btnToggleNav.on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('opened');
    $($(this).data('href')).toggleClass('closed');
  });

  //modals
  let modalLink = $('.modal-link');

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


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////MASKEDINPUT jQuery

  // $.mask.definitions['~']='[+-]';
  //  $('#date').mask('99/99/9999',{
  //  	placeholder:"mm/dd/yyyy"
  //  });
  //  $('#phone').mask('(999) 999-9999');
  //  $('#phoneext').mask("(999) 999-9999? x99999");
  //  $("#tin").mask("99-9999999");
  //  $("#ssn").mask("999-99-9999");
  //  $("#product").mask("a*-999-a999",{
  //  	placeholder:" ",
  //  	completed:function(){
  //  		alert("You typed the following: "+this.val());
  //  	}
  //  });
  //  $("#eyescript").mask("~9.99 ~9.99 999");






  //= devs/nav-widget.js
});

/////////////////////vendors
/*
 * = devs/scroll-top.js
 * = devs/vanilla-scroll-top.js
 * */


////////////////////////////////////////////////////////////////////////////////////////replace span and gaps in href
// function replaceSpan(elem){
//   for (let i = 0; i < elem.length; i++) {
//     let href = elem[i].getAttribute('href').replace(/\s+/g, '').replace('<span>', '').replace('</span>', '');
//     elem[i].setAttribute('href', href)
//   }
// }
// replaceSpan(document.querySelectorAll('.rep'));
