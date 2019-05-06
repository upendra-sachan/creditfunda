var saveRes = null;
var mult = false,
prev = 0;

$(function () {
    $(document).on("keydown", "input[type='text']", function (e) {
        if (!mult) {
            mult = true;
            prev = e.which;
            setTimeout(function () {
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
    $(document).on("click", ".ui-slider-label ", function () {
        calculateData();
    });
    $(document).on("click", ":radio", $(this).resetSlider);
    $(document).on("click", ".products", $(this).changeProducts);
    responsiveMobileMenu();

    $('.rmm-toggled, .rmm-toggled .rmm-button').click(function () {
        if ($(this).is(".rmm-closed")) {
            $(this).find('ul').stop().show(300);
            $(this).removeClass("rmm-closed");
        } else {
            $(this).find('ul').stop().hide(300);
            $(this).addClass("rmm-closed");
        }
    });

});
$(window).resize(function () {
    adaptMenu();
});
$.fn.extend({
    changeProducts: function () {
        $(".products").removeClass("active");
        $("." + $(this).attr("p-id")).addClass("active");
        $(".rmm-toggled-title").text($(this).text());
        active_product = $(this).attr("p-id");
        $("#amount_lac").prop("checked", true).resetSlider();
        $("#time_month").prop("checked", true).resetSlider();
        $("#roi").resetSlider();
    },
    resetSlider: function () {
        var slider_id = "";
        $(".quote_data").attr("href");
        if ($(this).attr("name") == "amount_radio") {
            slider_id = "slider_1";
            if (active_product == "PL") {
                product_sub_id = $(personal_loan_emi_data).attr("product_sub_id");
                ($(personal_loan_emi_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(personal_loan_emi_data).attr("url"));
                slider_value = $(personal_loan_emi_data).attr("loan_amount");
            } else if (active_product == "HL") {
                product_sub_id = $(home_loan_emi_data).attr("product_sub_id");
                ($(home_loan_emi_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(home_loan_emi_data).attr("url"));
                slider_value = $(home_loan_emi_data).attr("loan_amount");
            } else if (active_product == "LAP") {
                product_sub_id = $(lap_loan_emi_data).attr("product_sub_id");
                ($(lap_loan_emi_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(lap_loan_emi_data).attr("url"));
                slider_value = $(lap_loan_emi_data).attr("loan_amount");
            } else if (active_product == "EL") {
                product_sub_id = $(education_loan_emi_data).attr("product_sub_id");
                ($(education_loan_emi_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(education_loan_emi_data).attr("url"));
                slider_value = $(education_loan_emi_data).attr("loan_amount");
            }else if (active_product == "SIP") {
                product_sub_id = $(personal_loan_emi_data).attr("product_sub_id");
                ($(personal_loan_emi_data).attr("loan_amount_years") == 0) ? $(".amount_div").addClass("hide") : $(".amount_div").removeClass("hide");
                $(".quote_data").attr("href", $(personal_loan_emi_data).attr("url"));
                slider_value = $(personal_loan_emi_data).attr("loan_amount");
            } else {
                return false;
            }
        } else if ($(this).attr("name") == "time_radio") {
            slider_id = "slider_3";
            if (active_product == "PL") {
                slider_value = $(personal_loan_emi_data).attr("loan_tenure");
            } else if (active_product == "HL") {
                slider_value = $(home_loan_emi_data).attr("loan_tenure");
            } else if (active_product == "LAP") {
                slider_value = $(lap_loan_emi_data).attr("loan_tenure");
            } else if (active_product == "EL") {
                slider_value = $(education_loan_emi_data).attr("loan_tenure");
            } else {
                return false;
            }
        } else if ($(this).attr("name") == "roi") {
            slider_id = "slider_2";
            if (active_product == "PL") {
                slider_value = $(personal_loan_emi_data).attr("interest_rate");
            } else if (active_product == "HL") {
                slider_value = $(home_loan_emi_data).attr("interest_rate");
            } else if (active_product == "LAP") {
                slider_value = $(lap_loan_emi_data).attr("interest_rate");
            } else if (active_product == "EL") {
                slider_value = $(education_loan_emi_data).attr("interest_rate");
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
            $("." + slider_id + "_span").text(NewMoneyFormatInr($(slider_value).attr("default")) + $(slider_value).attr("suffix"));
            if ($(slider_value).attr("suffix") != "" && $(slider_value).attr("suffix") != "%")
                $(".time_caption").text($(slider_value).attr("suffix"));
        }

        calculateData();
        return true;
    },
    resetValues: function (slider_array) {
        $(this).attr("min", $(slider_array).attr("minimum")).attr("max", $(slider_array).attr("maximum")).attr("step", $(slider_array).attr("steps")).attr("value", $(slider_array).attr("default")).attr("suffix", $(slider_array).attr("suffix")).attr("prefix", $(slider_array).attr("prefix"));
    },
    changeSliderValue: function (event) {
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
        $("." + span_class[0] + "span").html(prefix_symbol + ($(this).val()) + $("#" + slider_id).attr("suffix"));
    }
});

/* 	Start mobile menu function here */
function responsiveMobileMenu() {
    $('.rmm').each(function () {
        $(this).children('ul').addClass('rmm-main-list');	// mark main menu list
        var $style = $(this).attr('data-menu-style');	// get menu style
        if (typeof $style == 'undefined' || $style == false) {
            $(this).addClass('graphite'); // set graphite style if style is not defined
        } else {
            $(this).addClass($style);
        }

        /* 	width of menu list (non-toggled) */
        var $width = 0;
        $(this).find('ul li').each(function () {
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

    $('.rmm').each(function () {
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
    $('.rmm').each(function () {
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
    
    if (($("#slider_3").attr("suffix")) != "months" && $("#slider_3").attr("suffix") != " months") {
        var emi = '';
        var tpa = '';
        if ($(personal_loan_emi_data).attr("url") === 'compound-interest-calculator')
        {
            emi = compoundInterestCalculator(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), ($(".slider_3_txt").val() * 12));
        } else if ($(personal_loan_emi_data).attr("url") === 'sip_calculator')
        {
            Sip_Target='';
            Sip_Target = Sip_Target_Corpus($(".slider_2_txt").val(), ($(".slider_3_txt").val()), unformatMoney($(".slider_1_txt").val()));
            $(".emi_result").html(NewMoneyFormatInr(Sip_Target));
            
            var SIP_Amount='';
            //monthly_SIP_Amount(CAGR_return ,invest_time,amount)
            SIP_Amount = monthly_SIP_Amount($(".slider_6_txt").val(), ($(".slider_5_txt").val()), unformatMoney($(".slider_4_txt").val()));
            if (SIP_Amount == "") {
                $(".target_corpus").html("-");
            }
            $(".target_corpus").html(NewMoneyFormatInr(SIP_Amount));
        } else
        {
            emi = calculateEmi(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), ($(".slider_3_txt").val() * 12));
            
            tpa = calculatetotalalAmount(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), ($(".slider_3_txt").val() * 12));
            
        }
    } else {
        if ($(personal_loan_emi_data).attr("url") === 'compound-interest-calculator')
        {
            emi = compoundInterestCalculator(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), ($(".slider_3_txt").val()));
        } else
        { 
            emi = calculateEmi(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), ($(".slider_3_txt").val()));
            tpa = calculatetotalalAmount(unformatMoney($(".slider_1_txt").val()), $(".slider_2_txt").val(), ($(".slider_3_txt").val() ));
        }
    }
    if (emi == "-") {
        $("#emi_result").html("-");
        $("#tpa_result").html("-");
    }
    $("#emi_result").html(NewMoneyFormatInr(emi));
    if( tpa !== undefined ) {
        $("#tpa_result").html(NewMoneyFormatInr(tpa));
    }
}
 
compoundInterestCalculator = function (loan_amount, rate_of_interest, time_duration) {
    if (loan_amount == "" || loan_amount == 0 || rate_of_interest == "" || rate_of_interest == 0 || time_duration == "" || time_duration == 0) {
        return "-";
    }
    var n=12;
    var r = rate_of_interest/100;
    var year=time_duration/12;
    var A =Math.pow((1 + r/n), n*year)*loan_amount;
    var emi_val= A.toFixed(2);
    return parseInt(emi_val);
    }

saveEMIResult = function () {
    if ($("#slider_3_txt").val() == "1" || $("#slider_3_txt").val() == "0") {
        if ($("#slider_3").attr("suffix").trim() == "months") {
            $(".slider_3_span").text($("#slider_3_txt").val() + " month");
        } else if ($("#slider_3").attr("suffix") == "yrs") {
            $(".slider_3_span").text("1 yr");
        }
    }
    var emi = unformatMoney($("#emi_result").text());
    var tpa = unformatMoney($("#tpa_result").text());
    var loan_tenure = ($("#slider_3").attr("suffix") != "months" && $("#slider_3").attr("suffix") != " months") ? $(".slider_3_txt").val() * 12 : $(".slider_3_txt").val();
    var data = {step: "SaveEmiResult", loan_amount: unformatMoney($(".slider_1_txt").val()), rate_of_interest: $(".slider_2_txt").val(), loan_tenure: loan_tenure, emi: emi, tpa: tpa,product_sub_id: product_sub_id, calculator_type: 1};
    
    if (saveRes == null) {
        saveRes = $.post("/emi-calculator/", data, '', 'json').done(function (response) {
            saveRes = null;
        });
    }
}

function monthly_SIP_Amount(CAGR_return ,invest_time,amount) {
        var sipAmt = 0.0;
        var res = 0.0;
        var duration = 0.0;
        var temuremonths = 0.0;
        duration = parseFloat(CAGR_return )/ 1200;
        temuremonths = parseFloat(invest_time) * 12;
        sipAmt = ((Math.pow(1 + duration, temuremonths)) - 1) / duration;
        res = amount * sipAmt;
        if (isNaN(res) == true) { res = 0 }
        return res.toFixed(2);
}

function Sip_Target_Corpus(CAGR_return ,invest_time,amount) {
    var res=0;
    var famt = parseFloat(amount);
    var period = parseFloat(invest_time)* 12;
    var rate = parseFloat(CAGR_return);
    res = (rate / (12 * 100) * (famt)) / (Math.pow((1 + rate / (12 * 100)), period) - 1);
    res = res.toFixed(2);
    return res;
}