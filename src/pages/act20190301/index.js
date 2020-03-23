class page {
    constructor() {
        this.Mswiper=null;
        this.Fswiper=null;
        this.Init()
    }
    PageInit() {
        var self =this
        window.saveUrl = $(".main .swiper-slide").eq(0).find("img").attr("src");
        $(".f-swiper-icons .swiper-slide").eq(0).addClass("cur");
        $(".m-s-prev").hide();
        $(".f-swiper-icons .swiper-slide").on("click",  function() {
            window.saveUrl = $(".main .swiper-slide").eq($(this).index()).find("img").attr("src")
            self.Mswiper.slideTo($(this).index(), 500, false);
            $(this).addClass("cur").siblings().removeClass("cur");
            self.Fswiper.slideTo($(this).index() - 1, 500, false);
        })
    }
    SwiperInit() {
        var self =this;
        this.Fswiper = new Swiper('.f-swiper-init', {
            slidesPerView: 3,
            spaceBetween: 10,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        this.Mswiper = new Swiper('.m-swiper', {
            navigation: {
                nextEl: '.m-s-next',
                prevEl: '.m-s-prev',
            },
            on: {
                slideChangeTransitionStart: function () {
                    self.Fswiper.slideTo(this.activeIndex - 1, 500, false);
                    $(".f-swiper-icons .swiper-slide").eq(this.activeIndex).addClass("cur").siblings().removeClass("cur");
                    window.saveUrl = $(".main .swiper-slide").eq(this.activeIndex).find("img").attr("src");
                    console.log(saveUrl)

                },
                slideChange: function () {
                    if (this.activeIndex == 0) {
                        $(".m-s-prev").hide()
                    } else {
                        $(".m-s-prev").show()
                    }
                    if (this.activeIndex == this.slides.length - 1) {
                        $(".m-s-next").hide()
                    } else {
                        $(".m-s-next").show()
                    }
                }
            }
        });
    }
    Init(){
        this.SwiperInit();
        this.PageInit()
    }
}
export default page