/**
 * jQuery Exit Messages Plugin 1.0
 *
 * http://www.aplyca.com/
 *
 * Copyright (c) 2016 Aplyca SAS
 */

(function ($) {
  $.fn.daterangeslider = function (options) {
    var defaults = {
      slider: "[data-range-slider-year-graph]",
      range: "range-slider-year-graph",
      reset: "[data-range-silder-year-reset]",
      inputs: ".rangeslider-year__field"
    }
    var options = $.extend({}, defaults, $.fn.daterangeslider.defaults, options);

    return this.each(function () {
      const slider = $(this).find(options.slider)[0];
      const fields = $(this).find(options.inputs);

      noUiSlider.create(slider, {
        range: {
          min: [parseInt($(slider).data(options.range).split(",")[0])],
          max: [parseInt($(slider).data(options.range).split(",")[1])],
        },
        start: fields.map(function () {
          return $(this).val();
        }).get(),
        connect: true,
        pips: {
          mode: 'positions',
          values: [0, 100],
          density: 2,
        },
      });

      slider.noUiSlider.on('update', function (values, handle) {
        const value = values[handle];
        fields.eq(handle).val(Math.round(value));
      });

      slider.noUiSlider.on('end', function (values, handle) {
        fields.eq(handle).change();
      });

      fields.on('change', function () {
        slider.noUiSlider.set(fields.map(function () {
          return this.value;
        }).get());
      });

      $(this).find(options.reset).click(function () {
        slider.noUiSlider.set(fields.map(function () {
          return $(this).data("initial");
        }).get());

        setTimeout(function working() {
          fields.change();
        }, 500);
      });
    });
  };
})(jQuery);