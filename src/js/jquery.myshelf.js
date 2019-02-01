/**
 * jQuery Logout Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2018 Aplyca SAS
 */

(function ($) {
  $.fn.myshelf = function (options) {
    var defaults = {
      record: "[data-myshelf-add-remove]",
      record_remove: "a.record-remove-myshelf",
      record_add: "a.record-add-myshelf"
    }
    var options = $.extend({}, defaults, $.fn.myshelf.defaults, options);

    return this.each(function () {
      var countBadge = $(this)

      $.getJSON(
          countBadge.data("url")
        )
        .done(function ($result) {
          countBadge.text($result.count)
          countBadge.removeClass("d-none")
          $(options.record).each(function () {
            if ($.inArray($(this).data("myshelf-add-remove"), $result.records) !== -1) {
              $(this).children(options.record_remove).removeClass("d-none")
            } else {
              $(this).children(options.record_add).removeClass("d-none")
            }
          });
        });
    });
  };
})(jQuery);