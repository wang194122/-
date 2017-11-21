;(function($d) {
    /**
    * 封装常用选择器:
    * $cls      getElementsByClassName
    * $id       getElementById(id)
    */
    var $cls = function(cls){
        return $d.getElementsByClassName(cls)
    }
    var $id = function(id) {
        return $d.getElementById(id);
    }
   
    var table = $id("cartTable"),							// 购物车表格
    	check = $cls("check"),							 	// 所有勾选框	
    	checkAll = $cls("check-all"),						// 全选框
    	tr = table.children[1].rows,						//行
    	selectedTotal = $id('selectedTotal'),               //总数
    	priceTotal = $id('priceTotal'),                     //总计
    	deleteAll = $id('deleteAll'),					    // 删除全部按钮
    	selectedViewList = $id('selectedViewList'),         //浮层已选商品列表容器
    	selected = $id('selected'), 						//已选商品
    	foot = $id('foot');
		//console.log(tr)
//==========================================================================================
	
	/*---复选框---*/
	for(var i=0;i<check.length;i++){
		check[i].onclick=function(){
			if(this.className.indexOf("check-all")>=0){		 //如果是全选，则把所有的选择框选中
				for(j=0;j<check.length;j++){
					check[j].checked=this.checked;
				}
			}
			if(!this.checked){								//只要有一个未勾选，则取消全选框的选中状态
				for(var i=0;i<checkAll.length;i++){
					checkAll[i].checked=false;
				}
			}
			getTotal()
		}
	}
	/*---计算单行价格---*/
	function getSubtotal(tr) {
        var price = tr.getElementsByClassName("price")[0],
		reduce = tr.getElementsByClassName("reduce")[0],
		countInput = tr.getElementsByClassName("count-input")[0],
    	subtotal = tr.getElementsByClassName("subtotal")[0];
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
        //如果数目只有一个，把-号去掉
        if (countInput.value == 1) {
            reduce.innerHTML = '';
        }else{
            reduce.innerHTML = '-';
        }
    }
	for(var i = 0; i < tr.length; i++){
		tr[i].onclick=function(e){
			var e = e || window.event;
			var el = e.target || e.srcElement;
			var cls = el.className;
			var countInput = this.getElementsByClassName("count-input")[0];
			//console.log(countInput)
			var value = parseInt(countInput.value);
			switch (cls) {
                case 'add': //点击了加号
                    countInput.value = value + 1;
                    getSubtotal(this)
                    break;
                case 'reduce': //点击了减号
                    if (value > 1) {
                        countInput.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'delete': //点击了删除
                    var conf = confirm('确定删除此商品吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break;
            }
			getTotal()
		}
	}
	/*---更新总数和总价格---*/
	
	function getTotal() {
		var seleted = 0;
		var price = 0;
		var HTMLstr = '';
		for (var i = 0, len = tr.length; i < len; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) {
				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML);
			}
			else {
				tr[i].className = '';
			}
		}
		selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2);
	
		if (seleted == 0) {
			foot.className = 'foot';
		}
	}
	
	
	
	
	
	
	
	










})(document)