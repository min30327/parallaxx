/*
 * parallax animation from css3
 *
 * Copyright (c) 2014 Mineo Okuda
 * Dual licensed under the MIT licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * @author: Mineo Okuda (http://word-cat.com)
 * @version: 0.1.3
*/
;(function($){
$.fn.parallaxx = function(options)
{
		 //要素ごとに回す	
		 return this.each(function() 
		 {
		 		 //デフォルトオプションとオプションをマージ
			 	 var opts  =  $.extend({}, $.fn.parallaxx.defaults, options);
				 //init funcを実行。
         (new parallaxx).init($(this),opts);
     });
	};
	//end of $.fn.parallaxx	
	//関数を定義
  	function parallaxx() {};
		//プロトタイプに追加
		parallaxx.prototype = $.extend(
		{
			//最初に呼び出される関数。
			init : function(elem, opts)
			{	
				var self = this;
				if(!$.support.noCloneEvent || self.is_IE9() || self.is_sphone() )
					$(opts.el).addClass(opts.active);

				$(window).on('load scroll',function(){
					/** window scroll trigger functions  **/
					if($.support.noCloneEvent && !self.is_IE9() && !self.is_sphone())
						self.parallax(elem,opts);
				});
			},
			/**
		   * [is_IE9 description]
		   * @return {Boolean} [description]
		   */
		  is_IE9 : function(){
		  	if(jQuery.support.checkOn  && jQuery.support.noCloneEvent && !jQuery.support.noCloneChecked && !jQuery.support.cors)
				{
					return true;
				}else{
					return false;
				}
		  },

		  /**
		   * [is_sphone description]
		   * @return {Boolean} [description]
		   */
		  is_sphone : function(){
		  	 var agent = navigator.userAgent;
					if(agent.search(/iPhone/) != -1){
					 	return true;
					 }else if(agent.search(/iPad/) != -1){	
					 	return true;
					 }else if(agent.search(/Android/) != -1){	
					 	return true;
					 }else{
						return false;
					}
		  },
			/**
		   * parallax　アニメーション
		   * @return {[type]} [description]
		   */
			parallax : function (elem,opts){
				
				var self = this;
				var scrT = $(window).scrollTop(); 
				var winH = $(window).height();
				if(scrT < 1){
						if(opts.reset){
								var that = elem.find(opts.el);	
								self.reset(that,opts);
						}
				}else{
						if(opts.reset){
								var that = elem.find(opts.el);	
								self.unreset(that,opts);
						}
				}
				elem.each(function(){
					var off = $(this).offset();
					var q = parseInt(winH * opts.position);

					if(scrT + (q)  > off.top){
						for(i = 0; i < $(this).find(opts.el).length; i ++ ){
							var that = $(this).find(opts.el).eq(i);	
								self.animation(that,i,opts);
							}
					}else{
						if(opts.return){
								var that = $(this).find(opts.el+'.'+opts.active);	
								self.return(that,opts);
						}
					}

				});
			},
			/**
			 * [animation description]
			 * @param  {[type]} self [description]
			 * @param  {[type]} i    [description]
			 * @return {[type]}      [description]
			 */
			animation : function (that,i,opts){
				var delay = (that.data('delay')) ? parseInt(that.data('delay')): opts.delay;
				that.delay(delay *i).queue(function(next) {
							that.not('.plx-reset').addClass(opts.active);
							next();
					});
			},
			/**
			 * [return description]
			 * @param  {[type]} self [description]
			 * @param  {[type]} i    [description]
			 * @return {[type]}      [description]
			 */
			return : function (that,opts){
				that.stop(true,true)
				.removeClass(opts.active);
			},
			/**
			 * [return description]
			 * @param  {[type]} self [description]
			 * @param  {[type]} i    [description]
			 * @return {[type]}      [description]
			 */
			reset : function (that,opts){
				that.stop(true,true)
				.removeClass(opts.active)
				.addClass('plx-reset');
			},
			/**
			 * [return description]
			 * @param  {[type]} self [description]
			 * @param  {[type]} i    [description]
			 * @return {[type]}      [description]
			 */
			unreset : function (that,opts){
				that.stop(true,true)
				.removeClass('plx-reset');
			}

		},parallaxx.prototype);
		//end of function wcGmp
		
	//デフォルトオプション	
	$.fn.parallaxx.defaults	 = 
	{
		el 			: '.parallaxx_el',
		active 	: 'plx-active',
		position: 0.6 ,// window * (int)position
		delay	: 200 ,// default delay time.
		return: true, // return is specified or returned to the original animation to scroll up.
		reset 	: true // Scroll top will reset when zero.
	}	
	//end of $.fn.parallaxx.defaults	
})(jQuery);	