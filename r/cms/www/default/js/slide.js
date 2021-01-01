//menu
$(document).ready(function(){
  
  $('li.mainlevel').mousemove(function(){
  $(this).find('ul').slideDown();//you can give it a speed
  $(this).find('ul').css("z-index","9999");
  $(this).find('ul').css("background-color","#0000ff");
  var lisz = $(this).find('ul li a');
  for(var i=0;i<lisz.length;i++){
	  $(lisz[i]).css("background-color","#468fed");
  		$(lisz[i]).css("color","#ffffff");
  }
  });
  $('li.mainlevel').mouseleave(function(){
  $(this).find('ul').slideUp("fast");
  });
  
});
