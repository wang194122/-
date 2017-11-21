;(function($d) {
    /**
    * 封装常用选择器:
    * $cls      getElementsByClassName
    * $clsOne   getElementsByClassName(cls)[0]
    * $tag      getElementsByTagName
    * $id       getElementById(id)
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
    var $qsAll = function(qsAll) {
        return $d.querySelectorAll(qsAll);
    }
    
    /*---固定顶部---*/ 
    var r_top=$qs(".fix-right .stick");
    
	setInterval(function(){
		var h=document.body.scrollTop || document.documentElement.scrollTop;
		if(h>600){
			r_top.style.display="block";
		}else if(h<=600){
			r_top.style.display="none";
		}
	},1);
    
//=============================================================================================     
   /*---获取元素---*/ 
    var contentS = $clsOne("content-s"),
    	contentM = $clsOne("content-m"),
    	contentB = $clsOne("content-b"),
    	modal = $clsOne('modal'),
    	carouselLeft = $clsOne('carousel-left'),
        carouselRight = $clsOne('carousel-right'),
        carouselImg = $tag('img', carouselRight),
        carouselArrowLeft = $clsOne('arrow-left'),
        carouselArrowRight = $clsOne('arrow-right'),
    	imgS = $tag("img",contentS),
    	imgM = $id("img-m"),
    	imgB = $id("img-b"),
		magnifier = $id("magnifier"),
		contentMWidth = contentM.offsetWidth;
		
//==============================================================================================
	/*---鼠标移入小图,显示中图---*/
	var len = imgS.length,
		num=1;
	
	for(var i = 0; i < len; i++){
		imgS[i].index=i;
		imgS[i].onmouseover=function(){
			var _index=this.index;
			imgM.src="img/"+(_index+1)+".jpg";
			
			_url="img/"+(_index+1)+".jpg";
			imgM.setAttribute("data-url",_url);		//设置自定义属性,存储高清图片的地址
			num = _index + 1;						//记录当前显示第几张图片	
			
			for(j=0;j<len;j++){
				imgS[j].className = ""
			}
			this.className = "active"
		}
		
		/*---点击小图片,显示模态框---*/
		var showModal=function(num){
			modal.className="modal";
			changeModalImage(num)
		}
		var changeModalImage=function(num){
	        carouselLeft.style.backgroundImage = "url(img/"+num+".jpg)";
	        for (var j = 0; j < len; j++) {
	            carouselImg[j].className = ""
	        }
	        carouselImg[num-1].className = "active"
		}
		
		imgS[i].onclick = function(){
	        /*var _index=this.index;*/
	        showModal(num)
	       
	    }
		/*---点击中图片,显示模态框---*/
		contentM.onclick = function(){
	        showModal(num)
	    }
		/*---点击模态框小图,显示对应大图---*/
		;(function (index) {
            carouselImg[index].onclick = function () {
                num = index + 1
                changeModalImage(num)
            }
        })(i)
	}
	/*---鼠标移入中图,显示放大镜/大图---*/
	contentM.onmouseover=function(){
		magnifier.className = "magnifier";
		magnifierWidth = magnifier.offsetWidth,
		magnifierWidthHalf =magnifierWidth/2,
		imgB.src = imgM.getAttribute('data-url') || _url;
		contentB.className="content-b";
	}
	/*---鼠标移出中图,显示放大镜/大图---*/
	contentM.onmouseout=function(){
		magnifier.className = "magnifier hidden";
		contentB.className="content-b hidden";
	}
	
//==============================================================================================
	/*---移动放大镜,显示对应高清图片---*/
	var disX,
		disY,
		magnifierWidth,
        magnifierWidthHalf,
        _url="img/1.jpg";
	contentM.onmousemove=function(e){
		e = e || window.event;
        e.preventDefault();
        
        disX = e.clientX - contentM.offsetLeft;
        disY = e.clientY - contentM.offsetTop;
        console.log(contentM.offsetLeft)
        
        var l = disX - magnifierWidthHalf,
        	t = disY - magnifierWidthHalf;
        	
        if(l<0){l=0;}
        if(l>(contentMWidth-magnifierWidth)){l = (contentMWidth-magnifierWidth)}
        if(t<0){t=0;}
        if(t>(contentMWidth-magnifierWidth)){t = (contentMWidth-magnifierWidth)}
        
        magnifier.style.left=l+"px";
        magnifier.style.top=t+"px";
        
        var imgBLeft =l*2,
            imgBTop = t*2;
        imgB.style.left = -imgBLeft + 'px';
        imgB.style.top = -imgBTop + 'px'
        
	}
//==============================================================================================
	/*---点击左箭头,切换上一张图片---*/
	carouselArrowLeft.onclick=function(){
		if(num===1){
			num=len+1
		}
		num--
		changeModalImage(num)
	}
	/*---点击右箭头,切换上一张图片---*/
	carouselArrowRight.onclick=function(){
		if(num===len){
			num=0
		}
		num++
		changeModalImage(num)
	}
//==============================================================================================
	/*---点击模态框,隐藏---*/
	modal.onclick=function(e){
		e = e || window.event;
		if(e.target.className==="modal"){
			modal.className="modal hidden";
		}
	}
//==============================================================================================
	/*---点击尺寸,改变边框---*/
	var bs=$qsAll(".size b");
	//console.log(bs)
	for(var i=0;i<bs.length;i++){
		bs[i].onclick=function(){
			for(var j=0;j<bs.length;j++){
				bs[j].style.border="1px dashed #ccc"
			}
			this.style.border="1px solid #ff0036"
		}
	}

//==============================================================================================
	/*---点击颜色分类,改变边框---*/
	var imgs=$qsAll(".color img");
	//console.log(bs)
	for(var i=0;i<imgs.length;i++){
		imgs[i].onclick=function(){
			for(var j=0;j<imgs.length;j++){
				imgs[j].style.border=""
			}
			this.style.border="1px solid #ff0036"
		}
	}










})(document)