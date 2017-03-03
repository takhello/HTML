/*所有方法调用*/
main();
function main()
{
	/*DOM获取*/
	var ul1 = document.getElementById("tabul");
	var con1 = document.getElementById("con1");
	var mid_ul01 =document.getElementById("middle_content_nav01");
	var mid_con01 =document.getElementById("middle_content_con01");
	var mid_ul02 = $("#middle_content_nav02")[0];
	var mid_con02 = $("#middle_content_con02")[0];
	/*第三个选项卡轮播*/
	var mid_ul03 =document.getElementById("middle_content_nav04");
	var mid_con03 =document.getElementById("middle_content_con04");
	var mid_ul04 =document.getElementById("middle_contentnav05");
	var mid_con04 =document.getElementById("middle_contentcon05");
	/*需要的效果调用*/

	/*所有 原型 方法实现*/
	method();
	/*二维码显示隐藏*/
	erweima();
	/*随机一种颜色*/
	randomColor();
	/*轮播图传参*/
	tab({
		objul:ul1,
		objcon:con1
		// objeve:"click"
		// objact:
	});
	/*选项卡01*/
	showTab({
		objul:mid_ul01,
		objcon:mid_con01
	});
	/*选项卡02*/
	showTab({
		objul:mid_ul02,
		objcon:mid_con02,
		objeve:"click"
		// objact:
	});
	/*选项卡05*/
	showTab({
		objul:mid_ul04,
		objcon:mid_con04,
		objeve:"click"
		// objact:
	});
	/*星级评定 以及数据提交*/
	starlevel();
	/*随机的颜色块儿*/
	addClor_creatli();
	/*调用JQ代码及效果*/
	jqCode();
	/*第三个选项卡 轮播*/
	tab({
		objul:mid_ul03,
		objcon:mid_con03,
		// objeve:"click"
		
		// objact
	});
	/*选项卡的 鼠标经过效果*/
	tab_cut_effect();

}
/*方法调用结束*/
/*方法调用结束*/


/*方法定义*/
/*二维码的显示隐藏*/
function erweima()
{
 	var erweima = document.getElementById("erweima");
 	var qrcode = document.getElementById("qrcode");

  	erweima.onclick = function()
  	{
  		qrcode.toggleClass('none');
		/*console.log(qrcode.hasClass("qrcode"));*/
 	}
	// erweima.onmouseout = function()
 //  	{
 //  		qrcode.toggleClass('none');
	// 	/*console.log(qrcode.hasClass("qrcode"));*/
 // 	}
}

/*产生随机的颜色*/
function randomColor()
{
	var all=["0","1","2","3","4","5", "6","7","8","9","A","B","C","D","E", "F"];
	var arr =[];
	for(var i=0;i<6;i++)
	{
		var rodm = Math.floor(Math.random()*16);/*0~16*/
		arr.push(all[rodm]);
		str="#"+arr.join("");
	}
	return str;
}
/*jQ代码部分*/
function jqCode(){

/*导航栏鼠标经过 显示下拉菜单*/
$("#nav_ul01").children("li").on("mouseenter",function(event){
	$(this).children("span").stop(200).fadeIn(400);
});
$("#nav_ul01").children("li").on("mouseleave",function(event){
	$(this).children("span").stop(400).fadeOut(100);
});

/*鼠标经过 li的span*/
$("#nav_ul01").children("li").children("span").on("mouseenter","p",function(event){
	$(this).css({background:"#6A2C70",opacity:".8",color:"#FF2E63"});
});
$("#nav_ul01").children("li").children("span").on("mouseleave","p",function(event){
	$(this).css({background:"",opacity:"1",color:"#fff"});
});

/*jQ代码结束*/
}



/*轮播图*/
/*	
Element.prototype.tab = function() {
}*/
function tab(objtab)
{
	/*objtab.objul*/
	/*objtab.objcon*/
	if(objtab.objeve == undefined)
	{
		objtab.objeve ="mouseover";
	}
	if(objtab.objact== undefined)
	{
		objtab.objact="act";
	}
	var _ulchild = objtab.objul.childNodes;
	var _conchild = objtab.objcon.childNodes;
	var oudIndex=0;
	var timer = setInterval(autoplay,2500);
	/*鼠标移入*/
	objtab.objul.addHandler(objtab.objeve,function(e)
	{
		var e = e||window.event;
		var target = e.target||e.srcElement;
		if(target.tagName = "LI")
		{
			clearInterval(timer);
			outtimer = setTimeout(function(){
				/*showtab(oudIndex);*/
				/*注意 不要 赋值*/
				showfocus(oudIndex,target.index());
			},200);
		}
	});
	/*鼠标移出*/
	objtab.objul.addHandler("mouseout",function(e)
	{
		var e = e||window.event;
		var target = e.target||e.srcElement;
		if(target.tagName == "LI")
		{
			clearInterval(outtimer);
			timer = setInterval(autoplay,2500);
		}
	});
	function autoplay()
	{
		var newindex;
		if(oudIndex < _conchild.length-1)
		{
			newindex=oudIndex+1;
		}
		else
		{
			newindex=0;/*新的 下标 为0*/
		}
		/*showtab(oudIndex);*/
		showfocus(oudIndex,newindex);
	}
	function showtab(_now)
	{
		for(var i=0;i<_ulchild.length;i++)
		{
			if(i ==_now)
			{
				_ulchild[_now].addClass(objtab.objact);
				_conchild[_now].removeClass('trans')
			}
			else
			{
				_ulchild[i].removeClass(objtab.objact);
				_conchild[i].addClass('trans');
			}
		}
	}
	function showfocus(_old,_new)
	{
		if(_old!=_new)
		{
			oudIndex = _new;
			_conchild[_old].style.opacity="1";
			_conchild[_old].style.display="block";
			var told = setInterval(function(e)
			{
				var oldOc = _conchild[_old].style.opacity;
				if(oldOc<0.1)
				{
					clearInterval(told);
					_conchild[_old].style.opacity ="0";
					_conchild[_old].style.display ="none";
				}
				else
				{
					_conchild[_old].style.opacity = Number(_conchild[_old].style.opacity)/2;
				}
			},80);
			_conchild[_new].style.opacity="0";
			_conchild[_new].style.display="block";	
			var newtimer= setInterval(function(e)
			{
				var newOc = _conchild[_new].style.opacity;
				if(newOc>0.9)
				{
					clearInterval(newtimer);
					_conchild[_new].style.opacity="1";
				}
				else
				{
					_conchild[_new].style.opacity= (1+Number(_conchild[_new].style.opacity))/2;
				}
			},80);	
			_ulchild[_new].addClass("act");
			_ulchild[_old].removeClass("act");
		}
	}
}

/*轮播图结束*/

/*选项卡 开始*/
function showTab(objtab){
	/*objtab.objul*/
	/*objtab.objcon*/
	if(objtab.objeve == undefined)
	{
		objtab.objeve ="mouseover";
	}
	if(objtab.objact== undefined)
	{
		objtab.objact="act";
	}
	/*待补充*/
	if(objtab.objeffect)
	{

	}
	var _ulchild = objtab.objul.childNodes;
	var _conchild = objtab.objcon.childNodes;
	objtab.objul.addHandler(objtab.objeve,_handFunction);
	function _handFunction(e){
		var e = e||window.event;
		var target = e.target||srcElement;
		var now = target.index();
		_tab(now);
	}
	function _tab(_now)
	{
		for(var i=0; i<_ulchild.length; i++)
		{
			if(i == _now)
			{
				_ulchild[_now].addClass("act");
				// _conchild[_now].addClass();
				$(_conchild[_now]).fadeIn(200);
			}
			else
			{
				_ulchild[i].removeClass("act");
				// _conchild[i].addClass('none');
				$(_conchild[i]).fadeOut(100);

			}
		}
	}
}
/*选项卡 结束*/
/*评定星级*/
function starlevel(){
	var mak=$("#starlevel").children("span").hasClass("act");
	

	$("#starlevel").on("click","span",_starFunction);
	function _starFunction()
	{
		var _this =$(this);
		_this.parent().children().removeClass('act');
		var index=$(this).index();
		for(var i=0; i<index+1; i++)
		{
			_this.parent().children()[i].addClass("act");
		}
		var str =index+1;/*星级0要加1*/
		$("#subhidden").val(str);
	}
	$("#starlevel_form").on("submit",_submitFunc)
	function _submitFunc(event)
	{
		var a =$("#subhidden").val();
		if(a == "")
		{
			console.log("您未评价");
			return false;
		}
		else
		{
			var str =parseInt(a);
			alert("已提交您的"+str+"星评价");
		}
		
	}
}
/*随机填充颜色*/
function addClor_creatli(){
	// var newli = document.createElement("li");
	// var conul =$("#middle_content06").children("ul")[0];
	var arr=["星系晕","重力奇异点","本星系泡","星风","星系冕","聚星","原行星云","平行宇宙","星际云","变星","恒星","银河外","欧特云"]
	var a =$("#middle_content06").children("ul").html();
	var str=a;
	for(var i=0;i<arr.length;i++)
	{
		str =str + "<li>" + arr[i] + "</li>";
	}
	$("#middle_content06").children("ul").html(str);
	var  newstr = $("#middle_content06").children("ul").children();
	for(var i=0; i<newstr.length; i++){
		/*设置随即颜色*/
		$("#middle_content06").children("ul").children("li")[i].style.background = randomColor();
	}
}
/*选项卡 内容鼠标经过效果*/
function tab_cut_effect(){
	// $("#middle_content01 ul:eq(1)").children("li").children("p").children("a").on("mouseenter",_func);
	$("#middle_content01 ul:eq(1)").on("mouseenter","li p a",_func)
	$("#middle_content01 ul:eq(1)").on("mouseleave","li p a",_func1)
	$("#middle_content02 ul:eq(1)").on("mouseenter","li p a",_fun2)
	$("#middle_content02 ul:eq(1)").on("mouseleave","li p a",_func3)
	function _func(event){
		$(this).css({color:"#3490DE"});
	}
	function _func1(event){
		$(this).css({color:"#fff"});
	}
	function _fun2(event){
		$(this).css({color:"#A6E3E9"});
	}
	function _func3(event){
		$(this).css({color:"#fff"});
	}
}
/*scrollTop up*/
up();
function up()
{
	var timer =setInterval(upto,30);
	function upto()
	{
		var top = document.body.scrollTop||document.documentElement.scrollTop;
		if(top>333)
		{
			$("#scrollto").css({display:"block"});

		}
		else
		{
			$("#scrollto").css({display:"none"});
		}
	}
	$("#scrollto")[0].onclick=function(){
		clearInterval(inter);
		var inter = setInterval(function(){
			var st = document.body.scrollTop || document.documentElement.scrollTop;
			st/=1.5;
			scrollTo(0,st);

			if(st<=1)
			{
				clearInterval(inter);
			}
		},30);
	};
}
	





/*JQ效果随机 未实现*/
random_jQresult()
function random_jQresult(){
	var arr=[".hide(300)",".dadeOut(300)",".slideUp()"];
}



/*js原型方法实现*/
function method()
{
/*
*清除 字符串前后空格
*参数: 无；
 */
	String.prototype.trim=function(){
		return this.replace(/(^\s+|\s+$)/ig,"");
	}
/*
*清除所有空白节点
*参数: 无;
*备注 只能清除 body 的同级 子节点中的空节点
 */
	Element.prototype.RemoveChild = function()
	{
		var oAll = this.childNodes;
		for(var i=0; i<oAll.length; i++)
		{	
			if(oAll[i].nodeType == 3 && !/\S/.test(oAll[i].nodeValue))
			{
				this.removeChild(oAll[i]);	
			}
		}
	}
	function CNN()
	{
		var oAll = document.getElementsByTagName("*");
		for(var i=0; i<oAll.length; i++)
		{
			oAll[i].RemoveChild();
		}
	}
	CNN();/*调用*/

/*判断样式*/
	Element.prototype.hasClass = function(_class)
	{
		if(this.hasAttribute("class"))
		{
			var reg = new RegExp(" " + _class + " ");
			var thisClass = " " + this.getAttribute("class") + " ";
			if(reg.test(thisClass))
			{
				return true;
			}
		}
		else{
			this.setAttribute("class","");
			return false;
		}
	}
/*添加样式*/
	Element.prototype.addClass = function(_class)
	{
		_class=_class.trim();
		if(this.hasAttribute("class"))
		{
			if(!this.hasClass(_class))
			{
				var setClass =this.getAttribute("class") + " " + _class;
				setClass =setClass.trim();
				this.setAttribute("class",setClass);
			}
			else
			{
				this.setAttribute("class",_class);
			}
		}
		else
		{
			this.setAttribute("class","");
			this.addClass(_class);
		}	
	}
/*删除样式*/
	Element.prototype.removeClass=function (_delclass){
		if(this.hasClass(_delclass)){
			var arr=this.getAttribute("class").split(" ");
			for(var i=0;i<arr.length;i++){
				if(arr[i]==_delclass){
					arr.splice(i,1);
					//出现一个问题，如果两个相同的class挨着写，就只能删除一个
					i--;//解决以上问题
				}
			}
			var newclass=arr.join(" ");
			this.setAttribute("class",newclass);
		}
	}
/*检测 添加删除样式*/
	Element.prototype.toggleClass = function(_class)
	{
		if(this.hasClass(_class))
		{
			this.removeClass(_class);
		}
		else
		{
			this.addClass(_class);
		}
	}
/*
*兼容所有浏览器 实现事件绑定 原型方法
 */
Element.prototype.addHandler = function(_type,_func)
{
	if(this.addEventListener)
	{
		this.addEventListener(_type,_func,false);
	}
	else
	{
		this.attachEvent("on" + _type,_func);//兼容IE8
	}
}
/*
*获取元素脚标
*例 console.log(ali0.index());
 */
Element.prototype.index = function()
{
	var list = this.parentNode.childNodes;
	for(var i=0; i<list.length; i++)
	{
		if(list[i] == this)
		{
			return i;
		}
	}
}

}
/*js原型方法结束*/


