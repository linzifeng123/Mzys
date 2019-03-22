var storage=window.sessionStorage;
var datalists="";
$(document).ready(function() { 
$(document).bind("contextmenu",function(e) { 
//alert("sorry! No right-clicking!"); 
return false; 
}); 
});
$('#test_table').html("<thead>"+$("#thead").html()+"</thead><tbody>"+$("#tbody").html()+"</tbody>");


var pagerows=9;
$('.loadimg').css('display','none'); 
$("#exp").click(function(){
	tablelist1();
	setTimeout(function(){
	var numcol=$('#tbody tr:eq(1) td').size();
	console.log(numcol)
	
	    $('#test_table').html("<table class='table'><thead><tr style='height:20px;'><th colspan='"+(numcol)+"' rowspan='1'><p>"+$('.tbTitle').html()+"</p></th></tr><tr style='height:20px;'><th colspan='"+(numcol)+"' rowspan='1'><p>"+$('.getTimes').html()+"</p></th></tr>"+$("#thead").html()+"</thead><tbody>"+$("#tbody").html()+"</tbody></table>");
	
		$("#test_table").css('display','');
	    
	    $("#test_table").tableExport({
	        type:"excel",
	        escape:"true"
	    });
	    setTimeout(function(){
	      $("#test_table").css('display','none');
	    }, 100);
    },2000);
});
var URL = "http://"+window.location.host+"/FinancialStatistics"; //

function killDatabase(){
	console.log(URL +"/KillSessionController/suo")
		$.ajax({
			type:"get",
			url:URL +"/KillSessionController/suo",
			 async: true,//异步
     data: {},//数据，这里使用的是Json格式进行传输
     dataType: "json",
     //这两句指定回调函数为：CallBackUser
     jsonp: 'callback',
     jsonpCallback: 'CallBackUserSuo'
	
 }).then(function (res) {
    console.log("成功",res);
	}, function (err) {
    // console.log("失败", err);
 });
  
 function CallBackUserSuo(jsonData) {
     //console.log('callback',jsonData);
 }
}

$('.menuSearch').click(function(event){
	event.stopPropagation();
	// $(this).attr('disabled',true);
	//killDatabase();
});
$(document).on('click','.menuSearch',function(event){
	event.stopPropagation();
}) 

var zoomListeners = [];

(function(){
  // Poll the pixel width of the window; invoke zoom listeners
  // if the width has been changed.
  var lastWidth = 0;
  function pollZoomFireEvent() {
    var widthNow = jQuery(window).width();
   // console.log(widthNow)
    if (lastWidth == widthNow) return;
    lastWidth = widthNow;
    // Length changed, user must have zoomed, invoke listeners.
    for (i = zoomListeners.length - 1; i >= 0; --i) {
      zoomListeners[i]();
    }
   
    tablelist();
    kstablelist();
  }
  setInterval(pollZoomFireEvent, 100);
})();

var si =0;
function datatable(){
  si = $('tbody tr td').length;
  $('td:contains(合计)').css("text-align","right");
  $('td:contains(总计)').css("text-align","right");
   for(var i=0;i<si;i++){
	   $('tbody tr td:eq('+i+'):contains(%)').css('text-align','right');
       if(Number.isFinite(Number($('tbody tr td:eq('+i+')').text())) == true){
           $('tbody tr td:eq('+i+')' ).css('text-align','right');
       }
   }
} 


$('#pagenum').change(function(){
	   pagerows=$(this).val();
	   if(pagerows <=2000){
		   tablelist();
	   }else{
		   alert("对不起！您设置范围超出设定范围，本系统允许数据最大限度为2000~");
		   return false;
	   }
	   
})

//阻止鼠标选中页面文字及图标
document.body.onselectstart = function () { 
    return false; 
};