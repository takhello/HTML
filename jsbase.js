/*
*清除所有额空白节点
*参数: 无；
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
		for(var i=0; i< oAll.length; i++)
		{
			// console.log(oAll[i].childNodes.length);
			oAll[i].RemoveChild();
			// console.log(oAll[i].childNodes.length);
		}
	}
CNN();/*调用*/

/*
*获取 指定class的 元素  正则
*
 */
function getClassName(_className)
{
	var oAll = document.getElementsByTagName("*");
	var _arr = [];
	for(var i=0; i<oAll.length; i++)
	{
		if(oAll[i].hasAttributes("class"))
		{
			var oClss =" " + oAll[i].getAttribute("class") + " ";
			var reg = new RegExp(" " + _className + " ");/*正则*/
			if(reg.test(oClss))
			{
				_arr.push(oAll[i]);
			}
		}
	}	
		return _arr;
}
console.log("jsbase中的" + getClassName("box"));


/*
*通过classname获取页面元素的集合------通过函数
*参数：
classname:获取相同class的属性值
输出：具有相同class属性的元素的集合
返回值：数组的集合
*/
function getElementsByClassName(classname){
	var alldom=document.getElementsByTagName('*'); //获取页面中的所有标签
	var _arr=[];//用于存放找到的元素
	for(var i=0;i<alldom.length;i++){ //遍历
		if(alldom[i].hasAttribute("class")){ //先判断元素里是否有class属性
			var cn = alldom[i].getAttribute('class');//返回属性名的属性值
			var cnarr=cn.split(" ");//split()方法，分割成数组 存放的数组中
			for(var j=0;j<cnarr.length;j++){ //数组进行遍历 属性值的数组
				if( cnarr[j] == classname ){ //比较数组值是否和class值相同
					_arr.push(alldom[i]); //Array.push()方法 将元素放入_arr数组中
					break;//跳出当前循环体
				}
			}
		}
	}
	return  _arr; //返回数组
}



/*
*判断一个元素是否拥有指定的样式
*参数：
*cname:要判断的样式名称
*返回值：boolean
*有指定样式返回true；
*没有返回false
*/

Element.prototype.hasClass=function(cname){
	if(this.hasAttribute("class")){
		var reg=new RegExp(" "+cname+" ");
		var thisclass=" "+this.getAttribute("class")+" ";
		//前后加空格只需要判断一次
		if(reg.test(thisclass)){
			return true;
		}

	}
	return false;
}

/*
*给元素添加一个样式
*依赖上面hasClass() 方法
 */
Element.prototype.addClass = function(_class)
	{
		if(this.hasAttribute("class"))
		{
			if(!this.hasClass(_class))
			{
				// console.log("原来的class名称" + this.getAttribute("class")) 
				var setClass =" "+ this.getAttribute("class") +" " +_class;
				var newClass =this.setAttribute("class",setClass);

				// console.log(setClass);

			}
		}
		else
		{
			this.setAttribute("class",_class);
		}
	}
