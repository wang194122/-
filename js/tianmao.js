;(function($w, $d) {
    /**
    * 封装常用选择器:
    * $cls      getElementsByClassName
    * $clsOne   getElementsByClassName(cls)[0]
    * $tag      getElementsByTagName
    * $id       getElementById(id)
    * $qs		querySelector(qs)
    * $qsA		querySelectorAll(qsA)
    */
    var $cls = function(cls, parent) {
        parent = parent || $d;
        return parent.getElementsByClassName(cls)
    }
    var $clsOne = function(cls, parent) {
        parent = parent || $d;
        return parent.getElementsByClassName(cls)[0]
    }
    var $tag = function(tag, parent) {
        parent = parent || $d;
        return parent.getElementsByTagName(tag)
    }
    var $id = function(id) {
        return $d.getElementById(id);
    }
    var $qs = function(qs) {
        return $d.querySelector(qs);
    }
    var $qsA = function(qsA) {
        return $d.querySelectorAll(qsA);
    }
    /*---固定顶部---*/ 
    var search=$clsOne("fix-top");
    var fixLeft=$clsOne("fix-left");
	setInterval(function(){
		var h=document.body.scrollTop || document.documentElement.scrollTop;
		if(h>600){
			search.style.display="block";
			fixLeft.style.display="block";
			r_top.style.display="block";
		}else if(h<=600){
			search.style.display="none";
			fixLeft.style.display="none";
			r_top.style.display="none";
		}
	},1);
	
	/*---返回顶部---*/
	var l_top=$qs(".fix-left .stick");
	//console.log(l_top)
	var r_top=$qs(".fix-right .stick");
	
	l_top.onclick=function(){
		var timer=setInterval(function(){
			var scrTop=document.documentElement.scrollTop || document.body.scrollTop;
			scrTop-=50;
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=scrTop;
			}else{
				document.body.scrollTop=scrTop;
			}
			if(scrTop<0){
				clearInterval(timer);
				return;
			}
		},1)
	}	

	/*---图片轮播---*/ 
    var dots=$qsA(".slide p span"),			//console.log(dots);
    	imgs=$qsA(".slide li img"),
    	ul=$qs(".slide ul"),				
    	odiv=$clsOne("slide"),
    	imgWidth = odiv.offsetWidth;
    var num = 0;
    for(var i=0,len=dots.length;i<len;i++){
		dots[i].index=i;
		dots[i].onclick = function(){
			num = -this.index
			changeSlide(Math.abs(num))
		}
	}
    function changeSlide(index){
		for(var j=0;j<len;j++){
			dots[j].className = ""
		}
		dots[index].className = "dot"
		ul.style.left = num*imgWidth + 'px';
	}
    
    function intervalSlide() {
		timer = setInterval(function(){
			num--
			if(num === -3) {
				num = 0
			}
			changeSlide(Math.abs(num))
		},1500)
	}
    intervalSlide() 
    
    odiv.onmouseover = function() {
		clearInterval(timer);
	}
	odiv.onmouseout = function(){
		intervalSlide()
	}
//===========================================================================    
  	var turn=document.getElementById("turn"),
  		login=document.getElementById("login"),
  		bye=document.getElementById("bye"),
  		register=document.getElementById("register");
  
  
  	function setCookie(key, value, time){
		var date = new Date()
		date.setDate(date.getDate() + time) // 当前时间 + 30天
		document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + date
	}
  	
	var _cookie = document.cookie;	
	var arr = _cookie.split(";");
	for(var i=0;i<arr.length;i++){
		if(arr[i].split("=")[0].trim()){
			turn.innerHTML=arr[i].split("=")[1];
			bye.innerHTML="退出";
			login.style.display="none"
			register.style.display="none";
		}else{
			turn.innerHTML="来天猫"
		}
	}
	
	function removeCookie(key){
		setCookie(key,null,-1)
	}
	
	bye.onclick=function(){
		removeCookie("username");
		removeCookie("user");
		location.reload();
	}
//=========================================================================== 	 
	var floor2=$clsOne("floor2"),
		floor2_1=$clsOne("floor2_1"),
		floor2_2=$clsOne("floor2_2");
	var as=$qsA(".fix-left a"),
		a1=$clsOne("a1"),
		a2=$clsOne("a2"),
		a3=$clsOne("a3");
		
	setInterval(function(){
		var scrTop=document.documentElement.scrollTop || document.body.scrollTop;
		//console.log(scrTop)
		for(var i=0;i<as.length;i++){
			if(scrTop>1750){
				if(scrTop<2056){
					for(var j=0;j<as.length;j++){
						as[j].style.background="#999"
					}
	    			a1.style.background="#EA5F8D"
		    	}else if(scrTop<2632){
					for(var j=0;j<as.length;j++){
						as[j].style.background="#999"
					}
		    		a2.style.background="#0AA6E8"
		    	}
		    	else if(scrTop<3100){
					for(var j=0;j<as.length;j++){
						as[j].style.background="#999"
					}
		    		a3.style.background="#64C333"
		    	}else{
		    		for(var j=0;j<as.length;j++){
						as[j].style.background="#999"
					}
		    	}
			}else{
				for(var j=0;j<as.length;j++){
					as[j].style.background="#999"
				}
			}
		}
	},1)
	
    
    
    
    
    
    
    
    
    
    
    
})(window, document)
