window.onload = function() {
	//调用公共代码
	commonlist();
	//js实现锚链接定位效果
	var jumpBtnpc = $(".example_pc").children('li');//pc 按钮
	var jumpBtnmobil = $(".example_m").children('li');//mobil 按钮
	var targetObj = $(".example");
	jumpTo(targetObj,jumpBtnpc);
	jumpTo(targetObj,jumpBtnmobil);
	jumpTo(targetObj,getUrlParam("ccsl"));
};