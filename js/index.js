window.onload = function() {
	//调用公共代码
	commonlist();
	//轮播图
	$('#myCarousel').carousel({
		//设置自动播放秒
		interval: 100000000000000,
	});
	//轮播图懒加载
	$('#carousel-example-generic').bind('slid.bs.carousel', function() {
		lazyContainer(this);
	});

	lazyContainer('#carousel-example-generic');
	//移动端手势
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;
	var isMove = false;
	$('.carousel-inner').on('touchstart', function(e) {
		startX = e.originalEvent.touches[0].clientX;
	});
	$('.carousel-inner').on('touchmove', function(e) {
		moveX = e.originalEvent.touches[0].clientX;
		distanceX = moveX - startX;
		isMove = true;
	});
	$('.carousel-inner').on('touchend', function(e) {
		if (Math.abs(distanceX) > 50 && isMove) {
			if (distanceX > 0) {
				$('.carousel').carousel('prev');
			} else {
				$('.carousel').carousel('next');
			}
		}
		startX = 0;
		moveX = 0;
		distanceX = 0;
		isMove = false;
	});

	//地图调用处理
	$("#r-district-beijing").children('li').on('click', function() {
			$(this).siblings('li').removeClass('cur').end().addClass('cur');
			var cityShow = $(this).attr('data-district-target');
			var initiaLng = $(this).attr("data-initiaLng");
			var initiaLat = $(this).attr("data-initiaLat");
			addcontent(cityShow);
			maps(stores, cityShow);
		})
		//信息初始化
	addcontent();
	maps(stores);
	if (getUrlParam('lsfd')) {
		jumpTo($('.cang_dian'));
	} else if (getUrlParam('ccfw')) {
		jumpTo($('.cang_introduce'));
	}
	//点击定位到地图
	jumpTo($('.cang_dian'), $('.jumppc_self_lsfd'));
	jumpTo($('.cang_dian'), $('.jumpmobile_self_lsfd'));
	jumpTo($('.cang_introduce'), $('.exanple_m_btn'));
	jumpTo($('.cang_introduce'), $('.example_pc_btn'));

	//仓型服务tab切换
	$(".cang_service_title").find("li").on("click", function() {
		$(this).addClass("cang_ser_titon").siblings("li").removeClass("cang_ser_titon");
		var index = $(this).index();
		$(".cang_service_content").find(".cang_service_conpea").eq(index).show().siblings().hide();
		var datasrcObj = $(".cang_service_content").find(".cang_service_conpea").eq(index).find('img');
		console.log(datasrcObj);
		$.each(datasrcObj, function(index, item) {
			console.log(item);
			var datasrc = $(item).attr('data-src');
			if (datasrc) {
				$(item).attr("src", datasrc);
			}
		})
	})

};
//轮播图懒加载
function lazyContainer(searchNode) {
	$(searchNode).find('.active').find('img.lazy').each(function() {
		var imgSrc = $(this).attr('data-src');
		if (imgSrc) {
			$(this).attr('src', imgSrc);
			$(this).attr('data-src', '');
		}
	});
}

function addcontent(cityShow) {
	cityHtml = '';
	for (var key in stores) {
		if (!cityShow) {
			$.each(stores[key], function(index, item) {
				cityHtml += '<div class="result-item" onclick = maps(' + item.storeCoordinateLng + ',' + item.storeCoordinateLat + ',1)>';
				cityHtml += '<div class="txt-wrap">';
				cityHtml += '<h3>' + item.storeName + '</h3>';
				cityHtml += '<div class="txt-desc">';
				cityHtml += '<p class="address">' + item.storeAddress + '</p>';
				cityHtml += '<p class="bus-stop">' + item.storeBusstop + '</p>';
				cityHtml += '<p class="metro-station">' + item.storeMetro + '</p>';
				cityHtml += '</div></div></div>';
			})
		} else if (key == cityShow) {
			$.each(stores[key], function(index, item) {
				cityHtml += '<div class="result-item" onclick = maps(' + item.storeCoordinateLng + ',' + item.storeCoordinateLat + ',1)>';
				cityHtml += '<div class="txt-wrap">';
				cityHtml += '<h3>' + item.storeName + '</h3>';
				cityHtml += '<div class="txt-desc">';
				cityHtml += '<p class="address">' + item.storeAddress + '</p>';
				cityHtml += '<p class="bus-stop">' + item.storeBusstop + '</p>';
				cityHtml += '<p class="metro-station">' + item.storeMetro + '</p>';
				cityHtml += '</div></div></div>';
			})
		}
	}

	$('#r-result-beijing').html(cityHtml);
}
/**
 * 当参数为三个时设置地图的一个标记
 * @param {number} param1 代表经度lng
 * @param {number} param2 代表维度lat
 * @param {string} param3 代表对应的标注mess
 * 当参数为两个时显示数据中对应key内的标记
 * @param {object} param1 json数据
 * @param {string} param2 对应key
 * storeCoordinateLng 提供lng
 * storeCoordinateLat 提供lat
 * mess暂未定义
 * 当参数为一个时显示数据中所有标记
 * @param {object} param1 json数据
 * storeCoordinateLng 提供lng
 * storeCoordinateLat 提供lat
 * mess暂未定义
 */
function maps(param1, param2, param3) {
	var map = new BMap.Map("dituContent"); // 创建Map实例
	if (arguments.length == 3) {
		var lng = param1;
		var lat = param2;
		var mess = param3;
		mess ? mess = mess : mess = '';
		var point = new BMap.Point(lng, lat); // 创建点坐标  
		map.centerAndZoom(point, 15); // 初始化地图,用城市名设置地图中心点
		map.enableScrollWheelZoom(true);
		var marker = new BMap.Marker(point); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
	} else {
		var stores = param1;
		var cityShow = param2;
		for (var key in stores) {
			if (!cityShow) {
				$.each(stores[key], function(index, item) {
					var point = new BMap.Point(item.storeCoordinateLng, item.storeCoordinateLat); // 创建点坐标  
					map.centerAndZoom('天安门', 11); // 初始化地图,用城市名设置地图中心点
					map.enableScrollWheelZoom(true);
					var marker = new BMap.Marker(point); // 创建标注
					map.addOverlay(marker); // 将标注添加到地图中
				})
			} else if (key == cityShow) {
				$.each(stores[key], function(index, item) {
					var point = new BMap.Point(item.storeCoordinateLng, item.storeCoordinateLat); // 创建点坐标  
					map.centerAndZoom('天安门', 11); // 初始化地图,用城市名设置地图中心点
					map.enableScrollWheelZoom(true);
					var marker = new BMap.Marker(point); // 创建标注
					map.addOverlay(marker); // 将标注添加到地图中
				})
			}
		}

	}
}