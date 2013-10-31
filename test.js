    //<![CDATA[
    var oetag = 0; 
    var oetagname = "video";
    //
    function oe_loadscript(filename) {
      var scr=document.createElement('script');
      scr.setAttribute("type","text/javascript");
      scr.setAttribute("src",filename);
      document.getElementsByTagName("head")[0].appendChild(scr);
    }
    function oe_jumptohash() { // reposition to anchor
      window.scrollTo(0, $("#"+window.location.hash.replace(/^#/, "")).offset().top);
    }
    var oe_tid;
    var oe_elems = {};
    //
    function oembed_callback(response) {
      var resp = response;
      revurl = resp.url.split("").reverse().join("");
      html = oe_elems[response.callID].html();
      ee = $(resp.html);
      w = parseInt(ee.attr("width"));
      h = parseInt(ee.attr("height"));
        src = ee.attr("src");
        src += ((src.indexOf("?")==-1) ? "?" : "&") + "autoplay=1";
        ee.attr("src", src);
        ee.attr("style", "vertical-align:top;");
        htm = $("<div/>").append(ee).html();
        htm = $('<div/>').text(htm).html().replace(/"/g,'&quot;');
      }
      htmlx = html.replace(new RegExp("\\[" + oetagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+"\\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp("\\[" + oetagname + "="+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+" \\]"), " " + resp.url + " ");
      htmlx = htmlx.replace(new RegExp('"'+resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+revurl+'"');  // trick to preserve href="url"
      htmlx = htmlx.replace(new RegExp(resp.url.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")), '<div style="height:'+h+'px;" class="oembed youtube">'+resp.html+'</div>')
      htmlx = htmlx.replace(new RegExp('"'+revurl.replace("/", "\\/").replace(".", "\\.").replace("?", "\\?")+'"', "g"), '"'+resp.url+'"');  // trick to preserve href="url"
      if(html != htmlx) {
        oe_elems[response.callID].html(htmlx);
        if(window.location.hash.replace(/^#/, "").length > 0) {
          if(oe_tid) window.clearTimeout(oe_tid);
          oe_tid = window.setTimeout("oe_jumptohash()", 1000);
        }
      }
    }
    function oembed_yt(url, width, callID) {
      src = "http://oembed-js.appspot.com/?url=" + encodeURIComponent(url) + "&callback=oembed_callback&callID=" + encodeURIComponent(callID);
      if(width) src = src + "&maxwidth=" + width + "&maxheight=" + width;
      oe_loadscript(src);
    }
    $(document).ready(function() {
     det=$('<div class="youtube-lazy-link-div" />');
     $("body").append(det);
     if(det.css("position")=="absolute") {
      if(oelazy != 0) oelazy=1;
     }
     else oelazy = 0;
     det.remove();
     window.setTimeout(function() {
      var callID=0;
      $(".comment-content,.comment-body,.comment-body-author").each(function() {
        html = " " + $(this).html() + " ";
        if(oetag)
          matches = html.match(new RegExp("\\["+oetagname+"=(https?:\\/\\/[^\\s<\\/]*youtu\\.*be[^\\]]+)", "g"));
        else
          matches = html.match(/([>\s^]|\[\w+=)(https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+)/g);
        if(matches && matches.length) {
          for(var i=0;i<matches.length;i++) {
            url = matches[i].match(/https?:\/\/[^\s<\/]*youtu\.*be[^\s<\]]+/);
            oe_elems[callID] = $(this);
            oembed_yt(url, $(this).width(), callID++);
          }
        }
      });
     }, 500);
    });
    //]]>