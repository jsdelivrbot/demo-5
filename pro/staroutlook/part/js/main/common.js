var mask = function() {
	this.btn = ["取消", "确定"],
		this.init = function() {
			var container = $(".mask-container");
			var width = container.outerWidth();
			var height = container.outerHeight();
			container.css({
				"marginLeft": "-" + width / 2 + "px",
				"marginTop": "-" + height / 2 + "px"
			});
		},
		this.open = function(html) {
			$("body").append(html);
			$("html,body").css("overflow", "hidden");
			this.init();
		},
		this.close = function() {
			$(".mask").off().remove();
			$("html,body").css("overflow", "auto");
		}
};
mask.prototype.Alert = function(msg, time, callback) {
	var _this = this;
	var timer = null;
	var html = '<div class="mask"><div class="mask-bg"></div><div class="mask-container">' + msg + '</div></div>'
	_this.open(html);
	$(".mask").click(function(ev) {
		clearTimeout(timer);
		_this.close();
	});
	$(".mask-container").click(function(ev) {
		ev.stopPropagation()
	});
	if(time && time > 0) {
		timer = setTimeout(function() {
			_this.close();
			callback && callback();
			clearTimeout(timer);
		}, time * 1000);
	}
};
mask.prototype.Confirm = function(msg, btn, cancelcallback, confirmcallback) {
	var _this = this;
		if(btn instanceof Function) {
			cancelcallback = confirmcallback;
			confirmcallback = btn;
			btn = this.btn;
		}
		var html = '<div class="mask"><div class="mask-bg"></div>\
						<div class="mask-container">\
							<p>' + msg + '</p>\
							<div class="mask-btn-box">';
		if(btn.length == 1){
			html += '<button class="mask-btn mask-btn-cancel">' + btn[0] + '</button>';
		}else{
			html += '<button class="mask-btn mask-btn-cancel">' + btn[0] + '</button><button class="mask-btn mask-btn-confirm">' + btn[1] + '</button>';
		}
		html += '</div></div></div>';
		_this.open(html);

		$(".mask-bg").click(function(ev) {
			_this.close();
		});

		$(".mask-btn-cancel").click(function() {
			_this.close();
			cancelcallback && cancelcallback();
		});
		$(".mask-btn-confirm").click(function() {
			_this.close();
			confirmcallback && confirmcallback();
		});
};
var mask = new mask();