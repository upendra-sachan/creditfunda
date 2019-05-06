/*
Theme Name:Paisabazaar
Author:Paisabazaar
Author URI:http://www.paisabazaar.com
Version: 1.2
Updated On:27-APRIL-2016
*/
$(function() {
    $(document).on('click', '.know-more', function() {
	$(".show-info").show('slide', {direction: 'left'}, 1000);
	$(this).hide();
    });
    $(document).on('click', '.step1', function() {
        $('#step-2').hide("slow").removeClass("fadeInRightBig").addClass("fadeOutRightBig");
        $('#step-1').show("slow").removeClass("fadeOutLeftBig").addClass("fadeInLeftBig");
        $('.form-loader').hide();
        $(this).parent("li").removeClass("done").addClass("active").next("li").removeClass("active");
        $('.step2').parents('li').html('<i class="fa fa-check-circle-o step2"></i> Eligibility Check');
    });

    if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0){
        $(".breadcrumbs").find("a[href]").each(function(){
            $(this).click(function(){
                window.location = $(this).attr('href');
            });
        })
    }
    
     $(document).on('keyup','#mobile_number', function() {
        if ($('#mobile_number').val().length == 10) {
            validate_step1(2);
        }
    });

    $(document).on('blur', '[data-validation]', function() {        
            var value = '';
            var is_active = true;
            var element_name = $(this).attr('name');
            if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox') {
                value = ($("input[name='" + element_name + "']").is(':checked')) ? '1' : '';
            } else {
                value = $(this).val();
            }

            if ($(this).attr("name") == 'company_name') {
		$(this).val($(this).val().replace(/^\s+|\s+$/g, ''));
	    }
            if ($(this).hasClass('name')) {
		$(this).val($(this).val().replace(/^\s+|\s+$/g, ''));
		//$('.name').val();
                var full_name = $('.name').val();
                full_name = full_name.replace(/^\s+|\s+$/g, '');
		$('.name').val(full_name);
                var name_array = full_name.split(' ');
                if (full_name === ""  || full_name.length < 3 || name_array.length < 2) {
                    is_active = false;
                }
            }

            if ($(this).hasClass('email')) {
                is_active = formatValidatorNew('', $(this), '', '', '', 20, '', '', 6, 31, '');
            }
            if ($(this).hasClass('mobile')) {
                is_active = formatValidatorNew('', $(this), '', '', '', 19, '', '', '', '', '');
            }
            
            if(element_name == 'month_of_profession' || element_name == 'year_of_profession') {
//                var profession_month = $('#month_of_profession').val();
//                var profession_month_validate = profession_date_validate(profession_month, 1);
//                var profession_year = $('#year_of_profession').val();
//                var profession_year_validate = profession_date_validate(profession_year, 2);
                var profession_year_validate = profession_date_validate('', '');
                if(profession_year_validate) {
                    is_active = false;
                }
            }

            if ((value != '' || value != 0) && is_active) {
                var errorspan = $("[name=" + element_name + "]").parent('div').next('.help-block').attr('class');
                if (errorspan == undefined) {
                    $("[name=" + element_name + "]").next('.help-block').removeClass('form-error').html('').parents(".form-group").removeClass("has-error");
                } else { //console.log($(this).attr('name'));
                    $("[name=" + element_name + "]").parent('div').next('.help-block').removeClass('form-error').html('').parents(".form-group").removeClass("has-error");
                }
                $('.error').removeClass('error');
            } else {
                var errorspan = $("[name=" + element_name + "]").parent('div').next('.help-block').attr('class');
                if (errorspan == undefined) {
                    $("[name=" + element_name + "]").next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
                } else {
                    $("[name=" + element_name + "]").parent('div').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
                }
            }
        });
        
        
    $(document).on("keypress", "input[name='full_name']", function(event) {
	//$(this).val($(this).val().replace(/^\s+|\s+$/g, ''));		
	 while ($(this).val().substring(0,1) == ' ')
	    $(this).val($(this).val().substring(1, $(this).val().length));
        return formatValidatorNew(event, $(this), '', '', '', 2, '', '', 2, 80, '');
    });

    $(document).on("keypress", "input[name='email']", function(event) {
        return formatValidatorNew(event, $(this), '', '', '', 20, '', '', '', '', '');
    });

    
    $(document).on("input","input[name='full_name']", function(){
	var regexp = /[^a-zA-Z ]/g;
	if($(this).val().match(regexp)){
	  $(this).val( $(this).val().replace(regexp,'') );
	}
    });
    
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
        var error_response = formValidator.dayValidate($(this));
        if (error_response == 1) {
            //showOptin();
        }
    });

    
    $(document).on("change", "#day_of_birth", function() {
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
        var error_response = formValidator.dayValidate($(this));
        if (!error_response) {
            $("#day_of_birth").addClass('error');
	    $('.dob_error_indicator').addClass('form-error');
	    $('.dob_error_indicator').parents(".form-group").addClass("has-error");
	    $('.dob_error_indicator').html($("#day_of_birth").attr("data-validation-error-msg"));
        }
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
                if (monthValue != "mm" && monthValue != "") {
                    monthValue = Number(monthValue);
                    $(this).val(monthValue);
                }
            }
        }
        var error_response = formValidator.monthValidate($(this));
        if (error_response == 1) {
            //showOptin();
        }
    });

    $(document).on("blur", "#year_of_birth", function() {
        var error_response = formValidator.yearValidate($(this));
    });

    $(document).on('change', '.employment', function() {
        if ($(this).val() == 1) {
            $('#monthly-income').show();
            $('#annually-income').hide();
            $('#annual-turnover').hide();
            $('.salaried').show();
            $('.self_employed_professional').hide();
            $('.self_employed_business').hide();
            $('#employment_bank_account').html('Your salary account is with ?');
        } else if ($(this).val() == 2) {
            $('#monthly-income').hide();
            $('#annually-income').show();
            $('#annual-turnover').show();
            $('.salaried').hide();
            $('.self_employed_professional').show();
            $('.self_employed_business').hide();
            $('#employment_bank_account').html('Your bank account is with ?');
        } else if ($(this).val() == 3) {
            $('#monthly-income').hide();
            $('#annually-income').show();
            $('#annual-turnover').show();
            $('.salaried').hide();
            $('.self_employed_professional').hide();
            $('.self_employed_business').show();
            $('#employment_bank_account').html('Your bank account is with?');
        }
	$("[name='monthly_income'],[name='annual_income']").val("").trigger("change");
	
        //alert($(this).val());
    });

});

var allvalidate = function(currentObj, currentstep) {
        //var currentObj = this;
        var currentname = '';
        var errorspan = '';
        var elementtype = '';
        var validationchk = false;
        var currenttabindex = 0;
        var elementtabindex = 0;
        var allok = true;
        //console.log((currentObj.attr("shifindex")));
        //$.each($("#step-"+currentstep).find('[data-validation]'), function(index, element) {
        $.each($('[data-validation]'), function(index, element) {
            //console.log($(this));
            validationchk = false;
            currentname = $(element).attr("name");
            elementtype = $(element).attr('type');
            elementtabindex = parseInt($(element).attr('shifindex'));
            currenttabindex = parseInt((currentObj).attr('shifindex'));

            if (elementtype == 'radio' || elementtype == 'checkbox') {
                validationchk = ($("input[name='" + currentname + "']").is(':checked')) ? false : true;
            } /*else if ($(element).attr("name") == $(currentObj).attr("name")) {
                validationchk = false;
            }*/ else if ($(element).attr("name") == 'full_name') {
                var full_name = $('.name').val();
                full_name = full_name.replace(/^\s+|\s+$/g, '');
		$('.name').val(full_name);
                var name_array = full_name.split(' ');
                if (full_name === "" || name_array.length < 1) {
                    validationchk = true;
                }
            } else if ($(element).attr("name") == 'mobile_number') {
                var mobile_validate = formatValidatorNew('', $(this), '', '', '', 19, '', '', 10, 10, '');
                if (!mobile_validate) {
                    validationchk = true;
                }
            } else if ($(element).attr("name") == 'email') {
                var email_validate = formatValidatorNew('', $(this), '', '', '', 20, '', '', '', '', '');
                if (!email_validate) {
                    validationchk = true;
                }
            } else if($(element).attr("name") == 'month_of_profession' || $(element).attr("name") == 'year_of_profession') {
                var profession_year_validate = profession_date_validate('', '');
                if(profession_year_validate) {
                    validationchk = true;
                }
            } else if ($(element).attr("name") ==  'day_of_birth' || $(element).attr("name") ==  'month_of_birth' || $(element).attr("name") ==  'year_of_birth' && $(element).val() != '') { 
                var validationchk_day = formValidator.dayValidate($('#day_of_birth'));
		//console.log("validationchk_day = "+validationchk_day);
                var validationchk_month = formValidator.monthValidate($('#month_of_birth'));
                //console.log("validationchk_month = "+validationchk_month);
                var validationchk_year = formValidator.yearValidate($('#year_of_birth'));
                //console.log("validationchk_year = "+validationchk_year);
                if(!validationchk_day || !validationchk_month || !validationchk_year) {		    
                    validationchk = true;
		    allok = false;		    
                }
            } else {
                validationchk = ($(element).val() == '' || $(element).val() == '0') ? true : false;
		allok = true;
            }

            if(elementtype == 'text') {
                if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
                    validationchk = true;
                } 
            }
            errorspan = $("[name=" + currentname + "]").parent('div').next('span').attr('class');
            if (validationchk && currenttabindex > elementtabindex) {
                //errorspan = $("[name=" + currentname + "]").parent('div').next('span').attr('class');
                //console.log(errorspan);
                if (errorspan == undefined) { 
                        $("span[class*='error_indicator']",$("[name=" + currentname + "]").parents('.form-group')).addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass('has-error');
                        //$('.gender_error_indicator').addClass('help-block form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass('has-error');
                    $("[name=" + currentname + "]").addClass('error').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
                } else {
                    $("[name=" + currentname + "]").addClass('error').parent('div').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
                    //console.log($("[name=" + currentname + "]").parent('div').parent('div'));
                    $("[name=" + currentname + "]").addClass('error').parent('div').parent('div').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
                }
            } else {
                //errorspan = $("[name=" + currentname + "]").parent('div').next('span').attr('class');
                //console.log(errorspan);
		if(!allok) {
		    if (errorspan == undefined) {
		    $("span[class*='error_indicator']",$("[name=" + currentname + "]").parents('.form-group')).addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass('has-error');
                        //$('.gender_error_indicator').addClass('help-block form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass('has-error');
                    $("[name=" + currentname + "]").addClass('error').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
		    } else {
			$("[name=" + currentname + "]").addClass('error').parent('div').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
			//console.log($("[name=" + currentname + "]").parent('div').parent('div'));
			$("[name=" + currentname + "]").addClass('error').parent('div').parent('div').next('.help-block').addClass('form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error");
		    }
		} else if (errorspan === undefined) {                         
                    $("span[class*='error_indicator']",$("[name=" + currentname + "]").parents('.form-group')).removeClass('form-error').html('').parents(".form-group").removeClass('has-error');
                    //$('.gender_error_indicator').addClass('help-block form-error').html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass('has-error');
                    $("[name=" + currentname + "]").removeClass('error').next('.help-block').removeClass('form-error').html('').parents(".form-group").removeClass("has-error");
                    $("[name=" + currentname + "]").parent().find('.help-block').html('');
                } else {
                    $("[name=" + currentname + "]").removeClass('error').parent('div').next('.help-block').removeClass('form-error').html('').parents(".form-group").removeClass("has-error");
                    //console.log($("[name=" + currentname + "]").parent('div').parent('div'));
                    $("[name=" + currentname + "]").removeClass('error').parent('div').parent('div').next('.help-block').removeClass('form-error').html('').parents(".form-group").removeClass("has-error");
                }
                $('.error').removeClass('error');
                
            }
            
            //console.log($("[name="+currentname+"]").parent('div').next('span').attr('class'));
//            if ($(element).attr("name") == $(currentObj).attr("name")) {
//                return false;
//            } else {
//
//            }


        });
//        console.log(allok);
//        if(allok) {
//            $('.next_btn').attr('disabled', false);
//            $('.next_btn').addClass('active');
//        } else {
//            $('.next_btn').attr('disabled', true);
//            $('.next_btn').removeClass('active');
//        }
    }


formValidator = {
    yearValidate: function(year_object) {
        var dateObject = new Date(); //CURRENT OBJECT
        var min_year = dateObject.getFullYear() - 65; // YEAR START
        var max_year = dateObject.getFullYear() - 18; // YEAR END
	
	var month_object = $(year_object).parents(".col-xs-4").prev().find("select"); // MONTH INPUT VALUE
	var day_object = $(month_object).parents(".col-xs-4").prev().find("select"); // YEAR INPUT VALUE
	if($(year_object).attr("type") == "text"   || $(year_object).attr("type") == "tel"){
	    month_object = $(year_object).prev(); // MONTH INPUT VALUE
	    day_object = $(month_object).prev(); // DAY INPUT VALUE
	}
	
		
        //var error_response = formatValidator('', $(year_object), '', '', '', '11', min_year, max_year, '', '', ''); //VALIDATE YEAR
        var error_response = 0;
        error_response = formatValidatorNew('', $(year_object), '', '', '', '4', min_year, max_year, '', '', ''); //VALIDATE YEAR
        //alert(error_response)
        if (error_response == 1) {
            $(year_object).removeClass("error");
            if (!$(month_object).hasClass('error') && !$(day_object).hasClass('error')) {
                $('.dob_error_indicator').removeClass('form-error');
                $('.dob_error_indicator').parents(".form-group").removeClass("has-error");
                $('.dob_error_indicator').html('');
            } else {
                $('.dob_error_indicator').addClass('form-error');
                $('.dob_error_indicator').parents(".form-group").addClass("has-error");
                $('.dob_error_indicator').html($("input[name='" + $(year_object).attr('name') + "']").attr("data-validation-error-msg"))
                $('.dob_error_indicator').html($("select[name='" + $(year_object).attr('name') + "']").attr("data-validation-error-msg"))
            }
        } else {
            $(year_object).addClass("error");
            $('.dob_error_indicator').addClass('form-error');
            $('.dob_error_indicator').parents(".form-group").addClass("has-error");
            $('.dob_error_indicator').html($("input[name='" + $(year_object).attr('name') + "']").attr("data-validation-error-msg"))
            $('.dob_error_indicator').html($("select[name='" + $(year_object).attr('name') + "']").attr("data-validation-error-msg"))
        }


        return error_response;
    },
    monthValidate: function(month_object) {
	var day_object = $(month_object).parents(".col-xs-4").prev().find("select"); // MONTH INPUT VALUE
	var year_object = $(month_object).parents(".col-xs-4").next().find("select"); // YEAR INPUT VALUE
	if($(month_object).attr("type") == "text"  || $(month_object).attr("type") == "tel"){
	    year_object = $(month_object).next(); // YEAR INPUT VALUE
	    day_object = $(month_object).prev(); // DAY INPUT VALUE
	}

        // var error_response = formatValidator('', $(month_object), '', '', '', '11', '1', '12', '', '', ''); // VALIDATE MONTH
        var error_response = formatValidatorNew('', $(month_object), '', '', '', '4', '1', '12', '', '', ''); // VALIDATE MONTH
        if (error_response == 1) {
            $(month_object).removeClass("error");
            if (!$(year_object).hasClass('error') && !$(day_object).hasClass('error')) {
                $('.dob_error_indicator').removeClass('form-error');
                $('.dob_error_indicator').parents(".form-group").removeClass("has-error");
                $('.dob_error_indicator').html('');
            } else {
                $('.dob_error_indicator').addClass('form-error');
                $('.dob_error_indicator').parents(".form-group").addClass("has-error");
                $('.dob_error_indicator').html($("input[name='" + $(month_object).attr('name') + "']").attr("data-validation-error-msg"))
                $('.dob_error_indicator').html($("select[name='" + $(month_object).attr('name') + "']").attr("data-validation-error-msg"))
            }

        } else {
            $(month_object).addClass("error");
            $('.dob_error_indicator').addClass('form-error');
            $('.dob_error_indicator').parents(".form-group").addClass("has-error");
            $('.dob_error_indicator').html($("input[name='" + $(month_object).attr('name') + "']").attr("data-validation-error-msg"))
            $('.dob_error_indicator').html($("select[name='" + $(month_object).attr('name') + "']").attr("data-validation-error-msg"))
        }
        return error_response;
    },
    dayValidate: function(date_object) {
	var month_object = "";
	var year_object = "";
	if($(date_object).attr("type") == "text" || $(date_object).attr("type") == "tel"){
	    month_object = $(date_object).next(); // MONTH INPUT VALUE
	    year_object = $(month_object).next(); // YEAR INPUT VALUE
	} else {
            month_object = $(date_object).parents(".col-xs-4").next().find("select"); // MONTH INPUT VALUE
            year_object = $(month_object).parents(".col-xs-4").next().find("select"); // YEAR INPUT VALUE
        }

        
        var maximum_value = '31';
        maximum_value = dateValidate.calculateDays($(month_object).val(), $(year_object).val());

        //var error_response = formatValidator('', $(date_object), '', '', '', '11', '1', maximum_value, '', '', ''); // VALIDATE DAY
        var error_response = formatValidatorNew('', $(date_object), '', '', '', '4', '1', maximum_value, '', '', ''); // VALIDATE DAY
                
        if (error_response == 1) {
            $(date_object).removeClass("error");
            if (!$(year_object).hasClass('error') && !$(month_object).hasClass('error')) {
                $('.dob_error_indicator').removeClass('form-error');
                $('.dob_error_indicator').parents(".form-group").removeClass("has-error");
                $('.dob_error_indicator').html('');
            } else {
                $('.dob_error_indicator').addClass('form-error');
                $('.dob_error_indicator').parents(".form-group").addClass("has-error");
                $('.dob_error_indicator').html($("input[name='" + $(date_object).attr('name') + "']").attr("data-validation-error-msg"));
                $('.dob_error_indicator').html($("select[name='" + $(date_object).attr('name') + "']").attr("data-validation-error-msg"));
            }
        } else {
            $(date_object).addClass("error");
            $('.dob_error_indicator').addClass('form-error');
            $('.dob_error_indicator').parents(".form-group").addClass("has-error");
            $('.dob_error_indicator').html($("input[name='" + $(date_object).attr('name') + "']").attr("data-validation-error-msg"));
            $('.dob_error_indicator').html($("select[name='" + $(date_object).attr('name') + "']").attr("data-validation-error-msg"));
        }
        return error_response;
    }
}

function profession_date_validate(validate_param, validate_type) {
    var month = '';
    var year = '';
    var error = 0;
    if(validate_param == '') {
        month = $('#month_of_profession').val();
        year = $('#year_of_profession').val();
    } else if(validate_type == 2){
        year = validate_param;
    } else {
        month = validate_param;
    }
    var stringmlength = month.length;
    if(stringmlength == 1) {
        $("#month_of_profession").val('0' + month);
    }
    if(parseInt(year) == 0 || year == ""){
	validate_type = 1;
    }
    var stringylength = year.length;
    if(stringylength == 1) {
        $("#year_of_profession").val('0' + year);
    }
    var monthCheck = /^(0[0-9]|1[0-1])$/;
    var yearCheck = /^([0-9]{2})$/;///^\d{4}$/;
    //var date_obj = new Date();
    //var current_year = date_obj.getFullYear(); 
    //var current_month = date_obj.getMonth();
    //var current_date = new Date(current_year, current_month, 1); //Year, Month, Date
    //var filled_date = new Date(year, month, 1); //Year, Month, Date
    //current_month = current_month +1;
    //var end_year = current_year - 65;
//console.log(filled_date);
//console.log(current_year < year);
     if (month == '' || month.match(monthCheck) == null) {
        if(validate_param == '' || validate_type == 1) {
//            $('#month_of_profession').addClass('error');
//            $('.profession_date_error_indicator').addClass('form-error');
//            $('.profession_date_error_indicator').parents(".form-group").addClass("has-error");
//            $('.profession_date_error_indicator').html($("#month_of_profession").attr("data-validation-error-msg"));
            error = 1;
        }
     }
     //if(year == '' || year.match(yearCheck) == null || !(current_year >= year && end_year <= year) || (current_date < filled_date)) {
     
     
     if((year == '' || year.match(yearCheck) == null || year > '99')) {
        if(validate_param == '' || validate_type == 2) { 
//            $('#year_of_profession').addClass('error');
//            $('.profession_date_error_indicator').addClass('form-error');
//            $('.profession_date_error_indicator').parents(".form-group").addClass("has-error");
//            $('.profession_date_error_indicator').html($("#year_of_profession").attr("data-validation-error-msg"));
            error = 1;
        }
     } 
     return error;
}
