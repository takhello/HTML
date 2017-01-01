
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
	{	//类选择器 的操作
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
	else if(selector.indexOf("<")==0&&selector.lastIndexOf(">"==selector.length-1))
	{
		//判断是否为HTML标签
		//2.提取标签名称
		var elemName=selector.substring(1,selector.indexOf(">"));
		//3.document.createElement("div")
		var newElem = document.createElement(elemName);
		//"<div  >  两个尖括号  <   /div>"
		var content = selector.substring(selector.indexOf(">")+1,selector.lastIndexOf("<"));
		newElem.innerHTML = content;
		this.tqObject.data.push(newElem);
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
TQObject.prototype=
{
	size:function()
	{
		return this.data.length;
	},
	html:function(content)
	{
		if(content)
		{
			//为元素设置html 值(xx.innerHTML="")
			for(var i=0;i<this.data.length;i++)
			{
				this.data[i].innerHTML = content;
			}
			return this;// 返回自己 从而允许 连缀调用
		}
		else
		{
			if(this.data.length !=0)
			{
				return this.data[0].innerHTML;
			}
			return;
		}

	},
	val:function(value)
	{
		//为value属性设置值
		if(value)
		{
			for(var i=0;i<this.data.length; i++)
			{
				this.data[i].value = value;
				// this.data[i].setAttribute("value",value);
			}
			return this;
		}

		//获取value值
		else
		{
			if(this.data.length !=0)
			{
				return this.data[0].value;
				// return this.data[0].getAttribute("value");
			}
		}
	},
	attr:function(name, value)
	{	
		if(name && value)
		{
			for(var i=0; i<this.data.length; i++)
			{
				this.data[i].setAttribute(name,value);
			}
			return this;
		}else if(name)
		{
			if(this.data.length !=0)
			{
				return this.data[0].getAttribute(name);
			}
		}
	},
	addClass:function(className)/*追加 class*/
	{
		for(var i=0;i<this.data.length;i++)
		{
			var elem = this.data[i];
			if(elem.getAttribute("class"))
			{
				//则 已经有class 属性了
				var oldClassName = elem.getAttribute("class");
				var newClassName = oldClassName +" "+className;
				elem.setAttribute("class",newClassName);
			}
			else
			{
				//则没有 设置class属性
				elem.setAttribute("class",className);
			}
		}
	},
	removeClass:function(className)/*移除 class*/
	{
		if(className)
		{
			//删除 指定名称的 类的样式
			for(var i=0;i<this.data.length;i++)
			{
				//例: class = "a b1 c d"
				//传进来 要删除 b1
				//得到 class="a c d" 返回
				var arr=this.data[i].getAttribute("class").split(" ");
				var newClassName="";
				for(var j=0; j<arr.length; j++)
				{
					if(arr[j] == className)
					{
						continue;
					}
					newClassName+=arr[j] +" ";
				}
				newClassName=newClassName.substring(0,newClassName.length-1);
				this.data[i].setAttribute("class",newClassName);
			}
			return this;
		}
		else
		{
			//移除所有样式类
			for(var i=0; i<this.data.length; i++)
			{
			 this.data[i].setAttribute("class", "");
			}
			return this;
		}
	},
	append:function(tqObject)
	{
		//将tqQbject里面的第一个元素则更加到this里面的一个元素里 $("body").append($(<div> hello tong</div>))
		var srcElem = this.data[0];
		var tarElem = tqObject.data[0];
		srcElem.appendChild(srcElem);
		return this;
	},
	appendTo:function(tqObject)
	{
		//tqObject 为源 元素 this 为目标元素 
		//将this中 的第一个元素 追加到tqObjext 的第一元素中去
		var srcElem = tqObject.data[0];
		var tarElem = this.data[0];
		srcElem.appendChild(tarElem);
		return this;
			
	},
	remove:function()
	{
		//被移除的元素 this.data[0];
		var removeElem = this.data[0];
		//获取被移除元素的父元素
		var parentElem = removeElem.parentNode;
		parentElem.removeChild(removeElem);
	},
	slideUp:function(speed)
	{
		var elem=this.data[0];
		var height = elem.offsetHeight;
		//判断是否有自定义的speed
		var s=speed||300;
		var l=30/s * height;
		//var h = elem.style.height; 获取行内样式 。 内嵌和外部不行
		var oldHeight = height;
		var interval = setInterval(function(){
			//更新高度（递增）
			height -=1;
			height.style.height = height+"px";
			//判断高度是否到达0
			if (height <= 0)
			{
				//将原始高度赋值给当前隐藏元素
				elem.style.display = "none";
				elem.style.height = oldHeight + 'px';
				clearInterval(interval);
			}
		},30);
	},
	slideDown:function(speed)
	{
		var elem = this.data[0];
		var height = parseInt(elem.style.height);
		var s=speed||300;
		var l=30/s * height;

		elem.style.height = 0 +"px";
		elem.style.display="block";
		console.log(elem.offsetHeight);
		var interval = setInterval(function()
		{
			elem.style.height=(elem.offsetHeight+l)+"px";
			if(elem.offsetHeight>=height)
			{
				clearInterval(interval);
				elem.style.height = height+"px";
			}
			
		},30);

	},
	heide:function(speed)
	{
		//获取元素高度
		var elem =this.data[0];
		var height = elem.offsetHeight;
		var width = elem.offsetWidth;
		var s = speed	||300;
		
		var h=30/s*height;
		var w=30/s*width;
		
		var oldHeight = height;
		var	oldWidth =width;
		var interval = setInterval(function(){
			height-=h;
			width-=w;
			elem.style.height = height+"px";
			elem.style.width = width+"px";
			if(height <=0||width<=0)
			{
				clearInterval(interval);
				elem.style.display="none";
				elem.style.width = oldWidth+"px";
				elem.style.height = oldHeight+"px";
			}
			
		},30);
	},
	fedeOut : function(speed)
	{
		var s = speed||300;
		var elem = this.data[0]
		var op = 100;
		var l = 30/s*op;
		
		var interval = setInterval(function(){
			op -=1;
			elem.style.opacity=op/100;
			if(op<=0)
			{
				elem.style.display="none";
				clearInterval(interval);
			}
		},30);
	}




}

