jQuery(document).ready(function($) {
    $('body').append('<img style="visibility:hidden;
	" class="pinitloadimg" src="' + custom_pinit_button + '" >');
    $('#pinit-img-button').hide();
    var l;
    var m;
    var n;
    $('.pinitloadimg').load(function() {
        m = $('.pinitloadimg').outerWidth(true);
        n = $('.pinitloadimg').outerHeight(true);
        $('.pinitloadimg').remove()
    });
    var o = $('#pinit-img-button').html().indexOf("helplogger.blogspot.com");
    o != -1 && hoverCheck();

    function hoverCheck() {
        $('.entry-content img,.post-body img,.entry-summary img').not('.nopin,.nopin img').mouseenter(function() {
            $('.pinit-button-hover').css("visibility", "hidden");
            clearTimeout(l);
            var a = $(this);
            var b = parseInt(a.css("margin-top"));
            var c = parseInt(a.css("margin-left"));
            var d;
            var e;
            switch (pinit_button_position) {
                case 'center':
                    d = a.position().top + a.outerHeight(true) / 2 - n / 2;
                    e = a.position().left + a.outerWidth(true) / 2 - m / 2;
                    break;
                case 'topright':
                    d = a.position().top + b + 5;
                    e = a.position().left + c + a.outerWidth() - m - 5;
                    break;
                case 'topleft':
                    d = a.position().top + b + 5;
                    e = a.position().left + c + 5;
                    break;
                case 'bottomright':
                    d = a.position().top + b + a.outerHeight() - n - 5;
                    e = a.position().left + c + a.outerWidth() - m - 5;
                    break;
                case 'bottomleft':
                    d = a.position().top + b + a.outerHeight() - n - 5;
                    e = a.position().left + c + 5;
                    break
            }
            var f = a.prop('src');
            var g = a.closest('.post,.hentry,.entry').find('.post-title,.entry-title,.entry-header');
            var h = g.text();
            if (typeof pinit_button_pref === 'undefined') {
                pinit_button_pref = ''
            }
            if (typeof bs_pinit_button_suf === 'undefined') {
                bs_pinit_button_suf = ''
            }
            if (g.find('a').length) {
                pinitURL = g.find('a').attr('href').replace(/\#.+\b/gi, "")
            } else {
                pinitURL = $(location).attr('href').replace(/\#.+\b/gi, "")
            }
            var i = '<div class="pinit-button-hover" style="display:none;
			position: absolute;
			z-index: 9999;
			" ><a href="http://pinterest.com/pin/create/button/?url=' + pinitURL + '&media=' + f + '&description=' + pinit_button_pref + h + bs_pinit_button_suf + '" style="display:block;
			outline:none;
			" target="_blank"><img class="pinimg" style="-moz-box-shadow:none;
			-webkit-box-shadow:none;
			-o-box-shadow:none;
			box-shadow:none;
			background:transparent;
			margin: 0;
			padding: 0;
			border:0;
			" src="' + custom_pinit_button + '" title="Pin on Pinterest" ></a></div>';
            var j = a.parent().is('a') ? a.parent() : a;
            if (!j.next().hasClass('pinit-button-hover')) {
                j.after(i);
                if (typeof l === 'undefined') {
                    j.next('.pinit-button-hover').attr("onmouseover", "this.style.opacity=1;
					this.style.visibility='visible'")
                } else {
                    j.next('.pinit-button-hover').attr("onmouseover", "this.style.opacity=1;
					this.style.visibility='visible';
					clearTimeout(pinitOnHover)")
                }
            }
            var k = j.next(".pinit-button-hover");
            k.css({
                "top": d,
                "left": e
            });
            k.css("visibility", "visible");
            k.stop().fadeTo(300, 1.0, function() {
                $(this).show()
            })
        });
        $('.entry-content img,.post-body img,.entry-summary img').on('mouseleave', function() {
            if ($.browser.msie) {
                var a = $(this).next('.pinit-button-hover');
                var b = $(this).parent('a').next('.pinit-button-hover');
                l = setTimeout(function() {
                    a.stop().css("visibility", "hidden");
                    b.stop().css("visibility", "hidden")
                }, 3000)
            } else {
                $('.pinit-button-hover').stop().fadeTo(0, 0.0)
            }
        })
    }
});