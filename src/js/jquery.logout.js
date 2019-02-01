/**
 * jQuery Logout Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2018 Aplyca SAS
 */

(function ($) {
  $.fn.logout = function () {

    return this.each(function () {
      $(this).click(function (event) {
        event.preventDefault();
        const urlRemoteLogout = $(this).data("remote-logout-url");
        const urlLogout = $(this).attr("href");


        $.ajax({
          url: urlRemoteLogout,
          dataType: "jsonp"
        })
          .always(function () {

            window.location.href = urlLogout;
          });
      });


    });
  };
})(jQuery);