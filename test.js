    //<![CDATA[
    var yttag = 0; 
    var yttagname = "video";
    var ytlazy = -1;
    //
    function yt_loadscript(filename) {
      var scr=document.createElement('script');
      scr.setAttribute("type","text/javascript");
      scr.setAttribute("src",filename);
      document.getElementsByTagName("head")[0].appendChild(scr);
    }
    function yt_jumptohash() { // reposition to anchor
      window.scrollTo(0, $("#"+window.location.hash.replace(/^#/, "")).offset().top);
    }
    var yt_tid;
    var yt_elems = {};
    //
    function ytmbed_callback(response) {
      var resp = response;
      revurl = resp.url.split("").reverse().join("");
      html = yt_elems[response.callID].html();
      ee = $(resp.html);
      w = parseInt(ee.attr("width"));
      h = parseInt(ee.attr("height"));
      if(ytlazy==1) { // convert to lazy load
        src = ee.attr("src");
        src += ((src.indexOf("?")==-1) ? "?" : "&") + "autoplay=1";
        ee.attr("src", src);
        ee.attr("style", "vertical-align:top;");
        htm = $("<div/>").append(ee).html();
        htm = $('<div/>').text(htm).html().replace(/"/g,'&quot;');
        resp.html = '<a href="'+resp.url+'" class="youtube-lazy-link" style="width: '+w+'px; height: '+h+'px; background: #000 url('+resp.thumbnail_url+') center center no-repeat;" onclick="$(this).replaceWith(\''+htm+'\');return false;"><div style="width:'+(w-4)+'px;height:'+(h-4)+'px;" class="youtube-lazy-link-div"></div><div class="youtube-lazy-link-info"><b>'+resp.title+(resp.playlist ? '</b> [playlist]' : '</b>')+'<br /><small>by '+resp.author_name+'</small></div></a>';
      }
      htmlx = html.replace(new RegExp("\\[" + yttagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+"\\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp("\\[" + yttagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+" \\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp('"'+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+revurl+'"');  // trick to preserve href="url"
      htmlx = htmlx.replace(new RegExp(resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")), '<div style="height:'+h+'px;" class="ytmbed youtube">'+resp.html+'</div>')
      htmlx = htmlx.replace(new RegExp('"'+revurl.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+resp.url+'"');  // trick to preserve href="url"
      if(html != htmlx) {
        yt_elems[response.callID].html(htmlx);
        if(window.location.hash.replace(/^#/, "").length > 0) {
          if(yt_tid) window.clearTimeout(yt_tid);
          yt_tid = window.setTimeout("yt_jumptohash()", 1000);
        }
      }
    }
    function ytmbed_yt(url, width, callID) {
      src = "http://ytmbed-js.appspot.com/?url=" + encodeURIComponent(url) + "&callback=ytmbed_callback&callID=" + encodeURIComponent(callID);
      if(width) src = src + "&maxwidth=" + width + "&maxheight=" + width;
      yt_loadscript(src);
    }
    $(document).ready(function() {
     det=$('<div class="youtube-lazy-link-div" />');
     $("body").append(det);
     if(det.css("position")=="absolute") {
      if(ytlazy != 0) ytlazy=1;
     }
     else ytlazy = 0;
     det.remove();
     window.setTimeout(function() {
      var callID=0;
      $(".comment-content,.comment-body,.comment-body-author").each(function() {
        html = " " + $(this).html() + " ";
        if(yttag)
          matches = html.match(new RegExp("\\["+yttagname+"=(https?:\\/\\/[^\\s<\\/]*youtu\\.*be[^\\]]+)", "g"));
        else
          matches = html.match(/([>\s^]|\[\w+=)(https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+)/g);
        if(matches && matches.length) {
          for(var i=0;i<matches.length;i++) {
            url = matches[i].match(/https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+/);
            yt_elems[callID] = $(this);
            ytmbed_yt(url, $(this).width(), callID++);
          }
        }
      });
     }, 500);
    });
    //]]>