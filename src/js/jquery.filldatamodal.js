/**
 * jQuery Logout Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2018 Aplyca SAS
 */

(function ($) {
  $.fn.filldatamodal = function (options) {
    var defaults = {
      tagIdList : [],
      tagIdToFocusSelect: []
    }
    var options = $.extend({}, defaults, $.fn.filldatamodal.defaults, options);
    return this.each(function () {
      $(this).on('shown.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var modal = $(this)

        options.tagIdList.forEach(function (val) {
          var tag = modal.find('#' + val)
          if (tag.length !== 0) {
            if (tag.get(0).nodeName === 'INPUT') {
              tag.val(button.data(val))
            } else {
              tag.text(button.data(val))
            }
          }
        })

        options.tagIdToFocusSelect.forEach(function (val) {
          modal.find('#' + val).focus().select()
        });
      })
    });
  };
})(jQuery);