/* eslint-disable */

/*
* Template features
*/
loadMediaBox = function () {
  (function($){
    $('#oc-clients-full').owlCarousel({
      rtl: false,
      margin: 30,
      loop: false,
      nav: false,
      autoplay: false,
      dots: false,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 3 },
        600: { items: 4 },
        1000: { items: 5 },
        1200: { items: 6 },
        1400: { items: 7 }
      }
    })
  })(jQuery);
}
