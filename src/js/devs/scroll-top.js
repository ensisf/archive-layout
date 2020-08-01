$body.append(
  ` <style>
      .scrollTop{
        display:none; 
        z-index:9999; 
        position:fixed; 
        bottom:8px; 
        padding:5px 10px; 
        right:8px; 
        border-radius:.2em;
        background:rgba(0,0,0,0.4); color:#fff;
      }
      .scrollTop:hover{ 
        background:rgba(41, 58, 114,0.8); 
        color:#fff; 
        text-decoration:none; 
      }
      .scrollTop:before{ 
        content:"↑";
      }
    </style>`
);

let speed      = 500,
    $scrollTop = $('<a href="#" class="scrollTop"></a>').appendTo('body');

$scrollTop.click(function (e) {
  e.preventDefault();
  $('html:not(:animated),body:not(:animated)').animate({
    scrollTop: 0
  }, speed);
});
function show_scrollTop() {
  ($(window).scrollTop() > 100) ? $scrollTop.fadeIn(600) : $scrollTop.fadeOut(600);
}
$(window).on('scroll', show_scrollTop);
show_scrollTop();
