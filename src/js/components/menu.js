!function ($) {
  var $wrapper   = $('.site-bar-wrapper');
  var $topbar    = $('.site-topbar');
  var $navbar    = $('.site-navbar');
  var $content   = $('.site-content-wrapper');
  var $btnMenu   = $topbar.find('#menuButton');
  var $btnSearch = $topbar.find('#searchButton');
  var $searchbox = $topbar.find('div.site-topbar-searchbox');

  function toggleNavbar () {
    if ($navbar.hasClass('is-visible')) {
      $content.removeClass('offset');
      $navbar.removeClass('is-visible');
      $(this).removeClass('active')
    } else {
      $content.addClass('offset');
      $navbar.addClass('is-visible');
      $(this).addClass('active')
    }
  }

  function showSearchbox () {
    if ($searchbox.hasClass('visible')) {
      Foundation.Motion.animateOut($searchbox, 'fade-out', function () {
        $(this).removeClass('visible');
      });
    } else {
      Foundation.Motion.animateIn($searchbox, 'fade-in', function () {
        $(this).addClass('visible');
      });
    }
  }

  function scrollHandler () {
    var scroll = $(document).scrollTop();

    if (scroll > $topbar.height()) {
      $navbar.find('.site-navbar-header').slideUp();
      $wrapper.addClass('fixed-topbar');
    } else {
      $navbar.find('.site-navbar-header').slideDown();
      $wrapper.removeClass('fixed-topbar');
    }
  }

  $btnMenu.on('click', toggleNavbar);
  $btnSearch.on('click', showSearchbox);
  $(window).on('scroll', scrollHandler);

}(jQuery);
