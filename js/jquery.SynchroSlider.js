/*
 * jQuery Synchro Slider v1.0
 * http://design-matome.com
 *
 * Copyright 2016, Design To Matome Sha.
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {
    $.fn.SynchroSlider = function( options ) {

		$setElm = this;
	    var settings = $.extend( {
	      'baseWidth' : '960',
	      'baseHeight': '522',
	      'minWidth'  : '860',
	      'minHeight' : '340',
	      'thumbWidth': '192',
	      'thumbCount' : '5',
	      'thumbpath' : './images/',
	      'slideSpeed': '500',
	      'delayTime' : '4000',
	      'easing'    : 'easeInOutQuad',
	      'autoPlay'  : '1',
	      'flickMove' : '1',
	      'btnOpacity': '1',
	      'pnOpacity' : '1'
	    }, options);

		return this.each(function() {	
			var ua = navigator.userAgent;
		
			$setElm.find('img').css({display:'block'});
			$setElm.each(function(){
				targetObj = $(this);
				targetObj.children('ul').wrapAll('<div class="synchroslider_base"><div class="synchroslider_wrap"></div><nav class="slider_nav"><div class="slider_prev"><span class="icon-wrap"></span></div><div class="slider_next"><span class="icon-wrap"></span></div></nav><div class="pagination_base"></div><div class="pagination_active"></div></div>');
		
				var findBase = targetObj.find('.synchroslider_base'),
				findWrap = targetObj.find('.synchroslider_wrap'),
				findPrev = targetObj.find('.slider_prev'),
				findNext = targetObj.find('.slider_next');
		
				var pagination = $('<div class="pagination"></div>');
				$('.pagination_base').append(pagination);
		
				var pagination2 = $('<div class="pagination2"></div>');
				$('.pagination_base').append(pagination2);
		
				var baseList = findWrap.find('li'),
				baseListLink = findWrap.find('li').children('a'),
				baseListCount = findWrap.find('li').length;
		
				baseList.each(function(i){
					$(this).css({width:(settings.baseWidth),height:(settings.baseHeight)});
					pagination.append('<a href="javascript:void(0);" class="pn'+(i+1)+'"></a>');
					$('.pagination a.pn'+(i+1)).css({'background-image':'url('+settings.thumbpath+$(this).children("a").children("img").attr("data-thumb")+')'});
				});
				var makeThumb = pagination.children();
				makeThumb.clone().prependTo(pagination);
				makeThumb.clone().appendTo(pagination);
		
				var findPagi = targetObj.find('.pagination');
		
				setSlide();
				function setSlide(){
					var windowWidth = $(window).width();
					var findList = findWrap.find('li');
					var setParts = (findBase,findWrap,findPrev,findNext,$setElm);
		
					var setWrapLeft = parseInt(findWrap.css('left'));
					var setlistWidth = findList.find('img').width();
					var setLeft = setWrapLeft / setlistWidth;
		
					if(windowWidth < settings.baseWidth){
						if(windowWidth > settings.minWidth){
							findList.css({width:(windowWidth)});
							var reImgHeight = findList.find('img').height();
							findList.css({height:(reImgHeight)});
							setParts.css({height:(settings.baseHeight)});
							$('.pagination_base').css({'display': 'block'});
							$('.pagination_active').css({'display': 'block'});
						} else if(windowWidth <= settings.minWidth){
							findList.css({width:(settings.minWidth)});
							var reImgHeight = findList.find('img').height();
							findList.css({height:(reImgHeight)});
							setParts.css({height:(settings.minHeight)});
							$('.pagination_base').css({'display': 'none'});
							$('.pagination_active').css({'display': 'none'});
						}
					} else if(windowWidth >= settings.baseWidth){
						findList.css({width:(settings.baseWidth),height:(settings.baseHeight)});
						setParts.css({height:(settings.baseHeight)});
						$('.pagination_base').css({'display': 'block'});
						$('.pagination_active').css({'display': 'block'});
					}
		
					setWidth = findList.find('img').width();
					setHeight = findList.find('img').height();
					baseWrapWidth = (setWidth)*(baseListCount);
		
					ulCount = findWrap.find('ul').length;
					if(ulCount == 1){
						var makeClone = findWrap.children('ul');
						makeClone.clone().prependTo(findWrap);
						makeClone.clone().appendTo(findWrap);
						findWrap.children('ul').eq('1').addClass('mainList');
						var mainList = findWrap.find('.mainList').children('li');
						mainList.eq('0').addClass('mainActive')
		
						allListCount = findWrap.find('li').length;
					}
					allLWrapWidth = (setWidth)*(allListCount),
					posAdjust = ((windowWidth)-(setWidth))/2;
		
					findBase.css({left:(posAdjust),width:(setWidth),height:(setHeight)});
					findPrev.css({left:-(posAdjust),width:(posAdjust),height:(setHeight),opacity:(settings.btnOpacity)});
					findNext.css({right:-(posAdjust),width:(posAdjust),height:(setHeight),opacity:(settings.btnOpacity)});
					if(windowWidth < settings.baseWidth){
						prevAdjust = $('.slider_prev .icon-wrap').width();
						nextAdjust = $('.slider_next .icon-wrap').width();
						$('.slider_prev .icon-wrap').css({right:-(prevAdjust)});
						$('.slider_next .icon-wrap').css({left:-(nextAdjust)});
					} else {
						$('.slider_prev .icon-wrap').css({right:''});
						$('.slider_next .icon-wrap').css({left:''});
					}
		
					findWrap.css({width:(allLWrapWidth),height:(setHeight)});
					findWrap.children('ul').css({width:(baseWrapWidth),height:(setHeight)});
		
					posResetNext = -(baseWrapWidth)*2,
					posResetPrev = -(baseWrapWidth)+(setWidth);
		
					adjLeft = setWidth * setLeft;
					findWrap.css({left:(adjLeft)});
		
				}
				findWrap.css({left:-(baseWrapWidth)});
		
				var pnPoint = pagination.children('a'),
				pnFirst = pagination.children('a:nth-child('+(baseListCount+1)+')'),
				pnLast = pagination.children('a:nth-child('+(baseListCount+baseListCount)+')'),
				pnCount = baseListCount,
				pnPage = 1;
				pagination.css({left:(-(baseListCount*settings.thumbWidth- Math.floor( settings.thumbCount/2 )*settings.thumbWidth))});
				pagination.css('width',((baseListCount*settings.thumbWidth*3)));
		
				if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
					pnPoint.css({opacity:(settings.pnOpacity)});
				} else {
					pnPoint.css({opacity:(settings.pnOpacity)}).hover(function(){
						$(this).stop().animate({opacity:'0.7'},300);
					}, function(){
						$(this).stop().animate({opacity:(settings.pnOpacity)},300);
					});
					pnPoint.css({opacity:(settings.pnOpacity)}).mouseout(function(){
						$(this).stop().animate({opacity:(settings.pnOpacity)},300);
					});
				}
		
				pnFirst.addClass('active');
				pnPoint.click(function(){
					if(settings.autoPlay == '1'){clearInterval(wsSetTimer);}
					var setNum = pnPoint.index(this);
					var moveLeft;
					if(baseListCount >= setNum+1){
						moveLeft = ((setWidth)*(setNum))+baseWrapWidth;
						findWrap.css({left:(findWrap.position().left-baseWrapWidth)});
					} else if(baseListCount < setNum+1 && baseListCount*2 >= setNum+1){
						moveLeft = ((setWidth)*(setNum-baseListCount))+baseWrapWidth;
					} else {
						moveLeft = ((setWidth)*(setNum-baseListCount*2))+baseWrapWidth;
						findWrap.css({left:(findWrap.position().left+baseWrapWidth)});
					}
					findWrap.stop().animate({left: -(moveLeft)},settings.slideSpeed,settings.easing);
					$('.pagination a').stop().animate({opacity:(settings.pnOpacity)},300);
					if(baseListCount >= setNum+1){
						pagination.css({left:(pagination.position().left-baseListCount*settings.thumbWidth)});
						pagination.stop().animate({'left':(-((setNum+baseListCount)*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
					} else if(baseListCount < setNum+1 && baseListCount*2 >= setNum+1){
						pagination.stop().animate({'left':(-(setNum*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
					} else {
						pagination.css({left:(pagination.position().left+baseListCount*settings.thumbWidth)});
						pagination.stop().animate({'left':(-((setNum-baseListCount)*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
					}
		
					pnPoint.removeClass('active');
					if(baseListCount >= setNum+1){
						pnPoint.eq(setNum + baseListCount).addClass('active');
					} else if(baseListCount < setNum+1 && baseListCount*2 >= setNum+1){
						pnPoint.eq(setNum).addClass('active');
					} else {
						pnPoint.eq(setNum - baseListCount).addClass('active');
					}
					activePos();
					if(settings.autoPlay == '1'){wsTimer();}
				});
		
				if(settings.autoPlay == '1'){wsTimer();}
		
				function wsTimer(){
					wsSetTimer = setInterval(function(){
						findNext.click();
					},settings.delayTime);
				}
				findNext.click(function(){
					findWrap.not(':animated').each(function(){
						if(settings.autoPlay == '1'){clearInterval(wsSetTimer);}
						var posLeft = parseInt($(findWrap).css('left')),
						moveLeft = ((posLeft)-(setWidth));
						findWrap.stop().animate({left:(moveLeft)},settings.slideSpeed,settings.easing,function(){
							var adjustLeft = parseInt($(findWrap).css('left'));
							if(adjustLeft <= posResetNext){
								findWrap.css({left: -(baseWrapWidth)});
							}
						});
						$('.pagination a').stop().animate({opacity:(settings.pnOpacity)},300);
						var pnPointActive = pagination.children('a.active');
						pnPointActive.each(function(){
							var pnIndex = pnPoint.index(this),
								listCount = pnIndex+1;						
							if(pnCount+baseListCount == listCount){
								pnPointActive.removeClass('active');
								pnFirst.addClass('active');
								pagination.css({left:(-(baseListCount*settings.thumbWidth-settings.thumbWidth* Math.ceil( settings.thumbCount/2 )))});
								pagination.stop().animate({'left':(-(baseListCount*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
							} else {
								pnPointActive.removeClass('active').next().addClass('active');
								pagination.stop().animate({'left':(-(listCount*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
							}
						});
						activePos();
						if(settings.autoPlay == '1'){wsTimer();}
					});
				}).hover(function(){
					$(this).stop().animate({opacity:((settings.btnOpacity)+0.1)},100);
				}, function(){
					$(this).stop().animate({opacity:(settings.btnOpacity)},100);
				});
		
				findPrev.click(function(){
					findWrap.not(':animated').each(function(){
						if(settings.autoPlay == '1'){clearInterval(wsSetTimer);}
		
						var posLeft = parseInt($(findWrap).css('left')),
						moveLeft = ((posLeft)+(setWidth));
						findWrap.stop().animate({left:(moveLeft)},settings.slideSpeed,settings.easing,function(){
							var adjustLeft = parseInt($(findWrap).css('left')),
							adjustLeftPrev = (posResetNext)+(setWidth);
							if(adjustLeft >= posResetPrev){
								findWrap.css({left: (adjustLeftPrev)});
							}
						});
		
						$('.pagination a').stop().animate({opacity:(settings.pnOpacity)},300);
						var pnPointActive = pagination.children('a.active');
						pnPointActive.each(function(){
							var pnIndex = pnPoint.index(this),
							listCount = pnIndex+1;
							if(baseListCount+1 == listCount){
								pnPointActive.removeClass('active');
								pnLast.addClass('active');
								pagination.css({left:(-(baseListCount*2*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))});
								pagination.stop().animate({'left':(-(baseListCount*2*settings.thumbWidth-settings.thumbWidth* Math.ceil( settings.thumbCount/2 )))},300);
							} else {
								pnPointActive.removeClass('active').prev().addClass('active');
								pagination.stop().animate({'left':(-((listCount-2)*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
							}
						});
						activePos();
		
						if(settings.autoPlay == '1'){wsTimer();}
					});
				}).hover(function(){
					$(this).stop().animate({opacity:((settings.btnOpacity)+0.1)},100);
				}, function(){
					$(this).stop().animate({opacity:(settings.btnOpacity)},100);
				});
		
				function activePos(){
					var posActive = findPagi.find('a.active');
					posActive.each(function(){
						var posIndex = pnPoint.index(this),
						setMainList = findWrap.find('.mainList').children('li');
						setMainList.removeClass('mainActive').eq(posIndex).addClass('mainActive');
					});
				}
		
				$(window).on('resize',function(){
					if(settings.autoPlay == '1'){clearInterval(wsSetTimer);}
					setSlide();
					if(settings.autoPlay == '1'){wsTimer();}
				}).resize();
		
				if(settings.flickMove == '1'){
					var isTouch = ('ontouchstart' in window);
					findWrap.on(
						{'touchstart mousedown': function(e){
							if(findWrap.is(':animated')){
								e.preventDefault();
							} else {
								if(settings.autoPlay == '1'){clearInterval(wsSetTimer);}
								if(!(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1)){
									e.preventDefault();
								}
								this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
								this.leftBegin = parseInt($(this).css('left'));
								this.left = parseInt($(this).css('left'));
								this.touched = true;
							}
						},'touchmove mousemove': function(e){
							if(!this.touched){return;}
							e.preventDefault();
							this.left = this.left - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX) );
							this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
							$(this).css({left:this.left});
						},'touchend mouseup mouseout': function(e){
							if (!this.touched) {return;}
							this.touched = false;
		
							var setThumbLiActive = pagination.children('a.active'),
							listWidth = parseInt(baseList.css('width')),leftMax = -((listWidth)*((baseListCount)-1));
		
							if(((this.leftBegin)-30) > this.left && (!((this.leftBegin) === (leftMax)))){
								$(this).stop().animate({left:((this.leftBegin)-(listWidth))},settings.slideSpeed,settings.easing,function(){
									var adjustLeft = parseInt($(findWrap).css('left'));
									if(adjustLeft <= posResetNext){
										findWrap.css({left: -(baseWrapWidth)});
									}
								});
		
								$('.pagination a').stop().animate({opacity:(settings.pnOpacity)},300);
								var pnPointActive = pagination.children('a.active');
								pnPointActive.each(function(){
									var pnIndex = pnPoint.index(this),
										listCount = pnIndex+1;						
									if(pnCount+baseListCount == listCount){
										pnPointActive.removeClass('active');
										pnFirst.addClass('active');
										pagination.css({left:(-(baseListCount*settings.thumbWidth-settings.thumbWidth* Math.ceil( settings.thumbCount/2 )))});
										pagination.stop().animate({'left':(-(baseListCount*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
									} else {
										pnPointActive.removeClass('active').next().addClass('active');
										pagination.stop().animate({'left':(-(listCount*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
									}
								});
								activePos();
							} else if(((this.leftBegin)+30) < this.left && (!((this.leftBegin) === 0))){
								$(this).stop().animate({left:((this.leftBegin)+(listWidth))},settings.slideSpeed,settings.easing,function(){
									var adjustLeft = parseInt($(findWrap).css('left')),
									adjustLeftPrev = (posResetNext)+(setWidth);
									if(adjustLeft >= posResetPrev){
										findWrap.css({left: (adjustLeftPrev)});
									}
								});
		
								$('.pagination a').stop().animate({opacity:(settings.pnOpacity)},300);
								var pnPointActive = pagination.children('a.active');
								pnPointActive.each(function(){
									var pnIndex = pnPoint.index(this),
									listCount = pnIndex+1;
									if(baseListCount+1 == listCount){
										pnPointActive.removeClass('active');
										pnLast.addClass('active');
										pagination.css({left:(-(baseListCount*2*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))});
										pagination.stop().animate({'left':(-(baseListCount*2*settings.thumbWidth-settings.thumbWidth* Math.ceil( settings.thumbCount/2 )))},300);
									} else {
										pnPointActive.removeClass('active').prev().addClass('active');
										pagination.stop().animate({'left':(-((listCount-2)*settings.thumbWidth-settings.thumbWidth* Math.floor( settings.thumbCount/2 )))},300);
									}
								});
								activePos();
							} else {
								$(this).stop().animate({left:(this.leftBegin)},settings.slideSpeed,settings.easing);
							}
							var compBeginLeft = this.leftBegin;
							var compThisLeft = this.left;
							baseListLink.click(function(e){
								if(!(compBeginLeft == compThisLeft)){
									e.preventDefault();
								}
							});
							if(settings.autoPlay == '1'){wsTimer();}
						}
					});
				}
				setTimeout(function(){setSlide();},500);
			});
		});
	}
})(jQuery);
