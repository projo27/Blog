var numComments = numComments || 5,
    avatarSize = avatarSize || 60,
    characters = characters || 40,
    defaultAvatar = defaultAvatar || "http://4.bp.blogspot.com/-SRSVCXNxbAc/UrbxxXd06YI/AAAAAAAAFl4/332qncR9pD4/s1600/default-avatar.jpg",
    defaultAvatar2 = defaultAvatar2 || "http://1.bp.blogspot.com/-7bkcAKdpGXI/UrbyQRqvSKI/AAAAAAAAFmI/oBv_yMeYnMQ/s1600/blogger.png",
    moreLinktext = moreLinktext || " More &raquo;
",
    showAvatar = (typeof showAvatar === 'undefined') ? true : showAvatar,
    showMorelink = (typeof showMorelink === 'undefined') ? false : showMorelink,
    roundAvatar = (typeof roundAvatar === 'undefined') ? true : roundAvatar,
    hideCredits = (typeof hideCredits === 'undefined') ? false : roundAvatar;

function helploggercomments(helplogger) {
    var commentsHtml;
    commentsHtml = '<ul class="helploggercomments">';
    for (var i = 0; i < numComments; i++) {
        var commentlink, authorName, authorAvatar, avatarClass;
        if (i == helplogger.feed.entry.length) break;
        commentsHtml += "<li>";
        var entry = helplogger.feed.entry[i];
        for (var l = 0; l < entry.link.length; l++) {
            if (entry.link[l].rel == 'alternate') {
                commentlink = entry.link[l].href
            }
        }
        for (var a = 0; a < entry.author.length; a++) {
            authorName = entry.author[a].name.$t;
            authorAvatar = entry.author[a].gd$image.src
        }
        if (authorAvatar.indexOf("/s1600/") != -1) {
            authorAvatar = authorAvatar.replace("/s1600/", "/s" + avatarSize + "-c/")
        } else if (authorAvatar.indexOf("/s220/") != -1) {
            authorAvatar = authorAvatar.replace("/s220/", "/s" + avatarSize + "-c/")
        } else if (authorAvatar.indexOf("/s512-c/") != -1 && authorAvatar.indexOf("http:") != 0) {
            authorAvatar = "http:" + authorAvatar.replace("/s512-c/", "/s" + avatarSize + "-c/")
        } else if (authorAvatar.indexOf("blogblog.com/img/b16-rounded.gif") != -1) {
            if (defaultAvatar.indexOf("blogger.com") != -1) {
            authorAvatar = defaultAvatar2 + avatarSize
            } else {
                authorAvatar = defaultAvatar2
            }
        } else if (authorAvatar.indexOf("blogblog.com/img/openid16-rounded.gif") != -1) {
            authorAvatar = "http://2.bp.blogspot.com/-VgnInuIUKBU/UrbzyXTYWRI/AAAAAAAAFmU/3f_Vfj3TI6A/s" + avatarSize + "/openid.png"
        } else if (authorAvatar.indexOf("blogblog.com/img/blank.gif") != -1) {
            if (defaultAvatar.indexOf("gravatar.com") != -1) {
                authorAvatar = defaultAvatar + "&s=" + avatarSize
            } else {
                authorAvatar = defaultAvatar
            }
        } else {
            authorAvatar = authorAvatar
        }
        if (showAvatar == true) {
            if (roundAvatar == true) {
                avatarClass = "avatarRound"
            } else {
                avatarClass = ""
            }
            commentsHtml += "<div class=\"avatarImage " + avatarClass + "\"><img class=\"" + avatarClass + "\" src=\"" + authorAvatar + "\" alt=\"" + authorName + "\" width=\"" + avatarSize + "\" height=\"" + avatarSize + "\"/></div>"
        }
        commentsHtml += "<a href=\"" + commentlink + "\">" + authorName + "</a>";
        var commHTML = entry.content.$t;
        var commBody = commHTML.replace(/(<([^>]+)>)/ig, "");
        if (commBody != "" && commBody.length > characters) {
            commBody = commBody.substring(0, characters);
            commBody += "&hellip;
			";
            if (showMorelink == true) {
                commBody += "<a href=\"" + commentlink + "\">" + moreLinktext + "</a>"
            }
        } else {
            commBody = commBody
        }
        commentsHtml += "<span>" + commBody + "</span>";
        commentsHtml += "</li>"
    }
    commentsHtml += '</ul>';
    var hideCSS = "";
    if (hideCredits == true) {
        hideCSS = "visibility:hidden;
		"
    }
    commentsHtml += "<span style=\"font-size:10px;
	display:block;
	text-align:right;
	" + hideCSS + "\">Widget by<a href=\"http://helplogger.blogspot.com/\"> Helplogger</a></span>";
    document.write(commentsHtml)
}