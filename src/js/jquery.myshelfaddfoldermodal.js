/**
 * jQuery MyshelfNotes Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2018 Aplyca SAS
 */

(function ($) {
  $.fn.myshelfaddfoldermodal = function () {
    var defaults = {
      form: "#add-new-folder",
      error_message: ".block-error"
    }
    var options = $.extend({}, defaults, $.fn.myshelfaddfoldermodal.defaults, options);

    return this.each(function () {
      var modal = $(this)
      modal.find(options.form).on('submit', function (e) {
        e.preventDefault();
        var form = $(this)
        var data = form.serializeArray();
        data.push({
          name: "format",
          value: "json"
        });

        $.post(
            form.attr('action'),
            $.param(data),
            function ($result) {
              if ($result.success) {
                modal.modal('hide');
                window.location.reload()
              }
            },
            'json'
          )
          .fail(function (err) {
            form.find(options.error_message).removeClass('d-none').text(err.responseJSON.error)
          })

        return false;
      })

      modal.on('hidden.bs.modal', function (e) {
        $(this).find(options.error_message).addClass('d-none').text('')
        $(this).find('input[name=tagname]').val('')
      })
    })
  };
})(jQuery);