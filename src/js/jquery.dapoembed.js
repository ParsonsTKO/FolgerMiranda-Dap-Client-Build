/**
 * jQuery Exit Messages Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2016 Aplyca SAS
 */

(function($) {
  $.fn.dapoembed = function(options) {
    var defaults = {}
    var options = $.extend({}, defaults, $.fn.dapoembed.defaults, options);

    return this.each(function() {
      var url = $(this).data('embed-url');
      if (url) {
        $.getJSON("https://noembed.com/embed?callback=?", {
          "format": "json",
          "url": url
        }, function(data) {
          $(".iframe-noembed").html(data.html);
        });
      }
    });
  };
})(jQuery);
