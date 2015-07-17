/**
 * AJAX Menu for Blogger jQuery Plugin
 *
 * Version 1.0
 * by Syed M.ALi <syed.ali654@gmail.com>
 * http://www.infotechblogging.com/
 * 
 *
 * Copyright 2012 Harish Dasari (http://www.way2blogging.org/)
 * Dual licensed under the MIT and GPL v2 licenses
 */
 
 (function(e){var t=function(e,t){this.elem=e;this.settings=t;this.addAjaxHtml();this.ajaxcall=null;this.lielem=this.elem.find(".verticlemenu li a");this.menuHelper(this.elem);this.addEvents()};t.prototype={regex:{islabel:new RegExp("/search/label/","g"),issearch:new RegExp("[?&]q=","g"),labelsearch:new RegExp("(http://[^/]+)/search/label/([^/?&]+).*[?&]q=([^$&]+)(?:[^$]+)?","g"),label:new RegExp("(http://[^/]+)/search/label/([^/?&$]+)","g"),search:new RegExp("(http://[^/]+)/search/?[?&]q=(.*)","g")},addEvents:function(){var t=this;this.lielem.hover(function(){if(e(this).data("menuloaded")!=="true"){t.li=e(this);t.url=t.li.attr("href");t.container=t.li.closest("ul").siblings("ul");t.hoverOver()}},function(){t.hoverOut()})},hoverOver:function(){var t=this;this.getAJAXUrl();if(!this.ajaxUrl)return;this.ajaxcall=e.ajax({type:"GET",url:t.ajaxUrl,dataType:"jsonp",data:t.ajaxData,beforeSend:function(){t.showLoader()},success:function(e){t.hideLoader();t.addArrow();t.showPosts(e)},error:function(e){t.showError(e)}})},hoverOut:function(){this.ajaxcall.abort();this.hideLoader()},getAJAXUrl:function(){if(this.url){var e=this;this.ajaxData={alt:"json","max-results":this.settings.numPosts};this.url.search(this.regex.islabel)!==-1&&this.url.search(this.regex.issearch)!==-1?this.ajaxUrl=this.url.replace(this.regex.labelsearch,function(t,n,r,i){e.ajaxData.q=i;return[n,"/feeds/posts/default/-/",r,"/"].join("")}):this.url.search(this.regex.islabel)!==-1&&this.url.search(this.regex.issearch)===-1?this.ajaxUrl=this.url.replace(this.regex.label,function(t,n,r){delete e.ajaxData.q;return[n,"/feeds/posts/default/-/",r,"/"].join("")}):this.url.search(this.regex.islabel)===-1&&this.url.search(this.regex.issearch)!==-1?this.ajaxUrl=this.url.replace(this.regex.search,function(t,n,r){e.ajaxData.q=r;return[n,"/feeds/posts/default"].join("")}):this.ajaxUrl=!1}else this.ajaxUrl=!1},showLoader:function(){e("<span></span>",{"class":"loader"}).appendTo(this.li.closest("li"))},hideLoader:function(){this.li.closest("li").find("span.loader").remove()},showPosts:function(t){var n=this,r=[],i,s,o;t.feed.openSearch$totalResults.$t>0?e.each(t.feed.entry,function(t,u){i=u.title.$t;e.each(u.link,function(e,t){t.rel==="alternate"?s=t.href:s="#"});o=u.media$thumbnail?u.media$thumbnail.url.replace(/\/s72\-c\//,"/s300-c/"):n.settings.defaultImg;r.push('<li><span class="imgCont"><a title="',i,'" href="',s,'"><img alt="',i,'" src="',o,'"/></a></span><a class="menu-titles" title="',i,'" href="',s,'">',i,"</a></li>")}):r.push("<h5>","Sorry!!, No Posts to Show","</h5>");this.container.html(r.join(""));this.lielem.removeData("menuloaded");this.li.data("menuloaded","true")},showError:function(e){if(e.statusText==="error"){this.hideLoader();this.addArrow();this.container.html("<h5>Error!! Could not fetch the Blog Posts!</h5>")}},addArrow:function(){this.lielem.closest("li").find("span").remove();this.lielem.removeClass("hoverover");this.li.addClass("hoverover");e("<span></span>",{"class":"menuArrow"}).appendTo(this.li.closest("li"))},menuHelper:function(t){var n=this;t.find(">li").hover(function(){var t=e(this);t.find("a:first").addClass("hoverover");var r=e(this).find("ul.verticlemenu li").height()*e(this).find("ul.verticlemenu li").length;t.find("ul.postslist").css({"min-height":r+"px"});n.requestFirstAjax(t)},function(){e(this).find("a:first").removeClass("hoverover")})},addAjaxHtml:function(){this.elem.find("ul ul").remove();this.elem.addClass("ITB-Ajax-Menu").find(">li").find("ul:first").addClass("verticlemenu").wrap(e("<div></div>",{"class":this.settings.divClass}));e("ul.verticlemenu").after(e("<ul></ul>",{"class":"postslist"}))},requestFirstAjax:function(e){e=e.find(".verticlemenu li:first-child a");this.url=e.attr("href");this.container=e.closest("ul").siblings("ul");this.li=e;this.hoverOver()}};e.fn.ajaxBloggerMenu=function(n){var r={numPosts:4,divClass:"submenu",postsClass:"postslist",defaultImg:"/default.png"},i=e.extend({},r,n);return this.each(function(){var n=new t(e(this),i)})}})(jQuery);