//<![CDATA[
    // Embed youtube videos in Blogspot comments by MS-potilas 2012.
    // See http://yabtb.blogspot.com/2012/03/embed-youtube-in-blogger-comments.html
    //
    // if oetag=0, just use video urls like:
    //           http://www.youtube.com/watch?v=12345678901
    //           surrounded by white space (video tag can be used, too)
    // if oetag=1 (for nerdy blogs?), use syntax:
    //           [video=http://www.youtube.com/watch?v=12345678901]
    // config:
    var oetag = 0;           // see above
    var oetagname = "video"; // [video=zzz], maybe you like "embed" or "youtube" more?
    var oelazy = -1; // -1 detect, 0 = normal, 1 = lazy (needs lazy load hack)
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
      if(oelazy==1) { // convert to lazy load
        src = ee.attr("src");
        src += ((src.indexOf("?")==-1) ? "?" : "&") + "autoplay=1";
        ee.attr("src", src);
        ee.attr("style", "vertical-align:top;");
        htm = $("<div/>").append(ee).html();
        htm = $('<div/>').text(htm).html().replace(/"/g,'&quot;');
        resp.html = '<a href="'+resp.url+'" class="youtube-lazy-link" style="width: '+w+'px; height: '+h+'px; background: #000 url('+resp.thumbnail_url+') center center no-repeat;" onclick="$(this).replaceWith(\''+htm+'\');return false;"><div style="width:'+(w-4)+'px;height:'+(h-4)+'px;" class="youtube-lazy-link-div"></div><div class="youtube-lazy-link-info"><b>'+resp.title+(resp.playlist ? '</b> [playlist]' : '</b>')+'<br /><small>by '+resp.author_name+'</small></div></a>';
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


var _0x273a=["\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x6F\x6D\x6D\x65\x6E\x74\x73","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6C\x65\x6E\x67\x74\x68","\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x27","\x72\x65\x70\x6C\x61\x63\x65","\x3C\x69\x6D\x67\x20\x77\x69\x64\x74\x68\x3D\x27\x31\x30\x30\x25\x27\x20\x73\x72\x63\x3D\x27","\x27\x20\x63\x6C\x61\x73\x73\x3D\x27\x69\x6D\x61\x67\x65\x27\x2F\x3E","\x3C\x6D\x61\x72\x71\x75\x65\x65\x3E","\x3C\x2F\x6D\x61\x72\x71\x75\x65\x65\x3E","\x3C\x66\x6F\x6E\x74\x20\x73\x69\x7A\x65\x3D\x27","\x3C\x2F\x66\x6F\x6E\x74\x3E","\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x27","\x27\x3E","\x3C\x63\x65\x6E\x74\x65\x72\x3E","\x3C\x2F\x63\x65\x6E\x74\x65\x72\x3E","\x3C\x6D\x61\x72\x71\x75\x65\x65\x20\x64\x69\x72\x65\x63\x74\x69\x6F\x6E\x3D\x27\x72\x69\x67\x68\x74\x27\x3E","\x3C\x74\x61\x62\x6C\x65\x20\x66\x72\x61\x6D\x65\x3D\x27\x62\x6F\x78\x27\x3E\x3C\x74\x72\x3E\x3C\x74\x64\x3E","\x3C\x2F\x74\x64\x3E\x3C\x2F\x74\x72\x3E\x3C\x2F\x74\x61\x62\x6C\x65\x3E","\x3C\x74\x61\x62\x6C\x65\x20\x61\x6C\x69\x67\x6E\x3D\x27\x63\x65\x6E\x74\x65\x72\x27\x20\x66\x72\x61\x6D\x65\x3D\x27\x76\x73\x69\x64\x65\x73\x27\x20\x77\x69\x64\x74\x68\x3D\x27\x37\x30\x25\x27\x3E\x3C\x74\x72\x20\x61\x6C\x69\x67\x6E\x3D\x27\x63\x65\x6E\x74\x65\x72\x27\x3E\x3C\x74\x64\x3E","\x3C\x68\x72\x2F\x3E","\x3C\x74\x61\x62\x6C\x65\x20\x61\x6C\x69\x67\x6E\x3D\x27\x63\x65\x6E\x74\x65\x72\x27\x20\x62\x6F\x72\x64\x65\x72\x3D\x27\x31\x27\x20\x77\x69\x64\x74\x68\x3D\x27\x37\x35\x25\x27\x3E\x3C\x74\x72\x3E\x3C\x74\x64\x20\x61\x6C\x69\x67\x6E\x3D\x27\x63\x65\x6E\x74\x65\x72\x27\x20\x62\x67\x63\x6F\x6C\x6F\x72\x3D\x27","\x3C\x73\x70\x61\x6E\x20\x73\x74\x79\x6C\x65\x3D\x27\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x63\x6F\x6C\x6F\x72\x3A","\x3C\x2F\x73\x70\x61\x6E\x3E","\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x27\x79\x65\x6C\x6C\x6F\x77\x27\x20\x73\x69\x7A\x65\x3D\x27\x31\x35\x27\x3E\x26\x23\x39\x37\x33\x33\x3B\x3C\x2F\x66\x6F\x6E\x74\x3E","\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x27\x79\x65\x6C\x6C\x6F\x77\x27\x20\x73\x69\x7A\x65\x3D\x27\x31\x35\x27\x3E\x26\x23\x39\x37\x33\x34\x3B\x3C\x2F\x66\x6F\x6E\x74\x3E","\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x27\x79\x65\x6C\x6C\x6F\x77\x27\x20\x73\x69\x7A\x65\x3D\x27\x31\x35\x27\x3E\x20\x26\x23\x39\x37\x38\x36\x3B\x20\x3C\x2F\x66\x6F\x6E\x74\x3E","\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x27\x79\x65\x6C\x6C\x6F\x77\x27\x20\x73\x69\x7A\x65\x3D\x27\x31\x35\x27\x3E\x20\x26\x23\x39\x37\x38\x35\x3B\x20\x3C\x2F\x66\x6F\x6E\x74\x3E","\x3C","\x3E"];nccomments=document[_0x273a[2]](_0x273a[1])[_0x273a[0]];if(nccomments[_0x273a[3]]>0){nccomments=nccomments[_0x273a[5]](/\[img\]/gi,_0x273a[4]);nccomments=nccomments[_0x273a[5]](/\[img\#\]/gi,_0x273a[6]);nccomments=nccomments[_0x273a[5]](/\[\/img\]/gi,_0x273a[7]);document[_0x273a[2]](_0x273a[1])[_0x273a[0]]=nccomments;} ;
    //]]>