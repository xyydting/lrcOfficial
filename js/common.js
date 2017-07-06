var commonlist = function() {
	//移动端下拉菜单显示（首页、产品介绍等）
	$(".m_nav_content").hide();
	$(".m_nav_icon").on("click", function() {
		$(".m_nav_content").slideToggle(300);
		//点击空白处隐藏。
		$(document).on('click', function(event) {
			var list = $(".m_nav_content").children('ul'); // 设置目标区域
			var m_nav_icon = $(".m_nav_icon");
			if (!list.is(event.target) && list.has(event.target).length === 0 && !m_nav_icon.is(event.target)) { // Mark 1
				$('.m_nav_content').slideUp(300); //淡出消失
			}
		});
	});
	//标头样式
	$('#list_content').on('mouseover', function() {
		$(".xd_pro_List").show().on('mouseleave', function() {
			$(this).hide();
		});
		$(this).siblings('li').on('mouseover', function() {
			$(".xd_pro_List").hide();
		});
	});
	//窗口改变重新加载
	//$(window).on("resize", function () {
	//    location.reload();
	//});

	//解决列表因浮动撑不起父盒子问题
	$('.pei_re').on('mouseover', function() {
		var reheight = $(this).parents('ul').height();
		var height = $(this).find('.pei_List').height();
		if (reheight > height) {
			height = reheight;
		}
		console.log(height);
		$(this).parents('ul').parents('.xd_pro_List_type').css('height', height);
		$(this).on('mouseout', function() {
			$(this).parents('ul').parents('.xd_pro_List_type').css('height', 'auto');
		})
	});

	//右侧分享鼠标移动事件
	$("#chat a").hover(function() {
		if ($(this).prop("className") == "youhui") {
			$(this).children("img.hides").show();
		} else {
			$(this).children("img.hides").show();
			$(this).children("img.shows").hide();
			$(this).children("img.hides").animate({
				marginRight: '0px'
			}, 'slow');
		}
	}, function() {
		if ($(this).prop("className") == "youhui") {
			$(this).children("img.hides").hide('slow');
		} else {
			$(this).children("img.hides").animate({
				marginRight: '-143px'
			}, 'slow', function() {
				$(this).hide();
				$(this).next("img.shows").show();
			});
		}
	});

};

//获取url中的某个参数
var getUrlParam = function(paramName) {
	var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
};

//tab定位
var tab_location = function(num, index, contentObjsArr) {
	$.each(contentObjsArr, function(contentnum, contentObjs) {
		contentObjs.hide();
		if (num == contentnum) {
			$(contentObjs[index]).show();
		}
	})
};

//设置其他页面跳转product的url
var setprobucturl = function(btnarr, btnLoadImg, url) {
	var urlJSON = '';
	$.each(btnarr, function(num, tabbtnObjs) {
		$.each(tabbtnObjs, function(index, item) {
			$(item).on('click', function() {
				urlJSON = url + '?&num=' + num + '&index=' + index;
			})
		})
	});
	$.each(btnLoadImg, function(imgboxIndex, item) {
		$(item).on('click', function() {
			urlJSON += '&imgboxIndex=' + imgboxIndex;
			console.log(urlJSON);
			window.location.href = urlJSON;
		});
	})

};

//点击tab加载相应的图片
var tabLoadImg = function(index) {
		var imgbox = $('.cang_service_content').children('.cang_service_conpea');
		$(imgbox[index]).find('img').each(function(i, item) {
			var srcstr = $(item).attr('data-src');
			$(item).attr('src', srcstr);
		})
	}
	//js实现锚链接定位效果
	/**
	 * 
	 * @param {Object} targetObj 目标对象
	 * @param {Object} clickObj 为对象时是点击的按钮，与targetObj一一对应，为object增加事件，其余为直接滑动
	 * @param {string}{number}clickObj	为string或者number时其对应targetObj中的第几个元素
	 * @param {number} changeTop 对scrollTop微调，小与三个参数为默认值
	 * 参数为一个时clickObj为默认值0 此时只对应targetObj第一个
	 * 参数为两个时changeTop为默认值105
	 */
var jumpTo = function(targetObj, clickObj, changeTop) {

	changeTop ? changeTop : 105;
	if (arguments.length > 1) {
		if (typeof clickObj == 'object') {
			$.each(clickObj, function(index, item) {
				$(item).on('click', function() {
					var scrolltop = $(targetObj[index]).offset().top - 105
					$('html body').animate({
						scrollTop: scrolltop
					}, {
						duration: 500,
						easing: 'swing'
					});
				})
			})
		} else {
			var scrolltop = $(targetObj[clickObj]).offset().top - 105;
			$('html body').animate({
				scrollTop: scrolltop
			}, {
				duration: 500,
				easing: 'swing'
			});
		}
	} else {
		var scrolltop = targetObj.offset().top - 105;
		$('html body').animate({
			scrollTop: scrolltop
		}, {
			duration: 500,
			easing: 'swing'
		})
	}

}