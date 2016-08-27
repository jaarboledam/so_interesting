export default function smoothScroll() {
  var $elements = $('.do-scroll');

  $elements.on('click', function (e) {
  	e.preventDefault();
  	var target = $(this).data('scroll-to');
  	var offset = 0;

  	if (target !== undefined) {
  		if (isNaN(parseInt(target))) {
  			$(target).offset().top;
  		} else {
  			offset = target;
  		}

  	  $('html, body').animate({
  	    scrollTop: offset
  	  }, 1000);
  	}
  });
}
