/* Facemood Emoticons For Blogger Threaded Comments
 * By Helplogger
 * Url: http://helplogger.blogspot.com
 */
a = document.getElementById('comment-holder');
if (a) {
	b = a.getElementsByTagName("p");
	for (i = 0; i < b.length; i++) {
		if (b.item(i).getAttribute('CLASS') == 'comment-content') {
			theText = b.item(i).innerHTML.replace(/:\)\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/laugh.gif'/>");

    theText = theText.replace(/=d&gt;/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/suicide-1.gif'/>");

    theText = theText.replace(/:d/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/biggrin2.gif'/>");

    theText = theText.replace(/:p/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/blum.gif'/>");

    theText = theText.replace(/:\(\(/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/cray-1.gif'/>");

    theText = theText.replace(/:\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/smile3.gif'/>");

    theText = theText.replace(/:\(/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/sad3.gif'/>");

    theText = theText.replace(/:-\?/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/eusa_think.gif'/>");

    theText = theText.replace(/d\(/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/doh-1.gif'/>");

    theText = theText.replace(/:-o/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/shok.gif'/>");

    theText = theText.replace(/:-f/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/flowers1-1.gif'/>");

    theText = theText.replace(/:-ss/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/unsure.gif'/>");

    theText = theText.replace(/b-\(/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/threaten-1.gif'/>");

    theText = theText.replace(/h-\(/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/help2.gif'/>");

    theText = theText.replace(/g-\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/good-1.gif'/>");

    theText = theText.replace(/5-\p/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/beee-1.gif'/>");

    theText = theText.replace(/y-\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/yahoo2-1.gif'/>");

    theText = theText.replace(/c-\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/crazy3-1.gif'/>");

    theText = theText.replace(/s-\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/spiteful.gif'/>");

    theText = theText.replace(/d-\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/drinks-1.gif'/>");

    theText = theText.replace(/w-\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/cheer-1.gif'/>");

    theText = theText.replace(/:-\h/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/hi-1.gif'/>");

    theText = theText.replace(/:X/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/give_heart-1.gif'/>");

    theText = theText.replace(/:\-\*/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/air_kiss3.gif'/>");

    theText = theText.replace(/=\)\)/gi, "<img src='http://i1065.photobucket.com/albums/u389/treeofwisdom4/Smileys/rofl-1.gif'/>");
		}
	}
}
