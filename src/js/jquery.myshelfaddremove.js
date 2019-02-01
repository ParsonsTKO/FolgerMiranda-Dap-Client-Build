/**
 * jQuery Logout Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2018 Aplyca SAS
 */

(function ($) {
  $.fn.myshelfaddremove = function (options) {
    var defaults = {
      record_action: ".add_shelf_result, .add_shelf, .remove_shelf",
      count_badge: "#myshelf-count-badge"
    }
    var options = $.extend({}, defaults, $.fn.myshelfaddremove.defaults, options);
    return this.each(function () {
      $(this).click(function (event) {
        event.preventDefault()
        var element = $(this)
        var parentElement = element.parent()

        $.get(element.attr("href"), {
            'format': 'json'
          }, function () {}, 'json')
          .done(function ($result) {
            parentElement.children(options.record_action).toggleClass("d-none")
            $(options.count_badge).text($result.count)
          })
          .fail(function () {
            console.error("Operation couln't be executed, please try again!:")
            $('#operationFail').modal('show')
          })
      });
    });
  };
})(jQuery);