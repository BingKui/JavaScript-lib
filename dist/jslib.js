;(function($){

	$.fn.UISelect = function(options) {
		return new Select(this, options);
	}

	var Select = function(ele, options) {
		var _th = this;
		_th.el = $(ele);
		_th.opts = $.extend({}, {
			type:"radio",//radio checkbox
			block:false,
			data:[],
			showVal:"",
			realVal:"",
			onSelect:function(){}
		}, options);
		_th.init();
	}
	Select.prototype = {
		lastSelect:null,
		init: function(){
			var _th = this;
			var _args = _th.opts;
			if(_args.type == "radio"){
				_th.sel = cerateRadio(_args.data, _args.onSelect, _args.showVal, _args.realVal, _args.block).appendTo(_th.el);
			}else if(_args.type == "checkbox"){
				_th.sel = createCheckbox(_args.data, _args.onSelect, _args.showVal, _args.realVal, _args.block).appendTo(_th.el);
			}
		},
		getSelectText: function(){
			var _childrens = $(this.sel).children(".checked");
			var _arr = [];
			for(var i = 0; i < _childrens.length; i++){
				_arr.push($(_childrens[i]).children(".text").html());
			}
			return _arr;
		},
		getSelectValue: function(){
			var _childrens = $(this.sel).children(".checked");
			var _arr = [];
			for(var i = 0; i < _childrens.length; i++){
				_arr.push($(_childrens[i]).attr("value"));
			}
			return _arr;
		},
		setSelected: function(arr){
			for(var i = 0; i < arr.length; i++){
				$(this.sel).find("div[value="+arr[i]+"]").addClass("checked");
			}
		},
		setDisable: function(id){
			var _item = $(this.sel).find("div[value="+id+"]");
			_item.addClass("disable");
		},
		selected: function(id){
			var _item = $(this.sel).find("div[value="+id+"]");
			_item.addClass("checked");
		},
		cancleSelected:function(){
			lastSelect.removeClass("checked");
		}
	}
	function cerateRadio(data, onSelect, text, value, flag){
		var _th = this;
		var _radio = createDiv("select-radio");
		for(var i = 0; i < data.length; i++){
			var _item = createDiv("radio-item").appendTo(_radio).attr("value", data[i][value]);
			if(data[i]['default']){
				_item.addClass("checked");
			}
			if(data[i]['disable']){
				_item.addClass("disable");
			}
			if(flag){
				_radio.addClass("block");
			}else{
				$("<span></span>").addClass("icon").appendTo(_item);
			}
			$("<span></span>").addClass("text").html(data[i][text]).appendTo(_item);
			_item.bind("click", function(){
				if(!$(this).hasClass("disable")){
					_th.lastSelect = $(this);
					$(this).addClass("checked").siblings().removeClass("checked");
				}
				onSelect();
			});
		}
		return _radio;
	}

	function createCheckbox(data, onSelect, text, value, flag){
		var _th = this;
		var _checkbox = createDiv("select-checkbox");
		for(var i = 0; i < data.length; i++){
			var _item = createDiv("checkbox-item").appendTo(_checkbox).attr("value", data[i][value]);
			if(data[i]['default']){
				_item.addClass("checked");
			}
			if(data[i]['must']){
				_item.addClass("checked must");
			}
			if(data[i]['disable']){
				_item.addClass("disable");
			}
			if(flag){
				_checkbox.addClass("block");
			}else{
				$("<span></span>").addClass("icon").appendTo(_item);
			}
			$("<span></span>").addClass("text").html(data[i][text]).appendTo(_item);
			_item.bind("click", function(){
				if(!$(this).hasClass("disable")){
					_th.lastSelect = $(this);
					if($(this).hasClass("checked")){
						if(!$(this).hasClass("must")){
							$(this).removeClass("checked");
						}
					}else{
						$(this).addClass("checked");
					}
				}
				onSelect();
			});
		}
		return _checkbox;
	}

	function createDiv(className){
		return $("<div></div>").addClass(className);
	}

})(jQuery)