$(document).ready(function() {
     // Owl Carousel
     $('.owl-carousel').owlCarousel({
      items:1,
      loop:true,
      dots: false,
      autoplay:true,
      autoplayTimeout:4000,
      autoplayHoverPause:true,
      autoHeight:true,
      nav:false,
      responsiveClass:true,
      responsive:{
        0:{
            items:1,
        },
        600:{
            items:1,
        },
        1000:{
            items:1
        }
      }
      
    });  

  });
