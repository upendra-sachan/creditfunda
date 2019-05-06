/* NOTE : page_action_url is defined in header.php */
var address_pattern = /^\d*[a-zA-Z0-9#][a-zA-Z0-9\.,#\-/\(\) ]*$/;
var autolistener = 0;
var office_pin_code = new Array();
var pin_code_array = new Array();
//Send SMS To ICICI Bank Representative With Pincode,19112015
var pin_code_range = new Array();
//End
$(document).ready(function() {
    /* START CODE FOR IE DIFFERENT VERSION */
    $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
    getSlider(quote_element_object, quote_element_object_second); // CALL TO FUNCTION FOR ALL SLIDERS
    getSliderForAmountAndTenure(); //CALL TO FUNCTION TO GET SLIDER AMOUNT ON 2ND PAGE
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
        var active = document.activeElement;
        $(document).on('focus', ':text', function() {
            if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
                $(this).val('').removeClass('hasPlaceholder');
            }
        });
        $(document).on('blur', ':text', function() {
            if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
                $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
            }
        });

        $(':text').blur();
        $(active).focus();
    }
    $(document).on('mouseover', '.help', function() {
        $('.' + $(this).attr('tooltip-class')).removeClass("hide");
        var position = $(this).position();
        $('.' + $(this).attr('tooltip-class')).css({top: position.top - 20, left: position.left + 30});
    });

    $(document).on('mouseout', '.help', function() {
        $('.' + $(this).attr('tooltip-class')).addClass("hide");
    });

    $(document).on('click', '.radio', function() {
        iconAction.activateIcons($(this));
        //Send SMS To ICICI Bank Representative With Pincode,19112015
        var city_id_front = '';
        if ($(this).attr('name') == 'city_id') {
	    if ($(this).attr('key-value') != '') {
		city_id_front = $(this).attr('key-value')
	    }	    
	    if (city_id_front > 0) {
		getCityPincodes(city_id_front,1);			
            }
	}
        //End
    });

    $('#other_city_id').change(function() {
        if ($("#other_city").length > 0 && $("#state_id").length > 0 && $("#other_city_id").length > 0) {           
            if($.trim($("#state_id").val()) > 0 && $.trim($("#other_city_id").val()) > 0){
                getCityPincodes($.trim($("#other_city_id").val()),1);
            }            
        }
    });

    $(document).on('click', '.text-setup', function() {
        iconAction.textSetupAction($(this));
    });

    $(document).on('click', '.append_button', function() {
        iconAction.appendButtonAction($(this))
    });

    $(document).on('click', 'span.main', function() {
        //console.log('in span.main class' + $(this));
        //FUNCTION TO GET INPUT SELECTED WHEN CLICK ON LABEL IN IE
        if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
            if ($(this).siblings('input').hasClass('append_button')) {
                iconAction.appendButtonAction($(this).siblings('input'));
            } else if ($(this).siblings('input').hasClass('text-setup')) {
                iconAction.textSetupAction($(this).siblings('.text-setup'));
            } else if ($(this).parents('label').children('input').hasClass('quote_validator')) {
                formValidator.quoteFormValidator($(this).siblings('.quote_validator'));
            } else if ($(this).parents('li').hasClass('bigbox')) {
                iconAction.activateIcons($(this).siblings('input'));
                var attribute_name = $(this).siblings('input').attr("name");
                if (attribute_name == "loan_type") {
                    if ($(this).siblings('input').attr("key-value") == "1") {
                        redirectPage(1, 0);
                    } else {
                        getPurposeOfLoan($(this).siblings('input'));
                    }
                } else if (attribute_name == "purpose_of_loan") {
                    showPerspectiveRows($(this).siblings('input'));
                } else if (attribute_name == "sub_purpose_of_loan_id") {
                    getSubPurposeOfLoan($(this).siblings('input'));
                }
            } else {
                iconAction.activateIcons($(this).parents('label').children('input'));
                iconAction.activateIcons($(this).parents('div').children('input'));
            }
        }

        /*
         if ($(this).parents('label').children('input').hasClass('quote_validator')) {
         if (!($('input[name="city_id"]').parents('label').hasClass('selected'))) {
         $('input[name="city_id"]').parents('label').addClass('error');
         var position = $('input[name="city_id"]').parents('div.panel').offset();
         $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($('input[name="city_id"]').parents('div.panel').css('height')) + 25}, 1000);
         return;
         }
         //formValidator.quoteForm1Validator($(this).siblings('.quote_validator'));
         } else {
         
         //iconAction.activateIcons($(this).parents('label').children('input'));
         }*/
    });

    /* END CODE FOR IE DIFFERENT VERSION */

    $('#other_salary_bank_account').change(function() {
        var position = $(this).parents('div.panel').offset();
        if ($(this).val() != '') {
            $(this).parent().removeClass('error');
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
            FirstPageErrorHandler.removeErrorIndicator($(this));
        } else {
            $(this).parent().addClass('error');
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 1000);
            FirstPageErrorHandler.addErrorIndicator($('input[name="salary_bank_account"]'), "Missing field");
        }
    });

    $('#profession_type').change(function() {
        var position = $(this).parents('div.panel').offset();
        if ($(this).val() != '') {
            $(this).parent().removeClass('error');
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
        } else {
            $(this).parent().addClass('error');
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 1000);
        }
    });
	
	//ICICI Bank Additional Field ,28102015
	$('#customer_wished_loan_type').change(function() {
		$('.land_documents_gl').hide();
		$('.customer_land_document').prop('checked', false);
		$('.land_documents_gl label').removeAttr("style");
		var value_customer_wished_loan_type = $.trim($(this).val());
		if(value_customer_wished_loan_type == 24 || value_customer_wished_loan_type == 25){
			$('.land_documents_gl').show();
		}
	});    
    //END
	
    /*
     $('#other_loan_tenure').change(function() {
     var position = $(this).parents('div.panel').offset();
     if ($(this).val() != '') {
     $(this).parent().removeClass('error');
     $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
     FirstPageErrorHandler.removeErrorIndicator($(this));
     $(quote_element_object).attr('loan_tenure', $(this).val());
     } else {
     $(this).parent().addClass('error');
     $('body,html').animate({scrollTop: parseInt(position.top) - 5}, 1000);
     FirstPageErrorHandler.addErrorIndicator($('input[name="loan_tenure"]'), "Missing field");
     $(quote_element_object).attr('loan_tenure', '');
     }
     });
     
     $("#another_loan_tenure").on('click', function(event) { // FOR ANOTHER LOAN TENURE
     $("#other_loan_tenure").val('');
     $(quote_element_object).attr('loan_tenure', '');
     });
     */
    $('#other_loan_bank_name').change(function() {
        var position = $(this).parents('div.panel').offset();
        if ($(this).val() != '') {
            $(this).parent().removeClass('error');
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
            FirstPageErrorHandler.removeErrorIndicator($(this));
        } else {
            $(this).parent().addClass('error');
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 1000);
            FirstPageErrorHandler.addErrorIndicator($('input[name="loan_with_current_bank"]'), "Missing field");
        }
    });
    $(document).on('click', '#submit_personal_quote_infomration', submitPersonalQuoteInfomration); //CALLED TO WHEN POSTING APPLICANT PRIOR INFORMATION
    $(document).on('click', '#submit_personal_quote_information_mobile', submitPersonalQuoteInfomrationMobile);
    $(document).on('click', '#post_quote_submit', submitPostQuote); //CALLED TO WHEN POSTING APPLICANT PERSONAL INFORMATION ON 3rd PAGE

    $(document).on('focus', 'input[type="text"]', function() {
        var position = Element.getPosition($(this));
        var element_width = $(this).parent().css('width');
        var element_height = $(this).parent().css('height');
        if ($(this).parent().siblings().find('span').hasClass('pointer')) {
            $('.' + $(this).attr('tooltip-class')).css({top: (position.top - (parseInt(element_height) / 2) - 10), left: (position.left + (parseInt(element_width)) + 10)});
        } else {
            position = $(this).position();
            $('.' + $(this).attr('tooltip-class')).css({top: (position.top - 65), left: (position.left + 30)});
        }
        $('.' + $(this).attr('tooltip-class')).removeClass("hide");
    });

    $(document).on('blur', 'input[type="text"]', function() {
        $('.' + $(this).attr('tooltip-class')).addClass("hide");
    });

    $(document).on('click', '.quote_validator', function() {
        formValidator.quoteFormValidator($(this));
    });

    $(document).on('keyup', '.amount', function() { //FOR LOAN AMOUNT ON 1ST PAGE
        $(this).attr('key-value', $(this).val());
        $(this).val(rupeeFormat($(this).val()));
    });

    $("input[name='cost_home_flat']").on('blur', function() {
        getFieldValidate($(this));
    });

    $(document).on("keyup", "input[name='cost_home_flat']", function(event) {
        return formatValidator(event, $(this), '', '', '', 8, 100000, 250000000, '', 12, '');
    });

    //Send SMS To ICICI Bank Representative With Pincode,19112015
    $(document).on('keypress', "input[name='pincode']", function(event) {
        var validate_resonse = formatValidatorNew(event, $(this), '', '', '', 5, '', '', '', '', '');
        if (validate_resonse == true) {
            jQueryAutoComplete($(this), pin_code_array);
            return true;
        } else {
            return false;
        }
    });
    //End

    $('#slider_2').on('slidechange', function() { //CALLED TO VALIDATE VALUE ON SLIDECHANGE VALUE FOR PROPERTY COST
        var slider_value = $('#slider_2').slider("option", "value");
        if (slider_value > 0) {
            getFieldValidate("input[name='cost_home_flat']", 1);
        }
    });


    $('#slider_3').on('slidechange', function() { ////CALLED TO VALIDATE VALUE ON SLIDECHANGE VALUE FOR COST CONSTRUCTION
        var slider_value = $('#slider_3').slider("option", "value");
        if (slider_value > 0) {
            getFieldValidate("input[name='cost_construction']", 1);
        }
    });

    $('#slider_4').on('slidechange', function() { ////CALLED TO VALIDATE VALUE ON SLIDECHANGE VALUE FOR COST PLOT
        var slider_value = $('#slider_4').slider("option", "value");
        if (slider_value > 0) {
            getFieldValidate("input[name='cost_plot']", 1);
        }
    });

    $("input[name='outstanding_balance']").on('blur', function() {
        getFieldValidate($(this));
    });

    $(document).on("keyup", "input[name='outstanding_balance']", function(event) {
        return formatValidator(event, $(this), '', '', '', 8, 100000, 250000000, '', 12, '');
    });

    $('#slider_1').on('slidechange', function() { ////CALLED TO VALIDATE VALUE ON SLIDECHANGE VALUE FOR OUTSTANDING BALANCE
        var slider_value = $('#slider_1').slider("option", "value");
        if (slider_value > 0) {
            getFieldValidate("input[name='outstanding_balance']", 1);
        }
    });

    $("input[name='annual_turnover']").on('blur', function() { //FOR ANNUAL TURNOVER
        var error_response = getFieldValidate($(this));
    });

    $(document).on("keypress ", "input[name='annual_turnover']", function(event) {
        return formatValidator(event, $(this), '', '', '', 9, 100000, 1000000000, '', 14, '');
    });

    $('#slider_9').on('slidechange', function() { //CALLED TO VALIDATE VALUE ON SLIDECHANGE VALUE FOR ANNUAL TURNOVER
        var slider_value = $('#slider_9').slider("option", "value");
        if (slider_value > 0) {
            getFieldValidate("input[name='annual_turnover']", 1);
        }
    });

    $("input[name='monthly_income']").on('blur', function() { //FOR MONTHLY INCOME
        var error_response = getFieldValidate($(this));
        // scrollElementPosition($(this),error_response,'div.panel');
    });

    $(document).on("keypress ", ".value_of_gold", function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 5, 0, 100000, '', 5, '');
    });
    $(document).on("blur", ".value_of_gold", function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 5, 0, 100000, '', 5, '');
    });

    /*
     $(document).on("keypress ", "input[name='monthly_income']", function(event) {
     if ($(quote_element_object_second).attr("employment_type_id") >= 2) {
     return formatValidator(event, $(this), '', '', '', 9, 50000, 250000000, '', 12, '');
     } else {
     return formatValidator(event, $(this), '', '', '', 9, 5000, 2000000, '', 9, '');
     }
     });
     //monthly_income_mobile
     $(document).on("keypress ", "input[name='monthly_income_mobile']", function(event) {
     return formatValidatorNew(event, $(this), '', '', '', 8, 5000, 250000000, '', 12, '');
     });
     
     $(document).on("keypress", "input[name='loan_amount']", function(event) {
     return formatValidatorNew(event, $(this), '', '', '', 8, 100000, 250000000, '', 12, '');
     });
     
     $("input[name='current_emi']").on('blur', function() { //FOR CURRRENT EMI
     var error_response = 1;
     if ($(this).val() != "") {
     error_response = getFieldValidate($(this));
     }
     //scrollElementPosition($(this),error_response,'div');
     });
     
     $(document).on("keypress", "input[name='current_emi']", function(event) {
     return formatValidator(event, $(this), '', '', '', 9, 0, 200000, '', 8, '');
     });
     */
    $("select[name='outstanding_loan_month']").on('change', function() {
        var is_active = startLoanDateValidate();
        var position = $(this).parents('div.panel').offset();
        if (is_active == 1) {
            $('body,html').animate({scrollTop: parseInt($('#outstanding_loan_month').parents('div.panel').css('height')) + parseInt(position.top) + 25}, 1000);
            $('input[name="outstanding_balance"]').focus();
        }
    });

    $("select[name='outstanding_loan_year']").on('change', function() {
        var is_active = startLoanDateValidate();
        var position = $(this).parents('div.panel').offset();
        if (is_active == 1) {
            $('body,html').animate({scrollTop: parseInt($('#outstanding_loan_year').parents('div.panel').css('height')) + parseInt(position.top) + 25}, 1000);
            $('input[name="outstanding_balance"]').focus();
        }
    });

    $("input[name='loan_amount']").on('click', function(event) { // FOR LOAN AMOUNT
        if ($("#other_amount").hasClass("hide")) {
            $("#other_loan_amount_inword").html('');
        }
    });

    $("#another_loan_amount").on('click', function(event) { // FOR ANOTHER LOAN AMOUNT
        $(quote_element_object).attr('loan_amount', '');
    });

    $("#other_loan_amount").on('keyup', function(event) {
        $("#other_loan_amount_inword").html(digitToWordConvertor(unformatMoney($("#other_loan_amount").val())));
        $("#other_loan_amount_inword").show();
    })

    $("#other_loan_amount").on('keypress', function(event) { // FOR LOAN AMOUNT
        return formatValidator(event, $(this), '', '', '', 8, 10000, 2000000, '', 12, '');
    });

    $("#other_loan_amount").on('blur', function() {
        var is_valid = loanAmountValidator($(this));
        var position = $(this).parents('div.panel').offset();
        if (is_valid == 1) {
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
        } else {
            $('body,html').animate({scrollTop: parseInt(position.top) - 5}, 1000);
        }
    });

    $("#first_name").on('blur', function() { //FOR CUSTOMER NAME
        firstNameValidate($(this));
    });

    $(document).on("keypress", ".middleName", function(event) { //FOR MIDDLE NAME ON 3RD PAGE
        return formatValidator(event, $(this), '', '', '', 1, '', '', 2, 31, '');
    });

    $("#middle_name").on('blur', function() { //FOR MIDDLE NAME ON 3RD PAGE
        middleNameValidate($(this));
    });

    $("#last_name").on('blur', function() { //FOR CUSTOMER NAME
        lastNameValidate($(this));
    });

    $(document).on("keypress", "input[name='customer_name']", function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 1, '', '', 2, 31, '');
    });

    $(document).on("keypress", "input[name='customer_name_mobile']", function(event) { //FOR MOBILE
        return formatValidatorNew(event, $("#customer_name_mobile"), '', '', '', 2, '', '', 2, 31, '');
    });

    $("input[name='email']").on('blur', function() { //FOR EMAIL
        getFieldValidate($(this));
    });

    $(document).on("keypress", "input[name='email']", function(event) {
        //return formatValidatorNew(event, $("#email"), '', '', '', 20, '', '', 2, 61, '');
        return formatValidator(event, $(this), '', '', '', 13, '', '', '', 63, '');
    });

    $("input[name='mobile_number']").on('blur', function() { //FOR MOBILE NUMBER
        getFieldValidate($(this));
    });

    $(document).on('keypress', "input[name='mobile_number']", function(event) {
        //return formatValidatorNew(event, $(this), '', '', '', 19, '', '', '', 10, '');
        return formatValidator(event, $(this), '', '', '', 14, '', '', '', 10, '');
    });



    /*$(document).on("keypress", ".datepick", function(event){
     checkDateOfBirth(event,$(this));
     }); // FOR DATE OF BIRTH */

    $(document).on("keyup", ".datepick", checkDateOfBirth);

    $(document).on("blur", "#day_of_birth", function() {
        var dayValue = $(this).val();
        if (($(this).val()).length > 0 && ($(this).val()).length < 2) {
            if (version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
                dayValue = parseInt(0) + dayValue;
                $(this).val(dayValue);
            }
        } else {
            if (version == "Opera" || version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
                if (dayValue != "dd") {
                    dayValue = Number(dayValue);
                    $(this).val(dayValue);
                }
            }
        }
        formValidator.dayValidate($(this));
    });

    $(document).on("blur", "#month_of_birth", function() {
        var monthValue = $(this).val();
        if (($(this).val()).length > 0 && ($(this).val()).length < 2) {
            if (version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
                monthValue = parseInt(0) + monthValue;
                $(this).val(monthValue);
            }
        } else {
            if (version == "Opera" || version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
                if (monthValue != "mm") {
                    monthValue = Number(monthValue);
                    $(this).val(monthValue);
                }
            }
        }
        formValidator.monthValidate($(this));
    });

    $(document).on("blur", "#year_of_birth", function() {
        formValidator.yearValidate($(this));
    });

    $(document).on("keypress", ".datepick", function(event) {
        return formatValidator(event, $(this), '', '', '', 10, '', '', '', '', '');
    });
    /*
     $("select[name='employment_type_sub_id']").on('change', function() { //WHEN EMPLOYMENT TYPE IS SELF EMPLOYED SO CALL AFTER PROFESSION TYPE SELECTED
     $(quote_element_object_second).attr('employment_type_sub_id', $(this).val());
     if ($(this).val() != "") {
     $(this).parent().removeClass('error');
     FirstPageErrorHandler.removeErrorIndicator($('input[name="employment_type_id"]'));
     }
     });
     */
    /*
     $("input[name='employment_type_id']").on('click', function() { //WHEN EMPLOYMENT TYPE IS SEP OR SEB
     if ($(this).val() != "1") {
     $(quote_element_object_second).attr('employment_type_sub_id', '');
     $("select[name='employment_type_sub_id']").val('');
     }
     });
     */
    $(document).on('change', '.sel-val', function() { //FOR OTHER SELECT INPUT FIELDS
        $(this).attr('key-value', $(this).val());
        var element_name = $(this).attr('name');
        if ($(this).val() != '') {
            $("input[name='" + element_name + "']").parent().removeClass('error');
            $("select[name='" + element_name + "']").parent().removeClass('error');
        } else {
            $("select[name='" + element_name + "']").parent().addClass('error');
        }
        var attribute_value = $(quote_element_object).attr($(this).attr('name')); //GET ATTRIBUTE VALUE
        if (typeof attribute_value !== typeof undefined && attribute_value !== false) {
            $(quote_element_object).attr(element_name, $(this).val());
        } else {
            $(quote_element_object_second).attr(element_name, $(this).val());
        }
    });

    $('#property_state').on('change', function() { //FOR PROPERTY CITY
        if ($(this).val() == "") {
            $(this).addClass("error");
        } else {
            $("#property_city").parent().removeClass("error");
            var is_unset = iconGroupButtonAction.unsetValue($(this), quote_element_object);
            if (is_unset == false) {
                iconGroupButtonAction.unsetValue($(this), quote_element_object_second);
            }
            getCitiesForEmployer($(this).val(), 'property_city', null, 'property_city_validator');
        }
    });

    $('#property_city').on('change', function() { //FOR PROPERTY CITY
        var position = $(this).parents('div.panel').offset();
        if ($(this).val() != "") {
            $(this).parent().removeClass('error');
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
            FirstPageErrorHandler.removeErrorIndicator($(this));
        } else {
            $(this).parent().addClass('error');
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 1000);
            FirstPageErrorHandler.addErrorIndicator($('input[name="property_city"]'), "Missing field");
        }
    });

    $('#state_id').on('change', function() { //FOR CITY ID
        if ($(this).val() == "") {
            $(this).addClass("error");
        } else {
            $("#city_id").parent().removeClass("error");
            var is_unset = iconGroupButtonAction.unsetValue($(this), quote_element_object);
            if (is_unset == false) {
                iconGroupButtonAction.unsetValue($(this), quote_element_object_second);
            }
            getCitiesForEmployer($(this).val(), 'other_city_id', null, 'city_id_validator');

        }
    });

    $('#other_city_id').change(function() {
        var position = $(this).parents('div.panel').offset();
        if ($(this).val() != '') {
            $(this).parent().removeClass('error');
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
            FirstPageErrorHandler.removeErrorIndicator($(this));
        } else {
            $(this).parent().addClass('error');
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 1000);
            FirstPageErrorHandler.addErrorIndicator($('input[name="city_id"]'), "Missing field");
        }
        getGoldPriceCityWise($(this).val());
    });

    $('#another_city_id').on('click', function() { //FOR PROPERTY CITY
        $(quote_element_object_second).attr("city_id", "");
        $("#state_id").val("");
        $("#other_city_id").val("");
        $("#other_city_id").attr("disabled", true);

    });

    $('#another_property_city_id').on('click', function() { //FOR PROPERTY CITY
        $(quote_element_object).attr("property_city", "");
        $("#property_state").val("");
        $("#property_city").val("");
        $("#property_city").attr("disabled", true);
    });

    $('#loan_type').on('blur change', function() { //For Loan Type Mobile
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
        } else {
            if ($(this).val() == 2) {
                $("#purpose_of_loan").val('');
                $("#purpose_loan_div").removeClass("hide");
                $("#property_cost_div").removeClass("hide");
                $("#property_label").html('Property Cost');
            } else {
                $("#purpose_loan_div").addClass("hide");
                $("#property_cost_div").addClass("hide");
            }
            $(this).parent().removeClass("error");
            $(this).removeClass("error");
        }
    });

    $('#purpose_of_loan').on('blur change', function() { //For Property Type Mobile
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
        } else {
            if ($(this).val() == 3) {
                $("#property_label").html('Cost Of Plot');
            } else {
                $("#property_label").html('Property Cost');
            }
            $(this).parent().removeClass("error");
            $(this).removeClass("error");
        }
    });

    $('#property_city_with_select_box').on('blur change', function() { //FOR Property City
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
            FirstPageErrorHandler.addErrorIndicator($('#property_city_with_select_box'), "Missing field");
        } else {
            $("#property_city_with_select_box").parent().removeClass("error");
            $("#property_city_with_select_box").removeClass("error");
            FirstPageErrorHandler.removeErrorIndicator($(this));
        }
    });

    $('#property_cost').on('blur', function() { //FOR PROPERTY COST
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
            FirstPageErrorHandler.addErrorIndicator($('#property_cost'), "Missing field");
        } else {
            var is_property_cost_valid = formatValidatorNew('', $(this), '', '', '', 8, 100000, 250000000, '', 12, '');
            if (is_property_cost_valid == 0) {
                $(this).addClass("error");
                $(this).parent().addClass("error");
                FirstPageErrorHandler.addErrorIndicator($('#property_cost'), "Invalid data");
            } else {
                $("#property_cost").val(NewMoneyFormatInr($("#property_cost").val()));
                $("#property_cost").parent().removeClass("error");
                $("#property_cost").removeClass("error");
                FirstPageErrorHandler.removeErrorIndicator($(this));
            }
        }
    });
    $("#property_cost").on('keyup', function(event) {
        $("#property_1_inword").html(digitToWordConvertor(unformatMoney($("#property_cost").val())));
        $("#property_1_inword").show();
    });

    $("#monthly_income_mobile").on('keyup', function(event) {
        $("#slider_1_inword").html(digitToWordConvertor(unformatMoney($("#monthly_income_mobile").val())));
        $("#slider_1_inword").show();
    });
    $("#loan_amount").on('keyup', function(event) {
        $("#slider_2_inword").html(digitToWordConvertor(unformatMoney($("#loan_amount").val())));
        $("#slider_2_inword").show();
    });

    $('#monthly_income_mobile').on('blur', function() { //FOR Monthly Income
        var is_monthly_income_validated = 1;
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
            FirstPageErrorHandler.addErrorIndicator($('#monthly_income_mobile'), "Missing field");
        } else {
            is_monthly_income_validated = formatValidatorNew('', $('#monthly_income_mobile'), '', '', '', 8, 5000, 250000000, '', 12, '');
            if (is_monthly_income_validated == 0) {
                $(this).addClass("error");
                $(this).parent().addClass("error");
                FirstPageErrorHandler.addErrorIndicator($('#monthly_income_mobile'), "Invalid data");
            } else {
                $("#monthly_income_mobile").val(NewMoneyFormatInr($("#monthly_income_mobile").val()));
                $("#monthly_income_mobile").parent().removeClass("error");
                $("#monthly_income_mobile").removeClass("error");
                FirstPageErrorHandler.removeErrorIndicator($(this));
            }
        }
    });

    $('#loan_amount').on('blur', function() { //FOR loan amount
        var is_monthly_income_validated = 1;
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
            FirstPageErrorHandler.addErrorIndicator($('#loan_amount'), "Missing field");
        } else {
            is_monthly_income_validated = formatValidatorNew('', $('#loan_amount'), '', '', '', 8, 5000, 250000000, '', 12, '');
            if (is_monthly_income_validated == 0) {
                $(this).addClass("error");
                $(this).parent().addClass("error");
                FirstPageErrorHandler.addErrorIndicator($('#loan_amount'), "Invalid data");
            } else {
                $("#loan_amount").val(NewMoneyFormatInr($("#loan_amount").val()));
                $("#loan_amount").parent().removeClass("error");
                $("#loan_amount").removeClass("error");
                FirstPageErrorHandler.removeErrorIndicator($(this));
            }
        }
    });

    $('#customer_name_mobile').on('blur', function() { //FOR Customer Name Mobile
        if ($(this).val() == "") {
            $(this).addClass("error");
            $(this).parent().addClass("error");
            FirstPageErrorHandler.addErrorIndicator($('#customer_name_mobile'), "Missing field");
        } else {
            $("#customer_name_mobile").parent().removeClass("error");
            $("#customer_name_mobile").removeClass("error");
            FirstPageErrorHandler.removeErrorIndicator($(this));
        }
    });

    $(document).on('click', '.ndnc', function() {
        if ($(this).prop('checked') == false) {
            FirstPageErrorHandler.addErrorIndicator($(this), "Missing field");
            $('.ndnc_text').addClass('ndnc_text_error');
        } else {
            FirstPageErrorHandler.removeErrorIndicator($(this));
            $('.ndnc_text').removeClass('ndnc_text_error');
        }
    });

    $(document).on('click', "[data-labelfor]", function() {
        if ($('#ndnc').prop('checked') == true) {
            FirstPageErrorHandler.addErrorIndicator($('#ndnc'), "Missing field");
            $('.ndnc_text').addClass('ndnc_text_error');
        } else {
            FirstPageErrorHandler.removeErrorIndicator($("#ndnc"));
            $('.ndnc_text').removeClass('ndnc_text_error');
        }
        $('#' + $(this).attr("data-labelfor")).prop('checked',
                function(i, oldVal) {
                    return !oldVal;
                });
    });
    $(document).on('click', ".amex_text,#cibil_check", function() {
	$('#cibil_check').prop('checked',
		function(i, oldVal) {
		    if (oldVal) {
			$('.amex_text').addClass('amex_text_error');
		    } else {
			$('.amex_text').removeClass('amex_text_error');
		    }
		    return !oldVal;
		});
    });
    $(document).on("focus", "#builder_name", function() { // TO GET BUILDER NAME
        fillDataByAutocomplete($(this), "builder_name", "get_builder_name", "cost_home_flat");
    });

    $(document).on("blur", "#builder_name", function() {
        if ($(this).val() != "" && ($(this).val().length < 2 || !$(this).val().match(/^\d*[a-zA-Z][a-zA-Z0-9\.&_\-\s]*$/))) {
            $(this).addClass('error');
            FirstPageErrorHandler.addErrorIndicator($('#builder_name'), 'Invalid data');
        } else {
            $(this).removeClass('error');
            FirstPageErrorHandler.removeErrorIndicator($('#builder_name'));
            $(quote_element_object_second).attr('builder_name', $(this).val());
            var position = $('#builder_name').parents('div.panel').offset();
            $('body,html').animate({scrollTop: parseInt($('#builder_name').parents('div.panel').css('height')) + parseInt(position.top) + 25}, 1000);
            $('input[name="cost_home_flat"]').focus();
        }
    });

    /* BEGIN FUNCTIONS FOR OTP SCREEN */
    $(document).on('click', ".button_otp", verifyOTPCode);   //FUNCTION CALLED WHEN WE ENTER OTP CODE AND HIT ON VERIFY

    $(document).on('click', ".otp_resend", resendOTPCode); //FUNCTION TO RESEND OTP CODE

    $(document).on('click', ".resend_otp_code", resendOTPCodeOnNewNumber); //TO BE CALLED WHEN CLICK ON CHANGE MOBILE NUMBER ON OTP SCREEN AND RESENDING OTP CODE
    $(document).on('click', ".new_mobile", changeMobileNumber); 	//TO BE CALLED WHEN CLICK ON CHANGE MOBILE NUMBER 

    $(document).on('click', ".cancel_code", cancelMobileNumberChange); 	//TO BE CALLED WHEN CLICK ON CHANGE MOBILE NUMBER ON OTP SCREEN AND THEN CANCEL IT
    $(document).on('click', ".back", goToPreviousScreen); //CALLED WHEN CLICK ON BACKSCREEN
    /* END FUNCTIONS FOR OTP SCREEN */


    /* BEGIN FUNCTIONS FOR VALIDATION OF CUSTOMER PESONAL INFORMATION 3rd PAGE */
    $(document).on('keypress', ".notrequired", function(event) {
        // return formatValidatorNew(event, $(this), '', '', '', 1, '', '', '', '', '');
    });

    $(document).on('blur', ".notrequired", function() {
        if ($(this).val() == "" || $(this).val().length > 2) {
            pb_error.remove($(this));
        } else {
            pb_error.add($(this));
        }
    });

    $(document).on('change', '.notnull', function() {
        if ($(this).val() == '0' || $(this).val() == '') {
            pb_error.addForSelect($(this));
        } else {
            pb_error.removeForSelect($(this));
        }
    });
    $(document).on('blur', '.required', function() {
        if ($(this).val() != '' && $(this).val().length > 2) {
            pb_error.remove($(this));
        } else {
            pb_error.add($(this));
        }
    });

    $(document).on('blur', '.alpha', function() {
        alphaValidator($(this));
    });
    $(document).on('keypress', '.alpha', function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 1, '', '', '', '', '');
    });

    $(document).on("focus", ".employer_name", function() { // TO GET EMPLOYER NAME
        fillDataByAutocomplete($(this), "company_name", "get_employer_name", "industry");
    });

    $(document).on("blur", ".employer_name", function() { // VALIDATE EMPLOYER NAME
        var employer_name = $(this).val();
        if (employer_name == "" || employer_name.length < 2 || employer_name.length > 100 || !employer_name.match(/^\d*[a-zA-Z][a-zA-Z0-9\.&_\-\s]*$/)) {
            pb_error.add($(this));
        } else {
            pb_error.remove($(this));
        }
    });

    $(document).on('blur', '.required_address', function() { //VALIDATE ADDRESS LINE 1
        var address = $.trim($(this).val());
        if (address == "" || address.length < 3 || address.length > 31 || !address.match(address_pattern)) {
            pb_error.add($(this));
        } else {
            pb_error.remove($(this));
        }
    });

    $(document).on('blur', '.address', function() { //VALIDATE ADDRESS LINE 2 
        var address = $.trim($(this).val());
        if (address != "" && (address.length < 3 || address.length > 31 || !address.match(address_pattern))) {
            pb_error.add($(this));
        } else {
            pb_error.remove($(this));
        }
    });

    $(document).on('keypress', ".required_address", function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 12, '', '', '', '', '');
    });

    $(document).on('keypress', ".address", function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 12, '', '', '', '', '');
    });
	
	
    $(document).on('blur', ".pincode", function() {
        pincodeValidator($(this));
    });
    $(document).on('blur', "input[name='pan_number']", function() { //CALLED TO CHECK PAN NUMBER VALIDITY
        panValidator($(this));
    });

    $(document).on("blur", "input[name='co_borrower_pan_number']", function() {    //CALLED TO CHECK PAN NUMBER VALIDITY OF CO-BORROWER
        panValidator($(this));
    });

    $(document).on('change', '#employer_state', function() {
        getCitiesForEmployer($(this).val(), 'employer_city', 'office_pincode', 'office_city_validator', 'office_pincode_loader');
        if ($(this).val() == "" || $(this).val() == 0) {
            pb_error.add($(this));
            $('#employer_city').val('');
            $('#office_pincode').val('');
        } else {
            pb_error.remove($(this));
        }
    });

    $(document).on('click', "input[name='city_id']", function() {
        getGoldPriceCityWise($(this).attr('key-value'));
        if ($('#part-2').hasClass('hide')) {
            $('#part-2').removeClass('hide');
        }
    });

    $(document).on('change', '#employer_city', function() {
        getPincodes($(this).val(), 'employer_city', 'office_pincode', 'office_pincode_loader')
        if ($(this).val() == "" || $(this).val() == 0) {
            pb_error.add($(this));
        } else {
            pb_error.remove($(this));
        }
        $('#office_pincode').val('');
    });

    //Send SMS To ICICI Bank Representative With Pincode,19112015
    $(document).on('change', '#city,#city_name_select_box', function() {
        showOptin();
	if ($(this).val() > 0)
	    getCityPincodes($(this).val(),1);
    });
    // End

    $(document).on('keypress', "input[name='pincode']", function(event) {
        var validate_resonse = formatValidatorNew(event, $(this), '', '', '', 5, '', '', '', '', '');
        if (validate_resonse == true) {
            jQueryAutoComplete($(this), pin_code_array);
            return true;
        } else {
            return false;
        }
    });

    $(document).on('keypress', "input[name='office_pincode']", function(event) {
        var validate_response = formatValidatorNew(event, $(this), '', '', '', 5, '', '', '', '', '');
        if (validate_response == true) {
            jQueryAutoComplete($(this), office_pin_code);
            return true;
        } else {
            return false;
        }
    });

    $(document).on("blur", "#co_borrower_day_of_birth", function() {
        var dayValue = $(this).val();
        if (($(this).val()).length > 0 && ($(this).val()).length < 2) {
            if (version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
                dayValue = parseInt(0) + dayValue;
            }
            $(this).val(dayValue);
        } else {
            if (version == "Opera" || version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
                if (dayValue != "dd") {
                    dayValue = Number(dayValue);
                    $(this).val(dayValue);
                }
            }
        }
        var day_validate_response = formValidator.dayValidate($(this));
        if (day_validate_response == 0) {
            $(this).addClass("error");
            var attribute_name = $(this).attr("name");
            $("#" + attribute_name + "_validator").addClass("validate_fail")
        } else {
            $(this).removeClass("error");
        }
    });

    $(document).on("blur", "#co_borrower_month_of_birth", function() {
        var monthValue = $(this).val();
        if (($(this).val()).length > 0 && ($(this).val()).length < 2) {
            if (version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
                monthValue = parseInt(0) + monthValue;
            }
            $(this).val(monthValue);
        } else {
            if (version == "Opera" || version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
                if (monthValue != "mm") {
                    monthValue = Number(monthValue);
                    $(this).val(monthValue);
                }
            }
        }
        var month_validate_response = formValidator.monthValidate($(this));
        if (month_validate_response == 0) {
            $(this).addClass("error");
            var attribute_name = $(this).attr("name");
            $("#" + attribute_name + "_validator").addClass("validate_fail")
        } else {
            $(this).removeClass("error");
        }
    });

    $(document).on("blur", "#co_borrower_year_of_birth", function() {
        var year_validate_response = formValidator.yearValidate($(this));
        if (year_validate_response == 0) {
            $(this).addClass("error");
            var attribute_name = $(this).attr("name");
            $("#" + attribute_name + "_validator").addClass("validate_fail")
        } else {
            $(this).removeClass("error");
            $("#" + attribute_name + "_validator").removeClass('validate_fail');
        }
    });

    $(document).on("keypress", ".coborrowerdatepick", function(event) {
        return formatValidator(event, $(this), '', '', '', 10, '', '', '', '', '');
        //return formatValidatorNew('', $(this), '', '', '', 4, '', '', '', '', '');
    });

    $(document).on("blur", ".coborrowerdatepick", function(event) {
        var attribute_name = $(this).attr("name");
        if ($("#co_borrower_day_of_birth").hasClass("error") || $("#co_borrower_month_of_birth").hasClass("error") || $("#co_borrower_year_of_birth").hasClass("error")) {
            $("#" + attribute_name + "_validator").addClass("validate_fail")
        } else {
            $("#" + attribute_name + "_validator").removeClass("validate_fail")
        }
        //return formatValidatorNew('', $(this), '', '', '', 4, '', '', '', '', '');
    });

    /* END FUNCTIONS FOR VALIDATION OF CUSTOMER PESONAL INFORMATION 3rd PAGE */

});

/*
 redirectPage = function(loanTypeValue,isFromMobile){ //FUNCTION TO REDIRECT ON HOME LOAN BALANCE TRANSFER
 if(loanTypeValue == 1) {
 window.location.href = '/gold-loan-balance-transfer';
 } 
 } 
 */
/*
 function checkCurrentEmiMonthlyIncomeValidate(monthly_income_element_id, emi_element_id) { //FUNCTION TO COMPARE MONTHLY INCOME AND EMI
 var is_validate = 1;
 var gross_monthly_income = $("input[name='" + monthly_income_element_id + "']").val()!="" ? $("input[name='" + monthly_income_element_id + "']").val() : 0;
 var emi = $("input[name='" + emi_element_id + "']").val()!="" ? $("input[name='" + emi_element_id + "']").val() : 0;
 
 if (emi != "") {
 emi = emi.replace(/,/g, '');
 }
 
 if (gross_monthly_income != "") {
 gross_monthly_income = gross_monthly_income.replace(/,/g, '');
 }
 emi = parseInt(emi);
 gross_monthly_income = parseInt(gross_monthly_income);
 
 if (emi > 0 && gross_monthly_income > 0) {
 if (emi >= gross_monthly_income) {
 is_validate = 0;
 $("input[name='"+monthly_income_element_id+"']").addClass('error');
 $("input[name='"+emi_element_id+"']").addClass('error');
 FirstPageErrorHandler.addErrorIndicator($("input[name='"+monthly_income_element_id+"']"),"Invalid data");
 FirstPageErrorHandler.addErrorIndicator($("input[name='"+emi_element_id+"']"),"Invalid data");
 } else {
 is_validate = 1;
 $("input[name='"+monthly_income_element_id+"']").removeClass('error');
 $("input[name='"+emi_element_id+"']").removeClass('error');
 FirstPageErrorHandler.removeErrorIndicator($("input[name='"+monthly_income_element_id+"']"));
 FirstPageErrorHandler.removeErrorIndicator($("input[name='"+emi_element_id+"']"));
 }
 } /*else if (emi > 0 && gross_monthly_income <= 0) {
 is_validate = 0;
 }*//*
  return is_validate;
  }
  */
function enableDisableMonth(year_id) {
    if (year_id > 0) {
        $("#start_month_of_loan").removeAttr("disabled");
        var selectedYear = $("#start_year_of_loan option:selected").text();
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();

        //CODE TO DISPLAY MONTHS TILL CURRENT MONTH FOR CURRENT YEAR
        if (selectedYear == currentYear) {
            $("#start_month_of_loan").empty();
            $(global_month_name).each(function(key, value) {
                if (key <= currentMonth) {
                    $("#start_month_of_loan").append($("<option>").attr('value', key).text(value[key]));
                }
            });
        } else {
            $("#start_month_of_loan").empty();
            $(global_month_name).each(function(key, value) {
                $("#start_month_of_loan").append($("<option>").attr('value', key).text(value[key]));
            });
        }
    } else {
        $("#start_month_of_loan").val(0);
        $("#start_month_of_loan").removeClass("error");
        $("#start_month_of_loan_validator").removeClass("validate_fail");
        $("#start_month_of_loan").attr('disabled', true);
    }
}

verifyOTPCode = function() { //FUNCTION CALLED WHEN WE ENTER OTP CODE AND HIT ON VERIFY
    showLoader('loading', 'display-block');
    $("#otp_validator").attr('class', '');
    $("#otp_validator").html("");
    // $(".otp").css('');
    if ($(".otp").val() != "" && $(".otp").val().length == 4 && ($(".otp").val() > 0)) {
        var data = $("#ValidateMobileCode").serialize();
        $.ajax({
            type: "POST",
            url: "/"+page_action_url+"/",
            data: data + "&step=validate_otp_code",
            dataType: 'json',
            success: function(response) {
                if (response.status == "success") {
                    $("#main_content").html(response.html);
                    getSliderForAmountAndTenure();
                } else if (response.redirect_url != undefined) {
                    window.location = response.redirect_url;
                } else if (response.status == "error") {
                    $("#otp_validator").addClass("setp_box_active");
                    $("#otp_validator").html(response.error_message);
                    $(".otp").addClass("error");
                }
                showLoader('loading', 'display-none');
            }
        });
    } else {
        showLoader('loading', 'display-none');
        if ($(".otp").val() == "") {
            $("#otp_validator").addClass("setp_box_active_error");
            $("#otp_validator").html("Please enter OTP code.");
        } else {
            $("#otp_validator").addClass("setp_box_active");
            $("#otp_validator").html("Error: OTP code is incorrect. Please enter correct OTP or click on resend");
        }
        $(".otp").addClass("error");
    }
}

resendOTPCode = function() { // FUNCTION TO RESEND OTP CODE
    $("#otp").val('');
    $("#otp").removeClass("error");
    $("#otp_validator").attr('class', '');
    $("#otp_validator").html("");
    $("#mobile_change").removeClass("error");
    showLoader('loading', 'display-block');
    $.ajax({
        type: "POST",
        url: "/"+page_action_url+"/",
        data: "&step=resend_code",
        dataType: 'json',
        success: function(response) {
            if (response.status == "success") {
                $("#resend_validator").attr('class', '');
                $("#resend_validator").addClass('setp_box_active_success');
                $("#resend_validator").html(response.error_message);
            } else if (response.status == "error") {
                $("#resend_validator").attr('class', '');
                $("#resend_validator").addClass('setp_box_active');
                $("#resend_validator").html(response.error_message);
            }
            showLoader('loading', 'display-none');
        }
    });
}

resendOTPCodeOnNewNumber = function() { //TO BE CALLED WHEN CLICK ON CHANGE MOBILE NUMBER ON OTP SCREEN AND RESENDING OTP CODE
    $("#mobile_change").css('border', 'solid 1px #d5d5d5');
    showLoader('loading', 'display-block');
    if ($(".resend").val() != "" && $(".resend").val().length == 10 && ($(".resend").val() > 0)) {
        var data = $("#resendCode").serialize();
        $.ajax({
            type: "POST",
            url: "/"+page_action_url+"/",
            data: data + "&step=resend_code",
            dataType: 'json',
            success: function(response) {
                if (response.status == "success") {
                    $("#main_content").html(response.html);
                } else if (response.redirect_url != undefined) {
                    window.location = response.redirect_url;
                } else if (response.status == "error") {
                    $("#otp_validator").attr('class', '');
                    $("#otp_validator").attr('class', 'setp_box_active');
                    $("#otp_validator").html(response.error_message);
                    $(".resend").addClass("error");
                }
                showLoader('loading', 'display-none');
            }
        });
    } else {
        showLoader('loading', 'display-none');
        $(".resend").css('border', 'solid 1px red');
        return false;
    }
}

changeMobileNumber = function() { //TO BE CALLED WHEN CLICK ON CHANGE MOBILE NUMBER
    $("#otp").val('');
    $("#otp").removeClass("error");
    $("#otp_validator").attr('class', '');
    $("#otp_validator").html('');
    $("#resend_validator").attr('class', '');
    $("#resend_validator").html('');
    var html_change = '<form class=\'resendCode\' id=\'resendCode\'><span class="entrmobile">New Mobile No:&nbsp;</span><input type="text" autocomplete="off" id="mobile_change" class="resend otp_textbox_resend" maxlength="10" name="mobile_change">&nbsp;<input type=\"button\" class=\"change_btn resend_otp_code\" value=\"Go\">&nbsp;<input type=\"button\" class=\"change_btn cancel_code\" value=\"Cancel\"></form>';
    $("#change_mobile").html(html_change);
}

cancelMobileNumberChange = function() { // TO BE CALLED WHEN CLICK ON CHANGE MOBILE NUMBER ON OTP SCREEN AND THEN CANCEL IT
    var html_change = '<input type="button" value="Change Mobile Number" class="change_btn new_mobile">';
    $("#change_mobile").html(html_change);
}

goToPreviousScreen = function() { // CALLED WHEN CLICK ON BACKSCREEN
    showLoader('loading', 'display-block');
    var src = $(this).attr("field-value");
    $.ajax({
        type: "POST",
        url: "/"+page_action_url+"/",
        data: "step=backscreen&screen_show=" + src,
        dataType: 'json',
        success: function(response) {
            if (response.status == "success") {
                autolistener = 0;
                $("#main_content").hide('1000', function() {
                    $("#main_content").html(response.html);
                    getSliderForAmountAndTenure();
                    $("#main_content").show('2000');
                    showLoader('loading', 'display-none');
                });
            } else if (response.status == "error") {
                $("#err-msg").html(response.error_message);
                $("#err-msg").addClass("message-error m5b");
                window.scrollTo(0, 100);
                showLoader('loading', 'display-none');
            }
        }
    });
}

//Send SMS To ICICI Bank Representative With Pincode,19112015
function getCityPincodes(city_id,empty_flag) {

    if ($('#pincode') && empty_flag > 0) {
        $('#pincode').val('');
    }
    if (city_id != "" && city_id > 0) {        
        $.ajax({
            type: "POST",
            url: "/common-request",
            data: "step=pincode&city_id=" + city_id,
            dataType: 'json',
            success: function (response) {
                if (response.status == "success") {
                    pin_code_array = response.html;		    
                } else if (response.status == "error") {
                    pin_code_array = "";
                }
                if (response.pincode_range != '') {
                        pin_code_range = response.pincode_range;
                }
            }
        });
    }
}
//End

function getSliderEligibility() { //WHEN CHANGING SLIDER VALUE FROM 2ND PAGE
    showLoader('loading', 'display-block');
    var data = 'selectEligibility=' + $("#amount").text() + '&selectTenure=' + $("#loan_duration").text();
    $.ajax({
        type: "POST",
        url: "/"+page_action_url+"/",
        data: data + "&step=sliderrequest",
        dataType: 'json',
        success: function(response) {
            autolistener = 0;
            if (response.status == "success") {
                $("#main_content").html(response.html);
                getSliderForAmountAndTenure();
                showLoader('loading', 'display-none');
            } else if (response.status == "error") {
                $("#err-msg").html(response.error_message);
                $("#err-msg").addClass("message-error m5b");
                window.scrollTo(0, 100);
                showLoader('loading', 'display-none');
            }
        }
    });
}

/**
 * FUNCTION TO APPLY LOAN 
 */
function applyBank(src, is_partner) {
    showLoader('loading', 'display-block');
    var value = src;
    $.ajax({
        type: "POST",
        url: "/"+page_action_url+"/",
        data: "step=bankapply&applybankId=" + value,
        dataType: 'json',
        success: function(response) {
            if (response.status == "success") {
                if (is_partner == 0) {
                    showLoader('loading', 'display-none');
                    showOverlay('overlay_message', 'display-block');
                    $(".overlayClass").html(response.error_message);
                } else {
                    autolistener = 1;
                    AutoListenerSave(1, 0);
                    $("#main_content").hide('1000', function() {
                        $("#main_content").html(response.html);
                        $("#main_content").show('2000');
                        showLoader('loading', 'display-none');
                        $('body,html').animate({scrollTop: 125}, 800);
                        $(response.additional_data_value).each(function(key, value) {
                            if (key == 0)
                                pin_code_array = value;
                            else
                                office_pin_code = value;
                        });
                    });
                }
            } else if (response.redirect_url != undefined) {
                window.parent.location = response.redirect_url;
            } else if (response.status == "error") {
                $("#err-msg").html(response.error_message);
                $("#err-msg").addClass("message-error m5b");
                window.scrollTo(0, 100);
                showLoader('loading', 'display-none');
            }
        }
    });
}

function uploadFile() {
    var xmlhttp = null;
    var return_status = true;
    var count = 0;
    $("#id_proof").attr('style', '');
    $("#add_proof").attr('style', '');
    $("#age_proof").attr('style', '');
    $("#income_proof").attr('style', '');
    if ($("#id_proof").val() == "" && $("#add_proof").val() == "" && $("#age_proof").val() == "" && $("#income_proof").val() == "") {
        $("#id_proof").css('border', 'solid 1px red');
        $("#add_proof").css('border', 'solid 1px red');
        $("#age_proof").css('border', 'solid 1px red');
        $("#income_proof").css('border', 'solid 1px red');
        return_status = false;
    }
    if (($("#id_proof").val() != "" && $("#file_id_proof").val() == "") || ($("#id_proof").val() == "" && $("#file_id_proof").val() != "")) {
        $("#id_proof").css('border', 'solid 1px red');
        return_status = false;
    }
    if (($("#add_proof").val() != "" && $("#file_add_proof").val() == "") || ($("#add_proof").val() == "" && $("#file_add_proof").val() != "")) {
        $("#add_proof").css('border', 'solid 1px red');
        return_status = false;
    }
    if (($("#age_proof").val() != "" && $("#file_age_proof").val() == "") || ($("#age_proof").val() == "" && $("#file_age_proof").val() != "")) {
        $("#age_proof").css('border', 'solid 1px red');
        return_status = false;
    }
    if (($("#income_proof").val() != "" && $("#file_income_proof").val() == "") || ($("#income_proof").val() == "" && $("#file_income_proof").val() != "")) {
        $("#income_proof").css('border', 'solid 1px red');
        return_status = false;
    }

    if (!return_status) {
        return false;
    }
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var formElement = document.getElementById("uploaddocs");
    var formData = new FormData(formElement);        //making entire form object
    for (var i = 0; i < formElement.length; i++) {
        if ($("#" + formElement[i].id).val() != "" && document.getElementById(formElement[i].id) != null && document.getElementById(formElement[i].id).disabled == false) {
            $('.' + formElement[i].id + '_loader').html("<img height=\"20\" src=\"/components/images/loading.gif\">");
        }
    }
    //return false;
    showLoader('loading', 'display-block');
    $("#err-msg").addClass("display-none");
    xmlhttp.open("POST", "/"+page_action_url+"/?&step=upload_docs", false);
    xmlhttp.send(formData);
    if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
        var json = jQuery.parseJSON(xmlhttp.responseText)
        if (json.status == "success") {
            for (var i = 0; i < formElement.length; i++) {
                if ($("#" + formElement[i].id).val() != "") {
                    var message = json.error_message;
                    if (document.getElementById(formElement[i].id) != null) {
                        if (message.error_type == 1 || message.error_type == 2 || message.error_type == 3) {
                        } else {
                            document.getElementById(formElement[i].id).disabled = true;
                        }
                    }
                    if (formElement[i].id == "file_id_proof") {
                        $('.' + formElement[i].id + '_loader').html(message.file_id_proof);
                    }
                    if (formElement[i].id == "file_add_proof") {
                        $('.' + formElement[i].id + '_loader').html(message.file_add_proof);
                    }
                    if (formElement[i].id == "file_age_proof") {
                        $('.' + formElement[i].id + '_loader').html(message.file_age_proof);
                    }
                    if (formElement[i].id == "file_income_proof") {
                        $('.' + formElement[i].id + '_loader').html(message.file_income_proof);
                    }
                }
                if (message.upload_type == "success") {
                    setTimeout(function() {
                        $(".doc-upload").addClass(" heading_success m10b");
                        $(".doc-upload").html(message.success_messgae);
                    }, 1000)
                }
            }

        } else if (json.status == "error") {
            $("#err-msg").html(json.error_message);
            $("#err-msg").addClass("display-block message-error");
            for (var i = 0; i < formElement.length; i++) {
                if ($("#" + formElement[i].id).val() != "" && document.getElementById(formElement[i].id) != null && document.getElementById(formElement[i].id).disabled == false) {
                    $('.' + formElement[i].id + '_loader').html("");
                }
            }
        }
        showLoader('loading', 'display-none');
    }
}

/**
 * COMMON FUNCTION TO AUTO COMPLETE
 */
fillDataByAutocomplete = function(object, field_id, page_name, focus_on_field) {
    $(object).autocomplete({
        source: function(request, response) {
            var $this = $(this);
            var $element = $(this.element);
            var jqrequest = $element.data('jqrequest');
            if (jqrequest) {
                jqrequest.abort();
            }
            var data;
            if (page_name == "get_builder_name") {
                data = {builder_name: request.term, step: page_name};
            } else if (page_name == "get_employer_name") {
                data = {employer_name: request.term, step: page_name};
            }
            $element.data('jqrequest',
                    $.ajax({
                        url: "/common-request",
                        dataType: "json",
                        async: "false",
                        mode: "abort",
                        asyn: false,
                        data: data,
                        beforeSend: function() {
                            if (document.getElementById("'" + field_id + "'_exists'") != undefined) {
                                document.getElementById("'" + field_id + "'_exists'").innerHTML = "  <img height=\"20\" src=\"/components/images/loading.gif\">";
                            }
                        },
                        success: function(returnObj) {
                            response($.map(returnObj.html, function(item) {
                                return {
                                    label: item,
                                    value: item
                                }
                            }));
                            if (document.getElementById("'" + field_id + "'_exists'") != undefined) {
                                document.getElementById("'" + field_id + "'_exists'").innerHTML = "";
                            }
                        }
                    })
                    );
        },
        minLength: 2,
        selectFirst: true,
        selectOnly: true,
        select: function(event, ui) {
            $("#" + field_id).val(ui.item.label);
            return true;
        }
    }).keydown(function(e, data, ui) {
        if (e.which == 13) {
            setTimeout(function() {
                $(".ui-autocomplete").css('display', 'none');
                $('#' + focus_on_field).focus();
            }, 500)
        }
        if (e.which == 9 || e.which == 13) {
            if ($(".ui-autocomplete").css('display') != 'none') {
                var res = $(".ui-autocomplete li:first a").html();
                $("#" + field_id).val(res);
                return true;
            }
        }
    });
}

insertErrorScrollValue = function(element, parent_element) {
    var position = $("input[name='" + element + "']").parents(parent_element).offset().top;
    $("input[name='" + element + "']").attr('error-scroll', Math.round(position));
}

validatePurposeOfLoan = function(element_key, element_value) {
    var has_error = false;
    var errorObject = '';
    var position = '';
    if (element_value == "") {
        iconGroupButtonAction.errorScrollRow($("input[name='" + element_key + "']"));
        $("input[name='" + element_key + "']").parent().addClass('error');
        $("input[name='" + element_key + "']").parent().removeClass('selected');
        errorObject = $("input[name='loan_type']");
        //position = $("input[name='loan_type']").parents('div.panel').offset().top;
        // $("input[name='loan_type']").attr('error-scroll', Math.round(position));
        iconGroupButtonAction.errorScrollRow(errorObject);
        has_error = true;
        FirstPageErrorHandler.addErrorIndicator($("input[name='" + element_key + "']"), "Missing field");
    } else if (element_value == "2") {
        FirstPageErrorHandler.removeErrorIndicator($("input[name='" + element_key + "']"));
        var purpose_loan_value = $(quote_element_object).attr("purpose_of_loan");
        if (purpose_loan_value == "") {
            $("input[name='purpose_of_loan']").parent().addClass('error');
            $("input[name='purpose_of_loan']").parent().removeClass('selected');
            position = $("input[name='purpose_of_loan']").parents('div.panel').offset().top - 20;
            $("input[name='purpose_of_loan']").attr('error-scroll', Math.round(position));
            errorObject = $("input[name='purpose_of_loan']");
            has_error = true;
            iconGroupButtonAction.errorScrollRow(errorObject);
            FirstPageErrorHandler.addErrorIndicator($("input[name='purpose_of_loan']"), "Missing field");
        } else {
            FirstPageErrorHandler.removeErrorIndicator($("input[name='purpose_of_loan']"));
            if (purpose_loan_value == "1" || purpose_loan_value == "2") {
                if ($('#builder_name').val() != "" && ($('#builder_name').val().length < 2 || !$('#builder_name').val().match(/^\d*[a-zA-Z][a-zA-Z0-9\.&_\-\s]*$/))) {
                    $('#builder_name').addClass('error');
                    FirstPageErrorHandler.addErrorIndicator($('#builder_name'), 'Invalid data');
                    position = $("input[name='builder_name']").parents('div.panel').offset().top - 20;
                    $("input[name='builder_name']").attr('error-scroll', Math.round(position));
                    errorObject = $("input[name='builder_name']");
                    has_error = true;
                    iconGroupButtonAction.errorScrollRow(errorObject);
                } else {
                    $('#builder_name').removeClass('error');
                    FirstPageErrorHandler.removeErrorIndicator($('#builder_name'));
                }

                var is_cost_home_flat_validated = 1;
                if ($("input[name='cost_home_flat']").val() == "") {
                    is_cost_home_flat_validated = 0;
                    FirstPageErrorHandler.addErrorIndicator($("input[name='cost_home_flat']"), "Missing field");
                } else {
                    is_cost_home_flat_validated = getFieldValidate($("input[name='cost_home_flat']"), 1);
                    FirstPageErrorHandler.addErrorIndicator($("input[name='cost_home_flat']"), "Invalid data");
                }

                if (is_cost_home_flat_validated == 0) {
                    $("input[name='cost_home_flat']").addClass('error');
                    position = $("input[name='cost_home_flat']").parents('div.panel').offset().top - 20;
                    $("input[name='cost_home_flat']").attr('error-scroll', Math.round(position));
                    errorObject = $("input[name='cost_home_flat']");
                    has_error = true;
                    iconGroupButtonAction.errorScrollRow(errorObject);
                } else {
                    FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_home_flat']"));
                }
            } else if (purpose_loan_value == "3") {
                if ($(quote_element_object).attr("sub_purpose_of_loan_id") == "") {
                    $("input[name='sub_purpose_of_loan_id']").parent().addClass('error');
                    $("input[name='sub_purpose_of_loan_id']").parent().removeClass('selected');
                    position = $("input[name='sub_purpose_of_loan_id']").parents('div.panel').offset().top - 20;
                    $("input[name='sub_purpose_of_loan_id']").attr('error-scroll', Math.round(position));
                    errorObject = $("input[name='sub_purpose_of_loan_id']");
                    has_error = true;
                    iconGroupButtonAction.errorScrollRow(errorObject);
                    FirstPageErrorHandler.addErrorIndicator($("input[name='sub_purpose_of_loan_id']"), "Missing field");
                } else {
                    if ($(quote_element_object).attr("sub_purpose_of_loan_id") == "1") {
                        if ($(quote_element_object).attr("location_of_land") == "") {
                            $("input[name='location_of_land']").parent().addClass('error');
                            $("input[name='location_of_land']").parent().removeClass('selected');
                            position = $("input[name='location_of_land']").parents('div.panel').offset().top - 20;
                            $("input[name='location_of_land']").attr('error-scroll', Math.round(position));
                            errorObject = $("input[name='location_of_land']");
                            has_error = true;
                            iconGroupButtonAction.errorScrollRow(errorObject);
                            FirstPageErrorHandler.addErrorIndicator($("input[name='location_of_land']"), "Missing field");
                        } else {
                            FirstPageErrorHandler.removeErrorIndicator($("input[name='location_of_land']"));
                            var is_cost_plot_validated = 1;
                            if ($("input[name='cost_plot']").val() == "") {
                                is_cost_plot_validated = 0;
                                FirstPageErrorHandler.addErrorIndicator($("input[name='cost_plot']"), "Missing field");
                            } else {
                                is_cost_plot_validated = getFieldValidate($("input[name='cost_plot']"), 1);
                                FirstPageErrorHandler.addErrorIndicator($("input[name='cost_plot']"), "Invalid data");
                            }

                            if (is_cost_plot_validated == 0) {
                                $("input[name='cost_plot']").addClass('error');
                                position = $("input[name='cost_plot']").parents('div.panel').offset().top - 20;
                                $("input[name='cost_plot']").attr('error-scroll', Math.round(position));
                                errorObject = $("input[name='cost_plot']");
                                has_error = true;
                                iconGroupButtonAction.errorScrollRow(errorObject);
                            } else {
                                FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_plot']"));
                            }
                        }
                    } else if ($(quote_element_object).attr("sub_purpose_of_loan_id") == "2") {
                        var is_cost_construction_validated = 1;
                        if ($("input[name='cost_construction']").val() == "") {
                            is_cost_construction_validated = 0;
                            FirstPageErrorHandler.addErrorIndicator($("input[name='cost_construction']"), "Missing field");
                        } else {
                            is_cost_construction_validated = getFieldValidate($("input[name='cost_construction']"), 1);
                            FirstPageErrorHandler.addErrorIndicator($("input[name='cost_construction']"), "Invalid data");
                        }

                        if (is_cost_construction_validated == 0) {
                            $("input[name='cost_construction']").addClass('error');
                            position = $("input[name='cost_construction']").parents('div.panel').offset().top - 20;
                            $("input[name='cost_construction']").attr('error-scroll', Math.round(position));
                            errorObject = $("input[name='cost_construction']");
                            has_error = true;
                            iconGroupButtonAction.errorScrollRow(errorObject);
                        } else {
                            FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_construction']"));
                        }
                    }
                }
            }
        }
    } else if (element_value == "1") {
        var loan_with_current_bank = $(quote_element_object).attr('loan_with_current_bank');
        var outstanding_loan_month = $(quote_element_object).attr('outstanding_loan_month');
        var outstanding_loan_year = $(quote_element_object).attr('outstanding_loan_year');
        var outstanding_balance = $("input[name='outstanding_balance']").val();
        if (loan_with_current_bank == "") {
            if ($("#other_bank_loan").hasClass('hide')) {
                $("input[name='loan_with_current_bank']").parent().addClass('error');
            } else {
                $("select[name='loan_with_current_bank']").parent().addClass('error');
            }
            position = $("input[name='loan_with_current_bank']").parents('div.panel').offset().top - 20;
            $("input[name='loan_with_current_bank']").attr('error-scroll', Math.round(position));
            errorObject = $("input[name='loan_with_current_bank']");
            has_error = true;
            iconGroupButtonAction.errorScrollRow(errorObject);
            FirstPageErrorHandler.addErrorIndicator($("input[name='loan_with_current_bank']"), "Missing field");
        } else if (outstanding_loan_month == "" || outstanding_loan_year == "") {
            if (outstanding_loan_month == "") {
                $("select[name='outstanding_loan_month']").addClass('error');
            }
            if (outstanding_loan_year == "") {
                $("select[name='outstanding_loan_year']").addClass('error');
            }
            position = $("select[name='outstanding_loan_year']").parents('div.panel').offset().top - 20;
            $("select[name='outstanding_loan_year']").attr('error-scroll', Math.round(position));
            errorObject = $("select[name='outstanding_loan_year']");
            has_error = true;
            iconGroupButtonAction.errorScrollRow(errorObject);
            FirstPageErrorHandler.addErrorIndicator($("select[name='outstanding_loan_month']"), "Missing field");
        } else {
            var is_outstanding_balance_validated = 1;
            if (outstanding_balance == "") {
                is_outstanding_balance_validated = 0;
                FirstPageErrorHandler.addErrorIndicator($("input[name='outstanding_balance']"), "Missing field");
            } else {
                is_outstanding_balance_validated = getFieldValidate($("input[name='outstanding_balance']"), 1);
                FirstPageErrorHandler.addErrorIndicator($("input[name='outstanding_balance']"), "Invalid data");
            }
            if (is_outstanding_balance_validated == 0) {
                $("input[name='outstanding_balance']").addClass('error');
                position = $("input[name='outstanding_balance']").parents('div.panel').offset().top - 20;
                $("input[name='outstanding_balance']").attr('error-scroll', Math.round(position));
                errorObject = $("input[name='outstanding_balance']");
                has_error = true;
                iconGroupButtonAction.errorScrollRow(errorObject);
            } else {
                $("input[name='outstanding_balance']").removeClass('error');
                FirstPageErrorHandler.removeErrorIndicator($("input[name='outstanding_balance']"));
            }
        }
    }
    return has_error;
}

formValidator = {
    yearValidate: function(year_object) {
        var dateObject = new Date(); //CURRENT OBJECT
        var min_year = dateObject.getFullYear() - 70; // YEAR START
        var max_year = dateObject.getFullYear() - 18; // YEAR END        
        var month_object = $(year_object).prev(); // MONTH INPUT VALUE
        var day_object = $(month_object).prev(); // DAY INPUT VALUE
        var error_response = formatValidator('', $(year_object), '', '', '', 11, min_year, max_year, '', '', ''); //VALIDATE YEAR
        if (error_response == 1) {
            $(year_object).removeClass("error");
            if (!$(month_object).hasClass('error') && !$(day_object).hasClass('error')) {
                FirstPageErrorHandler.removeErrorIndicator($(year_object));
            }
        } else {
            $(year_object).addClass("error");
            if ($(day_object).val() == "" || $(month_object).val() == "" || $(year_object).val() == "") {
                FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
            } else {
                FirstPageErrorHandler.addErrorIndicator($(year_object), "Invalid data");
            }
        }

        if (parseInt($(month_object).val()) <= 0) {
            $(month_object).addClass("error");
            FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
        }

        if (parseInt($(day_object).val()) <= 0) {
            $(day_object).addClass("error");
            FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
        } else {
            if (error_response == 1) {
                error_response = formValidator.dayValidate($(day_object));
            }
        }
        return error_response;
    },
    monthValidate: function(month_object) {
        var year_object = $(month_object).next(); // YEAR INPUT VALUE
        var day_object = $(month_object).prev(); // DAY INPUT VALUE
        var error_response = formatValidator('', $(month_object), '', '', '', 11, 1, 12, '', '', ''); // VALIDATE MONTH

        if (error_response == 1) {
            $(month_object).removeClass("error");
            if (!$(year_object).hasClass('error') && !$(day_object).hasClass('error')) {
                FirstPageErrorHandler.removeErrorIndicator($(year_object));
            }
        } else {
            $(month_object).addClass("error");
            if ($(day_object).val() == "" || $(month_object).val() == "" || $(year_object).val() == "") {
                FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
            } else {
                FirstPageErrorHandler.addErrorIndicator($(year_object), "Invalid data");
            }
        }

        if (parseInt($(day_object).val()) <= 0) {
            $(day_object).addClass("error");
            FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
        } else {
            if (error_response == 1) {
                error_response = formValidator.dayValidate(day_object); // VALIDATE DAY
            }
            //FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
        }
        return error_response;
    },
    dayValidate: function(date_object) {
        var month_object = $(date_object).next(); // MONTH INPUT VALUE
        var year_object = $(month_object).next(); // YEAR INPUT VALUE

        var maximum_value = '31';
        maximum_value = dateValidate.calculateDays($(month_object).val(), $(year_object).val());
        var error_response = formatValidator('', $(date_object), '', '', '', 11, 1, maximum_value, '', '', ''); // VALIDATE DAY
        if (error_response == 1) {
            $(date_object).removeClass("error");
            if (!$(year_object).hasClass('error') && !$(month_object).hasClass('error')) {
                FirstPageErrorHandler.removeErrorIndicator($(year_object));
            }
        } else {
            $(date_object).addClass("error");
            if ($(date_object).val() == "" || $(month_object).val() == "" || $(year_object).val() == "") {
                FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
            } else {
                FirstPageErrorHandler.addErrorIndicator($(year_object), "Invalid data");
            }
        }
        return error_response;
    },
    quoteFormValidator: function(element) {
        var has_error = false;
        var errorObject = '';

        $.each(quote_element_object, function(key, value) {
            //console.log(key + '~~' +value);
            if (key == 'city_id') {
                var property_city = $(quote_element_object).attr('city_id');
                if (property_city == "") {
                    //var property_position = $("input[name='city_id']").parents('div.panel').offset().top - 20;
                    errorObject = $("input[name='city_id']");
                    if ($("#other_city").hasClass('hide')) {
                        $("input[name='city_id']").parent().addClass('error');
                    } else {
                        $("select[name='city_id']").parent().addClass('error');
                    }
                    has_error = true;
                    //$("input[name='city_id']").attr('error-scroll', Math.round(property_position));
                    //iconGroupButtonAction.errorScrollRow(errorObject);
                    FirstPageErrorHandler.addErrorIndicator($("input[name='city_id']"), "Missing field");
                    scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                    $('body,html').animate({scrollTop: parseInt(scroll)}, 800);
                }
            }

            if (has_error == true) {
                return false;
            } else {
                $("input[name='" + key + "']").removeClass('error');
            }

        });
        if (!has_error) {
            if(run_ominture_track){_satellite.track('formstep-1-Complete'); run_ominture_track = false;}
            //console.log(element);
            var position = $(element).parents('div.panel').offset();
            if ($(element).attr('key-value') == 1) {
                //$('body,html').animate({scrollTop: parseInt(position.top) + parseInt($(element).parents('div.panel').css('height')) + 25}, 800);
            } else {
                //$('body,html').animate({scrollTop: parseInt(position.top) - 5}, 800);
            }
            /*
             if ($(element).attr('key-name') == 'self_employed_professional' || $(element).attr('key-name') == 'self_employed_business') {
             $("#slider_5").attr('max', 10000000);
             $("#slider_5_txt").attr("maxlength", "11");
             $(".income_duration").text('gross annual');
             $(".monthly_income-tooltip").html('Enter your gross annual income');
             $("#head-account").text('Your bank account is with?');
             $("#annual_turnover_div").removeClass('hide');
             } else {
             $("#profession_type").val(''); //CLEAR PROFESSION TYPE VALUE ON EMPLOYMENT TYPE CHANGE
             $(quote_element_object_second).attr('employment_type_sub_id', '');
             $(".income_duration").text('gross monthly');
             $("#slider_5").attr('max', 200000);
             $("#slider_5_txt").attr("maxlength", "8");
             $(".monthly_income-tooltip").html('Enter your gross monthly income excluding all variable, bonus and incentives');
             $("#head-account").text('Your salary account is with?');
             $("#annual_turnover_div").addClass('hide');
             }
             
             $("#slider_5_inword").html('');
             // IE ERROR RESOLVED BY SAURABH START
             if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
             $("input[name='monthly_income']").val($("input[name='monthly_income']").attr('placeholder'));
             } else {
             $("input[name='monthly_income']").val('');
             }
             // IE ERROR RESOLVED BY SAURABH END
             
             $(quote_element_object_second).attr('monthly_income', '');
             $("#slider_5").slider({
             max: $("#slider_5").attr("max"),
             value: $("#slider_5").attr("min")
             }).slider("pips", {rest: "label", prefix: "Rs."}).slider("float");
             */
            iconGroupButtonAction.activeIcon($(element));
            $("." + $(element).attr('key-name') + '-li').removeClass('hide');
            $("#part-2").removeClass('hide');
            var is_set = iconGroupButtonAction.setValue($(element), quote_element_object);
            if (is_set == false) {
                iconGroupButtonAction.setValue($(element), quote_element_object_second);
            }
        }
    },
    quoteForm1Validator: function(element) {
        $("#company_name").parent().removeClass("error");
        $("#employment_type_sub_id").parent().removeClass("error");
        FirstPageErrorHandler.removeError($("#employment_type_sub_id"));
        FirstPageErrorHandler.removeErrorIndicator($(".employment-type"));
        var has_error = false;
        $.each(quote_element_object, function(key, value) {
            if (value == "" && $("input[name='" + key + "']").hasClass('notnull')) {
                if (key == 'city_name') {
                    var errorObject = '';
                    if ($("#other_city").hasClass('hide')) {
                        $("input[name='" + key + "']").each(function() {
                            FirstPageErrorHandler.addError($(this), 'Missing field');
                            errorObject = $(this);
                        });
                    } else {
                        $("select[name='" + key + "']").each(function() {
                            FirstPageErrorHandler.addError($(this), 'Missing field');
                            errorObject = $(this);
                        });
                    }
                    var position = $(errorObject).parents('div.panel').position();
                    $('body,html').animate({scrollTop: parseInt(position.top)}, 1000);
                    has_error = true;
                    return false;
                }
            }
        });
        if (!has_error) {
            
            if ($(element).attr('key-name') == 'self_employed_professional' || $(element).attr('key-name') == 'self_employed_business') {
                $("#company_name").val(''); //CLEAR COMPANY NAME VALUE ON EMPLOYMENT TYPE CHANGE
                $(quote_element_object_second).attr('company_name', '');
                $(".income_duration").text('gross annual');
                $(".monthly_income-tooltip").html('Enter your gross annual income for the last financial year (as per filed ITR)');
                $("#slider_1").attr('max', 10000000);
                $("#head-account").text('Your bank account is with?');
                $("#annual_turnover_div").removeClass('hide');
            } else {
                $("#profession_type").val(''); //CLEAR PROFESSION TYPE VALUE ON EMPLOYMENT TYPE CHANGE
                $("#employment_type_sub_id").val('');
                $(quote_element_object_second).attr('employment_type_sub_id', '');
                $(".income_duration").text('net monthly');
                $(".monthly_income-tooltip").html('Enter your net monthly income excluding all variable, bonus and incentives');
                $("#slider_1").attr('max', 200000);
                $("#head-account").text('Your salary account is with?');
                $("#annual_turnover_div").addClass('hide');
            }
            $("#slider_1_inword").html('');
            $("input[name='monthly_income']").val('');
            $(quote_element_object_second).attr('monthly_income', '');
            //$("#slider_1").attr('max', parseInt($("#slider_1").attr('max')));
            //getSlider(quote_element_object, quote_element_object_second);
            $("#slider_1").slider({
                max: $("#slider_1").attr("max"),
                value: $("#slider_1").attr("min")
            }).slider("pips", {rest: "label", prefix: "Rs."}).slider("float");
            iconGroupButtonAction.activeIcon($(element));
            $("." + $(element).attr('key-name') + '-li').removeClass('hide');
            $("#part-2").removeClass('hide');
            $('#company_name').focus();
            var is_set = iconGroupButtonAction.setValue($(element), quote_element_object);
            if (is_set == false) {
                iconGroupButtonAction.setValue($(element), quote_element_object_second);
            }
        }
    },
    quoteFullFormValidator: function() {
        var scroll = 0;
        var is_validated = true;
        $.each(quote_element_object, function(key, value) {
            if (key == "city_id") {
                if (value == "") {
                    if ($("#other_city").hasClass('hide')) {
                        $("input[name='city_id']").parent().addClass('error');
                        FirstPageErrorHandler.addErrorIndicator($("input[name='city_id']"), "Missing field");
                    } else {
                        $("select[name='city_id']").parent().addClass('error');
                        FirstPageErrorHandler.addErrorIndicator($("select[name='city_id']"), "Missing field");
                    }
                    is_validated = false;
                    if (scroll == 0) {
                        scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                    }
                } else {
                    if ($("#other_city").hasClass('hide')) {
                        $("input[name='city_id']").parent().removeClass('error');
                    } else {
                        $("select[name='city_id']").parent().removeClass('error');
                    }
                    FirstPageErrorHandler.removeErrorIndicator($('input[name="city_id"]'));
                }
            } else if (key == 'customer_name') {
                var is_customer_name_validated = 1;
                is_customer_name_validated = nameValidate($("input[name='customer_name']"));
                if (is_customer_name_validated == 0) {
                    is_validated = false;
                    if (scroll == 0) {
                        scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                    }
                }
            } else if (key == 'title') {
                if (value == "") {
                    $('input[name="' + key + '"]').parent().addClass('error');
                    is_validated = false;
                    FirstPageErrorHandler.addErrorIndicator($("input[name='" + key + "']"), "Missing field");

                    if (scroll == 0) {
                        scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                    }
                } else {
                    $('input[name="' + key + '"]').parent().removeClass('error');
                    FirstPageErrorHandler.removeErrorIndicator($('input[name="' + key + '"]'));
                }
            } else if (key == 'date_of_birth') {
                if ($('.datepick').hasClass('error')) {
                    is_validated = false;
                }

                if ($('#day_of_birth').val() == '') {
                    $('#day_of_birth').addClass('error');
                    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
                    is_validated = false;
                } else {
                    var is_day_validated = 1;
                    is_day_validated = formValidator.dayValidate($('#day_of_birth'));
                    if (is_day_validated == 0) {
                        is_validated = false;
                    }
                }

                if ($('#month_of_birth').val() == '') {
                    $('#month_of_birth').addClass('error');
                    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
                    is_validated = false;
                } else {
                    var is_month_validated = 1;
                    is_month_validated = formValidator.monthValidate($('#month_of_birth'));
                    if (is_month_validated == 0) {
                        is_validated = false;
                    }
                }

                if ($('#year_of_birth').val() == '') {
                    $('#year_of_birth').addClass('error');
                    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
                    is_validated = false;
                } else {
                    var is_year_validated = 1;
                    is_year_validated = formValidator.yearValidate($('#year_of_birth'));
                    if (is_year_validated == 0) {
                        is_validated = false;
                    }
                }
                if (is_validated == false && scroll == 0) {
                    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
                    scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                }
            } else if (key == 'email') {
                var is_email_validated = 1;
                is_email_validated = getFieldValidate($('input[name="' + key + '"]'), 1);
                if (is_email_validated == 0) {
                    is_validated = false;
                    if (is_validated == false && scroll == 0) {
                        scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                    }
                }
            } else if (key == 'mobile_number') {
                var is_mobile_validated = 1;
                is_mobile_validated = getFieldValidate($('input[name="' + key + '"]'), 1);
                if (is_mobile_validated == 0) {
                    is_validated = false;
                    if (is_validated == false && scroll == 0) {
                        //scroll = $("input[name='mobile_number']").attr('error-scroll');
                        scroll = ($('input[name="' + key + '"]').parents("div.panel").position()).top - 5;
                    }
                }
            }
            //Send SMS To ICICI Bank Representative With Pincode,19112015
            else if (key == 'pincode' && !$('#pin_code_div').hasClass('hide')) {
                var has_pin_error = 1;
                has_pin_error = pincodeValidator($("input[name='pincode']"));
                if (has_pin_error == 0) {
                    insertErrorScrollValue('pincode', 'div.panel');
                    is_validated = false;
                    if (scroll == 0) {
                        scroll = $("input[name='pincode']").attr('error-scroll');
                    }
                }
            }
            //End
        });
        if (is_validated == false) {
            $('body,html').animate({scrollTop: parseInt(scroll)}, 800);
        }
        return is_validated;
    },
    quoteFullFormValidatorMobile: function() {
        var scroll = 0;
        var is_validated = true;
        var date_of_birth_validate = true;

	if (document.getElementById('loan_amount').value == '' || (document.getElementById('loan_amount').value).length <= 0) {
	    is_validated = false;
	    $("#loan_amount").parent().addClass('error');
	    $("#loan_amount").addClass('error');	  
	    if (scroll == 0) {
		scroll = ($('#loan_amount').parents('div.panel').position()).top;
	    }
	} else {
	    $("#loan_amount").parent().removeClass('error');
	    $("#loan_amount").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#loan_amount'));
	}
	
	if (document.getElementById('loan_tenure').value == '' || (document.getElementById('loan_tenure').value).length <= 0) {
	    is_validated = false;
	    $("#loan_tenure").parent().addClass('error');
	    $("#loan_tenure").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#loan_tenure"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#loan_tenure').parents('div.panel').position()).top;
	    }
	} else {
	    $("#loan_tenure").parent().removeClass('error');
	    $("#loan_tenure").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#loan_tenure'));
	}
	

        if (document.getElementById('monthly_income_mobile').value == '') {
            is_validated = false;
            $("#monthly_income_mobile").parent().addClass('error');
            $("#monthly_income_mobile").addClass('error');
            FirstPageErrorHandler.addErrorIndicator($("#monthly_income_mobile"), "Missing field");
            if (scroll == 0) {
                scroll = ($('#monthly_income_mobile').parents('div .panel').offset()).top;
            }
        } else {
            var is_monthly_income_validated = 1;
            is_monthly_income_validated = formatValidatorNew('', $('#monthly_income_mobile'), '', '', '', 8, 5000, 250000000, '', 12, '');
            if (is_monthly_income_validated == 0) {
                FirstPageErrorHandler.addErrorIndicator($("#monthly_income_mobile"), "Invalid data");
                $("#monthly_income_mobile").parent().addClass('error');
                $("#monthly_income_mobile").addClass('error');
                is_validated = false;
                if (scroll == 0) {
                    scroll = ($('#monthly_income_mobile').parents('div .panel').offset()).top;
                }
            } else {
                $("#monthly_income_mobile").parent().removeClass('error');
                $("#monthly_income_mobile").removeClass('error');
                FirstPageErrorHandler.removeErrorIndicator($('#monthly_income_mobile'));
            }
        }
        if (document.getElementById('customer_name_mobile').value == '') {
            is_validated = false;
            $("#customer_name_mobile").parent().addClass('error');
            $("#customer_name_mobile").addClass('error');
            FirstPageErrorHandler.addErrorIndicator($("#customer_name_mobile"), "Missing field");
            if (scroll == 0) {
                scroll = ($('#customer_name_mobile').parents('div .panel').offset()).top;
            }
        } else {
            $("#customer_name_mobile").parent().removeClass('error');
            $("#customer_name_mobile").removeClass('error');
            FirstPageErrorHandler.removeErrorIndicator($('#customer_name_mobile'));
        }

        if ($(quote_element_object).attr('title') == "") {
            $("input[name='title']").parent().addClass('error');
            is_validated = false;
            if (scroll == 0) {
                scroll = ($("input[name='title']").parents('div .panel').offset()).top;
            }
        } else {
            $("input[name='title']").parent().removeClass('error');
        }

        /* Date of Birth Validation starts */
        if ($('.datepick').hasClass('error')) {
            is_validated = false;
            date_of_birth_validate = false;
        }

        if ($('#day_of_birth').val() == '') {
            $('#day_of_birth').addClass('error');
            is_validated = false;
            date_of_birth_validate = false;
        } else {
            var is_day_validated = 1;
            is_day_validated = formValidator.dayValidate($('#day_of_birth'));
            if (is_day_validated == 0) {
                is_validated = false;
                date_of_birth_validate = false;
            }
        }

        if ($('#month_of_birth').val() == '') {
            $('#month_of_birth').addClass('error');
            is_validated = false;
            date_of_birth_validate = false;
        } else {
            var is_month_validated = 1;
            if (is_month_validated == 0) {
                is_validated = false;
                date_of_birth_validate = false;
            }
        }

        if ($('#year_of_birth').val() == '') {
            $('#year_of_birth').addClass('error');
            is_validated = false;
            date_of_birth_validate = false;
        } else {
            var is_year_validated = 1;
            is_year_validated = formValidator.yearValidate($('#year_of_birth'));
            if (is_year_validated == 0) {
                is_validated = false;
                date_of_birth_validate = false;
            }
        }

        if (is_validated == false && date_of_birth_validate == false && scroll == 0) {
            scroll = ($('#year_of_birth').parents('div .panel').offset()).top;
        }

        /* Date of Birth Validation End */

        if (document.getElementById('city_name_select_box').value == '') {
            is_validated = false;
            $("#city_name_select_box").parent().addClass('error');
            $("#city_name_select_box").addClass('error');
            if (scroll == 0) {
                scroll = ($('#city_name_select_box').parents('div .panel').offset()).top;
            }
        } else {
            $("#city_name_select_box").parent().removeClass('error');
            $("#city_name_select_box").removeClass('error');
        }
        
        //Send SMS To ICICI Bank Representative With Pincode,19112015
        if($(quote_element_object_second).attr('pincode') == ""){
            $("input[name='pincode']").parent().addClass('error');
            is_validated = false;
            if(scroll == 0){
                scroll = ($("input[name='pincode']").parents('div .panel').position()).top;
            }
        } else {
            $("input[name='pincode']").parent().removeClass('error');
        }
        //End

        if (document.getElementById('email').value == '') {
            is_validated = false;
            $("#email").parent().addClass('error');
            $("#email").addClass('error');
            FirstPageErrorHandler.addErrorIndicator($("#email"), "Missing field");
            if (scroll == 0) {
                scroll = ($('#email').parents('div .panel').offset()).top;
            }
        } else {
            var is_email_validated = 1;
            is_email_validated = formatValidatorNew('', $("#email"), '', '', '', 20, '', '', 6, 63, '');

            if (is_email_validated == 0) {
                is_validated = false;
                $("#email").parent().addClass('error');
                $("#email").addClass('error');
                FirstPageErrorHandler.addErrorIndicator($("#email"), "Invalid Data");
                if (scroll == 0) {
                    scroll = ($('#email').parents('div .panel').offset()).top;
                }
            } else {
                $("#email").parent().removeClass('error');
                $("#email").removeClass('error');
                FirstPageErrorHandler.removeErrorIndicator($('#email'));
            }
        }
        if (document.getElementById('mobile_number').value == '') {
            is_validated = false;
            $("#mobile_number").parent().addClass('error');
            $("#mobile_number").addClass('error');
            FirstPageErrorHandler.addErrorIndicator($("#mobile_number"), "Missing field");
            if (scroll == 0) {
                scroll = ($('#mobile_number').parents('div .panel').offset()).top;
            }
        } else {
            var is_mobile_validated = 1;
            is_mobile_validated = formatValidatorNew('', $('#mobile_number'), '', '', '', 19, '', '', '', 10, '');
            if (is_mobile_validated == 0) {
                is_validated = false;
                $("#mobile_number").parent().addClass('error');
                $("#mobile_number").addClass('error');
                FirstPageErrorHandler.addErrorIndicator($("#mobile_number"), "Missing field");
                if (scroll == 0) {
                    scroll = ($('#mobile_number').parents('div .panel').offset()).top;
                }
            } else {
                $("#mobile_number").parent().removeClass('error');
                $("#mobile_number").removeClass('error');
                FirstPageErrorHandler.removeErrorIndicator($('#mobile_number'));
            }
        }

        if (scroll != 0) {
            $('body,html').animate({scrollTop: scroll}, 800);
        }
        return is_validated;
    }
}

function getPurposeOfLoan(object) {
    $(quote_element_object).attr('purpose_of_loan', "");
    $(quote_element_object).attr('builder_name', "");
    $(quote_element_object).attr('loan_with_current_bank', "");
    $(quote_element_object).attr('cost_home_flat', "");
    $(quote_element_object).attr('outstanding_loan_year', "");
    $(quote_element_object).attr('outstanding_loan_month', "");

    var element_id = $(object).attr('id');
    $("#sub_purpose_of_loan").addClass("hide");
    $("#sub_plot_div").addClass("hide");
    $(".reset_purpose_loan_div_class").parent().removeClass("selected");
    //$(".reset_purpose_loan_div_class").parent().removeClass("error");
    $(".reset_transfer_loan_div_class").parent().removeClass("selected");
    //$(".reset_transfer_loan_div_class").parent().removeClass("error");
    $(".reset_sub_purpose_loan_div_class").parent().removeClass("selected");
    //$(".reset_sub_purpose_loan_div_class").parent().removeClass("error");
    $(".loan_with_current_bank-li").addClass("hide");
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
        $("#builder_name").val($("#builder_name").attr('placeholder'));
    }

    $(".fieldClass").removeClass("error");
    FirstPageErrorHandler.removeErrorIndicator($("input[name='purpose_of_loan']"));
    if ($(".loan_with_current_bank-li").hasClass("hide")) {
        $("input[name='loan_with_current_bank']").parent().removeClass("hide");
    }
    $(".slidingField").each(function() { //TO RESET THE SLIDER    
        $(this).attr("value", "0");
        $(this).slider("value", $(this).attr("min"));
        var id = $(this).attr("id");
        /* IE issue resolved by SAURABH  START*/
        if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
            $("#" + id + "_txt").val($("#" + id + "_txt").attr("placeholder"));
        } else {
            $("#" + id + "_txt").val("");
        }
        /* IE issue resolved by SAURABH  END*/
        $("#" + id + "_inword").html("");
    });
    if (element_id == 'purchase_identified_property') {
        $("#purpose_of_loan_div").removeClass("hide");
        $("#transfer_gold_loan_div").addClass("hide");
    } else if (element_id == 'transfer_existing_loan') {
        $("#transfer_gold_loan_div").removeClass("hide");
        $("#purpose_of_loan_div").addClass("hide");
    } else {
        $("#purpose_of_loan_div").addClass("hide");
        $("#transfer_gold_loan_div").addClass("hide");
    }
}

function showPerspectiveRows(object) {
    var element_id = $(object).attr('id');
    $("#sub_purpose_of_loan").removeClass("hide");
    $(".reset_purpose_loan_subdiv_class").parent().removeClass("selected");
    $(".reset_purpose_loan_subdiv_class").parent().removeClass("error");
    /* IE issue resolved by SAURABH  START*/
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
        $("#builder_name").val($("#builder_name").attr('placeholder'));
    }
    /* IE issue resolved by SAURABH  END*/
    $(".fieldClass").removeClass("error");
    $(".subPurposeLoan").addClass("hide");
    $("#sub_plot_div").addClass("hide");
    FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_home_flat']"));
    FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_construction']"));
    FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_plot']"));
    FirstPageErrorHandler.removeErrorIndicator($("input[name='location_of_land']"));

    $(".slidingField").each(function() { //TO RESET THE SLIDER
        $(this).attr("value", "0");
        $(this).slider("value", $(this).attr("min"));
        var id = $(this).attr("id");
        // ie bugs resolved by saurabh 
        if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
            $("#" + id + "_txt").val($("#" + id + "_txt").attr("placeholder"));
        } else {
            $("#" + id + "_txt").val("");
        }
        $("#" + id + "_inword").html("");
    });


    if (element_id == "purchase_ready_built_home" || element_id == "purchase_home_built_builder") {
        $("#sub_purpose_of_loan_div1").removeClass("hide");
    } else if (element_id == "purchase_vacant_plot") {
        $("#sub_purpose_of_loan_div2").removeClass("hide");
    }
}

getSubPurposeOfLoan = function(object) {
    var element_id = $(object).attr('id');
    $("#sub_plot_div").removeClass("hide");
    $(".subPlotType").addClass("hide");
    // ie issue resolved by saurabh 
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
        $(".fieldClass").val($(".fieldClass").attr('placeholder'));
    } else {
        $(".fieldClass").val('');
    }
    $(".fieldClass").removeClass("error");
    $(".reset_sub_purpose_loan_div_class").parent().removeClass("selected");
    $(".reset_sub_purpose_loan_div_class").parent().removeClass("error");
    $(".slidingField").each(function() { //TO RESET THE SLIDER
        $(this).attr("value", "0");
        $(this).slider("value", $(this).attr("min"));
        var id = $(this).attr("id");
        $("#" + id + "_txt").val("");
        $("#" + id + "_inword").html("");
    });
    FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_construction']"));
    FirstPageErrorHandler.removeErrorIndicator($("input[name='cost_plot']"));
    FirstPageErrorHandler.removeErrorIndicator($("input[name='location_of_land']"));
    if (element_id == "purchase_plot") {
        $("#sub_plot_div1").removeClass("hide");
    } else if (element_id == "construct_plot") {
        $("#sub_plot_div2").removeClass("hide");
    }
}

submitPersonalQuoteInfomration = function() {
    var is_validated = true;
    $(quote_element_object).attr('date_of_birth', $("#year_of_birth").val() + "-" + $("#month_of_birth").val() + "-" + $("#day_of_birth").val());
    
    //Send SMS To ICICI Bank Representative With Pincode,19112015
    if($("input[name='pincode']")){
        $(quote_element_object).attr('pincode', $("input[name='pincode']").val());
    }
    //End
    //
    //$(quote_element_object).attr('cost_home_flat', getIntValueFromInr($("input[name='cost_home_flat']").val()));
    $(quote_element_object_second).attr('monthly_income', 0);
    $(quote_element_object_second).attr('value_of_gold_kg', $('#value_of_gold_kg').val());
    $(quote_element_object_second).attr('value_of_gold_gram', $('#value_of_gold_gram').val());
    $(quote_element_object_second).attr('gender', $(quote_element_object).attr('title'));
    $(quote_element_object_second).attr('step', 'personal_information');

    $.each(quote_element_object_second, function(key, value) { //MERGING TWO ARRAYS
        quote_final_element_object[key] = value;
    });

    $.each(quote_element_object, function(key, value) { //MERGING TWO ARRAYS
        quote_final_element_object[key] = value;
    });

    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
        $('input[type="text"]').each(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val("");
            }
        });
    }
    is_validated = formValidator.quoteFullFormValidator();

    if (is_validated == false) {
        if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
            $('input[type="text"]').each(function() {
                if ($(this).val() == "") {
                    $(this).val($(this).attr('placeholder'));
                }
            });
        }
    }
    if ($("#ndnc").prop('checked') == false) {
        $('.ndnc_text').addClass('ndnc_text_error');
        FirstPageErrorHandler.addErrorIndicator($('.ndnc'), "Missing field");
        is_validated = false;
    } else {
        $('.ndnc_text').removeClass('ndnc_text_error');
        FirstPageErrorHandler.removeErrorIndicator($('.ndnc'));
    }
    //console.log(quote_final_element_object);
    //return;
    if (is_validated == true) {
        $(document).scrollTop(1);
        showLoader('loading', 'display-block');
        $.ajax({
            type: "POST",
            url: "/"+page_action_url+"/",
            dataType: 'json',
            data: quote_final_element_object,
            success: function(response) {
                if (response.status == 'success') {
                    $("#main_content").hide(1000, function() {
                        $("#main_content").html(response.html);
                        getSliderForAmountAndTenure();
                        $("#main_content").show(1500);
                        showLoader('loading', 'display-none');
                        $('body,html').animate({scrollTop: 125}, 800);
                    });
                } else if (response.redirect_url != undefined) {
                    window.location = response.redirect_url;
                }else if(response.status == 'email_error') {
					scroll = ($('input[name="email"]').parents("div.panel").position()).top - 5;
					$('body,html').animate({scrollTop: parseInt(scroll)}, 800);
					$("#email").addClass('error');
					$('#email_error_indicator').removeClass('hide');
					$('#email_error_message').html(response.error_message);
					showLoader('loading', 'display-none');                        
				}
            },
            error: function(response) {
                //alert("fail");
            }
        });
    }
}
submitPersonalQuoteInfomrationMobile = function() {
    $(quote_element_object_second).attr('title', $(".selected").find('.gd').attr('key-value'));
    $(quote_element_object_second).attr('gender', $(".selected").find('.gd').attr('key-value'));
    //Send SMS To ICICI Bank Representative With Pincode,19112015
    if($("input[name='pincode']")) {
        $(quote_element_object_second).attr('pincode', $("input[name='pincode']").val());
    }
    //End

    var is_validated = true;
    is_validated = formValidator.quoteFullFormValidatorMobile();
    //console.log(is_validated + '~~is_validated');
    if (is_validated == true) {
        $(quote_element_object).attr('resident_status', 1);
        $(quote_element_object).attr('city_id', $("#city_name_select_box").val());
        $(quote_element_object).attr('property_city', $("#city_name_select_box").val());
        //$(quote_element_object).attr('employment_type_id', '1');
        $(quote_element_object).attr('customer_name', $("#customer_name_mobile").val());
        $(quote_element_object).attr('date_of_birth', $("#year_of_birth").val() + "-" + $("#month_of_birth").val() + "-" + $("#day_of_birth").val());
        
        $(quote_element_object).attr('step', 'personal_information');
        $(quote_element_object).attr('monthly_income', getIntValueFromInr($("input[name='monthly_income_mobile']").val()));
        $(quote_element_object).attr('loan_amount', getIntValueFromInr($("input[name='loan_amount']").val()));
	$(quote_element_object_second).attr('loan_tenure', getIntValueFromInr($("#loan_tenure").val()));

        $.each(quote_element_object, function(key, value) { //MERGING TWO ARRAYS
            $(quote_element_object_second).attr(key, value);
        });
    } else {

    }

    if (is_validated == true) {
        if ($("#ndnc").prop('checked') == false) {
            $('.ndnc_text').addClass('ndnc_text_error');
            FirstPageErrorHandler.addErrorIndicator($('.ndnc'), "Missing field");
            is_validated = false;
        } else {
            $('.ndnc_text').removeClass('ndnc_text_error');
            FirstPageErrorHandler.removeErrorIndicator($('.ndnc'));
        }
    }
    console.log(quote_element_object_second);
    //return;
    if (is_validated == true) {
        $(document).scrollTop(1);
        showLoader('loading', 'display-block');
        $.ajax({
            type: "POST",
            url: "/"+page_action_url+"/",
            dataType: 'json',
            data: quote_element_object_second,
            success: function(response) {
                if (response.status == 'success') {
                    $("#main_content").hide(1000, function() {
                        $("#main_content").html(response.html);
                        $("#main_content").show(1500);
                        showLoader('loading', 'display-none');
                        $('body,html').animate({scrollTop: 125}, 800);
                    });
                } else if (response.redirect_url != undefined) {
                    window.location = response.redirect_url;
                } else if(response.status == 'email_error') {
					scroll = ($('input[name="email"]').parents("div.panel").position()).top - 5;
					$('body,html').animate({scrollTop: parseInt(scroll)}, 800);
					$("#email").addClass('error');
					$('#email_error_indicator').removeClass('hide');
					$('#email_error_message').html(response.error_message);
					showLoader('loading', 'display-none');                        
				}
            },
            error: function(response) {
                // alert("fail");
            }
        });
    }
}

validateSubmitPostData = function() { //VALIDATE PERSONAL INFORMATION OF CUSTOMER ON 3rd PAGE
    var has_error = true;
    //var co_borrower_first_name = ($('#co_borrower_first_name').val() != undefined) ? $('#co_borrower_first_name').val() : "";
    //var co_borrower_last_name = ($('#co_borrower_last_name').val() != undefined) ? $('#co_borrower_last_name').val() : "";

    $("#post_quote_gold_loan_form input, #post_quote_gold_loan_form select").each(function() {
        if ($(this).hasClass('notnull') && ($(this).val() == "" || $(this).val() == '0')) {
            pb_error.addForSelect($(this));
            has_error = false;
        } else if ($(this).hasClass('required')) {
            if ($(this).val() != '') {
                pb_error.remove($(this));
            } else {
                pb_error.add($(this));
				has_error = false;
            }
        } else if ($(this).hasClass('alpha')) {
            var has_alpha_error = alphaValidator($(this));
            if (has_alpha_error == 0) {
                has_error = false;
            }
        } else if ($(this).hasClass('employer_name')) {
            var employer_name = $(this).val();
            if (employer_name == "" || employer_name.length < 2 || employer_name.length > 100 || !employer_name.match(/^\d*[a-zA-Z][a-zA-Z0-9\.&_\-\s]*$/)) {
                pb_error.add($(this));
                has_error = false;
            }
        } else if ($(this).hasClass('required_address')) {
            var address = $.trim($(this).val());
            if (address == "" || address.length < 3 || address.length > 31 || !address.match(address_pattern)) {
                pb_error.add($(this));
                has_error = false;
            }
        } else if ($(this).hasClass('address')) {
            var address = $.trim($(this).val());
            if (address != "" && (address.length < 3 || address.length > 31 || !address.match(address_pattern))) {
                pb_error.add($(this));
                has_error = false;
            }
        } else if ($(this).hasClass('middleName')) {
            var middleName = $(this).val();
            if (middleName != "" && (middleName.length < 3 || middleName.length > 31)) {
                pb_error.add($(this));
                has_error = false;
            }
        } else if ($(this).hasClass('pincode')) {
            var has_pin_error = pincodeValidator($(this));
            if (has_pin_error == 0) {
                pb_error.add($(this));
                has_error = false;
            }
        } else if ($(this).attr('name') == 'pan_number') {
	    if ($(this).val() == "" && $(this).hasClass("pan_required")) {
		pb_error.add($(this));
		has_error = false;
	    } else {
		if ($(this).val() != "") {
		    var has_pan_validate = panValidator($(this));
		    if (has_pan_validate == false) {
			has_error = false;
		    }
		}
	    }
	} else if ($(this).attr('name') == 'cibil_check') {
	    if ($("#cibil_check").prop('checked') == false) {
		$('.amex_text').addClass('amex_text_error');
		FirstPageErrorHandler.addErrorIndicator($("#cibil_check"));
		has_error = false;
	    } else {
		$('.amex_text').removeClass('amex_text_error');
		FirstPageErrorHandler.removeErrorIndicator($("#cibil_check"));
	    }
	}
    });
	
	//ICICI Bank Additional Field ,28102015
    if(has_error || 1){
        if ($(".icici_document_customer_wish").length > 0) {
            var value_customer_wished_loan_type = $.trim($('#customer_wished_loan_type').val());
            if(value_customer_wished_loan_type == '' || value_customer_wished_loan_type < 1){
                $("#customer_wished_loan_type_validator").addClass('validate_fail');
                has_error = false;
            } else {
                if(value_customer_wished_loan_type == 24 || value_customer_wished_loan_type == 25){
                    var value_customer_land_document = $('input[name=customer_land_document]:checked').val();
                    $('.land_documents_gl label').removeAttr("style");
                    if(typeof value_customer_land_document === 'undefined' || value_customer_land_document < 1){
                        $('.land_documents_gl label').css("color","#dc6767");
                        has_error = false;
                    }
                }
            }
		}
    }
    //END
	
    return has_error;
}

submitPostQuote = function() {
    // IE LOGICAL ISSUE RESOLVED BY SAURABH
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
        $('input[type="text"]').each(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val("");
            }
        });
    }
    var has_error = validateSubmitPostData();
    if (has_error == true) {
        showLoader('loading', 'display-block');
        var quote_element_object = $("#post_quote_gold_loan_form").serialize();

        quote_element_object += '&step=post_application';
        //alert(quote_element_object);
        //return;
        $.post("/"+page_action_url+"/", quote_element_object, '', 'json')
                .done(function(response) {
                    if (response.status == 'success') {
                        autolistener = 0;
                        $("#main_content").hide(1000, function() {
                            $("#main_content").html(response.html);
                            $("#main_content").show(1500);
                            showLoader('loading', 'display-none');
                            $('body,html').animate({scrollTop: 125}, 800);
                        });
                    } else if (response.redirect_url != undefined) {
                        window.location = response.redirect_url;
                    } else {
                        showLoader('loading', 'display-none');
                    }
                });
    } else {
        if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
            $('input[type="text"]').each(function() {
                if ($(this).val() == "") {
                    $(this).val($(this).attr('placeholder'));
                }
            });
        }
        setTimeout(function() {
            showLoader('loading', 'display-none');
        }, 500)
    }
    /*setTimeout(function() {
     showLoader('loading', 'display-none');
     }, 500) */
}
getRelativeSlider = function(slider_id, slider_max_value, attribute_id) {
    $(slider_id).slider({
        max: slider_max_value,
        value: $(slider_id).attr("min")
    }).slider("pips", {rest: "label", prefix: "Rs."}).slider("float");
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
        $(slider_id + "_txt").val($(slider_id + "_txt").attr('placeholder'));
    } else {
        $(slider_id + "_txt").val('');
    }

    $(slider_id + "_inword").html('');
    $(quote_element_object).attr(attribute_id, '');
}

loanAmountValidator = function(object) {
    var is_active = formatValidator('', $(object), '', '', '', 8, 10000, 2000000, '', 12, '');

    if (is_active == 0) {
        if ($(object).val() != '') {
            FirstPageErrorHandler.addErrorIndicator($(object), "Invalid data");
        } else {
            FirstPageErrorHandler.addErrorIndicator($(object), "Missing field");
        }
        $(object).parent().addClass('error');
        $(object).addClass('error');
    } else {
        $(object).parent().removeClass('error');
        $(object).removeClass('error');
        var attribute_value = $(quote_element_object).attr($(object).attr('name')); //GET ATTRIBUTE VALUE
        var object_name = $(object).attr('name'); //GET ATTRIBUTE NAME
        if (typeof attribute_value !== typeof undefined && attribute_value !== false) {
            $(quote_element_object).attr(object_name, getIntValueFromInr($(object).val())); //INSERT IN FIRST ARRAY
        } else {
            $(quote_element_object_second).attr(object_name, getIntValueFromInr($(object).val())); //INSERT IN SECOND ARRAY
        }
        FirstPageErrorHandler.removeErrorIndicator($(object));
        return is_active;
    }
}

startLoanDateValidate = function() {
    var dateObject = new Date(); //CURRENT OBJECT
    var min_year = dateObject.getFullYear() - 25; // YEAR START
    var max_year = dateObject.getFullYear(); // YEAR END	
    var is_active = 1;

    if ($("#outstanding_loan_month").val() == '' || $("#outstanding_loan_year").val() == '') {
        is_active = 0;
        $("#outstanding_loan_month").addClass('error');
        $("#outstanding_loan_year").addClass('error');
        FirstPageErrorHandler.addError($('select[name="outstanding_loan_month"]'), "Missing field");
    } else {
        var error_month_response = formatValidator('', $("#outstanding_loan_month"), '', '', '', 10, 1, 12, '', '', ''); //VALIDATE MONTH
        var error_year_response = formatValidator('', $("#outstanding_loan_year"), '', '', '', 10, min_year, max_year, '', '', ''); //VALIDATE YEAR
        if (error_month_response == 0 || error_year_response == 0) {
            is_active = 0;
        }
        if (is_active == 0) {
            if (error_month_response == 0) {
                $("#outstanding_loan_month").addClass('error')
            }
            if (error_year_response == 0) {
                $("#outstanding_loan_year").addClass('error')
            }
            FirstPageErrorHandler.addError($('select[name="outstanding_loan_month"]'), "Invalid data");
        } else {
            $("#outstanding_loan_month").removeClass('error');
            $("#outstanding_loan_month").parent().removeClass('error');
            $("#outstanding_loan_year").removeClass('error');
            FirstPageErrorHandler.removeErrorIndicator($('select[name="outstanding_loan_month"]'));
            iconGroupButtonAction.SetValueByValueAttr($("#outstanding_loan_month"), quote_element_object);
            iconGroupButtonAction.SetValueByValueAttr($("#outstanding_loan_year"), quote_element_object);
        }
    }
    return is_active;

}

getFieldValidate = function(object, callValue) {
    var name = $(object).attr("name");
    var element_name = $("input[name='" + name + "']")
    var is_active = 1;
    var is_rupee_field = 0;
    var array_name = "";
    var position = $(element_name).parents('div.panel').offset();
    if (callValue == undefined) {
        callValue = 0;
    }
    if (name == "cost_home_flat") {
        is_active = formatValidator('', $(element_name), '', '', '', 8, 100000, 250000000, '', 12, '');
        is_rupee_field = 1;
    } else if (name == "cost_construction") {
        is_active = formatValidator('', $(element_name), '', '', '', 8, 100000, 250000000, '', 12, '');
        is_rupee_field = 1;
    } else if (name == "cost_plot") {
        is_active = formatValidator('', $(element_name), '', '', '', 8, 100000, 250000000, '', 12, '');
        is_rupee_field = 1;
    } else if (name == "outstanding_balance") {
        is_active = formatValidator('', $(element_name), '', '', '', 8, 100000, 250000000, '', 12, '');
        is_rupee_field = 1;
    } /*else if (name == "monthly_income") {
     if ($(quote_element_object_second).attr("employment_type_id") >= 2) {
     is_active = formatValidator('', $(element_name), '', '', '', 9, 50000, 250000000, '', 12, '');
     } else {
     is_active = formatValidator('', $(element_name), '', '', '', 9, 5000, 2000000, '', 9, '');
     }
     is_rupee_field = 1;
     /*if(is_active == 1) {
     is_active = checkCurrentEmiMonthlyIncomeValidate('monthly_income','current_emi');
     }*/
    /*} else if (name == "annual_turnover") {
     is_active = formatValidator('', $(element_name), '', '', '', 9, 100000, 1000000000, '', 14, '');
     is_rupee_field = 1;
     }*/ else if (name == "email") {
        is_active = formatValidator('', $(element_name), '', '', '', 13, '', '', 6, 63, '');
    } else if (name == "mobile_number") {
        is_active = formatValidator('', $(element_name), '', '', '', 14, '', '', '', 10, '');
    }

    if (is_active == 0) {
        if ($(object).val() == "" || $(object).val() == 0) {
            FirstPageErrorHandler.addErrorIndicator($("input[name='" + name + "']"), "Missing field");
        } else {
            FirstPageErrorHandler.addErrorIndicator($("input[name='" + name + "']"), "Invalid data");
        }
        $(object).addClass('error');
        $(element_name).parent().addClass('error');
        if (callValue == 0) {
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 800);
        }
        return 0;
    } else {
        $(object).removeClass('error');
        FirstPageErrorHandler.removeErrorIndicator($('input[name="' + name + '"]'));
        $(element_name).parent().removeClass('error');
        if (callValue == 0) {
            $('body,html').animate({scrollTop: parseInt($(element_name).parents('div.panel').css('height')) + parseInt(position.top) + 25}, 1000);
        }
        if (is_rupee_field == 1) { // IF FIELD IS RUPEE TYPE
            var attribute_value = $(quote_element_object).attr($(object).attr('name')); //GET ATTRIBUTE VALUE
            var object_name = $(object).attr('name'); //GET ATTRIBUTE NAME
            if (typeof attribute_value !== typeof undefined && attribute_value !== false) {
                $(quote_element_object).attr(object_name, getIntValueFromInr($("input[name='" + object_name + "']").val())); //INSERT IN FIRST ARRAY
            } else {
                $(quote_element_object_second).attr(object_name, getIntValueFromInr($("input[name='" + object_name + "']").val())); //INSERT IN SECOND ARRAY
            }
        } else {
            var is_set = iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object);
            if (is_set == false) {
                iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object_second);
            }
        }
        return 1;
    }
}

firstNameValidate = function(object) {
    if ($(object).val() == "") {
        $(object).addClass('error');
        FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
        return 0;
    } else {
        var is_first_active = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
        if (is_first_active == 0) {
            $(object).addClass('error');
            FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
        } else {
            $("#first_name").removeClass('error');
        }
    }
}

middleNameValidate = function(object) {
    var is_middle_active = 1;
    if ($(object).val() != "" && $(object).val() != "Middle Name") {
        is_middle_active = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
    }

    if (is_middle_active == 0) {
        pb_error.add($(object));
        FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
    } else {
        pb_error.remove($(object));
    }
}

lastNameValidate = function(object) {
    if ($(object).val() == "") {
        $(object).addClass('error');
        FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
    } else {
        var is_last_active = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
        if (is_last_active == 0) {
            $(object).addClass('error');
            FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
        } else {
            $(object).removeClass('error');
            customerNameValidate();
        }
    }
}

customerNameValidate = function() {
    var is_name_active = 1;

    if ($('#first_name').val() == "" || $('#last_name').val() == "") {
        FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Missing field');
        is_name_active = 0;
    } else {
        var is_first_active = formatValidatorNew('', "#first_name", '', '', '', 1, '', '', 2, 31, '');
        var is_last_active = formatValidatorNew('', "#last_name", '', '', '', 1, '', '', 2, 31, '');
        var is_middle_active = 1;
        if ($('#middle_name').val() != "" && $('#middle_name').val() != "Middle Name") {
            is_middle_active = formatValidatorNew('', "#middle_name", '', '', '', 1, '', '', 2, 31, '');
        }

        if (is_first_active == 0 || is_last_active == 0 || is_middle_active == 0) {
            FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Invalid data');
            is_name_active = 0;
        }
    }

    if (is_name_active == 0) {
        $(quote_element_object_second).attr('customer_name', '');
    } else {
        FirstPageErrorHandler.removeErrorIndicator('input[name="customer_name"]');
        var customer_name = $("#first_name").val();
        if ($("#middle_name").val() != "") {
            customer_name += " " + $("#middle_name").val();
        }
        customer_name += " " + $("#last_name").val();
        if ($("#first_name").val() != "" && $("#last_name").val() != "") {
            $(quote_element_object_second).attr('customer_name', customer_name);
        }
    }
}

nameValidate = function(object) {
    var is_active = 1;

    if ($("#first_name").val() == "") {
        $("#first_name").addClass('error');
        FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Missing field');
        is_active = 0;
    } else {
        var is_first_active = formatValidatorNew('', $("#first_name"), '', '', '', 1, '', '', 2, 31, '');
        if (is_first_active == 1) {
            $("#first_name").removeClass('error');
            //FirstPageErrorHandler.removeErrorIndicator('input[name="customer_name"]');
            //is_active = 1;
        } else {
            $("#first_name").addClass('error');
            FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Invalid data');
            is_active = 0;
        }
    }

    if ($("#last_name").val() == "") {
        $("#last_name").addClass('error');
        FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Missing field');
        is_active = 0;
    } else {
        var is_last_active = formatValidatorNew('', $("#last_name"), '', '', '', 1, '', '', 2, 31, '');
        if (is_last_active == 1) {
            $("#last_name").removeClass('error');
            //FirstPageErrorHandler.removeErrorIndicator('input[name="customer_name"]');
            //is_active = 1;
        } else {
            $("#last_name").addClass('error');
            FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Invalid data');
            is_active = 0;
        }
    }
    if ($('#middle_name').val() != "" && $('#middle_name').val() != "Middle Name") {
        var is_middle_active = formatValidatorNew('', $("#middle_name"), '', '', '', 1, '', '', 2, 31, '');
        if (is_middle_active == 1) {
            $("#middle_name").removeClass('error');
            //FirstPageErrorHandler.removeErrorIndicator('input[name="customer_name"]');
        } else {
            $("#middle_name").addClass('error');
            FirstPageErrorHandler.addErrorIndicator('input[name="customer_name"]', 'Invalid data');
            is_active = 0;
        }
    }

    if (is_first_active == 1 && is_last_active == 1 && is_middle_active == 1) {
        FirstPageErrorHandler.removeErrorIndicator('input[name="customer_name"]');
    }
    if (is_active == 0) {
        $(quote_final_element_object).attr('customer_name', '');
    } else {
        var customer_name = $("#first_name").val();
        if ($("#middle_name").val() != "") {
            customer_name += " " + $("#middle_name").val();
        }
        customer_name += " " + $("#last_name").val();
        $(quote_final_element_object).attr('customer_name', customer_name);
        FirstPageErrorHandler.removeErrorIndicator('input[name="customer_name"]');
    }
    return is_active;
}

function getSliderForAmountAndTenure() {
    $('#slider').slider({
        value: parseFloat($('#slider').attr('value')),
        min: parseFloat($('#slider').attr('min')),
        max: parseFloat($('#slider').attr('max')),
        step: parseFloat($('#slider').attr('step')),
        range: 'min',
        slide: function(event, ui) {
            $('#amount').text(((ui.value)));
        },
        stop: function(event, ui) {
            getSliderEligibility();
        }
    });
    $('#amount').text((($('#slider').slider('value'))));

    $('#slider_loan_duration').slider({
        value: parseFloat($('#slider_loan_duration').attr('value')),
        min: parseFloat($('#slider_loan_duration').attr('min')),
        max: parseFloat($('#slider_loan_duration').attr('max')),
        step: parseFloat($('#slider_loan_duration').attr('step')),
        range: 'min',
        slide: function(event, ui) {
            $('#loan_duration').text(((ui.value) / 1));
        },
        stop: function(event, ui) {
            getSliderEligibility();
        }
    });
    $('#loan_duration').text((($('#slider_loan_duration').slider('value')) / 1));
}

FirstPageErrorHandler = {
    addError: function(object, error_message) {
        $(object).parent().addClass('error');
        $(object).parent().removeClass('selected');
        FirstPageErrorHandler.addErrorIndicator($(object), error_message);
    },
    removeError: function(object) {
        $(object).parent().removeClass('error');
        $(object).parent().addClass('selected');
        FirstPageErrorHandler.removeErrorIndicator($(object));
    },
    addErrorIndicator: function(object, error_message) {

        // console.log($("#"+$(object).attr('name')+"_error_indicator"));
        $("#" + $(object).attr('name') + "_error_indicator").removeClass('hide');
        $("#" + $(object).attr('name') + "_error_message").text(error_message);
    },
    removeErrorIndicator: function(object) {
        $("#" + $(object).attr('name') + "_error_indicator").addClass('hide');
        $("#" + $(object).attr('name') + "_error_message").text('');
    }
}

rupeeValidate = function(object) {
    // $(object).removeClass('error');
    var is_active = 1;
    is_active = formatValidator('', $(object), '', '', '', 9, '', '', '', '', '');
    if (is_active == 0) {
        $(object).addClass('error');
        return (0);
    } else {

        $(object).removeClass('error');
        var is_set = iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object);
        if (is_set == false) {
            iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object_second);
        }
    }
    //return (1);
}

iconAction = {
    activateIcons: function(object) {
        iconGroupButtonAction.activeIcon($(object));
        if ($(object).attr('name') == 'city_id') {
            if ($('#state_id').parent().hasClass("error")) {
                $('#state_id').parent().removeClass('error');
                $('#city_id').parent().removeClass('error');
                $('#city_id').attr("disabled", true);
                $("#other_city_id").val('');
            }
        }
        var is_set = iconGroupButtonAction.setValue($(object), quote_element_object);
        if (is_set == false) {
            iconGroupButtonAction.setValue($(object), quote_element_object_second);
        }
        FirstPageErrorHandler.removeError($(object));
    },
    textSetupAction: function(object) {
        iconGroupButtonAction.textSetup($(object));
        var is_set = iconGroupButtonAction.setValue($(object), quote_element_object);
        if (is_set == false) {
            iconGroupButtonAction.setValue($(object), quote_element_object_second);
        }
        // resolving IE issue By SAURABH AGARWAL START                    
        if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
            $(object).parent().siblings('label').children().removeClass("error").children('input').removeClass('error').val($(object).parent().siblings('label').children().children('input').attr('placeholder'));
        } else {
            $(object).parent().siblings('label').children().removeClass("error").children('input').removeClass('error').val("");
        }
        // resolving IE issue By SAURABH AGARWAL END


    },
    appendButtonAction: function(object) {
        iconGroupButtonAction.appendButtonAction($(object));
    }
}


pb_error = {
    add: function(object) {
        $(object).addClass('error');
        $("#" + $(object).attr('id') + "_validator").addClass('validate_fail');
    },
    remove: function(object) {
        $(object).removeClass('error');
        $("#" + $(object).attr('id') + "_validator").removeClass('validate_fail');
    },
    addForSelect: function(object) {
        if (version == 'MSIE7') {  //TO Show error on select box in ie7
            $(object).parent().css("border", "2px solid #dc6767 !important");
            $(object).parent().css("width", "271px !important");
        } else {
            $(object).parent().addClass('error');
        }
        $("#" + $(object).attr('id') + "_validator").addClass('validate_fail');
    },
    removeForSelect: function(object) {
        $(object).removeClass('error');
        $(object).parent().removeClass('error');
        $("#" + $(object).attr('id') + "_validator").removeClass('validate_fail');
    },
    right: function() {

    }
}

jQueryAutoComplete = function(object, source_array) { //FUNCTION FOR PIN CODES
    $(object).autocomplete({
        source: source_array,
        delay: 0,
        open: function() {
            $('.ui-menu').width(250);
        }
    });
}

function showTab(id, pos) { //FUNCTION TO DISPLAY INFORMATION REGARDING HOME LOAN
    var idValue = Array('description2', 'usage2', 'download2');
    for (var i = 0; i < idValue.length; i++) {
        var j = i + 1;
        if (idValue[i] == id) {
            $('#' + idValue[i]).css("display", "block");
            $('ul li:nth-child(' + (i + 1) + ')').addClass('active');
        } else {
            $('#' + idValue[i]).css("display", "none");
            $('ul li:nth-child(' + j + ')').removeClass('active');
        }
    }
}

function sendQuoteMail() { //FUNCTION TO SEND MAIL
    $("#reference_email").removeClass('error');
    var data = "";
    if ($("#reference_email").val() == "") {
        $("#reference_email").addClass('error');
        return false;
    }
    is_email_validated = formatValidator('', $("#reference_email"), '', '', '', 13, '', '', '', 63, '');
    if (is_email_validated == 0) {
        $("#reference_email").addClass('error');
        return false;
    }
    $("#quote_msg").html("<img height=\"20\" src=\"/components/images/loading.gif\">");
    data = "step=send_quote&reference_email=" + $("#reference_email").val();

    $.post("/"+page_action_url+"/", data, '', 'json').done(function(response) {
        if (response.status == 'success') {
            setTimeout(function() {
                $("#quote_msg").html("<span style=\"color:#fc9210; font-size:15px;\">" + response.html + "</span>");
            }, 5000)
        } else {
            setTimeout(function() {
                $("#quote_msg").html("<span style=\"color:red; font-size:12px;\">" + response.error_message + "</span>");
            }, 5000)
        }
    });
}

$(document).on('click', '.accordian-li', function() { //SORTING ALL FIELD VALUES ON QUOTE PAGE
    var liObject = $(this);
    var sortAttr = $(liObject).attr("sort-attr");
    var sortType = $(liObject).attr("sort-type");
    var spanType = $(this).find('span');
    if (sortAttr == 'kf') {
        return;
    }
    if (sortAttr != undefined) {
        showLoader('loading', 'display-block');
        var src = $(liObject).attr("field-value");
        data = "step=backscreen&screen_show=" + src + "&type=" + sortType + "&indexType=" + sortAttr;
        $.ajax({
            type: "POST",
            url: "/"+page_action_url+"/",
            data: data,
            dataType: 'json',
            success: function(response) {
                if (response.status == "success") {
                    $("#main_content").html(response.html);
                    getSliderForAmountAndTenure();
                    setTimeout(function() {
                        if (sortType == 'asc') {
                            $(liObject).attr("sort-type", 'desc');
                            $(spanType).addClass('sort_asc_active');
                        } else {
                            $(liObject).attr("sort-type", 'asc');
                            $(spanType).addClass('sort_desc_active');
                        }
                        showLoader('loading', 'display-none');
                    }, 100);

                } else if (response.status == "error") {
                    $("#err-msg").html(response.error_message);
                    $("#err-msg").addClass("message-error m5b");
                    window.scrollTo(0, 100);
                    showLoader('loading', 'display-none');
                }
            }
        });
        return false;
    }
})

//Send SMS To ICICI Bank Representative With Pincode,19112015

//pincodeValidator = function(object) {
//    var has_error = formatValidatorNew('', $(object), '', '', '', 5, '', '', 6, 6, '');
//
//    if (has_error == 0) {
//        pb_error.add($(object));
//        has_error = false;
//    } else {
//        pb_error.remove($(object));
//        has_error = true;
//    }
//    return has_error;
//}

pincodeValidator = function(object) {
    var has_error = formatValidatorNew('', $(object), '', '', '', 5, '', '', 6, 6, '');
    if (has_error == 0) {
        pb_error.add($(object));
	FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
        has_error = false;
    } else {
	pin_code_range = ($(object).attr('name') == 'pincode' ? pin_code_range : '');
	if (pin_code_range.length > 1) {
	    if (!($(object).val() >= pin_code_range[0] && $(object).val() <= pin_code_range[1])) {
		has_error = false;
		pb_error.add($(object));
		FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid Pincode');
	    } else {
		has_error = true;
        pb_error.remove($(object));
		FirstPageErrorHandler.removeErrorIndicator($(object), 'Invalid Pincode');
	    }
	} else {
        has_error = true;
	    pb_error.remove($(object));
	FirstPageErrorHandler.removeErrorIndicator($(object));
    }
    }
    return has_error;
}
//End

alphaValidator = function(object) {
    var has_alpha_error = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
    if (has_alpha_error == 0) {
        pb_error.add($(object));
    } else {
        pb_error.remove($(object));
    }
    return has_alpha_error;
}

genderValidator = function(object) {
    var has_gender_error = formatValidatorNew('', $(object), '', '', '', 4, 1, 2, '', '', '');
    if (has_gender_error == 0) {
        pb_error.addForSelect($(object));
    } else {
        pb_error.removeForSelect($(object));
    }
    return has_gender_error;
}


function panValidator(object) { //CALLED TO CHECK PAN NUMBER VALIDITY
    var is_valid = 1;
    var panNumberValue = $(object).val();
    pb_error.remove($(object));
    if ($(object).val() != "") {
        if (panNumberValue.length != 10 || !isPAN(panNumberValue)) {
            is_valid = 0;
            pb_error.add($(object));
        } else {
            pb_error.remove($(object));
            is_valid = 1;
        }
    }
    return is_valid;
}

function viewUploadFile(image) {
    $("#err-msg").removeClass('display-block message-error m5b');
    $("#err-msg").addClass("display-none");
    data = "step=view_image&image=" + image;
    $.ajax({
        type: "POST",
        url: "/"+page_action_url+"/",
        data: data,
        dataType: 'json',
        success: function(response) {
            if (response.status == 'success') {
                $("#html-content").html(response.html);
                $("#fade-body").removeClass('display-none');
                $("#fade-body").addClass('display-block');
                $("#light-box").removeClass('display-none');
                $("#light-box").addClass('display-block');
            } else {
                $("#html-content").html("");
                $("#fade-body").removeClass('display-block');
                $("#fade-body").addClass('display-none');
                $("#light-box").removeClass('display-block');
                $("#light-box").addClass('display-none');
                $("#err-msg").html(response.error_message);
                $("#err-msg").removeClass('display-none');
                $("#err-msg").addClass("display-block message-error m5b");
                window.scrollTo(0, 100);
            }
        }
    });
    return false;
}


var currentRequest = null;
AutoListenerSave = function(is_recursion, save_form_Data) {
    //IE ISSUE RESOLVED BY SAURABH
    var validated_data = new Object();
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
        $('input[type="text"]').each(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val("");
            }
        });
    }

    if (autolistener > 0) {
        $("#post_quote_gold_loan_form input, #post_quote_gold_loan_form select").each(function() {
            switch ($(this).attr('name')) {
                case 'first_name':
                    var is_validated = formatValidatorNew('', $(this), '', '', '', 1, '', '', 2, 31, '');
                    if (is_validated == 1) {
                        $(validated_data).attr('first_name', $(this).val());
                    }
                    break;
                case 'middle_name':
                    var is_validated = formatValidatorNew('', $(this), '', '', '', 1, '', '', 2, 31, '');
                    if (is_validated == 1) {
                        $(validated_data).attr('middle_name', $(this).val());
                    }
                    break;
                case 'last_name':
                    var is_validated = formatValidatorNew('', $(this), '', '', '', 1, '', '', 2, 31, '');
                    if (is_validated == 1) {
                        $(validated_data).attr('last_name', $(this).val());
                    }
                    break;
                case 'gender':
                    var is_validated = formatValidatorNew('', $(object), '', '', '', 4, 1, 2, '', '', '');
                    if ((is_validated == 1) && $(this).val() != "0") {
                        $(validated_data).attr('gender', $(this).val());
                    }
                    break;
                case 'address_line1':
                    var address = $.trim($(this).val());
                    if (address != "" && address.length > 4 && address.length < 32 && address.match(address_pattern)) {
                        $(validated_data).attr('address_line1', address);
                    }
                    break;
                case 'address_line2':
                    var address = $.trim($(this).val());
                    if (address != "" && address.length > 4 && address.length < 32 && address.match(address_pattern)) {
                        $(validated_data).attr('address_line2', address);
                    }
                    break;
                case 'pincode':
                    var is_validated = formatValidatorNew('', $(this), '', '', '', 5, '', '', 6, 6, '');
                    if (is_validated == 1) {
                        $(validated_data).attr('pincode', $(this).val());
                    }
                    break;
                case 'pan_number':
                    var panNumberValue = $(this).val();
                    if ($(this).val() != "") {
                        if (panNumberValue.length == 10 && isPAN(panNumberValue)) {
                            $(validated_data).attr('pan_number', $(this).val());
                        }
                    }
                    break;
                case 'state':
                    if ($(this).val() != "" && $(this).val() != 0) {
                        $(validated_data).attr('state', $(this).val());
                    }
                    break;
                case 'employment_type_id':
                    if ($(this).val() != "" && $(this).val() != 0) {
                        $(validated_data).attr('employment_type_id', $(this).val());
                    }
                    break;
				case 'customer_wished_loan_type':
                    if ($(this).val() != "" && $(this).val() != 0) {
                        $(validated_data).attr('customer_wished_loan_type', $(this).val());
                    }
                    break;
            }
        });
        $(validated_data).attr('step', 'auto_listener');
        $(validated_data).attr('save_form_Data', save_form_Data);
        currentRequest = jQuery.ajax({
            type: 'POST',
            data: validated_data,
            dataType: 'json',
            url: "/"+page_action_url+"/",
            beforeSend: function() {
                if (currentRequest != null && is_recursion == 1) {
                    currentRequest.abort();
                }
            },
            success: function(response) {
                if (response.status == 'success') {
                    if (is_recursion == 1) {
                        validated_data = new Object();
                        setTimeout(function() {
                            AutoListenerSave(1, 0);
                        }, 10000);
                    }
                }
            }
        });
    }
}

/*
 scrollElementPosition = function(object, error_response, parent_element) { //COMMON FUNCTION TO SCROLL ELEMENTS TO NEW POSITION
 var position = $(object).parents(parent_element).offset();
 if (error_response == 1) {
 $(object).parent().removeClass('error');
 $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(object).parents(parent_element).css('height')) + 140}, 800);
 } else {
 $(object).parent().addClass('error');
 $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 800);
 }
 }
 */
function getGoldPriceCityWise(city_id) {
    if (city_id != "" && city_id > 0 && false) {
        $(".gold_rate_div").html("<img height='25' src='/components/images/loading.gif'>");
        $.ajax({
            type: "POST",
            url: "/common-request",
            data: "step=getGoldRateCityWise&city_id=" + city_id,
            dataType: 'json',
            success: function(response) {
                if (response.status == "success") {
                    $(".gold_rate_div").html(response.html);
                } else {

                }
            }
        });
    }
}

function applyRedirectionBank(bank_id, is_partner, url) {
    showLoader('loading', 'display-block');
    $.ajax({
        type: "POST",
        url: "/"+page_action_url+"/",
        data: "step=bankapply&applybankId=" + bank_id + "&is_partner=" + is_partner + "&redirection=1",
        dataType: 'json',
        async: false,
        success: function(response) {
            if (response.status == "success") {
                showLoader('loading', 'display-none');
                if (is_partner == 0) {
                    showOverlay('overlay_message', 'display-block');
                    $(".overlayClass").html(response.error_message);
                }
                digitalData.page.selectedPlan=bank_id;
                _satellite.track('productSelection');
                window.open(url, '_blank');
            } else if (response.status == "error") {
                $("#err-msg").html(response.error_message);
                $("#err-msg").addClass("message-error m5b");
                window.scrollTo(0, 100);
                showLoader('loading', 'display-none');
            }
        }
    });
}