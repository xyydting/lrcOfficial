$(function() {
	// 百度地图API功能
	var map1 = new BMap.Map("map1"); // 创建Map实例
	map1.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点

	var map2 = new BMap.Map("map2"); // 创建Map实例
	map2.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点

	var map3 = new BMap.Map("map3"); // 创建Map实例
	map3.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点

	var map4 = new BMap.Map("map4"); // 创建Map实例
	map4.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点
	var array_map=[];
	
})

function map() {
	var map = new BMap.Map("map1"); // 创建Map实例
	var point = new BMap.Point(116.404, 39.915); // 创建点坐标  
	map1.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点
}