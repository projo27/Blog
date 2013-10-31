    //<![CDATA[
    var yvtag = 0; 
    var yvtagname = "video";
    //
    function yv_loadscript(filename) {
      var scr=document.createElement('script');
      scr.setAttribute("type","text/javascript");
      scr.setAttribute("src",filename);
      document.getElementsByTagName("head")[0].appendChild(scr);
    }
    function yv_jumptohash() { // reposition to anchor
      window.scrollTo(0, $("#"+window.location.hash.replace(/^#/, "")).offset().top);
    }
    var yv_tid;
    var yv_elems = {};
    //
    function yvmbed_callback(response) {
      var resp = response;
      revurl = resp.url.split("").reverse().join("");
      html = yv_elems[response.callID].html();
      ee = $(resp.html);
      w = parseInt(ee.attr("width"));
      h = parseInt(ee.attr("height"));
      if(yvlazy==1) { // convert to lazy load
        src = ee.attr("src");
        src += ((src.indexOf("?")==-1) ? "?" : "&") + "autoplay=1";
        ee.attr("src", src);
        ee.attr("style", "vertical-align:top;");
        htm = $("<div/>").append(ee).html();
        htm = $('<div/>').text(htm).html().replace(/"/g,'&quot;');
        resp.html = '<a href="'+resp.url+'" class="youtube-lazy-link" style="width: '+w+'px; height: '+h+'px; background: #000 url('+resp.thumbnail_url+') center center no-repeat;" onclick="$(this).replaceWith(\''+htm+'\');return false;"><div style="width:'+(w-4)+'px;height:'+(h-4)+'px;" class="youtube-lazy-link-div"></div><div class="youtube-lazy-link-info"><b>'+resp.title+(resp.playlist ? '</b> [playlist]' : '</b>')+'<br /><small>by '+resp.author_name+'</small></div></a>';
      }
      htmlx = html.replace(new RegExp("\\[" + yvtagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+"\\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp("\\[" + yvtagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+" \\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp('"'+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+revurl+'"');  // trick to preserve href="url"
      htmlx = htmlx.replace(new RegExp(resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")), '<div style="height:'+h+'px;" class="yvmbed youtube">'+resp.html+'</div>')
      htmlx = htmlx.replace(new RegExp('"'+revurl.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+resp.url+'"');  // trick to preserve href="url"
      if(html != htmlx) {
        yv_elems[response.callID].html(htmlx);
        if(window.location.hash.replace(/^#/, "").length > 0) {
          if(yv_tid) window.clearTimeout(yv_tid);
          yv_tid = window.setTimeout("yv_jumptohash()", 1000);
        }
      }
    }
    function yvmbed_yt(url, width, callID) {
      src = "http://yvmbed-js.appspot.com/?url=" + encodeURIComponent(url) + "&callback=yvmbed_callback&callID=" + encodeURIComponent(callID);
      if(width) src = src + "&maxwidth=" + width + "&maxheight=" + width;
      yv_loadscript(src);
    }
    $(document).ready(function() {
     det=$('<div class="youtube-lazy-link-div" />');
     $("body").append(det);
     if(det.css("position")=="absolute") {
      if(yvlazy != 0) yvlazy=1;
     }
     else yvlazy = 0;
     det.remove();
     window.setTimeout(function() {
      var callID=0;
      $(".comment-content,.comment-body,.comment-body-author").each(function() {
        html = " " + $(this).html() + " ";
        if(yvtag)
          matches = html.match(new RegExp("\\["+yvtagname+"=(https?:\\/\\/[^\\s<\\/]*youtu\\.*be[^\\]]+)", "g"));
        else
          matches = html.match(/([>\s^]|\[\w+=)(https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+)/g);
        if(matches && matches.length) {
          for(var i=0;i<matches.length;i++) {
            url = matches[i].match(/https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+/);
            yv_elems[callID] = $(this);
            yvmbed_yt(url, $(this).width(), callID++);
          }
        }
      });
     }, 500);
    });
    //]]>