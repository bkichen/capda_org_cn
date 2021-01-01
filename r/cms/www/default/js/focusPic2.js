// JavaScript Document
var myFocus={
	$:function(id){
		return document.getElementById(id);
    },
	$$:function(tag,obj){
		return (typeof obj=='object'?obj:this.$(obj)).getElementsByTagName(tag);
	},
	linear:function(t,b,c,d){return c*t/d + b;},
	easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t + b;},
	easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t - 1) + b;},
	opa:function(obj,v){
	if(v!=undefined) {
		v=v>100?100:(v<0?0:v); obj.style.filter = "alpha(opacity=" + v + ")"; 
		obj.style.opacity = (v / 100);
	}
	else
	    return (document.all)?((obj.filters.alpha)?obj.filters.alpha.opacity:100):((obj.style.opacity)?obj.style.opacity*100:100);
	},
 	move:function(obj,dir,val,type,spd,fn){
    var t=0,b=parseInt(obj.style[dir])||0,c=val-b,d=spd||50,st=type||'linear',m=c>0?'ceil':'floor';
 	if(obj[dir+'timer']) clearInterval(obj[dir+'timer']);
	obj[dir+'timer']=setInterval(function(){
 		if(t<d){
			obj.style[dir]=Math[m](myFocus[st](t++,b,c,d))+'px';
		}
	    else {
			clearInterval(obj[dir+'timer']);fn&&fn.call(myFocus);
		}
 	},10);
	return this;
    },
    fade:function(obj,type,spd,fn){
	var o=this.opa(obj),m=spd||5;
	 if(o==0) obj.style.display='';
 	 if(type=='out') m=-m;
 	 if(obj.fadeTimer) clearInterval(obj.fadeTimer);
 	 obj.fadeTimer=setInterval(function(){
		 o+=m;myFocus.opa(obj,o);
		 if(o<=0) obj.style.display='none';
 		 if(o>=100||o<=0){clearInterval(obj.fadeTimer);fn&&fn.call(myFocus);}
 	 },30);//30为渐变的时间
	 return this;
 	 },
 	 addList:function(obj,cla,arr){
	 var s=[],n=this.$$('li',this.$$('ul',obj)[0]).length,num=cla.length;
	 for(var j=0;j<num;j++){
		 s.push('<ul class='+cla[j]+'>');
		 for(var i=0;i<n;i++){
			 //s.push('<li>'+(cla[j]=='num'?(i+1):(cla[j]=='txt'?this.$$('li',obj)[i].innerHTML.replace(/\<img.*?\>/i,this.$$('img',obj)[i].alt):''))+'<span></span></li>')
			 if(cla[j]=="num"){
				 s.push('<li></li>');
			 }else{
			s.push('<li>'+(cla[j]=='num'?(i+1):(cla[j]=='txt'?this.$$('li',obj)[i].innerHTML.replace(/\<p\>.*?\<\/p>/i,this.$$('p',obj)[i].innerHTML):''))+'</li>');
			 }
};
	     s.push('</ul>');
 	 };
	 obj.innerHTML+=s.join('');
 	 },
	 setting:function(par){//设置DOM/文档加载就绪后执行的任务
		 if(window.attachEvent){
			 window.attachEvent('onload',function(){myFocus[par.style](par)});
		 }else{
			 window.addEventListener('load',function(){myFocus[par.style](par)},false);
		 }
	 },
 	 mF_expo2010:function(par){
 	 var box=this.$(par.id),t=par.time*1000;
 	 this.addList(box,['txt-bg','txt','num-bg','num']);
	 var pic=this.$$('ul',box)[0],txt=this.$$('ul',box)[2],num=this.$$('ul',box)[4],img=this.$$('li',pic),tip=this.$$('li',txt);
	 var H=tip[0].clientHeight+60;
	 var n=img.length;
	 var index=0;
	 for(var i=0;i<img.length;i++){
		 this.opa(img[i],0);
		 img[i].style.display='none';
		 tip[i].style.bottom=-H+'px';
	 }
 	 box.removeChild(this.$$('div',box)[0]);
	 this.fade(img[index],'in');
 	 this.move(tip[index],'bottom',0,'easeOut',40);
 	 this.$$('li',num)[index].className='current';
 	 var run=function(idx){
 		 myFocus.fade(img[index],'out');
		 myFocus.move(tip[index],'bottom',-H,'easeIn',10);
		 myFocus.$$('li',num)[index].className='';
		 if(index==n-1) index=-1;
 		 var N=idx!=undefined?idx:index+1;
 		 myFocus.fade(img[N],'in');
 		 myFocus.move(tip[N],'bottom',0,'easeOut',40);
 		 myFocus.$$('li',num)[N].className='current';
 		 index=N;
	 }
 	 var auto=setInterval(function(){run()},t);
 	 for (var j=0;j<n;j++){
		 this.$$('li',num)[j].j=j;
		 this.$$('li',num)[j].onclick=function(){run(this.j)}
 		 this.$$('li',num)[j].onmouseover=function(){if(!this.className) this.className = 'hover';}
 		 this.$$('li',num)[j].onmouseout=function(){if(this.className=='hover') this.className ='';}
 	 }
	 box.onmouseover=function(){clearInterval(auto);}
	 box.onmouseout=function(){auto=setInterval(function(){run()},t);}
	 }
	 }
myFocus.setting({style:'mF_expo2010',id:'myFocus',time:4}); //style为风格样式,id为焦点图ID,time为每帧间隔时间(秒)