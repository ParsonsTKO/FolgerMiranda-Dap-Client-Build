/**
 * jQuery Exit Messages Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2016 Aplyca SAS
 */

(function ($) {
  $.fn.dapfacetsfilter = function (options) {
    var defaults = {}
    var options = $.extend({}, defaults, $.fn.dapfacetsfilter.defaults, options);

    return this.each(function () {
      const element = $(this);
      element.find("input.reload").on('change', function (event) {
        element.trigger("submit");
      });
    });
  };
})(jQuery);