// JavaScript Document
window.onload=function()
{
	var oTab=document.getElementById("cen_right_top");
	var aGlyi=oTab.getElementsByTagName("glyi");
	var aGlzw=oTab.getElementsByTagName("glzw");
	for(var i=0;i<aGlyi.length;i++)
	{
		aGlyi[i].index=i;
		aGlyi[i].onmouseover=function()
		{
			for(var i=0;i<aglyi.length;i++)
			{
				aGlyi[i].className="";
				aGiv[i].style.display="none";
			}
			this.className="mnuesan_h2j";
			aGlzw[this.index].style.display="block";
		}
	}
}