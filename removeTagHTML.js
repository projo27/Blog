//<![CDATA[
      function removeHtmlTag(strx, chop) {
        if (strx.indexOf("<") !== -1) {
          var s = strx.split("<");
          for (var i=0; i < s.length; i++){
            if( s[i].indexOf(">")!=-1){
              s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length);
            }
          }
          strx = s.join("");
        }
		strx = strx.trim();
		strx = strx.replace(/\n/gi, "<br />");
        chop = (chop < strx.length-1) ? chop : strx.length-2;
        while (strx.charAt(chop-1)!=' ' && strx.indexOf(' ',chop)!=-1) chop++;
        strx = strx.substring(0,chop-1);
        return strx+'...';
      }
//]]>
