var saveRes = null;
var mult = false,
        prev = 0;
var deposit_calculator_array = {FD:"Fixed Deposit", RD:"Recurring Deposit"}; 
$(function() {
    $(document).on("keydown", "input[type='text']", function(e) {
        if (!mult) {
            mult = true;
            prev = e.which;
            setTimeout(function() {
                mult = false;
            }, 50)
        } else if (prev != e.which) {
            mult = false;
        } else {
            return false;
        }
    });
    getCalculatorSlider();
    calculateData();
    $(document).on("click", ".ui-slider-label ", function() {
        calculateData();
    });
    $(document).on("click", ":radio", $(this).resetSlider);
    $(document).on("click", ".products", $(this).changeProducts);
    responsiveMobileMenu();

    $('.rmm-toggled, .rmm-toggled .rmm-button').click(function() {
        if ($(this).is(".rmm-closed")) {
            $(this).find('ul').stop().show(300);
            $(this).removeClass("rmm-closed");
        } else {
            $(this).find('ul').stop().hide(300);
            $(this).addClass("rmm-closed");
        }
    });

});
$(window).resize(function() {
    adaptMenu();
});
$.fn.extend({
    changeProducts: function() {
        $(".products").removeClass("active");
        $("." + $(this).attr("p-id")).addClass("active");
        $('#deposit_heading').html(deposit_calculator_array[$(this).attr("p-id")]);
        if($(this).attr("p-id") != 'FD'){$('#amount_middle_part').html('Monthly');}else{$('#amount_middle_part').html('');}
        $(".rmm-toggled-title").text($(this).text());
        
        active_product = $(this).attr("p-id");
        product_sub_id = $('.active').attr("data-value");
        
        //$("#amount_lac").prop("checked", true).resetSlider();
        $("#time_month").prop("checked", true).resetSlider();
        $("#roi").resetSlider();
    },
    resetSlider: function() {
        var slider_id = "";
        $(".quote_data").attr("href");
        if ($(this).attr("name") == "amount_radio") {
            slider_id = "slider_1";            
            
            if (active_product == "FD") {
                ($(fixed_deposit_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(fixed_deposit_data).attr("url"));
                slider_value = $(fixed_deposit_data).attr("deposit_amount");
            } else if (active_product == "RD") {
                ($(fixed_deposit_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(fixed_deposit_data).attr("url"));
                slider_value = $(fixed_deposit_data).attr("deposit_amount");
            } else {
                return false;
            }
        } else if ($(this).attr("name") == "time_radio") {
            slider_id = "slider_3";
            if (active_product == "FD") {
                slider_value = $(fixed_deposit_data).attr("deposit_tenure");
            } else if (active_product == "RD") {
                slider_value = $(fixed_deposit_data).attr("deposit_tenure");
            } else {
                return false;
            }
        } else if ($(this).attr("name") == "roi") {
            slider_id = "slider_2";
            if (active_product == "FD") {
                slider_value = $(fixed_deposit_data).attr("interest_rate");
            } else if (active_product == "RD") {
                slider_value = $(fixed_deposit_data).attr("interest_rate");
            } else {
                return false;
            }
        }
       
        slider_value = $(slider_value).attr($(this).val());
        $("#" + slider_id).resetValues(slider_value);
        $("#" + slider_id).slider({min: parseInt($("#" + slider_id).attr("min")), max: parseInt($("#" + slider_id).attr("max")), value: parseInt($("#" + slider_id).attr("value")), step: parseFloat($("#" + slider_id).attr("step"))}).draggable().slider("pips", {rest: "label", suffix: $("#" + slider_id).attr("suffix")}).draggable();
        if ($(this).attr("name") == "amount_radio") {
            $("." + slider_id + "_txt").val(NewMoneyFormatInr($(slider_value).attr("default")));
            $("." + slider_id + "_span").html(RUPEE + NewMoneyFormatInr($(slider_value).attr("default")));
        } else {
            $("." + slider_id + "_txt").val(NewMoneyFormatInr($(slider_value).attr("default")));
            $("." + slider_id + "_span").text(NewMoneyFormatInr($(slider_value).attr("default")) + ' ' + $(slider_value).attr("suffix"));
            if ($(slider_value).attr("suffix") != "" && $(slider_value).attr("suffix") != "%")
                $(".time_caption").text($(slider_value).attr("suffix"));
        }

        calculateData();
        return true;
    },
    resetValues: function(slider_array) {
        $(this).attr("min", $(slider_array).attr("minimum")).attr("max", $(slider_array).attr("maximum")).attr("step", $(slider_array).attr("steps")).attr("value", $(slider_array).attr("default")).attr("suffix", $(slider_array).attr("suffix")).attr("prefix", $(slider_array).attr("prefix"));
    },
    changeSliderValue: function(event) {
        var value = $(this).val();
        if ($(this).attr("id") == "slider_2_txt" && parseInt($(this).val()) > parseInt($("#slider_2").attr("max"))) {
            $(this).val($("#slider_2").attr("max"));
        }
        if ($(this).attr("id") == "slider_1_txt" && parseInt(parseInt(unformatMoney(value))) > parseInt($("#slider_1").attr("max") * 10)) {
            $(this).val(NewMoneyFormatInr((parseInt($("#slider_1").attr("max")) * 10)));
        }
        if ($(this).attr("id") == "slider_3_txt" && parseInt($(this).val()) > parseInt($("#slider_3").attr("max"))) {
            $(this).val($("#slider_3").attr("max"));
        }
        changeSliderValue(event, $(this));
        if ($(this).attr("id") == "slider_1_txt") {
            $(this).val(NewMoneyFormatInr($(this).val()));
        } else {
            $(this).val(unformatMoney($(this).val()));
        }
        calculateData();
        $object_split_Array = $(this).attr('id').split('_');
        var slider_id = $object_split_Array[0] + "_" + $object_split_Array[1];
        var prefix_symbol = "";
        if ($("#" + slider_id).attr("prefix") != "") {
            prefix_symbol = RUPEE;
        }
        var span_class = $(this).attr("id").split("txt");
        $("." + span_class[0] + "span").html(prefix_symbol + ' ' + ($(this).val()) + ' ' + $("#" + slider_id).attr("suffix"));
    }
});

/* 	Start mobile menu function here */
function responsiveMobileMenu() {
    $('.rmm').each(function() {
        $(this).children('ul').addClass('rmm-main-list');	// mark main menu list
        var $style = $(this).attr('data-menu-style');	// get menu style
        if (typeof $style == 'undefined' || $style == false) {
            $(this).addClass('graphite'); // set graphite style if style is not defined
        } else {
            $(this).addClass($style);
        }

        /* 	width of menu list (non-toggled) */
        var $width = 0;
        $(this).find('ul li').each(function() {
            $width += $(this).outerWidth();
        });

        if ($.support.leadingWhitespace) {
            $(this).css('max-width', $width * 1.2 + 'px');
        } else {
            $(this).css('width', $width * 1.2 + 'px');
        }
    });
    getMobileMenu();
    adaptMenu();

}
function getMobileMenu() {
    /* 	build toggled dropdown menu list */
    $('.rmm').each(function() {
        var menutitle = $(this).attr("data-menu-title");
        if (menutitle == "") {
            menutitle = $(".active").text();
        } else if (menutitle == undefined) {
            menutitle = $(".active").text();
        }
        var $menulist = $(this).children('.rmm-main-list').html();
        var $menucontrols = "<div class='rmm-toggled-controls'><div class='rmm-toggled-title'>" + menutitle + "</div><div class='rmm-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>";
        $(this).prepend("<div class='rmm-toggled rmm-closed'>" + $menucontrols + "<ul>" + $menulist + "</ul></div>");
    });
}

function adaptMenu() {
    /* 	toggle menu on resize */
    $('.rmm').each(function() {
        var $width = $(this).css('max-width');
        $width = $width.replace('px', '');
        if ($(this).parent().width() < $width * 0.9) {
            $(this).children('.rmm-main-list').hide(0);
            $(this).children('.rmm-toggled').show(0);
        } else {
            $(this).children('.rmm-main-list').show(0);
            $(this).children('.rmm-toggled').hide(0);
        }
    });
}

function calculateData() { 
    
    //if (($("#slider_3").attr("suffix")) != "months" && $("#slider_3").attr("suffix") != " months") 
    var tenure_type = 'months';
    try{
        tenure_type = ($("#slider_3").attr("suffix"));
        //active_product_id = $('.active').attr('p-id');
        var deposit_tenure = ($("#slider_3").attr("suffix") != "months" && $("#slider_3").attr("suffix") != " months") ? $(".slider_3_txt").val() * 12 : $(".slider_3_txt").val();
        if($(fixed_deposit_data).attr("url")==='/recurring-deposit')
        {
            var maturity_amount = calcualte_recurring_deposit_amount(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), deposit_tenure,tenure_type); 
        }else if($(fixed_deposit_data).attr("url")==='/fixed-deposit')
        {
            var maturity_amount = calcualte_maturity_amount(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), deposit_tenure,tenure_type); 
        } 
        if (maturity_amount == "-") {
            $("#maturity_amount").html("-");
            return;
        } 
        $("#maturity_amount").html(NewMoneyFormatInr(maturity_amount));
    }catch(Exception){}
}

function calcualte_maturity_amount(deposit_amount_P,interest_rate_r,number_of_years_t)
{
    var n=12;
    var r = interest_rate_r/100;
    var year=number_of_years_t/12;
    var nt=n*year;
    var temp=(1+r/n);
    var A = deposit_amount_P * Math.pow(temp,nt);
    var emi_val= A.toFixed(2);
    return parseInt(emi_val);
    
}

function calcualte_recurring_deposit_amountt(deposit_amount_P,interest_rate_r,number_of_years_t)
{
    var n=number_of_years_t;
    var monthpayment = parseInt(deposit_amount_P) * ((Math.pow(interest_rate_r / 400 + 1, n) - 1) / (1-(Math.pow(interest_rate_r / 400 + 1,(-1/3)))));
    return parseInt(monthpayment);
}

saveEMIResult = function() {    
    if ($("#slider_3_txt").val() == "1" || $("#slider_3_txt").val() == "0") {
        if ($("#slider_3").attr("suffix").trim() == "months") {
            $(".slider_3_span").text($("#slider_3_txt").val() + " month");
        } else if ($("#slider_3").attr("suffix") == "yrs") {
            $(".slider_3_span").text("1 yr");
        }
    }
    var maturity_amount = unformatMoney($("#maturity_amount").text());
    var deposit_tenure = ($("#slider_3").attr("suffix") != "months" && $("#slider_3").attr("suffix") != " months") ? $(".slider_3_txt").val() * 12 : $(".slider_3_txt").val();
    var data = {step: "SaveDepositResult", deposit_amount: unformatMoney($(".slider_1_txt").val()), rate_of_interest: $(".slider_2_txt").val(), deposit_tenure: deposit_tenure, maturity_amount: maturity_amount, product_sub_id: product_sub_id, calculator_type: 5};
    if (saveRes == null) {
        saveRes = $.post("/deposit-calculator/", data, '', 'json').done(function(response) {
            saveRes = null;
        });
    }
}

function calcualte_recurring_deposit_amount(deposit_amount_P, interest_rate_r, number_of_years_t) {
    var p = deposit_amount_P;
    var t = number_of_years_t;
    var n = 12;
    var r = interest_rate_r;
    var amount_array = [];
    var x = calculate_x(r, n);

    for (var i = t; i >= 1; i--) {
        a = p * Math.pow(x, n * calculate_months_in_year(i));
        console.log(a);
        amount_array.push(a);
    }
    var maturity_amount = amount_array.reduce(function (previousValue, currentValue, index, array) {
        return previousValue + currentValue;
    }); 
    return Math.round(maturity_amount);
}

function calculate_x(r, n) {
    var x = 1 + (r / 100) / n;
    //console.log(x);
    return x;
}

function calculate_months_in_year(t) {
    return t / 12;
}