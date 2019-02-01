$(document).ready(function () {
  if (
    (sessionStorage && sessionStorage.getItem('beenherelately') !== '1') ||
    window.location.href.indexOf('heythereshowmethemessage') !== -1
  ) {
    const firstOnlyEl = document.getElementById('firstonly');
    firstOnlyEl &&
      document
      .getElementById('firstonly')
      .setAttribute('style', 'display:block;');
    sessionStorage.setItem('beenherelately', '1');
  }

  function initRevealer() {
    $('[data-revealer]').each(function () {
      const comp = $(this);
      const visibletext = comp.find('[data-revealer-label]');
      const label = visibletext.text();
      const labelRevealed = comp.attr("data-label-after-revealed");
      const block = $(`#${comp.data('revealer')}`);
      comp.on('click', function () {
        if (comp.hasClass('is-active')) {
          comp.removeClass('is-active');
          visibletext.text(label);
        } else {
          comp.addClass('is-active');
          visibletext.text(
            (labelRevealed != null && labelRevealed != "" && labelRevealed != undefined) ? labelRevealed : label);
        }
        block.toggleClass('is-active').slideToggle();
      });
    });
  }

  function initDropdownFor() {
    $('[data-dropdown-for]').on('click', function (event) {
      const target = $($(this).data('dropdown-for'));
      event.stopPropagation();
      target.addClass('is-active');
    });
    $('body').on('click', function () {
      $('.js-dropdown').removeClass('is-active');
    });
  }

  function initSwiper() {
    $('[data-swiper]').each(function () {
      const comp = $(this);
      const sliderType = comp.data('swiper') || 'rail';
      const slidesPerView = comp.data('slides-per-view') || 3;
      const DEFAULT_NAV = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
      const CONFIG = {
        rail: {
          slidesPerView: slidesPerView,
          spaceBetween: 0,
          navigation: DEFAULT_NAV,
          breakpoints: {
            1023: {
              slidesPerView: slidesPerView - 1 < 1 ? 1 : slidesPerView - 1,
            },
            768: {
              slidesPerView: slidesPerView - 2 < 1 ? 1 : slidesPerView - 2,
            },
            414: {
              slidesPerView: slidesPerView - 3 < 1 ? 1 : slidesPerView - 3,
            },
          },
        },
        single: {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: DEFAULT_NAV,
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
        },
      };
      const swiper = new Swiper(this, CONFIG[sliderType]);
    });
  }

  function initResultViewmodes() {
    const modes = ['row', 'grid'];
    $('[data-viewmode]').each(function () {
      const comp = $(this);
      const target = $(`#${comp.data('viewmode')}`);
      comp.find('button').on('click', function () {
        const button = $(this);
        const mode = button.data('mode');
        button
          .addClass('is-active')
          .siblings('button')
          .removeClass('is-active');
        modes.forEach(mode => {
          target.removeClass(`is-${mode}`);
        });
        target.addClass(`is-${mode}`);
      });
    });
  }

  function initActionsAccordionRecordsMySelf() {
    $("[data-expanded-accordion]").click(function (e) {
      e.preventDefault();
      var $accordion = $(this).data('expanded-accordion');
      $($accordion + ' .collapse').collapse('show');
    });

    $("[data-collapse-accordion]").click(function (e) {
      e.preventDefault();
      var $accordion = $(this).data('collapse-accordion');
      $($accordion + ' .collapse').collapse('hide');
    });
  }

  if (document.referrer.search('/search') != -1 && window.history.length > 2) {
    $('.backToSearchButton').show();
    $('.backToSearchButton').on('click', function (e) {
      e.preventDefault();
      window.history.back();
    });
  }

  initDropdownFor();
  initRevealer();
  initSwiper();
  initResultViewmodes();
  initActionsAccordionRecordsMySelf();

  $("[data-range-slider-year]").daterangeslider({});
  $("form[name='filter']").dapfacetsfilter({});
  $(".iframe-noembed").dapoembed({});
  $('[data-logout]').logout();
  $('#myshelf-count-badge').myshelf();
  $('.add_shelf_result, .add_shelf, .remove_shelf').myshelfaddremove();
  $('[data-note]').myshelfnotes();
  $('#modalRenameFolder').filldatamodal({
    tagIdList: ['shelftag', 'ispublic', 'tagname'],
    tagIdToFocusSelect: ['tagname']
  });
  $('#modalRemoveFolder').filldatamodal({
    tagIdList: ['tagname', 'shelftag']
  });
  $("#newFolder").myshelfaddfoldermodal();

});