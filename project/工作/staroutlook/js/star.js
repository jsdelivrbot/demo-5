;
$(function() {
var homehotSwiper = new Swiper('#home-hot-swiper', {
				loop: false,
				onTransitionStart: function() {
					$('#home-hot-nav li').eq(homehotSwiper.activeIndex)
						.addClass('active').siblings().removeClass('active');
				}
			});
			var myScroll = new IScroll("#index-scroll", {
				click: true,
				tap: true
			});
			var myScroll1 = new IScroll("#index-scroll1", {
				click: true,
				tap: true
			});
			var myScroll2 = new IScroll("#index-scroll2", {
				click: true,
				tap: true
			});
			var myScroll3 = new IScroll("#index-scroll3", {
				click: true,
				tap: true
			});
			$('#home-hot-nav li').click(function() {
				var num = $(this).index();
				console.log(num);
				homehotSwiper.slideTo(num);
				$('#home-hot-nav li').eq(num).addClass('active').siblings().removeClass('active');
			})
});