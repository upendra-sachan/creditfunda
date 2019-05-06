var address_pattern = /^\d*[a-zA-Z0-9#][a-zA-Z0-9\.,#\-/\(\) ]*$/;
var dob_pattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
var office_pin_code = new Array();
var pin_code_array = new Array();
var personalInfo = new Object();
var autolistener = 0;
var partial_form_validated = 0;
var _MS_PER_DAY = 1000 * 60 * 60 * 24;

$(function() {    
    $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
    getSliderForAmountAndTenure();    
    $(document).on('mouseout', '.help', function() {
	$('.' + $(this).attr('tooltip-class')).addClass("hide");
    });
    $(document).on('mouseover', '.help', function() {
	$('.' + $(this).attr('tooltip-class')).removeClass("hide");
	var position = $(this).position();

	$('.' + $(this).attr('tooltip-class')).css({top: position.top - 20, left: position.left + 30});
    });
    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9') {
	var active = document.activeElement;
	$(':text').focus(function() {
	    if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
		$(this).val('').removeClass('hasPlaceholder');
	    }
	}).blur(function() {
	    if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
		$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
	    }
	});
	$(':text').blur();
	$(active).focus();
    }

    $(document).on("blur", 'input[name="current_emi"]', function() {
	if ($(this).val() != "") {
	    var validator_status = formatValidatorNew('', $(this), '', '', '', 7, '', parseInt($('#slider_2').attr('max')), 2, '', '');
	    if (validator_status == 1) {
		var emi = $(this).val().replace(/\,/g, '')
		var income = $('input[name="monthly_income"]').val().replace(/\,/g, '')
		if (parseInt(income) > parseInt(emi)) {
		    $(this).removeClass('error');
		    FirstPageErrorHandler.removeErrorIndicator($('input[name="current_emi"]'), "Invaid Data");
		    $('input[name="monthly_income"]').removeClass('error');
		    FirstPageErrorHandler.removeErrorIndicator($('input[name="monthly_income"]'), "Invalid data");
		}
	    }
	}
    });

    $(document).on("blur", "#day_of_birth", function() {
	if (($(this).val()).length > 0 && ($(this).val()).length < 2) {
	    var dayValue = $(this).val();
	    if (version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
		dayValue = parseInt(0) + dayValue;
	    }
	    $(this).val(dayValue);
	}
	formValidator.dayValidate($(this));
    });

    $(document).on("blur", "#month_of_birth", function() {
	if (($(this).val()).length > 0 && ($(this).val()).length < 2) {
	    var monthValue = $(this).val();
	    if (version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
		monthValue = parseInt(0) + monthValue;
	    }
	    $(this).val(monthValue);
	}
	formValidator.monthValidate($(this));
    });

    $(document).on("blur", "#year_of_birth", function() {
	var error_response = formValidator.yearValidate($(this));

    });

    $(document).on('blur', 'input[type="text"]', function() {
	$('.' + $(this).attr('tooltip-class')).addClass("hide");
    });

    // Deepak on 22/08/2014
    $(document).on('blur', '#bank_account_with_select_box', function() {
	$('.' + $(this).attr('tooltip-class')).addClass("hide");
    });
    
    $(document).on('change', '#car_variant_exshowroom_list', function() {
	getSliderEligibility();
    });

    // For mobile
    $(document).on('change', '#car_make_select_box', function() {
	displayCarModel($(this).val());
	if ($(this).val() == "") {
	    $(this).parent().addClass("error");
	} else {
	    $(this).parent().removeClass("error");
	}
    });
    $(document).on('change', '#car_model_select_box', function() {
	displayCarVariant($(this).val());
	if ($(this).val() == "") {
	    $(this).parent().addClass("error");
	} else {
	    $(this).parent().removeClass("error");
	}
    });
    
    $(document).on('change', '#use_type', function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).addClass("error");
            $('#use_type_validator').addClass("validate_fail");
        } else {
            $(this).removeClass("error");
            $('#use_type_validator').removeClass("validate_fail");
        }
    });
    
    $(document).on('change', '#commercial_experience', function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).addClass("error");
            $('#commercial_experience_validator').addClass("validate_fail");
            $('#subquestion_1').addClass('hide');
        } else {
            $(this).removeClass("error");
            $('#commercial_experience_validator').removeClass("validate_fail");
            if($(this).val() == "1"){
                $('#subquestion_1').removeClass('hide');
                $('#subquestion_1 .validate_fail').removeClass('validate_fail');
                $('#subquestion_1 .error').removeClass('error');
                
                //add notnull class when active on page
                $('#business_nature').addClass('notnull');
                $('#first_time_borrow').addClass('notnull');
                
            }else{
                $('#subquestion_1').addClass('hide');
                $('#business_nature').removeClass('notnull');
                $('#first_time_borrow').removeClass('notnull');
            }
            
        }
    });
    
    $(document).on('change', '#business_nature', function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).addClass("error");
            $('#business_nature_validator').addClass("validate_fail");
        } else {
            $(this).removeClass("error");
            $('#business_nature_validator').removeClass("validate_fail");
        }
    });
    
    $(document).on('change', '#add_co_borrower', function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).addClass("error");
            $('#add_co_borrower_validator').addClass("validate_fail");
            $('#subquestion_2').addClass('hide');
            $('#subquestion_3').addClass('hide');
        } else {
            $(this).removeClass("error");
            $('#add_co_borrower_validator').removeClass("validate_fail");
            if($(this).val() == "1"){
                $('#subquestion_2 .validate_fail').removeClass('validate_fail');
                $('#subquestion_2 .error').removeClass('error');
                $('#subquestion_3 .validate_fail').removeClass('validate_fail');
                $('#subquestion_3 .error').removeClass('error');
                $('#subquestion_2').removeClass('hide');
                $('#subquestion_3').removeClass('hide');
                
                $('#rel_with_cobrrower').addClass('notnull');
                $('#coborrower_monthly_income').addClass('notnull');
                $('#cobrrower_res_status').addClass('notnull');
            }else{
                $('#subquestion_2').addClass('hide');
                $('#subquestion_3').addClass('hide');
                
                $('#rel_with_cobrrower').removeClass('notnull');
                $('#coborrower_monthly_income').removeClass('notnull');
                $('#cobrrower_res_status').removeClass('notnull');
            }
            
        }
    });

    $(document).on('change', '#other_car_variant_dd', function() {
	if ($(this).val() == "") {
	    $('#car_exshowroom').addClass('hide');
	    $('#car_exshowroom_price').val('');
	    $(this).parent().addClass("error");
	} else {
	    var stateId = "";
	    var data = "";
	    $(quote_element_object).attr('exshowroom_price', '');
	    if ($("#manufacturing_year").val() != "") {
		data = "&manufacturing_year=01-01-" + $("#manufacturing_year").val();
    	}
	    $(this).parent().removeClass("error");
	    if ($("#other_city").children().hasClass('hide')) {
		$("input[name='city_name'],input[name='city_id']").each(function() {
		    if ($(this).parent().hasClass('selected'))
			stateId = $(this).attr('state-value');
		});
	    } else {
		stateId = $("#state_id").val();
	    }
	    if (stateId > 0) {
		$.ajax({
		    type: "POST",
		    url: "/"+page_action_url+"/",
		    dataType: 'json',
		    data: 'step=car_variant_exshowroomprice&car_variant_id=' + $(this).val() + "&state_id=" + stateId + data,
		    success: function(response) {
			if (response.status == 'success') {			    
			    $('#car_exshowroom').removeClass('hide');
			    $('#car_exshowroom_price').val(NewMoneyFormatInr(response.html));
			} else {
			    $('#car_exshowroom').addClass('hide');
			    $('#car_exshowroom_price').val('');
			}			
		    }
		});
	    }
	}
    });
    
    $(document).on('change', '#car_variant_select_box', function() {
	if ($(this).val() == "") {
	    $(this).parent().addClass("error");
	} else {
	    $(quote_element_object).attr('exshowroom_price', '');
	    $(this).parent().removeClass("error");
	    carVariantExshowroomPriceMobile();
			}
		});
        
    $(document).on('change', '#city_name_select_box', function() {
	if ($(this).val() == "") {
	    $(this).parent().addClass("error");
	} else {
	    $(this).parent().removeClass("error");
	}
    });
    
    $(document).on('change', '#employment_type', function() { //For Mobile
	if ($(this).val() == "") {
	    $(this).parent().addClass("error");
	    $("#monthly_income_div").addClass("hide");
	    $("#salaried_div").addClass("hide");
	    $("#self_employed_business_div").addClass("hide");
	    $("#self_employed_professional_div").addClass("hide");
	} else {
	    $(this).parent().removeClass("error");
	    $("#slider_1_inword").html('');
	    $("#monthly_income").val('');
	    $("#company_name").val('');
	    $("#profession_type").val('');
	    $("#profession_type_business").val('');
	    $("#monthly_income_div").removeClass("hide");
	    if ($(this).val() == 1) {
		$("#income_label").html("Net Monthly Income");
		$("#salaried_div").removeClass("hide");
		$("#self_employed_business_div").addClass("hide");
		$("#self_employed_professional_div").addClass("hide");
	    } else if ($(this).val() == 2) {
		$("#income_label").html("Gross Annual Income");
		$("#self_employed_professional_div").removeClass("hide");
		$("#self_employed_business_div").addClass("hide");
		$("#salaried_div").addClass("hide");
	    } else if ($(this).val() == 3) {
		$("#income_label").html("Gross Annual Income");
		$("#self_employed_business_div").removeClass("hide");
		$("#self_employed_professional_div").addClass("hide");
		$("#salaried_div").addClass("hide");
	    }
	}
    });

    $(document).on('focus', 'input[type="text"]', function() {
	var position = Element.getPosition($(this));
	var element_width = $(this).parent().css('width');
	var element_height = $(this).parent().css('height');
	if ($(this).parent().siblings().find('span').hasClass('pointer')) {
	    $('.' + $(this).attr('tooltip-class')).css({top: (position.top - (parseInt(element_height) / 2) - 10), left: (position.left + (parseInt(element_width)) + 10)});
	} else {
	    position = $(this).position();
	    ////console.log(position);
	    $('.' + $(this).attr('tooltip-class')).css({top: (position.top - 65), left: (position.left + 30)});
	}
	$('.' + $(this).attr('tooltip-class')).removeClass("hide");
    });

    // Deepak on 22/08/2014
    $(document).on('focus', '#bank_account_with_select_box', function() {
	var position = Element.getPosition($(this));
	var element_width = $(this).parent().css('width');
	var element_height = $(this).parent().css('height');
	if ($(this).parent().siblings().find('span').hasClass('pointer')) {
	    $('.' + $(this).attr('tooltip-class')).css({top: (position.top - (parseInt(element_height) / 2) - 10), left: (position.left + (parseInt(element_width)) + 10)});
	} else {
	    position = $(this).position();
	    ////console.log(position);
	    $('.' + $(this).attr('tooltip-class')).css({top: (position.top - 65), left: (position.left + 30)});
	}
	$('.' + $(this).attr('tooltip-class')).removeClass("hide");
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
    
    $(document).on('click', ".amex_text,#cibil_check", function () {
	$('#cibil_check').prop('checked',
	    function (i, oldVal) {
		if (oldVal) {
		    $('.amex_text').addClass('amex_text_error');
		} else {
		    $('.amex_text').removeClass('amex_text_error');
		}
		return !oldVal;
	    });
    });
    
    $(document).on('keypress', ".required_address", function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 12, '', '', '', '', '');
    });

    $(document).on('keypress', ".address", function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 12, '', '', '', '', '');
    });
     $(document).on('blur', '.required_address', function() { //VALIDATE ADDRESS LINE 1
        var address = jQuery.trim($(this).val());
        if (address == "" || address.length < 3 || address.length > 31 || !address.match(address_pattern)) {
            Error.add($(this));
        } else {
            Error.remove($(this));
        }
    });
    
    $(document).on("keyup", ".datepick", checkDateOfBirth);
    
    $(document).on("blur", "#current_city_month", function() {
	formValidator.dojMonthValidate($(this),$('#current_city_year'));   
    });
    $(document).on("blur", "#current_city_year", function() {
        formValidator.dojYearValidate($(this));     
	formValidator.dojMonthValidate($('#current_city_month'),$(this));
    });
    
    $(document).on("blur", "#current_residence_month", function() {
	formValidator.dojMonthValidate($(this),$('#current_residence_year'));   
    });
    
    $(document).on("blur", "#current_residence_year", function() {
        formValidator.dojYearValidate($(this));     
	formValidator.dojMonthValidate($('#current_residence_month'),$(this));
    });
    
    $(document).on("blur", "#current_city_month, #current_city_year, #current_residence_month, #current_residence_year", function() {
        if($('#current_city_month').val()!='' && $('#current_city_year').val()!='' && $('#current_residence_month').val()!='' && $('#current_residence_year').val()!=''){
            var city_date = new Date("01/"+$('#current_city_month').val()+"/"+$('#current_city_year').val());
            var residence_date = new Date("01/"+$('#current_residence_month').val()+"/"+$('#current_residence_year').val());
            var dateDiff = dateDiffInDays(city_date,residence_date);
            if(dateDiff < 0){
                $('#current_residence_month').addClass('error');
                $('#current_residence_year').addClass('error');
            }else{
                $('#current_residence_month').removeClass('error');
                $('#current_residence_year').removeClass('error');
            }
        }
    });
    
    $(document).on("blur", "#current_joining_month", function() {
        var monthValue = $(this).val();
        if(($(this).val()).length > 0 && ($(this).val()).length < 2){ 
            if(version != "Opera" && version != 'MSIE7' && version != 'MSIE8' && version != 'MSIE9' && version != 'MSIE') {
                monthValue = parseInt(0) + monthValue;
                $(this).val(monthValue);
            }
        } else {
             if(version == "Opera" || version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') {
                if(monthValue!="mm"){
                    monthValue = Number(monthValue);  
                    $(this).val(monthValue);
                }
            }
        }
        var error_response = formValidator.dojMonthValidate($(this),$('#current_joining_year'));   
    });
    
    
    $(document).on("blur", "#current_joining_year", function() {
        formValidator.dojYearValidate($(this));     
	formValidator.dojMonthValidate($('#current_joining_month'),$(this));
    });
    
    $(document).on('keypress', "#otp", function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 5, '', '', '', '', '');
    });

    $(document).on('keypress', "#mobile_change", function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 19, '', '', '', '', '');
    });

    $(document).on('keypress', "#monthly_income", function(event) {
	$(this).focus();
	return formatValidatorNew(event, $(this), '', '', '', 8, '', '', '', '', '');
    });

 

    $(document).on('blur', ".notrequired", function() {
	if ($(this).val() == "" || $(this).val().length > 2) {
	    Error.remove($(this));
	} else {
	    Error.add($(this));
	}
    });

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

    $(document).on('change', '#salary_mode_select_box', function() {
	$(quote_element_object_second).attr('salary_mode', $(this).val());
	if ($(this).val() != "") {
	    FirstPageErrorHandler.removeErrorIndicator($('input[name="salary_mode"]'));
	    $('input[name="salary_mode"]').parent().removeClass('error');
	} else {
	    FirstPageErrorHandler.addError($('input[name="salary_mode"]'), "Missing field");
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
    $(document).on('blur', 'input[name="monthly_income"]', function() {
	if ($(this).val() == '' || $(this).val() == 0) {
	    $(this).addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($('input[name="monthly_income"]'), "Missing field");
	} else {
	    //var validator_status = formatValidatorNew('', $(this), '', '', '', 7, '', parseInt($('#slider_1').attr('max')), 2, '', '');
	    var validator_status = formatValidatorNew('', $(this), '', '', '', 7, '', '', 2, 12, '');
	    //alert(validator_status);
	    if (validator_status == 0) {
		$(this).addClass('error');
		FirstPageErrorHandler.addErrorIndicator($('input[name="monthly_income"]'), "Invalid data");
	    } else {
		//$("#monthly_income").val(NewMoneyFormatInr($("#monthly_income").val()));
		var income = $(this).val().replace(/\,/g, '')
		if ($('input[name="current_emi"]').val() > 0) {
		    var emi = ($('input[name="current_emi"]').val()).replace(/\,/g, '')
		}

		if (emi > 0 && emi != undefined) {
		    if (parseInt(income) < parseInt(emi)) {
			// $(this).addClass('error');
			// FirstPageErrorHandler.addErrorIndicator($('input[name="monthly_income"]'), "Invalid data");
			// $('input[name="current_emi"]').addClass('error');
			// FirstPageErrorHandler.addErrorIndicator($('input[name="current_emi"]'), "Invalid data");
		    } else {
			$(this).removeClass('error');
			FirstPageErrorHandler.removeErrorIndicator($(this));
			$('input[name="current_emi"]').removeClass('error');
			FirstPageErrorHandler.removeErrorIndicator($('input[name="current_emi"]'));
		    }
		} else {
		    $(this).removeClass('error');
		    FirstPageErrorHandler.removeErrorIndicator($(this));
		    $('input[name="current_emi"]').removeClass('error');
		    FirstPageErrorHandler.removeErrorIndicator($('input[name="current_emi"]'));
		}
	    }
	}
    });
	$(document).on('change', '.notnull', function() {
		if ($(this).val() == '0' || $(this).val() == '') {
			Error.addForSelect($(this));
		} else {
			Error.removeForSelect($(this));
		}
	});
    $(document).on('blur', '.required', function() {
	if ($(this).val() != '' && $(this).val().length > 2) {
	    Error.remove($(this));
	} else {
	    Error.add($(this));
	}
    });
    $(document).on('blur', '.alpha', function() {
	alphaValidator($(this));
    });
    $(document).on('keypress', '.alpha', function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 1, '', '', '', '', '');
    });
    $(document).on('change', "select[name='gender']", function() {
	//genderValidator($(this));
    });
    $(document).on('blur', ".pincode", function() {
	pincodeValidator($(this));
    });
    $(document).on('blur', "input[name='pan_number']", function() {
	panValidator($(this));
    });
    $(document).on('change', '#employer_state', function() {
	getCitiesForEmployer($(this).val(), 'employer_city', 'office_pincode', 'office_city_validator', 'office_pincode_loader');
	if ($(this).val() == "" || $(this).val() == 0) {
	    //Error.add($(this));
	    $('#employer_city').val('');
	    $('#office_pincode').val('');
	} else {
	    $(this).removeClass('error');
	}
    });
    $("input[name='employment_type_id']").on('click', function () { //WHEN EMPLOYMENT TYPE IS SEP OR SEB
	if ($(this).val() != "1") {
	    $(quote_element_object_second).attr('employment_type_sub_id', '');
	    $("select[name='employment_type_sub_id']").val('');
	}
    });
    $(document).on("change ", "#profession_type", function(event) {
        $(quote_element_object_second).attr('employment_type_sub_id', $(this).val());
        var position = $(this).parents('div.panel').offset();
        if ($(this).val() != '') {
            $(this).parent().removeClass('error');
            FirstPageErrorHandler.removeErrorIndicator($("input[name='employment_type_id']"));
            $('body,html').animate({scrollTop: (parseInt(position.top)) + parseInt($(this).parents('div.panel').css('height')) + 25}, 1000);
        } else {
            $(this).parent().addClass('error');
            FirstPageErrorHandler.addErrorIndicator($("input[name='employment_type_id']"), "Missing field");
            $('body,html').animate({scrollTop: parseInt(position.top) - 35}, 1000);
        }
    });
    ///////////////////////////////

    getSlider(quote_element_object, quote_element_object_second);

    $(document).on('keypress', 'input[name="customer_name"]', function(event) {
	if (!$(this).hasClass('customer_name'))
	    return formatValidatorNew(event, $(this), '', '', '', 1, '', '', '', '', '');
	else
	    return formatValidatorNew(event, $(this), '', '', '', 2, '', '', '', '', '');
    });
    $('#employment_type_sub_id').on('change', function() {
	$(quote_element_object_second).attr('employment_type_sub_id', $(this).val());
	if ($(this).val() != "") {
	    $(this).parent().removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('input[name="employment_type_id"]'));
	} else {
	    $(this).parent().addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($('input[name="employment_type_id"]'), 'Invalid field');
	}
    });
    $("#other_loan_amount").on('keyup', function(event) {
	$("#other_loan_amount_inword").html(digitToWordConvertor(unformatMoney($("#other_loan_amount").val())));
	$("#other_loan_amount_inword").show();
    })
    $("#other_loan_amount").on('keypress', function(event) {
	//return formatValidator(event, $(this), '', '', '', 8, '', '', '1', '11', '');
	return formatValidatorNew(event, $(this), '', '', '', 7, '', '', '1', '11', '');

    });
    $("#other_loan_amount").on('blur', function() {
	loanAmountValidator($(this));

    });

    
    $(document).on("change", "#manufacturing_year", function() {
	var error_reponse = formValidator.manufacturedYearValidate($(this), 10);
	if (error_reponse == 1) {
	    if ($(this).attr('mobile-form')) {
		carVariantExshowroomPriceMobile();
	    } else {
		displayCarVariantExShowroomPrice($(quote_element_object).attr('car_variant'));
	    }

	}
    });

    $(document).on('click', '#submit_personal_infomration', submitPersonalInfomration);
    $(document).on('click', '#submit_personal_information_mobile', submitPersonalInfomrationMobile);
    $(document).on('click', '#post_quote_submit', submitPostQuote);
//    $(document).on('blur', "input[name='customer_name']", function() {
//        nameValidate($(this));
//    });
    $(document).on('blur', "#first_name", function() {
	firstNameValidate($(this));
    });
    $(document).on('blur', "#last_name", function() {
	lastNameValidate($(this));
    });

    /*$(document).on('change', '#employer_state', function() {
     getCitiesForEmployer($(this).val(), 'employer_city', 'office_pincode', 'employer_city_validator', 'office_pincode_validator');
     });*/
    $(document).on('change', '.state', function() {
	$("#city").parent().removeClass("error");
	var is_unset = iconGroupButtonAction.unsetValue($(this), quote_element_object);
	if (is_unset == false) {
	    iconGroupButtonAction.unsetValue($(this), quote_element_object_second);
	}
	getCitiesForEmployer($(this).val(), 'city', null, 'city_validator');
    });
    $(document).on('change', '.sel-val', function() {
	$(this).attr('key-value', $(this).val());
	var element_name = $(this).attr('name');
	if ($(this).val() != '') {
	    $("input[name='" + element_name + "']").parent().removeClass('error');
	    $("select[name='" + element_name + "']").parent().removeClass('error');
	    FirstPageErrorHandler.removeError($("select[name='" + element_name + "']"));
	} else {
	    $("select[name='" + element_name + "']").parent().addClass('error');
	    FirstPageErrorHandler.addError($("select[name='" + element_name + "']"), "Missing field");
	}
	$(quote_element_object).attr(element_name, $(this).val());
    });
    $(document).on('keyup', '.amount', function() {
	$(this).attr('key-value', $(this).val());
	$(this).val(rupeeFormat($(this).val()));
    });
    $("#monthly_income").on('keyup', function(event) {	//alert('sssss');
	$("#slider_1_inword").html(digitToWordConvertor(unformatMoney($("#monthly_income").val())));
	$("#slider_1_inword").show();
    });
    $(document).on('blur', '.amount', function() {
	var is_set = iconGroupButtonAction.setValue($(this), quote_element_object);
	if (is_set == false) {
	    iconGroupButtonAction.setValue($(this), quote_element_object_second);
	}
    });

    $(document).on('click', '.radio', function() {
	iconAction.activateIcons($(this));
//	if ($(this).attr('name') == 'city_name') {
//	    if ($(this).attr('key-value') != '') {
//		cityId = $(this).attr('key-value')
//	    }	    
//	    if (cityId > 0) {
//		var variantId = '';
//		if ($("#other_car_variant").hasClass('hide')) {
//		    $("input[name='car_variant']").each(function() {
//			if ($(this).parent().hasClass('selected'))
//			    variantId = $(this).attr('key-value');
//		    });
//		} else {		   
//		    variantId = $("#other_car_variant_dd").attr('key-value');
//		}
//		if (variantId > 0) {
//		    displayCarVariantExShowroomPrice(variantId);
//		}
//	    }
//	}
	if ($(this).attr('name') == 'car_type') {
	    displayManufacturedYear($(this).attr('key-value'));
	}
	if ($(this).attr('name') == 'car_make') {
	    displayCarModel($(this).attr('key-value'));
	}
	if ($(this).attr('name') == 'car_model') {
	    displayCarVariant($(this).attr('key-value'));
	}
	if ($(this).attr('name') == 'car_variant') {
	    if ($(this).attr('key-value') != undefined && $(this).attr('key-value') != "") {
		displayCarVariantExShowroomPrice($(this).attr('key-value'));
	    } else {
		$('select#other_car_variant_dd').prop('selectedIndex', 0);
		$('#car_exshowroom_price').val('');
		$('#car_exshowroom').addClass('hide');
	    }
	}

    });

    $(document).on('change', '#other_car_model_dd', function() {
	displayCarVariant($(this).val());
    });

    $(document).on('change', '#other_car_make_dd', function() {
	displayCarModel($(this).val());
    });

    $(document).on('click', 'span.main', function() {
	if ($(this).siblings('input').hasClass('append_button')) {
	    iconAction.appendButtonAction($(this).siblings('input'));
	} else if ($(this).siblings('input').hasClass('text-setup')) {
	    iconAction.textSetupAction($(this).siblings('.text-setup'));
	} else if ($(this).parents('label').children('input').hasClass('quote_validator')) {
	    formValidator.quoteForm1Validator($(this).siblings('.quote_validator'));
	} else {
	    iconAction.activateIcons($(this).parents('label').children('input'));
	}
    });
    $(document).on('click', 'label.main', function() {
	iconAction.activateIcons($(this).parents('label'));
    });
    $(document).on('click', '.text-setup', function() {
	if ($(this).attr('name') == 'loan_amount') {
	    $(this).parents('li').addClass('loanother');
	}
	iconAction.textSetupAction($(this));

    });
    $(document).on('click', '.append_button', function() {
	iconAction.appendButtonAction($(this));
    });
    $(document).on('click', '.quote_validator', function() {
	formValidator.quoteForm1Validator($(this));
    });
    $(document).on('blur', "input[name='mobile_number']", function() {
	mobileValidate($(this));
    });

    $(document).on('keypress', "input[name='mobile_number']", function(event) {
	//return formatValidator(event, $(this), '', '', '', 10, '', '', '', '', '');
	return formatValidatorNew(event, $(this), '', '', '', 19, '', '', '', '', '');
    });
    //for home phone number validation only integers
    $(document).on('keypress', "input[name='home_phone_number']", function(event) {
	//return formatValidator(event, $(this), '', '', '', 10, '', '', '', '', '');
	return formatValidatorNew(event, $(this), '', '', '', 18, '', '', '', '', '');
    });

    $(document).on('blur', "input[name='email']", function() {
	emailValidate($(this));
    });

    $(document).on('keypress', "input[name='email']", function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 20, '', '', 6, 31, '');
    });

    $(document).on('keypress', '#coborrower_monthly_income', function(){
        var is_validated = formatValidatorNew('', $(this), '', '', '', 5, '', '', '1', '8', '');
        if ((is_validated == 0) || $(this).val() < 0) {
            $(this).addClass('error');
            $('#coborrower_monthly_income_validator').addClass('validate_fail');
        }else{
            $(this).removeClass('error');
            $('#coborrower_monthly_income_validator').removeClass('validate_fail');
        }
    });

    $(document).on('blur', "input[name='company_name']", function() {
	if ($(this).val() == "") {
	    $(this).parent().addClass('errror');
	    FirstPageErrorHandler.addErrorIndicator($("input[name='employment_type_id']"), "Missing field");
	} else {
	    $(this).parent().removeClass('errror');
	    FirstPageErrorHandler.removeErrorIndicator($("input[name='employment_type_id']"));
	}
	iconGroupButtonAction.SetValueByValueAttr($(this), quote_element_object_second);
    });

    $(document).on("keyup", ".datepick", checkDateOfBirth);

    $(document).on("keypress", ".datepick", function(event) {
	return formatValidatorNew(event, $(this), '', '', '', 5, '', '', '', '', '');
    });
    $(document).on('blur', '#company_name', function() {


	$(quote_element_object_second).attr('company_name', $(this).val());
	if ($(this).val() == '' || $(this).val().length < 4) {
	    $(this).parent().addClass('error');
	    $(this).addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($('#company_name'), 'Missing field');
	} else {
	    $(this).parent().removeClass('error');
	    $(this).removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#company_name'));
	}
    });
    $(document).on('change', '#bank_account_with_select_box', function() {


	$(quote_element_object_second).attr('bank_account_with_select_box', $(this).val());
	if ($(this).val() == '') {
	    $(this).parent().addClass('error');

	    FirstPageErrorHandler.addErrorIndicator($('#bank_account_with_select_box'), 'Missing field');
	} else {
	    $(this).parent().removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#bank_account_with_select_box'));
	}
    });
    $(document).on('blur', '#customer_name', function() {


	$(quote_element_object_second).attr('customer_name', $(this).val());
	if ($(this).val() == '' || $(this).val().length < 4) {
	    $(this).parent().addClass('error');
	    $(this).addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($('#customer_name'), 'Missing field');
	} else {
	    $(this).parent().removeClass('error');
	    $(this).removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#customer_name'));
	}
    });
    // EMPLOYER
    $("#company_name").autocomplete({
	source: function(request, response) {
	    var $this = $(this);
	    var $element = $(this.element);
	    var jqrequest = $element.data('jqrequest');
	    if (jqrequest) {
		jqrequest.abort();
	    }
	    $element.data('jqrequest',
		    $.ajax({
			url: "/common-request",
			dataType: "json",
			async: "false",
			mode: "abort",
			asyn: false,
			data: {
			    employer_name: request.term,
			    step: "get_employer_name"},
			beforeSend: function() {
			    if (document.getElementById('company_name_exists') != undefined) {
				document.getElementById('company_name_exists').innerHTML = "  <img height=\"25\" src=\"/components/images/loading.gif\">";
			    }
			},
			success: function(returnObj) {
			    response($.map(returnObj.html, function(item) {
				return {
				    label: item,
				    value: item
				}
			    }));
			    if (document.getElementById('company_name_exists') != undefined) {
				document.getElementById('company_name_exists').innerHTML = "";
			    }
			}
		    })
		    );
	},
	minLength: 2,
	selectFirst: true,
	selectOnly: true,
	select: function(event, ui) {
	    $("#company_name").val(ui.item.label);
	    return true;
	}
    }).keydown(function(e, data, ui) {
	if (e.which == 13) {
	    setTimeout(function() {
		$(".ui-autocomplete").css('display', 'none');
		$('#monthly_income').focus();
	    }, 500)
	}
	if (e.which == 9 || e.which == 13) {
	    if ($(".ui-autocomplete").css('display') != 'none') {
		var res = $(".ui-autocomplete li:first a").html();
		$("#company_name").val(res);
		return true;
	    }
	}
    });
    //END
});

formValidator = {
    yearValidate: function(year_object) {
	var dateObject = new Date(); //CURRENT OBJECT
	var min_year = dateObject.getFullYear() - 65; // YEAR START
	var max_year = dateObject.getFullYear() - 18; // YEAR END
	var month_object = $(year_object).prev(); // MONTH INPUT VALUE
	var day_object = $(month_object).prev(); // DAY INPUT VALUE
	//var error_response = formatValidator('', $(year_object), '', '', '', '11', min_year, max_year, '', '', ''); //VALIDATE YEAR
	var error_response = 0;
	error_response = formatValidatorNew('', $(year_object), '', '', '', '4', min_year, max_year, '', '', ''); //VALIDATE YEAR
	if (error_response == 1) {
	    $(year_object).removeClass("error");
	    FirstPageErrorHandler.removeErrorIndicator($(year_object));
	} else {
	    $(year_object).addClass("error");
	    FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	}

	if (parseInt($(month_object).val()) <= 0) {
	    $(month_object).addClass("error");
	    FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	}

	if (parseInt($(day_object).val()) <= 0) {
	    $(day_object).addClass("error");
	    FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	} else {
	    formValidator.dayValidate(day_object);
	}
	return error_response;
    },
    monthValidate: function(month_object) {
	var year_object = $(month_object).next(); // YEAR INPUT VALUE
	var day_object = $(month_object).prev(); // DAY INPUT VALUE

	// var error_response = formatValidator('', $(month_object), '', '', '', '11', '1', '12', '', '', ''); // VALIDATE MONTH
	var error_response = formatValidatorNew('', $(month_object), '', '', '', '4', '1', '12', '', '', ''); // VALIDATE MONTH

	if (error_response == 1) {
	    $(month_object).removeClass("error");
	    FirstPageErrorHandler.removeErrorIndicator($(year_object));
	} else {
	    $(month_object).addClass("error");
	    FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	}

	if (parseInt($(day_object).val()) <= 0) {
	    $(day_object).addClass("error");
	    FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	} else {
	    formValidator.dayValidate(day_object); // VALIDATE DAY
	    //FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	}
    },
    dayValidate: function(date_object) {
	var month_object = $(date_object).next(); // MONTH INPUT VALUE
	var year_object = $(month_object).next(); // YEAR INPUT VALUE

	var maximum_value = '31';
	maximum_value = dateValidate.calculateDays($(month_object).val(), $(year_object).val());

	//var error_response = formatValidator('', $(date_object), '', '', '', '11', '1', maximum_value, '', '', ''); // VALIDATE DAY
	var error_response = formatValidatorNew('', $(date_object), '', '', '', '4', '1', maximum_value, '', '', ''); // VALIDATE DAY
	if (error_response == 1) {
	    $(date_object).removeClass("error");
	    if (!$(year_object).hasClass('error') && !$(month_object).hasClass('error'))
		FirstPageErrorHandler.removeErrorIndicator($(year_object));
	} else {
	    $(date_object).addClass("error");
	    FirstPageErrorHandler.addErrorIndicator($(year_object), "Missing field");
	}
    },
    quoteForm1Validator: function(element) {
	$("#company_name").parent().removeClass("error");
	$("#employment_type_sub_id").parent().removeClass("error");
	FirstPageErrorHandler.removeError($("#employment_type_sub_id"));
	FirstPageErrorHandler.removeErrorIndicator($(".employment-type"));
	var has_error = false;
	var errorObject = '';
	$.each(quote_element_object, function(key, value) {
	    if (value == "" && $("input[name='" + key + "']").hasClass('notnull')) {
		switch (key) {
			case 'car_type':			
			 $("input[name='" + key + "']").each(function() {
				FirstPageErrorHandler.addError($(this), 'Missing field');
				errorObject = $(this);
			    });
			    has_error = true;
			break;
		    case 'city_name':
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
			has_error = true;
			break;
		    case 'car_make':

			if ($("#other_car_make").hasClass('hide')) {
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
			has_error = true;
			break;
		    case 'car_model':
			if ($("#other_car_model").hasClass('hide')) {
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
			has_error = true;
			break;
		    case 'car_variant':
			if ($("#other_car_variant").hasClass('hide')) {
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
			has_error = true;
			break;
		}
	    }
	    if (has_error == true) {
		var position = $(errorObject).parents('div.panel').position();
		$('body,html').animate({scrollTop: parseInt(position.top)}, 1000);
		return false;
	    } else {
		FirstPageErrorHandler.removeError($(this));
	    }
	});
	if (!has_error) {	 
            //if(run_ominture_track){_satellite.track('formstep-1-Complete'); run_ominture_track = true;}
	   $("#employment").removeClass('hide');
            if ($(element).attr('key-name') == 'self_employed_professional' || $(element).attr('key-name') == 'self_employed_business') {
                $("#slider_9_txt").val('');
                $("#company_name").val(''); //CLEAR COMPANY NAME VALUE ON EMPLOYMENT TYPE CHANGE
                $(quote_element_object_second).attr('company_name', '');
                $(".income_duration").text('gross annual');
                $("#slider_1").attr('max', 10000000);
                $("#monthly_income_tooltip").html('<span class="pointer"></span>Enter your gross annual income');
                $("#head-account").text('Your bank account is with?');
                $("#annual_turnover_div").removeClass('hide');
            } else {
                $("#profession_type").val(''); //CLEAR PROFESSION TYPE VALUE ON EMPLOYMENT TYPE CHANGE
                $(quote_element_object_second).attr('employment_type_sub_id', '');
                $(".income_duration").text('gross monthly');
                $("#slider_1").attr('max', 200000);
                $("#monthly_income_tooltip").html('<span class="pointer"></span>Enter your gross monthly income excluding all variable, bonus and incentives');
                $("#head-account").text('Your salary account is with?');
                $("#annual_turnover_div").addClass('hide');
            }
	    $("#slider_1_inword").html('');
	    $("#slider_9_inword").html('');

	    // IE ERROR START
	    if (version == 'MSIE7' || version == 'MSIE8' || version == 'MSIE9' || version == 'MSIE') { //FUNCTION TO GET PLACEHOLDER IN IE
		$("input[name='monthly_income']").val($("input[name='monthly_income']").attr('placeholder'));
	    } else {
		$("input[name='monthly_income']").val('');
	    }


	    $(quote_element_object_second).attr('monthly_income', '');

	    $("#slider_1").attr('max', parseInt($("#slider_1").attr('max')));
	    $("#slider_1").attr('value', parseInt($("#slider_1").attr('min')));
	    getSlider(quote_element_object, quote_element_object_second);
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
	$.each(quote_element_object_second, function(key, value) {
		if (key == 'car_type') {
			if (value == "") {
				scroll = $("input[name='car_type']").attr('error-scroll');
				is_validated = false;
				$("select[name='car_type']").parent().addClass('error');
				FirstPageErrorHandler.addErrorIndicator($("input[name='car_type']"), "Missing field");
			} else {
				$("select[name='car_type']").parent().removeClass('error');
			}
	    } else if (key == 'manufacturing_year') {
			if ($("#manufacturing_year_div").hasClass("hide") === false && value == "") {
				scroll = $("input[name='manufacturing_year']").attr('error-scroll');
				is_validated = false;
				$("input[name='manufacturing_year']").addClass('error');
				FirstPageErrorHandler.addErrorIndicator($("input[name='manufacturing_year']"), "Missing field");
			} else {
				$("input[name='manufacturing_year']").removeClass('error');
			}
	    } else if (key == 'city_name') {
			if (value == "") {
				scroll = $("input[name='city_name']").attr('error-scroll');
				is_validated = false;
				$("select[name='city_name']").parent().addClass('error');
				FirstPageErrorHandler.addErrorIndicator($("input[name='city_name']"), "Missing field");
			} else {
				$("select[name='city_name']").parent().removeClass('error');
			}
		}  else if (key == 'employment_type_id') {
			if (value == 1) {
                    if ($.trim($(quote_element_object_second).attr('company_name')) == "") {
                        is_validated = false;
                        $("input[name='company_name']").parent().addClass('error');
                    } else {
                        $("input[name='company_name']").parent().removeClass('error');
                    }
                } else {
                    if ($(quote_element_object_second).attr('employment_type_sub_id') == "") {
                        is_validated = false;
                        $("select[name='employment_type_sub_id']").parent().addClass('error');
                    } else {
                        $("select[name='employment_type_sub_id']").parent().removeClass('error');
                    }
                }
                if (is_validated == false) {
                    FirstPageErrorHandler.addErrorIndicator($("input[name='employment_type_id']"), "Missing field");
                }
                insertErrorScrollValue('employment_type_id', 'div.panel');
                if (is_validated == false && scroll == 0) {
                    scroll = $("input[name='employment_type_id']").attr('error-scroll');
                }

	    } else if (key == 'monthly_income') {
		var is_monthly_income_validated = 1;
		insertErrorScrollValue('monthly_income', 'div.panel');
		is_monthly_income_validated = formatValidatorNew('', $("input[name='monthly_income']"), '', '', '', 8, '', '', 2, 12, '');

		if (is_monthly_income_validated == 0) {
		    FirstPageErrorHandler.addErrorIndicator($("input[name='monthly_income']"), "Missing field");
		    $("input[name='monthly_income']").addClass('error');
		    is_validated = false;
		} else {
		    $("input[name='monthly_income']").removeClass('error');
		}
		if (is_validated == false && scroll == 0) {
		    scroll = $("input[name='monthly_income']").attr('error-scroll');
		}
	    } else if (key == 'annual_turnover') {
		if ($(quote_element_object_second).attr("employment_type_id") >= 2) {
		    var is_annual_turnover_validated = 1;
		    insertErrorScrollValue('annual_turnover', 'div.panel');
		    if (value == "") {
			FirstPageErrorHandler.addErrorIndicator($("input[name='annual_turnover']"), "Missing field");
			$("input[name='annual_turnover']").addClass('error');
			is_validated = false;
		    } else {
			is_annual_turnover_validated = formatValidator('', $("input[name='annual_turnover']"), '', '', '', 9, 100000, 1000000000, '', 14, '');
			if (is_annual_turnover_validated == 0) {
			    is_validated = false;
			}
		    }
		    if (is_validated == false && scroll == 0) {
			scroll = $("input[name='annual_turnover']").attr('error-scroll');
		    }
		}
	    } else if (key == 'salary_mode') {
		if (value == "") {
		    is_validated = false;
		    $('input[name="' + key + '"]').parent().addClass('error');
		    FirstPageErrorHandler.addErrorIndicator($('input[name="' + key + '"]'), "Missing field");
		    insertErrorScrollValue('salary_mode', 'div.panel');
		    if (scroll == 0) {
			scroll = $("input[name='salary_mode']").attr('error-scroll');
		    }
		}
	    } else if (key == 'customer_name') {
		var is_customer_name_validated = 1;
		is_customer_name_validated = nameValidate($("input[name='customer_name']"));
		if (is_customer_name_validated == 0) {
		    is_validated = false;
		    insertErrorScrollValue('customer_name', 'div.panel');
		    if (scroll == 0) {
			scroll = $("input[name='customer_name']").attr('error-scroll');
		    }
		}

	    } else if (key == 'title') {
		if (value == "" || parseInt(value) < 0 || parseInt(value) > 2) {
		    $('input[name="' + key + '"]').parent().addClass('error');
		    FirstPageErrorHandler.addErrorIndicator($('input[name="' + key + '"]'), "Missing field");
		    is_validated = false;
		    insertErrorScrollValue('title', 'div.panel');
		    if (scroll == 0) {
			scroll = $("input[name='title']").attr('error-scroll');
		    }
		}
	    } else if (key == 'date_of_birth') {
		if ($('.datepick').hasClass('error')) {
		    is_validated = false;
		}

		if ($('#day_of_birth').val() == '') {
		    $('#day_of_birth').addClass('error');
		    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
		    is_validated = false;
		}

		if ($('#month_of_birth').val() == '') {
		    $('#month_of_birth').addClass('error');
		    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
		    is_validated = false;
		}

		if ($('#year_of_birth').val() == '') {
		    $('#year_of_birth').addClass('error');
		    FirstPageErrorHandler.addErrorIndicator($('#year_of_birth'), 'Missing field');
		    is_validated = false;
		}
		insertErrorScrollValue('year_of_birth', 'div.panel');
		if (is_validated == false && scroll == 0) {
		    // scroll = ($('#year_of_birth').position()).top - 5;
		    scroll = $('#year_of_birth').attr('error-scroll');
		}
	    } else if (key == 'mobile_number') {
		var is_mobile_validated = 1;
		is_mobile_validated = mobileValidate($("input[name='mobile_number']"));
		if (is_mobile_validated == 0) {
		    insertErrorScrollValue('mobile_number', 'div.panel');
		    is_validated = false;
		    if (scroll == 0) {
			scroll = $("input[name='mobile_number']").attr('error-scroll');
		    }
		}
	    } else if (key == 'email') {
		var is_email_validated = 1;
		is_email_validated = emailValidate($("input[name='email']"));
		if (is_email_validated == 0) {
		    insertErrorScrollValue('email', 'div.panel');
		    is_validated = false;
		    if (scroll == 0) {
			scroll = $("input[name='email']").attr('error-scroll');
		    }
		}
	    }
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
	//////console.log(quote_element_object_second);
	var i = 0;
	if ($(quote_element_object_second).attr('car_type') == "") {
	    $("input[name='car_type']").parent().addClass('error');
	    is_validated = false;
	    if (scroll == 0) {
		scroll = ($("input[name='car_type']").parents('div .panel').position()).top;
	    }
	} else {
	    $("input[name='car_type']").parent().removeClass('error');
	    if ($(quote_element_object_second).attr('car_type') != "" && $(quote_element_object_second).attr('car_type') == 0) {
		if ($("#manufacturing_year_div").hasClass("hide") === false && document.getElementById('manufacturing_year').value == "") {
		    is_validated = false;
		    $("#manufacturing_year").parent().addClass('error');
		    FirstPageErrorHandler.addErrorIndicator($("#manufacturing_year"), "Missing field");
		    if (scroll == 0) {
			scroll = ($('#manufacturing_year').parents('div.panel').position()).top;
		    }
		} else {
		    $("#manufacturing_year").parent().removeClass('error');
		    FirstPageErrorHandler.removeErrorIndicator($('#manufacturing_year'));
		}
	    }
	}
	
	if (document.getElementById('city_name_select_box').value == '' || (document.getElementById('city_name_select_box').value).length <= 0) {
	    is_validated = false;
	    $("#city_name_select_box").parent().addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#city_name_select_box"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#city_name_select_box').parents('div.panel').position()).top;
	    }
	} else {
	    $("#city_name_select_box").parent().removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#city_name_select_box'));
	}

	if (document.getElementById('car_make_select_box').value == '' || (document.getElementById('car_make_select_box').value).length <= 0) {
	    is_validated = false;
	    $("#car_make_select_box").parent().addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#car_make_select_box"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#car_make_select_box').parents('div.panel').position()).top;
	    }
	} else {
	    $("#car_make_select_box").parent().removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#car_make_select_box'));
	}

	if ($("#car_model_div").hasClass("hide") === false && ( document.getElementById('car_model_select_box').value == "" || (document.getElementById('car_model_select_box').value).length <= 0)) {
	    is_validated = false;
	    $("#car_model_select_box").parent().addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#car_model_select_box"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#car_model_select_box').parents('div.panel').position()).top;
	    }
	} else {
	    $("#car_model_select_box").parent().removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#car_model_select_box'));
	}

	if ($("#car_variant_div").hasClass("hide") === false && ( document.getElementById('car_variant_select_box').value == "" || (document.getElementById('car_variant_select_box').value).length <= 0)) {
	    is_validated = false;
	    $("#car_variant_select_box").parent().addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#car_variant_select_box"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#car_variant_select_box').parents('div.panel').position()).top;
	    }
	} else {
	    $("#car_variant_select_box").parent().removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#car_variant_select_box'));
	}	
	if (document.getElementById('other_loan_amount').value == '' || (document.getElementById('other_loan_amount').value).length <= 0) {
	    is_validated = false;
	    $("#other_loan_amount").parent().addClass('error');
	    $("#other_loan_amount").addClass('error');	  
	    if (scroll == 0) {
		scroll = ($('#other_loan_amount').parents('div.panel').position()).top;
	    }
	} else {
	    $("#other_loan_amount").parent().removeClass('error');
	    $("#other_loan_amount").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#other_loan_amount'));
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
	if ($("#employment_type").val() == "") {
	    is_validated = false;
	    $("#employment_type").parent().addClass('error');
	    if (scroll == 0) {
		scroll = ($('#employment_type').parents('div.panel').position()).top;
	    }
	} else {
	    $("#employment_type").parent().removeClass('error');
	    if ($("#employment_type").val() == 1) {
		if ($("#company_name").val() == "") {
		    $("#company_name").addClass('error');
		    if (scroll == 0) {
			scroll = ($('#company_name').parents('div.panel').position()).top;
		    }
		} else {
		    $("#company_name").removeClass('error');
		}
	    } else if ($("#employment_type").val() == 2) {
		if ($("#profession_type").val() == "") {
		    $("#profession_type").parent().addClass('error');
		    if (scroll == 0) {
			scroll = ($('#profession_type').parents('div.panel').position()).top;
		    }
		} else {
		    $("#profession_type").parent().removeClass('error');
		}
	    } else if ($("#employment_type").val() == 3) {
		if ($("#profession_type_business").val() == "") {
		    $("#profession_type_business").parent().addClass('error');
		    if (scroll == 0) {
			scroll = ($('#profession_type_business').parents('div.panel').position()).top;
		    }
		} else {
		    $("#profession_type_business").parent().removeClass('error');
		}
	    }
	}
	
	if (document.getElementById('monthly_income').value == '') {
	    is_validated = false;
	    $("#monthly_income").parent().addClass('error');
	    $("#monthly_income").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#monthly_income"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#monthly_income').parents('div.panel').position()).top;
	    }
	} else {
	    var validator_status = formatValidatorNew('', $('#monthly_income'), '', '', '', 7, '', '', 2, 12, '');
	    if (validator_status == 0) {
		is_validated = false;
		$("#monthly_income").parent().addClass('error');
		$("#monthly_income").addClass('error');
		FirstPageErrorHandler.addErrorIndicator($("#monthly_income"), "Invalid Data");
		if (scroll == 0) {
		    scroll = ($('#monthly_income').parents('div.panel').position()).top;
		}
	    } else {
		$("#monthly_income").parent().removeClass('error');
		$("#monthly_income").removeClass('error');
		FirstPageErrorHandler.removeErrorIndicator($('#monthly_income'));
	    }
	}

//        if (document.getElementById('bank_account_with_select_box').value == '') {
//            is_validated = false;
//            $("#bank_account_with_select_box").parent().addClass('error');
//            $("#bank_account_with_select_box").addClass('error');
//            FirstPageErrorHandler.addErrorIndicator($("#bank_account_with_select_box"), "Missing field");
//            if (scroll == 0) {
//                scroll = ($('#bank_account_with_select_box').parents('div.panel').position()).top;
//            }
//        } else {
//            $("#bank_account_with_select_box").parent().removeClass('error');
//            $("#bank_account_with_select_box").removeClass('error');
//            FirstPageErrorHandler.removeErrorIndicator($('#bank_account_with_select_box'));
//        }
	if (document.getElementById('customer_name').value == '') {
	    is_validated = false;
	    $("#customer_name").parent().addClass('error');
	    $("#customer_name").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#customer_name"), "Missing field");
	    if (scroll == 0) {
		//console.log($('#customer_name').parents('div.panel'));
		scroll = ($('#customer_name').parents('div.panel').position()).top;
	    }
	} else {
	    $("#customer_name").parent().removeClass('error');
	    $("#customer_name").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($('#customer_name'));
	}

	if ($(quote_element_object_second).attr('title') == "") {
	    $("input[name='title']").parent().addClass('error');
	    is_validated = false;
	    if (scroll == 0) {
		scroll = ($("input[name='title']").parents('div .panel').position()).top;
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
	    scroll = ($('#year_of_birth').parents('div .panel').position()).top;
	}

	/* Date of Birth Validation End */

	if (document.getElementById('email').value == '') {
	    is_validated = false;
	    $("#email").parent().addClass('error');
	    $("#email").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#email"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#email').parents('div.panel').position()).top;
	    }
	} else {
	    var is_email_validated = 1;
	    is_email_validated = emailValidate($("input[name='email']"));
	    //alert(is_email_validated+"SDFGHJ");return;
	    if (is_email_validated) {
		$("#email").parent().removeClass('error');
		$("#email").removeClass('error');
		FirstPageErrorHandler.removeErrorIndicator($('#email'));
		if (scroll == 0) {
		    scroll = ($('#email').parents('div.panel').position()).top;
		}
	    } else {
		is_validated = false;
		$("#email").parent().addClass('error');
		$("#email").addClass('error');
		FirstPageErrorHandler.addErrorIndicator($("#email"), "Invalid Data");
	    }
	}
	if (document.getElementById('mobile_number').value == '' || (document.getElementById('mobile_number').value).length != 10) {
	    is_validated = false;
	    $("#mobile_number").parent().addClass('error');
	    $("#mobile_number").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($("#mobile_number"), "Missing field");
	    if (scroll == 0) {
		scroll = ($('#mobile_number').parents('div.panel').position()).top;
	    }
	} else {
	    var is_mobile_validated = 1;
	    is_mobile_validated = mobileValidate($("input[name='mobile_number']"));

	    if (is_mobile_validated == 0) {
		is_validated = false;
		//alert(is_mobile_validated+"sssssss"+is_validated);//return;
		$("#mobile_number").parent().addClass('error');
		$("#mobile_number").addClass('error');
		FirstPageErrorHandler.addErrorIndicator($("#mobile_number"), "Invalid Data");
		if (scroll == 0) {
		    scroll = ($('#mobile_number').parents('div.panel').position()).top;
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
    },
    dojYearValidate: function(year_object) {	
	var error_response = '';
	if (quote_element_object_second.date_of_birth != "") {
	    var date_of_birth_array = quote_element_object_second.date_of_birth.split('/');
	    var dateObject = new Date(); //CURRENT OBJECT

	    var min_year = parseInt(date_of_birth_array[2]) + 15; // YEAR START
	    var max_year = dateObject.getFullYear(); // YEAR END 	   
	    var error_response = formatValidator('', $(year_object), '', '', '', '11', min_year, max_year, '', '', ''); //VALIDATE YEAR	   
	    if (error_response == 1) {
		$(year_object).removeClass("error");
	    } else {
		$(year_object).addClass("error");
	    }
	}
	return error_response;
    },
    dojMonthValidate: function(month_object,year_object) {	
	var current_month = ($(year_object).val() >= (new Date).getFullYear()) ? (new Date).getMonth() + 1 : 12;
	var error_response = formatValidator('', $(month_object), '', '', '', 11, 1, current_month, '', '', '');
	if (error_response == 1) {
	    $(month_object).removeClass('error');
	} else {
	    $(month_object).addClass('error');
	}
	return error_response;
    },
    manufacturedYearValidate: function(year_object, validate_year) {
	var error_response = '';
	var dateObject = new Date(); //CURRENT OBJECT
	var max_year = dateObject.getFullYear(); // YEAR END 
	var min_year = max_year - validate_year; // YEAR START
	var error_response = formatValidator('', $(year_object), '', '', '', '11', min_year, max_year, '', '', ''); //VALIDATE YEAR	   
	if (error_response == 1) {
	    Error.removeForSelect(year_object);
	    FirstPageErrorHandler.removeError(year_object);
	} else {
	    Error.addForSelect(year_object);
	    FirstPageErrorHandler.addError(year_object, 'Invalid Year');
    }
	return error_response;
}
}

iconAction = {
    activateIcons: function(object) {
	iconGroupButtonAction.activeIcon($(object));
	var is_set = iconGroupButtonAction.setValue($(object), quote_element_object);
	if (is_set == false) {
	    iconGroupButtonAction.setValue($(object), quote_element_object_second);
	}
	//console.log(quote_element_object);
	FirstPageErrorHandler.removeError($(object));
	if ($(object).attr('name') == 'city_name') {
	    $('#state_id').parent().removeClass('error');
	    $('#city').parent().removeClass('error');
	    $('#city').attr("disabled", true);
	    //$('.select-box').val('');
	    $('#state_id').val('');
	    $('#city').val('');
	    
	} else if ($(object).attr('name') == 'salary_mode') {
	    $('#salary_mode_select_box').val("");
	    $('input[name="salary_mode"]').parent().removeClass('error');
	}
	if ($(object).attr('name') == 'loan_amount' && !($(object).hasClass('text-setup'))) {
	    $('.icon_button').removeClass('loanother');
	}

    },
    textSetupAction: function(object) {
	iconGroupButtonAction.textSetup($(object));
	$(quote_element_object_second).attr($(object).attr('name'), '');
	if ($(object).attr('name') == 'salary_mode') {
	    $('input[name="salary_mode"]').parent().removeClass('selected');
	}
    },
    appendButtonAction: function(object) {
	iconGroupButtonAction.appendButtonAction($(object));
	$(object).parent().addClass('selected');
    }
}

mobileValidate = function(object) {
    var is_active = 1;
    //is_active = formatValidator('', $(object), '', '', '', 14, '', '', '', '', '');
    is_active = formatValidatorNew('', $(object), '', '', '', 19, '', '', '', '', '');
    if (is_active == 0) {
	$(object).parent().addClass('error');
	$(object).addClass('error');
	if ($(object).val() != '') {
	    FirstPageErrorHandler.addErrorIndicator($(object), "Invalid data");
	} else {
	    FirstPageErrorHandler.addErrorIndicator($(object), "Missing field");
	}
	return (0);
    } else {
	$(object).parent().removeClass('error');
	$(object).removeClass('error');
	var is_set = iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object);
	if (is_set == false) {
	    iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object_second);
	}
	FirstPageErrorHandler.removeErrorIndicator($(object));
    }
    return (1);
}
insertErrorScrollValue = function(element, parent_element) {
    var position = $("input[name='" + element + "']").parents(parent_element).offset().top;
    $("input[name='" + element + "']").attr('error-scroll', Math.round(position));
}

emailValidate = function(object) {
    $(object).parent().removeClass('error');
    var is_active = 1;
    //is_active = formatValidator('', $(object), '', '', '', 13, '', '', '', '', '');
    is_active = formatValidatorNew('', $(object), '', '', '', 20, '', '', 6, 31, '');
    if (is_active == 0) {
	$(object).parent().addClass('error');
	$(object).addClass('error');
	if ($(object).val() == '') {
	    FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
	} else {
	    FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
	}
	return (0);
    } else {
	$(object).parent().removeClass('error');
	$(object).removeClass('error');
	var is_set = iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object);
	if (is_set == false) {
	    iconGroupButtonAction.SetValueByValueAttr($(object), quote_element_object_second);
	}
	FirstPageErrorHandler.removeErrorIndicator($(object));
    }
    return (1);
}

submitPersonalInfomration = function() {
    showLoader('loading', 'display-block');
    var is_validated = true;
    $.each(quote_element_object, function(key, value) {
	$(quote_element_object_second).attr(key, value);
    });
    $(quote_element_object_second).attr('date_of_birth', $("#year_of_birth").val() + "-" + $("#month_of_birth").val() + "-" + $("#day_of_birth").val());
    $(quote_element_object_second).attr('monthly_income', getIntValueFromInr($("input[name='monthly_income']").val()));
    $(quote_element_object_second).attr('current_emi', getIntValueFromInr($("input[name='current_emi']").val()));
    $(quote_element_object_second).attr('exshowroom_price', getIntValueFromInr($("input[name='car_exshowroom_price']").val()));
    /*$(quote_element_object_second).attr('manufacturing_year', ($("input[name='manufacturing_year']").val() ? "01-01-" + $("input[name='manufacturing_year']").val() : ""));*/
	$(quote_element_object_second).attr('manufacturing_year', ($("#manufacturing_year").val() ? "01-01-" + $("#manufacturing_year").val() : ""));

    $(quote_element_object_second).attr('step', 'personal_information');
    $('input[type="text"]').each(function() {
	if ($(this).val() == $(this).attr('placeholder')) {
	    $(this).val("");
	}
    });
    is_validated = formValidator.quoteFullFormValidator();
    if ($("#ndnc").prop('checked') == false) {
	$('.ndnc_text').addClass('ndnc_text_error');
	FirstPageErrorHandler.addErrorIndicator($('.ndnc'), "Missing field");
	is_validated = false;
    } else {
	$('.ndnc_text').removeClass('ndnc_text_error');
	FirstPageErrorHandler.removeErrorIndicator($('.ndnc'));
    }

    if (($("#other_tenure").hasClass("hide") === false) && ($("#other_loan_tenure").val() == "")) {
	$("#other_loan_tenure").parent().addClass('error');
	is_validated = false;
    } else {
	$("#other_loan_tenure").parent().removeClass('error');
    }

    if (is_validated == true) {
	$(document).scrollTop(1);
	$.post("/"+page_action_url+"/", quote_element_object_second, '', 'json')
		.done(function(response) {
		    if (response.status == 'success') {
			autolistener = 0;
			$("#main_content").hide(1000, function() {
			    $("#main_content").html(response.html);
			    getSliderForAmountAndTenure();
			    $("#main_content").show(1500);
			    showLoader('loading', 'display-none');
			    $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
			});
		    } else if (response.redirect_url != undefined) {
			//alert(response.redirect_url);
			window.location = response.redirect_url;

		    } else if(response.status == 'email_error') {
				scroll = ($('input[name="email"]').parents("div.panel").position()).top - 5;
				$('body,html').animate({scrollTop: parseInt(scroll)}, 800);
				$("#email").addClass('error');
				$('#email_error_indicator').removeClass('hide');
				$('#email_error_message').html(response.error_message);
				showLoader('loading', 'display-none');                        
			}
		});
    } else {
	showLoader('loading', 'display-none');
    }
}

submitPersonalInfomrationMobile = function() {
    showLoader('loading', 'display-block');
    var is_validated = true;
    $.each(quote_element_object, function(key, value) {
	$(quote_element_object_second).attr(key, value);
    });
    $(quote_element_object_second).attr('city_id', $("#city_name_select_box").val());
    $(quote_element_object_second).attr('city_name', $("#city_name_select_box").val());
    $(quote_element_object_second).attr('date_of_birth', $("#year_of_birth").val() + "-" + $("#month_of_birth").val() + "-" + $("#day_of_birth").val());

    //$(quote_element_object_second).attr('car_type', $("#car_make_select_box").val());
    $(quote_element_object_second).attr('car_make', $("#car_make_select_box").val());
    $(quote_element_object_second).attr('car_model', $("#car_model_select_box").val());
    $(quote_element_object_second).attr('car_variant', $("#car_variant_select_box").val());

    $(quote_element_object_second).attr('monthly_income', getIntValueFromInr($("input[name='monthly_income']").val()));
    $(quote_element_object_second).attr('employment_type_id', $("#employment_type").val());
    if ($("#employment_type").val() == 1) {
	$(quote_element_object_second).attr('company_name', $("#company_name").val());
    } else if ($("#employment_type").val() == 2) {
	$(quote_element_object_second).attr('employment_type_sub_id', $("#profession_type").val());
    } else if ($("#employment_type").val() == 3) {
	$(quote_element_object_second).attr('employment_type_sub_id', $("#profession_type_business").val());
    }
    
    /*$(quote_element_object_second).attr('manufacturing_year', ($("input[name='manufacturing_year']").val() ? "01-01-" + $("input[name='manufacturing_year']").val() : ""));*/
	$(quote_element_object_second).attr('manufacturing_year', ($("#manufacturing_year").val() ? "01-01-" + $("#manufacturing_year").val() : ""));

    $(quote_element_object_second).attr('step', 'personal_information');
    is_validated = formValidator.quoteFullFormValidatorMobile();
    $(quote_element_object_second).attr('loan_amount', getIntValueFromInr($("input[name='other_loan_amount']").val()));
    $(quote_element_object_second).attr('loan_tenure', getIntValueFromInr($("#loan_tenure").val()));
    //alert(is_validated+"***************");
    if ($("#ndnc").prop('checked') == false) {
	$('.ndnc_text').addClass('ndnc_text_error');
	FirstPageErrorHandler.addErrorIndicator($('.ndnc'), "Missing field");
	is_validated = false;
    } else {
	$('.ndnc_text').removeClass('ndnc_text_error');
	FirstPageErrorHandler.removeErrorIndicator($('.ndnc'));
    }

    if (is_validated == true) {
	//$(document).scrollTop(1);
	$.post("/"+page_action_url+"/", quote_element_object_second, '', 'json')
		.done(function(response) {
		    if (response.status == 'success') {
			$("#main_content").hide(1000, function() {
			    $("#main_content").html(response.html);
			    $("#main_content").show(1500);
			    showLoader('loading', 'display-none');
			    $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
			});
		    } else if (response.redirect_url != undefined) {
			//alert(response.redirect_url);
			window.parent.location = response.redirect_url;

		    } else if(response.status == 'email_error') {
				scroll = ($('input[name="email"]').parents("div.panel").position()).top - 5;
				$('body,html').animate({scrollTop: parseInt(scroll)}, 800);
				$("#email").addClass('error');
				$('#email_error_indicator').removeClass('hide');
				$('#email_error_message').html(response.error_message);
				showLoader('loading', 'display-none');                        
			}
		});
    } else {
	showLoader('loading', 'display-none');
    }

}

rupeeValidate = function(object) {
    // $(object).removeClass('error');
    var is_active = 1;
    //is_active = formatValidator('', $(object), '', '', '', 9, '', '', '', '', '');
    is_active = formatValidatorNew('', $(object), '', '', '', 8, '', '', 2, 12, '');
    alert("is_active =" + is_active);
    if (is_active == 0) {
	Error.add($(object));
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

// THIS IS CODE FOR INNER FUNCTIONALITY

$(document).on('click', ".button_otp", function() {
    showLoader('loading', 'display-block');
    $("#otp_validator").attr('class', '');
    $("#otp_validator").html("");
    $(".otp").css('');
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
		    $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
		} else if (response.redirect_url != undefined) {
		    //alert(response.redirect_url);
		    window.location = response.redirect_url;
		} else if (response.status == "error") {

		    $("#otp_validator").attr('class', '');
		    $("#otp_validator").attr('class', 'setp_box_active');
		    $("#otp_validator").html(response.error_message);
		    $(".otp").css('border', 'solid 1px red');
		}
		showLoader('loading', 'display-none');
	    }
	});
    } else {
	if ($(".otp").val() == "") {
	    $("#otp_validator").attr('class', '');
	    $("#otp_validator").attr('class', 'setp_box_active_error');
	    $("#otp_validator").html("Please enter OTP code.");
	} else {
	    $("#otp_validator").attr('class', '');
	    $("#otp_validator").attr('class', 'setp_box_active');
	    $("#otp_validator").html("OTP code is incorrect. Please enter correct OTP or click on resend");
	}
	$(".otp").css('border', 'solid 1px red');
	showLoader('loading', 'display-none');
    }
});

$(document).on('click', ".new_mobile", function() {
    var html_change = '<form class=\'resendCode\' id=\'resendCode\'><span class="entrmobile">New Mobile No:&nbsp;</span><input type="text" autocomplete="off" id="mobile_change" class="resend otp_textbox_resend" maxlength="10" name="mobile_change">&nbsp;<input type=\"button\" class=\"change_btn resend_otp_code\" value=\"Go\">&nbsp;<input type=\"button\" class=\"change_btn cancel_code\" value=\"Cancel\"></form>';
    $("#change_mobile").html(html_change);

});
$(document).on('click', ".cancel_code", function() {
    var html_change = '<input type="button" value="Change Mobile Number" class="change_btn new_mobile">';
    $("#change_mobile").html(html_change);
});

$(document).on('click', ".otp_resend", function() {
    showLoader('loading', 'display-block');
    $.ajax({
	type: "POST",
	url: "/"+page_action_url+"/",
	data: "&step=resend_code",
	dataType: 'json',
	success: function(response) {
	    if (response.status == "success") {
		$("#resend_validator").attr('class', '');
		$("#resend_validator").attr('class', 'setp_box_active_success');
		$("#resend_validator").html(response.error_message);
	    } else if (response.status == "error") {
		$("#resend_validator").attr('class', '');
		$("#resend_validator").attr('class', 'setp_box_active');
		$("#resend_validator").html(response.error_message);
	    }
	    showLoader('loading', 'display-none');
	}
    });
});

$(document).on('click', ".resend_otp_code", function() {
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
		    getSliderForAmountAndTenure();
		    setTimeout(function() {
			$("#resend_validator").html("<span>SMS has been sent. Please verify with OTP code</span>");
			$("#resend_validator").attr('class', 'setp_box_active_success');
		    }, 1000)
		} else if (response.redirect_url != undefined) {
		    //alert(response.redirect_url);
		    window.location = response.redirect_url;
		} else if (response.status == "error") {
		    $("#resend_validator").attr('class', '');
		    $("#resend_validator").attr('class', 'setp_box_active_error');
		    $("#resend_validator").html(response.error_message);
		    $(".resend").css('border', 'solid 1px red');
		}
		showLoader('loading', 'display-none');
	    }
	});
    } else {
	setTimeout(function() {
	    $("#mobile_change").css('border', 'solid 1px red');
	    showLoader('loading', 'display-none');
	}, 500);
    }
});


function getSliderEligibility() {
    showLoader('loading', 'display-block');    
    var data = 'selectEligibility=' + $("#amount").text() + '&selectTenure=' + $("#loan_duration").text();
    if ($("#car_variant_exshowroom_list option:selected").attr("value") > 0) {
	 data += "&car_variant=" + $("#car_variant_exshowroom_list option:selected").attr("value");
    }
       
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
	    } else if (response.status == "error") {
		$("#err-msg").html(response.error_message);
		$("#err-msg").addClass("message-error m5b");
		window.scrollTo(0, 100);
	    }
	    showLoader('loading', 'display-none');
	}
    });
}

function applyBank(src,is_partner) {
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
			$('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
			$(response.additional_data_value).each(function(key, value) {
			    if (key == 0)
				pin_code_array = value;
			    else
				office_pin_code = value;
			});
		    });
		}
	    } else if (response.redirect_url != undefined) {
		//alert(response.redirect_url);
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

$(document).on('click', ".back", function() {
    showLoader('loading', 'display-block');
    var src = $(this).attr("field-value");
    $.ajax({
	type: "POST",
	url: "/"+page_action_url+"/",
	data: "step=backscreen&screen_show=" + src,
	dataType: 'json',
	async: false,
	success: function(response) {
	    if (response.status == "success") {

		autolistener = 0;
		$("#main_content").hide('1000', function() {
		    $("#main_content").html(response.html);
		    $("#main_content").show('2000');
		    showLoader('loading', 'display-none');
		    getSliderForAmountAndTenure();
		});
	    } else if (response.status == "error") {
		$("#err-msg").html(response.error_message);
		$("#err-msg").addClass("message-error m5b");
		window.scrollTo(0, 100);
		showLoader('loading', 'display-none');
	    }
	}
    });

});

loanAmountValidator = function(object) {
    if ($(object).val() == '') {
	$('#loan_amount_error_message').text('Misssing field');
	$('#loan_amount_error_indicator').removeClass('hide');
	$(object).parent().addClass('error');
	is_active == 0;
	return false;
    }
    //var is_active = formatValidatorNew('', $(object), '', '', '', 8, 100000, '', '', 11, '');
    var is_active = formatValidatorNew('', $(object), '', '', '', 8, '', '', '', 11, '');
    if (is_active == 0) {
	$(object).parent().addClass('error');
	$('#loan_amount_error_message').text('Invalid data');
	$('#loan_amount_error_indicator').removeClass('hide');
    } else {
	$(object).parent().removeClass('error');
	$('#loan_amount_error_message').text('');
	$('#loan_amount_error_indicator').addClass('hide');
    }
    return is_active;
}

submitPostQuote = function() {
    showLoader('loading', 'display-block');
    var has_error = validateSubmitPostData();
    if (has_error == true) {
	var quote_element_object = $("#post_quote_personal_loan_form").serialize();
	quote_element_object += '&step=post_application';
	if ($(".dobm").attr("name") != undefined && $(".dobm").attr("name") != "") {
	    quote_element_object += "&current_co_joining_date=01-" + $("#current_joining_month").val() + "-" + $("#current_joining_year").val();
	}
	//////console.log(quote_element_object);
	$('input[type="text"]').each(function() {
	    if ($(this).val() == $(this).attr('placeholder')) {
		$(this).val("");
	    }
	});
	$.post("/"+page_action_url+"/", quote_element_object, '', 'json')
		.done(function(response) {
		    if (response.status == 'success') {
			autolistener = 0;
			$("#main_content").hide(1000, function() {
			    $("#main_content").html(response.html);
			    $("#main_content").show(1500);
			    showLoader('loading', 'display-none');
			    $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 800);
			});
		    } else if (response.redirect_url != undefined) {
			//alert(response.redirect_url);
			window.location = response.redirect_url;
		    } else {

		    }
		});
    } else {
	setTimeout(function() {
	    showLoader('loading', 'display-none');
	}, 500)
    }
}

validateSubmitPostData = function() {
    var has_error = true;
    $("#post_quote_personal_loan_form input, #post_quote_personal_loan_form select").each(function() {
	if ($(this).hasClass('notnull') && ($(this).val() == "" || $(this).val() == '0')) {
	    Error.addForSelect($(this));
	    has_error = false;
	} else if ($(this).hasClass('required')) {
	    if ($(this).val() != '') {
		Error.remove($(this));
	    } else {
		Error.add($(this));
                has_error = false;
	    }
	} else if ($(this).hasClass('alpha')) {
	    var has_alpha_error = alphaValidator($(this));
	    if (has_alpha_error == 0) {
		has_error = false;
	    }
	} else if ($(this).hasClass('required_address')) {
            var address = jQuery.trim($(this).val());
            if (address == "" || address.length < 3 || address.length > 31 || !address.match(address_pattern)) {
                Error.add($(this));
                has_error = false;
            }
        }  else if ($(this).hasClass('address')) {
	     var address = jQuery.trim($(this).val());
            if (address != "" && (address.length < 3 || address.length > 31 || !address.match(address_pattern))) {
                Error.add($(this));
                has_error = false;
            }
	} else if ($(this).hasClass('pincode')) {
	    var has_pin_error = pincodeValidator($(this));
	    if (has_pin_error == 0) {
		Error.add($(this));
		has_error = false;
	    }
	} else if ($(this).attr('name') == 'current_city_month') {
	    var is_month_validated = 1;
	    is_month_validated = formValidator.dojMonthValidate($('#current_city_month'), $('#current_city_year'));
	    if (is_month_validated == 0) {
		has_error = false;
	    }
	} else if ($(this).attr('name') == 'current_city_year') {
	    var is_year_validated = 1;
	    is_year_validated = formValidator.dojYearValidate($('#current_city_year'));
	    if (is_year_validated == 0) {
		has_error = false;
	    }
	} else if ($(this).attr('name') == 'current_residence_month') {
	    var is_month_validated = 1;
	    is_month_validated = formValidator.dojMonthValidate($('#current_residence_month'), $('#current_residence_year'));
	    if (is_month_validated == 0) {
		has_error = false;
	    }
	} else if ($(this).attr('name') == 'current_residence_year') {
	    var is_year_validated = 1;
	    is_year_validated = formValidator.dojYearValidate($('#current_residence_year'));
	    if (is_year_validated == 0) {
		has_error = false;
	    }
        } else if ($(this).attr('name') == 'pan_number') {
            if ($(this).val() == "" && $(this).hasClass("pan_required")) {
		Error.add($(this));
		has_error = false;
	    } else {
		if ($(this).val() != "") {
	    var has_pan_validate = panValidator($(this));
	    if (has_pan_validate == false) {
		has_error = false;
	    }
		}
	    }
	} else if ($(this).attr('name') == 'work_experience_years') {
	    if ($('#work_experience_years').val() == 0) {
		Error.addForSelect("#work_experience_years");
	    } else {
		if (($('#current_work_experience_years').val() != 0 && parseInt($('#work_experience_years').val()) < parseInt($('#current_work_experience_years').val()))) {
		    Error.addForSelect($('#work_experience_years'));
		    Error.addForSelect($('#current_work_experience_years'));
		    has_error = false;
		} else {
		    Error.removeForSelect($('#work_experience_years'));
		}
	    }

	} else if ($(this).attr('name') == 'current_work_experience_years') {
	    if ($('#current_work_experience_years').val() == 0) {
		Error.addForSelect("#current_work_experience_years");
	    } else {
		if (($('#current_work_experience_years').val() != 0 && parseInt($('#work_experience_years').val()) < parseInt($('#current_work_experience_years').val()))) {
		    Error.addForSelect($('#work_experience_years'));
		    Error.addForSelect($('#current_work_experience_years'));
		    has_error = false;
		} else {
		    Error.removeForSelect($('#current_work_experience_years'));
		}
	    }
	} else if ($(this).attr('name') == 'current_joining_month') {
	    var is_month_validated = 1;
	    is_month_validated = formValidator.dojMonthValidate($('#current_joining_month'), $('#current_joining_year'));
	    if (is_month_validated == 0) {
		has_error = false;
	    }
	} else if ($(this).attr('name') == 'current_joining_year') {
	    var is_year_validated = 1;
	    is_year_validated = formValidator.dojYearValidate($('#current_joining_year'));
	    if (is_year_validated == 0) {
		has_error = false;
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
    //console.log(has_error);
    return has_error;
}
/* END */

pincodeValidator = function(object) {
    //var has_error = formatValidator('', $(object), '', '', '', 11, '', '', '', 6, '');
    var has_error = formatValidatorNew('', $(object), '', '', '', 5, '', '', 6, 6, '');

    if (has_error == 0) {
	Error.add($(object));
	has_error = false;
    } else {
	Error.remove($(object));
	has_error = true;
    }
    return has_error;
}

alphaValidator = function(object) {
    //var has_alpha_error = formatValidator('', $(object), '', '', '', 1, '', '', '', '', '');
    var has_alpha_error = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
    if (has_alpha_error == 0) {
	Error.add($(object));
    } else {
	Error.remove($(object));
    }
    return has_alpha_error;
}

genderValidator = function(object) {

    //var has_gender_error = formatValidator('', $(object), '', '', '', 10, 1, 2, '', '', '');
    var has_gender_error = formatValidatorNew('', $(object), '', '', '', 4, 1, 2, '', '', '');
    if (has_gender_error == 0) {
	Error.addForSelect($(object));
    } else {
	Error.removeForSelect($(object));
    }
    return has_gender_error;
}


function panValidator(object) {
    var is_valid = 1;
    var panNumberValue = $(object).val();
    Error.remove($(object));
    if ($(object).val() != "") {
	if (panNumberValue.length != 10 || !isPAN(panNumberValue)) {
	    is_valid = 0;
	    Error.add($(object));
	} else {
	    Error.remove($(object));
	    is_valid = 1;
	}
    }
    return is_valid;
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
    ////alert(formElement.length)
    for (var i = 0; i < formElement.length; i++) {
	if ($("#" + formElement[i].id).val() != "" && document.getElementById(formElement[i].id) != null && document.getElementById(formElement[i].id).disabled == false) {
	    $('.' + formElement[i].id + '_loader').html("<img height=\"20\" src=\"/components/images/loading.gif\">");
	}
    }
    //return false;
    showLoader('loading', 'display-block');
    $("#err-msg").addClass("display-none");
    xmlhttp.open("POST", "/"+page_action_url+"?&step=upload_docs", false);
    xmlhttp.send(formData);
    if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
	////alert(xmlhttp.responseText);
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

function docuploadSelect(src) {
    var id = src.id;
    $('.' + id + '_loader').html(src.value);
}

Error = {
    add: function(object) {
	$(object).addClass('error');
	$("#" + $(object).attr('id') + "_validator").addClass('validate_fail');
    },
    remove: function(object) {
	$(object).removeClass('error');
	$("#" + $(object).attr('id') + "_validator").removeClass('validate_fail');
    },
    addForSelect: function(object) {
	$(object).parent().addClass('error');
	$("#" + $(object).attr('id') + "_validator").addClass('validate_fail');
    },
    removeForSelect: function(object) {
	$(object).parent().removeClass('error');
	$("#" + $(object).attr('id') + "_validator").removeClass('validate_fail');
    },
    right: function() {

    }
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
	////////console.log($("#"+$(object).attr('name')+"_error_indicator");
	$("#" + $(object).attr('name') + "_error_indicator").removeClass('hide');
	$("#" + $(object).attr('name') + "_error_message").text(error_message);
    },
    removeErrorIndicator: function(object) {
	$("#" + $(object).attr('name') + "_error_indicator").addClass('hide');
	$("#" + $(object).attr('name') + "_error_message").text('');
    }
}

function sendQuoteMail() {
    $("#reference_email").removeClass('error');
    var data = "";
    if ($("#reference_email").val() == "") {
	$("#reference_email").addClass('error');
	return false;
    }
    is_email_validated = emailValidate($("#reference_email"));
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


jQueryAutoComplete = function(object, source_array) {
    $(object).autocomplete({
	source: source_array,
	delay: 0,
	open: function() {
	    $('.ui-menu').width(250);
	}
    });
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

$(document).on('click', '.accordian-li', function() {
    var liObject = $(this);
    var sortAttr = $(liObject).attr("sort-attr");
    var sortType = $(liObject).attr("sort-type");
    var spanType = $(this).find('span');


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
			//alert(sortType)
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

var currentRequest = null;
AutoListenerSave = function(is_recursion, save_form_Data) {
    var validated_data = new Object();
    if (autolistener > 0) {
	$("#post_quote_personal_loan_form input, #post_quote_personal_loan_form select").each(function() {
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
                    var address = jQuery.trim($(this).val());
                    if (address != "" && address.length > 4 && address.length < 32 && address.match(address_pattern)) {
                        $(validated_data).attr('address_line1', address);
		    }
		    break;
		case 'address_line2':
		    var address = jQuery.trim($(this).val());
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
		case 'use_type':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('use_type', $(this).val());
		    }
		    break;      
                case 'business_nature':
		    if (($('#business_nature').val() > 0)) {
			$(validated_data).attr('business_nature', $(this).val());
		    }
		    break;      
                case 'commercial_experience':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('commercial_experience', $(this).val());
		    }
		    break;      
                case 'hold_dl':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('hold_dl', $(this).val());
		    }
		    break;
                case 'first_time_borrow':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('first_time_borrow', $(this).val());
		    }
		    break;
                case 'add_co_borrower':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('add_co_borrower', $(this).val());
		    }
		    break;      
                case 'rel_with_cobrrower':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('rel_with_cobrrower', $(this).val());
		    }
		    break;      
                case 'coborrower_monthly_income':
                    if($('#coborrower_monthly_income').val() > 0){
                        $(validated_data).attr('coborrower_monthly_income', $(this).val());
		    }
		    break;      
                case 'cobrrower_res_status':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('cobrrower_res_status', $(this).val());
		    }
		    break;
                case 'any_cheque_bounce':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('any_cheque_bounce', $(this).val());
		    }
		    break;
                case 'is_app_decline':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 4, 1, 5, '', '', '');
		    if ((is_validated == 1) && $(this).val() != "0") {
			$(validated_data).attr('is_app_decline', $(this).val());
		    }
		    break;
                case 'industry':
		    if (($(this).val() != "") && $(this).val() != "0") {
			$(validated_data).attr('industry', $(this).val());
		    }
		    break;
		case 'office_address_1':
		    var office_address = jQuery.trim($(this).val());
			if (office_address != "" && office_address.length > 4 && office_address.length < 32 && office_address.match(address_pattern)) {
				$(validated_data).attr('office_address_1', office_address);
			}
		    break;
		case 'office_address_2':
		    var office_address = jQuery.trim($(this).val());
                    if (office_address != "" && office_address.length > 4 && office_address.length < 32 && office_address.match(address_pattern)) {
                        $(validated_data).attr('office_address_2', office_address);
		    }
		    break;
		case 'office_pincode':
		    var is_validated = formatValidatorNew('', $(this), '', '', '', 5, '', '', 6, 6, '');
		    if (is_validated == 1) {
			$(validated_data).attr('office_pincode', $(this).val());
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
		case 'employer_city':
		    if ($(this).val() != "" && $(this).val() != 0) {
			$(validated_data).attr('employer_city', $(this).val());
		    }
		    break;
		case 'current_joining_year':
		    if ($(this).val() != "" && $("#current_joining_year").val() != "") {
			var current_join = "01-" + $("#current_joining_month").val() + "-" + $("#current_joining_year").val();
			$(validated_data).attr('current_co_joining_date', current_join);
		    }
		    break;
		case 'work_experience_years':
		    if ($(this).val() != "" && $(this).val() > 0) {
			$(validated_data).attr('work_experience_years', $(this).val());
		    }
		    break;
	    }
	});
	$(validated_data).attr('step', 'auto_listener');
	$(validated_data).attr('save_form_Data', save_form_Data);
	$('input[type="text"]').each(function() {
	    if ($(this).val() == $(this).attr('placeholder')) {
		$(this).val("");
	    }
	});
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
			}, 20000);
		    }
		}
	    }
	});
    }
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
    if ($(this).scrollTop() > 167) {
	$('#div_loan_slider').addClass('fixed');
    } else {
	$('#div_loan_slider').removeClass('fixed');
    }
    if ($(this).scrollTop() > 167) {
	$('#heading-container').addClass('fixed-container');
    } else {
	$('#heading-container').removeClass('fixed-container');
    }
}
firstNameValidate = function(object) {
    if ($(object).val() == "") {
	$(object).addClass('error');
	FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
	return 0;
    }
    var is_first_active = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
    if (is_first_active == 0) {
	$(object).addClass('error');
	FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
    } else {
	$("#first_name").removeClass('error');
	if (!$('#last_name').hasClass('error')) {
	    FirstPageErrorHandler.removeErrorIndicator($(object));
	}
	if ($('#last_name').val() != '') {
	    $("#last_name").removeClass('error');
	    getCustomerName();
	}
    }
}

lastNameValidate = function(object) {
    if ($(object).val() == "") {
	$(object).addClass('error');
	if ($('#first_name').val() == "") {
	    $('#first_name').addClass('error');
	}
	FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
	$(quote_element_object_second).attr('customer_name', '');
	return 0;
    } else {
	var is_active = 1;
	var is_last_active = formatValidatorNew('', $(object), '', '', '', 1, '', '', 2, 31, '');
	if (is_last_active == 1) {
	    $(object).removeClass('error');
	} else {
	    is_active = 0;
	    $(object).addClass('error');
	}
	var is_first_active = formatValidatorNew('', $('#first_name'), '', '', '', 1, '', '', 2, 31, '');
	if (is_first_active == 0) {
	    is_active = 0;
	    $('#first_name').addClass('error');
	} else {
	    $('#first_name').removeClass('error');
	}
	if (is_active == 1) {
	    getCustomerName();
	    FirstPageErrorHandler.removeErrorIndicator($(object));
	} else {
	    $(quote_element_object_second).attr('customer_name', '');
	    if ($('#first_name').val() != '') {
		FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
	    } else {
		FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
	    }

	}
    }
}

getCustomerName = function() {
    $customer_name = $('#first_name').val();
    if ($('#first_name').val() != '') {
	$customer_name += $('#middle_name').val();
    }
    $customer_name += $('#last_name').val();
    $(quote_element_object_second).attr('customer_name', $customer_name);
}


nameValidate = function(object) {
    var is_active = 1;
    if ($("#first_name").val() == "") {
	$("#first_name").addClass('error');
	FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
	is_active = 0;
    } else {
	var is_first_active = formatValidatorNew('', $("#first_name"), '', '', '', 1, '', '', 2, 31, '');
	if (is_first_active == 1) {
	    $("#first_name").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($(object));
	    //is_active = 1;
	} else {
	    $("#first_name").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
	    is_active = 0;
	}
    }

    if ($("#last_name").val() == "") {
	$("#last_name").addClass('error');
	FirstPageErrorHandler.addErrorIndicator($(object), 'Missing field');
	is_active = 0;
    } else {
	var is_last_active = formatValidatorNew('', $("#last_name"), '', '', '', 2, '', '', 2, 31, '');
	if (is_last_active == 1) {
	    $("#last_name").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($(object));
	    //is_active = 1;
	} else {
	    $("#last_name").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
	    is_active = 0;
	}
    }
    if ($('#middle_name').val() != "") {
	var is_middle_active = formatValidatorNew('', $("#last_name"), '', '', '', 2, '', '', 2, 31, '');
	if (is_middle_active == 1) {
	    $("#middle_name").removeClass('error');
	    FirstPageErrorHandler.removeErrorIndicator($(object));
	} else {
	    $("#middle_name").addClass('error');
	    FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
	    is_active = 0;
	}
    }

    if (is_active == 0) {
	$(quote_element_object_second).attr('customer_name', '');
	FirstPageErrorHandler.addErrorIndicator($(object), 'Invalid data');
    } else {
	var customer_name = $("#first_name").val();
	if ($("#middle_name").val() != "") {
	    customer_name += " " + $("#middle_name").val();
	}
	customer_name += " " + $("#last_name").val();
	$(quote_element_object_second).attr('customer_name', customer_name);
    }
    return is_active;
}

function displayCarModel(makeId) {
    
    if (makeId > 0) {
	$('#car_variant_div').addClass("hide");
	$.ajax({
	    type: "POST",
	    url: "/"+page_action_url+"/",
	    dataType: 'json',
	    data: 'step=car_model&car_make_id=' + makeId ,
	    success: function(response) {
		if (response.status == 'success') {
		    $('#car_model_div').removeClass("hide");
		    showLoader('loading', 'display-none');
		    $('#car_model_div').html(response.html);
		    return;
		} else {
		    //location.reload();
		}
	    }
	});
    } else {
	$('#car_model_div').addClass("hide");
    }
}

function displayCarVariant(modelId) {
    
    if (modelId > 0) {
	$.ajax({
	    type: "POST",
	    url: "/"+page_action_url+"/",
	    dataType: 'json',
	    data: 'step=car_variant&car_model_id=' + modelId ,
	    success: function(response) {
		if (response.status == 'success') {
		    $('#car_variant_div').removeClass("hide");
		    showLoader('loading', 'display-none');
		    $('#car_variant_div').html(response.html);
		    if ($(quote_element_object).attr('car_type')!="" && $(quote_element_object).attr('car_type') == 0) {
			$('#price_div').html("Depreciated Price");
		} else {
			$('#price_div').html("Exshowroom Price");
		    }
		} else {
		    //location.reload();
		}
	    }
	});
    } else {
	$('#car_variant_div').addClass("hide");
    }
}

function displayCarVariantExShowroomPrice(carVariantId) {
    var stateId = "";
    var data = "";
    if (carVariantId == "") {
	if ($("#other_car_variant").children().hasClass('hide')) {
	    $("input[name='car_variant']").each(function() {
		if ($(this).parent().hasClass('selected'))
		    carVariantId = $(this).attr('key-value');
	    });
	} else {
	    carVariantId = $("#other_car_variant_dd").val();
	}
    }

    if ($("#manufacturing_year").val() != "") {
	data = "&manufacturing_year=01-01-" + $("#manufacturing_year").val();
    }
    if ($("#other_city").children().hasClass('hide')) {
	$("input[name='city_name'],input[name='city_id']").each(function() {
	    if ($(this).parent().hasClass('selected'))
		stateId = $(this).attr('state-value');
	});
    } else {
	stateId = $("#state_id").val();
    }    
    if (stateId > 0 && carVariantId > 0) {
	$.ajax({
	    type: "POST",
	    url: "/"+page_action_url+"/",
	    dataType: 'json',
	    data: 'step=car_variant_exshowroomprice&car_variant_id=' + carVariantId + "&state_id=" + stateId + data,
	    success: function(response) {
		if (response.status == 'success') {
		    $('#car_exshowroom').removeClass('hide');
		    $('#car_exshowroom_price').val(NewMoneyFormatInr(response.html));
		} else {
		    $('#car_exshowroom').addClass('hide');
		    $('#car_exshowroom_price').val('');
		}
	    }
	});
    }
}

function displayManufacturedYear(carType) {
    $('#manufacturing_year').val('');
    if (carType == 0) {
	$('#manufacturing_year_div').removeClass('hide');
	$('#price_div').html("Depreciated Price");
	if ($('#manufacturing_year').val() == "" || $('#manufacturing_year').val().length > 4) {
	    Error.addForSelect($('#manufacturing_year'));
	    FirstPageErrorHandler.addError($('#manufacturing_year'), 'Missing field');
	}
    } else {
	$('#price_div').html("Exshowroom Price");
	displayCarVariantExShowroomPrice($(quote_element_object).attr('car_variant'));
	$('#manufacturing_year_div').addClass('hide');
	Error.removeForSelect($('#manufacturing_year'));
	FirstPageErrorHandler.removeError($('#manufacturing_year'));
    }
}

function carVariantExshowroomPriceMobile() {
    var variantId = $('#car_variant_select_box option:selected').val();
    var stateId = $("#city_name_select_box option:selected").attr("state-value");
    var data = "";
    if ($("#manufacturing_year").val() != "") {
	data = "&manufacturing_year=01-01-" + $("#manufacturing_year").val();
    }
    if (stateId > 0 && variantId) {
	$.ajax({
	    type: "POST",
	    url: "/"+page_action_url+"/",
	    dataType: 'json',
	    data: 'step=car_variant_exshowroomprice&car_variant_id=' + variantId + "&state_id=" + stateId + data,
	    success: function(response) {
		if (response.status == 'success') {
		    $(quote_element_object).attr('exshowroom_price', response.html);
		}
	    }
	});
    }
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  try{
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  var result = Math.floor((utc2 - utc1) / _MS_PER_DAY);
  return result;
  }catch(Exception){
      return 0;
  }

}

