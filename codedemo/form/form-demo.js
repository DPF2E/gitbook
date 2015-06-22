/**
 * Created by madlord on 15/3/17.
 */

try {
    if (module.exports) {
        var Zepto=require('zepto');
    }
} catch(e) {

}

(function ($) {
    function initNumberStepper() {

        var util = {
            'refs': {
                '$input': null,
                '$minus': null,
                '$plus': null
            },
            'dom': null,
            'defaultProps': {
                min: 0,
                step: 1,
                value: 0
            },
            'max': function (val) {

                if (val == undefined) {
                    var max = parseInt(this.refs.$input.attr('data-max'));
                    return max;
                } else {
                    if (isNaN(parseInt(val))) {
                        this.refs.$input.removeAttr('data-max');
                    } else {
                        if (parseInt(val) >= this.min()) this.refs.$input.attr('data-max', parseInt(val));
                    }
                    this.dom.trigger('refresh');
                }
            },

            "min": function (val) {

                if (val == undefined) {
                    var min = parseInt(this.refs.$input.attr('data-min')) || this.defaultProps.min;
                    return min;
                } else {
                    if (isNaN(parseInt(val))) {
                        this.refs.$input.removeAttr('data-min');
                    } else {
                        if (parseInt(val) <= this.max()) this.refs.$input.attr('data-min', parseInt(val));
                    }
                    this.dom.trigger('refresh');
                }
            },

            'step': function (val) {

                if (val == undefined) {
                    var step = parseInt(this.refs.$input.attr('data-step')) || this.defaultProps.step;
                    return step;
                } else {
                    if (isNaN(parseInt(val))) {
                        this.refs.$input.attr('data-step', 1);
                    } else {
                        this.refs.$input.attr('data-step', parseInt(val));
                    }
                    this.dom.trigger('refresh');
                }
            },

            'value': function (val) {

                var _min = this.min(), _max = this.max();
                if (val == undefined) {
                    var value = parseInt(this.refs.$input.val()) || _min;
                    if (!isNaN(_max) && value > _max) value = _max;
                    this.refs.$input.val(value);
                    return value;
                } else {
                    var value = parseInt(val);
                    if (!isNaN(value)) {
                        if (value >= _min) {
                            if (isNaN(_max) || value <= _max) {
                                this.refs.$input.val(value).attr('value', value);
                                this.dom.trigger('refresh');
                            }
                        }
                    }
                }
            },

            "validateStepperState": function () {
                var min = this.min();
                var max = this.max();
                var step = this.step();
                var value = this.value();
                if (!isNaN(max) && value > max) value = max;
                if (value < min) value = min;
                this.refs.$input.val(value);


                if (value - step < min) {
                    this.refs.$minus.removeClass('highlight').addClass('disabled');
                } else {
                    this.refs.$minus.removeClass('highlight').removeClass('disabled');
                }

                if (!isNaN(max) && (value + step > max)) {
                    this.refs.$plus.removeClass('highlight').addClass('disabled');
                } else {
                    this.refs.$plus.removeClass('disabled').addClass('highlight');
                }
            }
        };
        $(document).on('touchend', '.stepper .plus', (function (e) {
            var $dom = $(e.currentTarget).closest('.stepper');
            this.dom = $dom;
            this.refs = {
                '$input': $dom.find('input'),
                '$plus': $dom.find('.plus'),
                '$minus': $dom.find('.minus')
            };
            var val = this.value(), _max = this.max(), _min = this.min(), _step = this.step();
            if (isNaN(_max) || val + _step <= _max) {
                val += _step;
                this.value(val);
                $dom.trigger('changed');
            }
        }).bind(util));

        $(document).on('touchend', '.stepper .minus', (function (e) {
            var $dom = $(e.currentTarget).closest('.stepper');
            this.dom = $dom;
            this.refs = {
                '$input': $dom.find('input'),
                '$plus': $dom.find('.plus'),
                '$minus': $dom.find('.minus')
            };
            var val = this.value(), _max = this.max(), _min = this.min(), _step = this.step();
            if (val - _step >= _min) {
                val -= _step;
                this.value(val);
                $dom.trigger('changed');
            }
        }).bind(util));

        $(document).on('refresh', '.stepper', (function (e) {
            var $dom = $(e.currentTarget);
            this.dom = $dom;
            this.refs = {
                '$input': $dom.find('input'),
                '$plus': $dom.find('.plus'),
                '$minus': $dom.find('.minus')
            };
            this.validateStepperState();
        }).bind(util));

        $('.stepper').map(function () {
            $(this).trigger('refresh');
        });
    }

    function initDateSelector() {
        var util = {};
        $(document).on('touchend', '.date-selector', (function (e) {
            //Suk.getInstance(this.refs.$calendar).screen.active();
        }).bind(util));

        $(document).on('DATE_SELECTED', '.calendar', function (e, from, to) {
            if (to) {
                this.value([from, to]);
            } else {
                this.value([from]);
            }
            this.dom.trigger('changed');
        }.bind(util));
    }

    function initBeforeDomReady() {
        initNumberStepper();
        initDateSelector();
    }

    function initAfterDomReady() {

    }

    try {
        if (module.exports) {
            module.exports= {
                init: function (data) {
                    initBeforeDomReady();
                    $().ready(function () {
                        initAfterDomReady();
                    });
                }
            }
        }
    } catch(e) {
        initBeforeDomReady();
        $().ready(function () {
            initAfterDomReady();
        });
    }
})(Zepto);
