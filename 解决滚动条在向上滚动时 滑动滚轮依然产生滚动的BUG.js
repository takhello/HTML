up();
function up()
{
	var top;
	var timer =setInterval(_judge,30);
	function _judge()
	{
		top = document.body.scrollTop||document.documentElement.scrollTop;
		if(top>333)
		{
			$("#scrollto").css({"display":"block"});
		}
		else
		{
			$("#scrollto").css({"display":"none"});
		}
	}
	/*时时获取*/
	$("#scrollto").click(function(event) {
		/* Act on the event */
		clearInterval(timer);
		var inter = setInterval(function(){
			top/=1.5;
			scrollTo(0,top);
			if(top<=5)
			{
				/*解决 在向上滚动时 滑动滚轮依然产生滚动的BUG */
				clearInterval(inter);
				timer =setInterval(_judge,30);
			}
			else
			{
			}
		},30);
	});
}
