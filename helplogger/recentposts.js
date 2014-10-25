function recentpostswidget(json) {
  for (var i = 0; i < numberofposts; i++) {
    var entry = json.feed.entry[i];
    var rpostitle = entry.title.$t;
    var rposturl;
    if (i == json.feed.entry.length) break;
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        rposturl = entry.link[k].href;
        break;
      }
    }
    rpostitle = rpostitle.link(rposturl);
    var readmoreposts = "....";
    readmoreposts = readmoreposts.link(rposturl);
    var  = entry.published.$t;
    var rdyear = rpostdate.substring(0,4);
    var rdmonth = rpostdate.substring(5,7);
    var rdday = rpostdate.substring(8,10);
    var rpostmonth = new Array();
    rpostmonth[1] = "Jan";
    rpostmonth[2] = "Feb";
    rpostmonth[3] = "Mar";
    rpostmonth[4] = "Apr";
    rpostmonth[5] = "May";
    rpostmonth[6] = "Jun";
    rpostmonth[7] = "Jul";
    rpostmonth[8] = "Aug";
    rpostmonth[9] = "Sep";
    rpostmonth[10] = "Oct";
    rpostmonth[11] = "Nov";
    rpostmonth[12] = "Dec";
    if ("content" in entry) {
      var rpostcontent = entry.content.$t;}
    else
    if ("summary" in entry) {
      var rpostcontent = entry.summary.$t;}
    else var rpostcontent = "";
    var re = /<\S[^>]*>/g; 
    rpostcontent = rpostcontent.replace(re, "");
 document.write('<div class="mtrpw">');
    if (standardstyling) document.write('<br/>');
    document.write(rpostitle);
    if (showpostdate == true) document.write(' - ' + rpostmonth[parseInt(rdmonth,10)] + ' ' + rdday + ' ' + rdyear);
 document.write('</div><div class="recent-summary">');
    if (rpostsummary == true) {
      if (standardstyling) document.write('');
      if (rpostcontent.length < numchars) {
         if (standardstyling) document.write('<i>');
         document.write(rpostcontent);
         if (standardstyling) document.write('</i>');}
      else {
         if (standardstyling) document.write('');
         rpostcontent = rpostcontent.substring(0, numchars);
         var quoteEnd = rpostcontent.lastIndexOf(" ");
         rpostcontent = rpostcontent.substring(0,quoteEnd);
         document.write(rpostcontent + ' ' + readmoreposts);
         if (standardstyling) document.write('');}
}
 document.write('</div>');
    if (standardstyling) document.write('');
}
if (!standardstyling) document.write('<div class="footer-rwidget">');
if (standardstyling) document.write('');
document.write('');
if (!standardstyling) document.write('');
}