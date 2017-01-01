
/*
*#id .className  标签选择器
* selector=选择器
*/

// function $(selector)
// {
// 	var c=selector.substring(0,1);
// 	if(c == '#')
// 	{
// 		return document.getElementById(selector.substring(1,selector.length));
// 	}
// }

/*
*类选择器
*语法 $(".class")
*
*/
// function $(selector)
// {
// 	//判断浏览器是否支持getElementsByClassName
// 	var className = selector.substring(1);
// 	if(document.getElementsByClassName)
// 	{
// 		return document.getElementsByClassName(className);
// 	}
// 	else
// 	{
// 		//document.getElementsByTagName('*') +正则
// 		var reg =new RegExp("\\s|^"+className+"\\s|$");
// 		var elems = document.getElementsByTagName("*");
// 		var arr=[];//保存获取到的 指定className 的元素
// 		for(var i=0; i<elems.length;i++)
// 		{
// 			if(reg.test(elems[i].className))
// 			{
// 				arr.push(elems[i]);
// 			}
// 			return arr;
// 		}
// 	} 

// }

/*
*标签选择器
*语法: $("element")
*/
// function $(element)
// {
// 	return document.getElementsByTagName(element);
// }

var $=function(selector)
{
	this.tqObject = new TQObject();
	if(selector.substring(0,1) == "#")
	{
		var elem = document.getElementById(selector.substring(1));
		this.tqObject.data.push(elem);
	}
	else if(selector.substring(0,1) == ".")
	{//类选择器 的操作
		var elems = document.getElementsByTagName('*');
		var reg = new RegExp("(^|\\s)"+selector.substring(1)+"($|\\s)");
		for(var i=0;i<elems.length;i++)
		{
			if(reg.test(elems[i].className))
			{
				this.tqObject.data.push(elems[i]);
			}
		}
	}
	else
	{
		var elems=document.getElementsByTagName(selector);
		this.tqObject.data=elems;
	}
	return tqObject;
}
var TQObject = function()
{
	this.data=[];
}
