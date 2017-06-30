window.onload = function() {
	//调用公共代码
	commonlist();
	//轮播图
	$('#myCarousel').carousel({
		//设置自动播放秒
		interval: 100000000000000,
	});
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
			maps(initiaLng, initiaLat);
		})
		//信息初始化
	addcontent('chaoyang');
	maps(116.447156, 39.979679);
	if(getUrlParam('lsfd')){
		jumpTo($('.cang_dian'));
	}
	//点击定位到地图
	jumpTo($('.cang_dian'),$('.jumppc_self_lsfd'));
	jumpTo($('.cang_dian'),$('.jumpmobile_self_lsfd'));
	
};

function addcontent(cityShow) {
	for (var key in stores) {
		if (key == cityShow) {
			cityHtml = '';
			$.each(stores[key], function(index, item) {
				cityHtml += '<div class="result-item" onclick = maps(' + item.storeCoordinateLng + ',' + item.storeCoordinateLat + ')>';
				cityHtml += '<div class="txt-wrap">';
				cityHtml += '<h3>' + item.storeName + '</h3>';
				cityHtml += '<div class="txt-desc">';
				cityHtml += '<p class="address">' + item.storeAddress + '</p>';
				cityHtml += '<p class="bus-stop">' + item.storeBusstop + '</p>';
				cityHtml += '<p class="metro-station">' + item.storeMetro + '</p>';
				cityHtml += '</div></div></div>';
			})
			$('#r-result-beijing').html(cityHtml);
		}
	}
}

function maps(lng, lat, mess) {
	mess ? mess = mess : mess = '';
	var map = new BMap.Map("dituContent"); // 创建Map实例
	var point = new BMap.Point(lng, lat); // 创建点坐标  
	map.centerAndZoom(point, 15); // 初始化地图,用城市名设置地图中心点
	map.enableScrollWheelZoom(true);
	var marker = new BMap.Marker(point); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	var label = new BMap.Label(mess, {
		offset: new BMap.Size(-100, -50)
	});
	marker.setLabel(label);

	label.setStyle({
		color: "#ca1b2d",
		fontSize: "16px",
		backgroundColor: "1",
		border: "0",
		fontWeight: "bold"
	});
}