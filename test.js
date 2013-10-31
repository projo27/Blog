    //<![CDATA[
    var ytvtag = 0; 
    var ytvtagname = "video";
    var ytvyvideo = -1;
    //
    function ytv_loadscript(filename) {
      var scr=document.createElement('script');
      scr.setAttribute("type","text/javascript");
      scr.setAttribute("src",filename);
      document.getElementsByTagName("head")[0].appendChild(scr);
    }
    function ytv_jumptohash() {
      window.scrollTo(0, $("#"+window.location.hash.replace(/^#/, "")).offset().top);
    }
    var ytv_tid;
    var ytv_elems = {};
    //
    function ytvmbed_callback(response) {
      var resp = response;
      revurl = resp.url.split("").reverse().join("");
      html = ytv_elems[response.callID].html();
      ee = $(resp.html);
      w = parseInt(ee.attr("width"));
      h = parseInt(ee.attr("height"));
      if(ytvyvideo==1) {
        src = ee.attr("src");
        src += ((src.indexOf("?")==-1) ? "?" : "&") + "autoplay=1";
        ee.attr("src", src);
        ee.attr("style", "vertical-align:top;");
        htm = $("<div/>").append(ee).html();
        htm = $('<div/>').text(htm).html().replace(/"/g,'&quot;');
        resp.html = '<a href="'+resp.url+'" class="youtube-yvideo-link" style="width: '+w+'px; height: '+h+'px; background: #000 url('+resp.thumbnail_url+') center center no-repeat;" onclick="$(this).replaceWith(\''+htm+'\');return false;"><div style="width:'+(w-4)+'px;height:'+(h-4)+'px;" class="youtube-yvideo-link-div"></div><div class="youtube-yvideo-link-info"><b>'+resp.title+(resp.playlist ? '</b> [playlist]' : '</b>')+'<br /><small>by '+resp.author_name+'</small></div></a>';
      }
      htmlx = html.replace(new RegExp("\\[" + ytvtagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+"\\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp("\\[" + ytvtagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+" \\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp('"'+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+revurl+'"');
      htmlx = htmlx.replace(new RegExp(resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")), '<div style="height:'+h+'px;" class="ytvmbed youtube">'+resp.html+'</div>')
      htmlx = htmlx.replace(new RegExp('"'+revurl.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+resp.url+'"');
      if(html != htmlx) {
        ytv_elems[response.callID].html(htmlx);
        if(window.location.hash.replace(/^#/, "").length > 0) {
          if(ytv_tid) window.clearTimeout(ytv_tid);
          ytv_tid = window.setTimeout("ytv_jumptohash()", 1000);
        }
      }
    }
    function ytvmbed_yt(url, width, callID) {
      src = "http://ytvmbed-js.appspot.com/?url=" + encodeURIComponent(url) + "&callback=ytvmbed_callback&callID=" + encodeURIComponent(callID);
      if(width) src = src + "&maxwidth=" + width + "&maxheight=" + width;
      ytv_loadscript(src);
    }
    $(document).ready(function() {
     det=$('<div class="youtube-yvideo-link-div" />');
     $("body").append(det);
     if(det.css("position")=="absolute") {
      if(ytvyvideo != 0) ytvyvideo=1;
     }
     else ytvyvideo = 0;
     det.remove();
     window.setTimeout(function() {
      var callID=0;
      $(".comment-content,.comment-body,.comment-body-author").each(function() {
        html = " " + $(this).html() + " ";
        if(ytvtag)
          matches = html.match(new RegExp("\\["+ytvtagname+"=(https?:\\/\\/[^\\s<\\/]*youtu\\.*be[^\\]]+)", "g"));
        else
          matches = html.match(/([>\s^]|\[\w+=)(https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+)/g);
        if(matches && matches.length) {
          for(var i=0;i<matches.length;i++) {
            url = matches[i].match(/https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+/);
            ytv_elems[callID] = $(this);
            ytvmbed_yt(url, $(this).width(), callID++);
          }
        }
      });
     }, 500);
    });
    //]]>