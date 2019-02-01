/**
 * jQuery MyshelfNotes Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2018 Aplyca SAS
 */

(function ($) {
  $.fn.myshelfnotes = function (options) {
    var defaults = {}
    var options = $.extend({}, defaults, $.fn.myshelfnotes.defaults, options);

    return this.each(function () {
      var $this = $(this);

      var input = $this.find('[data-note-input]')
      var originInput = input.clone()
      var formNote = $this.find('[data-note-form]')
      var actions = $this.find('[data-note-actions]')
      var discardAction = actions.find('[data-note-actions-discard]')
      var editActionbtn = actions.find('[data-note-actions-edit]')
      var deleteActionbtn = actions.find('[data-note-actions-delete]')
      var paragrapahfNote = $this.find('p.note-form__note')


      function showViewForm() {
        paragrapahfNote.removeClass('d-none')
        input
          .addClass('d-none')
          .val($.trim(paragrapahfNote.text()))
        $this.find('[data-note-actions] > *').toggleClass('d-none')
        actions.addClass('is-active')
      }

      function showViewFormEdit() {
        paragrapahfNote.addClass('d-none')
        input
          .val($.trim(originInput.val()))
          .removeClass('d-none')
        $this.find('[data-note-actions] > *').toggleClass('d-none')
        input.focus().select()
      }

      input.on('focus', function () {
        actions.addClass('is-active')
      })
      input.on('focusout', function () {
        if ($(this).val() == '') {
          actions.removeClass('is-active')
          discardAction.click();
        }
      })

      discardAction.click(function (e) {
        e.preventDefault()
        if ($.trim(originInput.val()) == '') {
          input.val("")
          actions.removeClass('is-active')
        } else {
          showViewForm()
        }
      })

      editActionbtn.click(function (e) {
        e.preventDefault()
        showViewFormEdit()
      })

      deleteActionbtn.click(function (e) {
        e.preventDefault()
        $.post(
            $(this).attr('href'),
            $(this).serialize(),
            function (response) {},
            'json'
          ).done(function ($result) {
            originInput.val('')
            paragrapahfNote.text(originInput.val())
            showViewFormEdit()
            input.blur()
          })
          .fail(function (err) {
            console.log(err)
            $('#operationFail').modal('show')
          })
      })

      formNote.on('submit', function (e) {
        e.preventDefault()
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function (response) {},
            'json'
          ).done(function ($result) {
            originInput.val(input.val())
            paragrapahfNote.text(originInput.val())
            showViewForm()
          })
          .fail(function (err) {
            console.log(err)
            $('#operationFail').modal('show')
          })
      })

      $(this).find('textarea[data-autoresize]').each(function () {
        var offset = this.offsetHeight - this.clientHeight;

        $(this).on('keyup input focus', function () {
          $(this).css('height', 'auto').css('height', this.scrollHeight + offset);
        }).removeAttr('data-autoresize');
      });
    });
  };
})(jQuery);