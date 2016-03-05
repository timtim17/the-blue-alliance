// General JS for all pages
$(document).ready(function(){
	// Jumping to page section
  $('.smooth-scroll').bind('click',function(event){
    var $anchor = $(this);
    var $navbar_position = $('.navbar').css('top');
    var $navbar_height = parseInt($('.navbar').css('height'));
    var $offset = 0;

    // Takes care of changing navbar size/position due to @media width
    if ($navbar_position == '0px') {
      $offset = $navbar_height + 10;
    }

    var target_offset = $($anchor.attr('href')).offset();
    if (target_offset == null) {
      var pixels = 0;
    } else {
      var pixels = target_offset.top - $offset;
    }

    $('html, body').stop().animate({
        scrollTop: pixels
    }, 250);
    event.preventDefault();
  });

  // Handle linking to tabs
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });

	// Fancybox
	$(".fancybox").fancybox();

	// Tooltips
	$("[rel=tooltip]").tooltip();

	// Fitvids
	$('.fitvids').fitVids();

	// JWPlayer
	if ($("#tbavideo_container").length != 0) {
    jwplayer("tbavideo_container").setup({
      players: [
          { type: "flash", src: "/jwplayer/player.swf" },
          { type: "html5" }
      ],
      provider: "http",
      controlbar: "bottom",
    });
	}

	// Converting match time to local time
  var weekday = new Array(7);
  weekday[0]=  "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";
	$('.tba-match-time-utc').each(function () {
	  var matchTime = new Date($(this).text());  // Converts UTC to local time
	  if (!isNaN(matchTime)) {
      var hour24 = matchTime.getHours();
      var hour12 = (hour24 % 12);
      if (hour12 == 0) {
        hour12 = 12;
      }
      var minute = matchTime.getMinutes();
      var matchTimeStr = weekday[matchTime.getDay()] + ' ' + hour12 + ':' + ((''+minute).length<2 ? '0' :'')+minute;
      matchTimeStr += hour24 < 12 ? ' AM' : ' PM';

      $(this).text(matchTimeStr);
      $(this).css('display', 'inline');
	  }
	});

  // For 4/1
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd == 1 && mm == 4) {
    var urls = ['http://i.imgur.com/hGmvG8L.jpg', 'http://i.imgur.com/bC3gvxa.jpg', 'http://i.imgur.com/8lLN9jB.jpg', 'http://i.imgur.com/qiRHQtB.jpg', 'http://i.imgur.com/zWyyZ2N.jpg', 'http://i.imgur.com/ZUcX3Hw.jpg'];
    var randInt = Math.floor(Math.random() * 6);
    var url = urls[randInt];
    $("#robot-image").html('<div class="thumbnail carousel team-media-carousel"><a href="' + url + '" target="_blank"><img src="' + url + '" alt="April Fools!"></a></div>');
  }
});
