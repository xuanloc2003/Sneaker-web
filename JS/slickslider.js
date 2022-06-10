$(document).ready(function() {
    $('.slider').slick({
        infinite: true,
        // Số slide hiển thị
        slidesToShow: 4,
        // Số slide khi scroll
        slidesToScroll: 2,
        // Tự động dịch chuyển
        autoplay: true,
        dots: true,
        // Tự động dịch sau n giây
        autoplaySpeed: 2000,
        // Làm mất 2 cái prev và next
        // arrows: false,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]




    });
});