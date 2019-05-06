        var email_provider_list = ["yahoo", "yahoomail", "indiatimes", "gmail", "rediff", "rediffmail", "sify", "sifymail", "outlook", "inmail", "one", "onemail", "facebook", "rocketmail", "hotmail", "in", "aol", "aolmail", "ibibo", "live", "livemail", "zapak", "myspace", "inbox", "icloud", "apple", "mail"]; var email_provider_list = ["yahoo", "yahoomail", "indiatimes", "gmail", "rediff", "rediffmail", "sify", "sifymail", "outlook", "inmail", "one", "onemail", "facebook", "rocketmail", "hotmail", "in", "aol", "aolmail", "ibibo", "live", "livemail", "zapak", "myspace", "inbox", "icloud", "apple", "mail"];
        var spacial_email_list = ["schindler"];
        var email_Array = ["asd@test.com", "asd@gmail.com", "test@test.com", "test@example.com", "example@example.com"];
        var mobile_number_array = [9999999990, 9999999991, 99999999992, 9999999993, 9999999994, 9999999995, 9999999996, 9999999997, 9999999998, 9999999999, 8999999990, 8999999991, 89999999992, 8999999993, 8999999994, 8999999995, 8999999996, 8999999997, 8999999998, 8999999999];
        var RUPEE = '<i class="icon-inr">`</i>';
        var question_answer = {a1_list: '', a2_list: ''};
//var bureau_check_journey = {bureau_check_journey_status: false, bureau_check_qa: false, skip_bureau_check_qa: '0', skip_bureau_hit: 'false'};
        var bureau_check_journey = {bureau_check_journey_status: false, bureau_check_qa: false, skip_bureau_check_qa: '0', skip_bureau_hit: 'false', highmark_status: '0'};
        var address_pattern = /^\d*[a-zA-Z0-9#][a-zA-Z0-9\.,#\-/\(\) ]*$/;
        $(function () {

        $(document).on('click', ".equifax_terms_link", function () {
        showEquifaxPopUp();
                $('.overlay').removeClass('display-none');
                $('.overlay').addClass('display-block');
        });
                $(document).on('change', '#bureau_pb_terms', function() {
        var user_id = $('#bureau_pb_terms').attr('global-user');
                if (this.checked && user_id <= 1 && false){
        showEquifaxPopUp();
        }
        });
                $(document).on('click', ".eqi-cancel", function () {
        $('#equi').removeClass('display-block');
                $('#equi').addClass('display-none');
                $('.overlay').addClass('display-none');
                $('.overlay').removeClass('display-block');
                $('body,html').animate({scrollTop: $("#main_content")}, 800);
        });
                $(document).on('click', ".ndnc_text_optin", function () {
        $('#' + $(this).attr("data-label-optin")).prop('checked',
                function (i, oldVal) {
                return !oldVal;
                });
        });
                //FOR COUPON CODE
                $(document).on("mouseover", ".coupon_company", function () {
        $(this).saveCouponCompanyInformation()
        });
                $('#click_to_call_iframe').on('load', function () {
        showLoader('clicktocall_loader', 'display-none');
        });
                $(document).on("click", ".switch_to_gold_loan", function () {
        var is_proceed_to_gold_loan = 0;
                if (($(this).attr("is_proceed_to_gl")) != undefined && ($(this).attr("is_proceed_to_gl")) != "" && parseInt($(this).attr("is_proceed_to_gl")) > 0) {
        is_proceed_to_gold_loan = ($(this).attr("is_proceed_to_gl"));
        }

        var product_id = $('.switch_to_gold_loan').attr('product_id');
                var quote_id = $('.switch_to_gold_loan').attr('quote_id');
                var lead_id = $('.switch_to_gold_loan').attr('lead_id');
                if (product_id == '' || product_id == 0 || quote_id == '' || quote_id == 0 || lead_id == '' || lead_id == 0) {
        alert('Sorry! some error occurred');
                return;
        } else {
        switchToGoldLoan(product_id, quote_id, lead_id, is_proceed_to_gold_loan);
        }
        });
                /*
                 //IT IS GETTING USED IN OLD FUNCTION - switchToOtherJourneyOld
                 $(document).on("click", ".switch_to_other_journey", function () {
                 var product_id = $('.switch_to_other_journey').attr('product_id');
                 var quote_id = $('.switch_to_other_journey').attr('quote_id');
                 var lead_id = $('.switch_to_other_journey').attr('lead_id');
                 var step = $('.switch_to_other_journey').attr('step');
                 var controller = $('.switch_to_other_journey').attr('controller');
                 if (product_id == '' || product_id == 0 || quote_id == '' || quote_id == 0 || lead_id == '' || lead_id == 0) {
                 alert('Sorry! some error occurred');
                 return;
                 } else {
                 switchToOtherJourney(product_id, quote_id, lead_id, step, controller);
                 }
                 });
                 */

                $(document).on("click", ".content_tab", function () {
        $(".content_tab").parents("li").removeClass("active");
                $(".content_tab_detail").addClass("hide");
                $(this).parents("li").addClass("active");
                $("#tab" + $(this).data("value")).removeClass("hide");
        })
                $(document).on("click", ".logout", logout);
                quoteWaitPopUp(); //FUNCTION TO GET POPUP ON QUOTES PAGE    
                $('a.login-window').click(function () {

        // Getting the variable's value from a link 
        var loginBox = $(this).attr('href');
                //Fade in the Popup and add close button
                $(loginBox).fadeIn(300);
                $(loginBox).css({
        'margin-top': - (($(loginBox).height() + 24) / 2),
                'margin-left': - ($(loginBox).width() + 24) / 2
        });
                // Add the mask to body
                $('body').append('<div id="mask"></div>');
                $('#mask').fadeIn(300);
                return false;
        });
                // When clicking on the button close the popup closed
                $('a.close').on('click', function () {
        $('#mask , .login-popup, #my_account-popup, #quote_wait_popup').fadeOut(300, function () {
        $('#mask').remove();
        });
                return false;
        });
        });
        getCitiesForEmployer = function (src, container, pinContainer, loader, loaderPin, type_city) {
        if (src == '') {
        $("#" + container).attr('disabled', true);
                $("#" + container).html("<option value=''>Select City</option>");
                return false;
        }
        $("#" + container).attr('disabled', false);
                if (src != "" && src > 0) {
        $("#" + loader).html("<img height='25' src='/components/images/loading.gif'>");
//        if (loaderPin != undefined) {
//            $("#" + loaderPin).html("<img heisght='15' src='/components/images/loading.gif'>");
//        }
                /*Get pincode change 14032016*/
                var step = "city";
                if (type_city != undefined && type_city == "pincode_city_only"){
        var step = "specific_city_pincode_only";
        }
        //End
        $.ajax({
        type: "POST",
                url: "/common-request",
                data: "step=" + step + "&state_id=" + src,
                dataType: 'json',
                success: function (response) {
                if (response.status == "success") {
                $("#" + pinContainer).val('');
                        $("#" + pinContainer).removeClass('error');
                        $("#" + $("#" + pinContainer).attr('id') + "_validator").removeClass('validate_fail');
                        office_pin_code = new Array();
                        $("#" + container).html(response.html);
                        $("#" + container).removeAttr("disabled");
                        $("#" + container).css('border', '');
                } else {
                $("#" + container).html("<option value=''>Select City</option>");
                        $("#" + pinContainer).html("<option value=''>Select Pincode</option>");
                }
                $("#" + loader).html("");
//                if (loaderPin != undefined) {
//                    $("#" + loaderPin).html("");
//                }
                }
        });
        }
        }

function getPincodes(city_id, conainer, pinContainer, loader) {
////console.log("asdasdasdas"+city_id);
$("#" + pinContainer).val("");
        if (city_id != "" && city_id > 0) {
$("#" + loader).html("<img height='15' src='/components/images/loading.gif'>");
        $.ajax({
        type: "POST",
                url: "/common-request",
                data: "step=pincode&city_id=" + city_id,
                dataType: 'json',
                success: function (response) {
                if (response.status == "success") {
                office_pin_code = response.html;
                        jQueryAutoComplete($("#" + pinContainer), office_pin_code);
                }
                $("#" + loader).html("");
                }
        });
        }
}

function showLoader(loader, cls) {
if (document.getElementById(loader) != undefined) {
        document.getElementById(loader).className = cls;
        document.getElementById("fade-body").className = cls;
        if($('#fade-body1').length > 0){
            document.getElementById("fade-body1").className = cls;
        }
    }
}

function showOverlay(container, cls) {
if (document.getElementById(container) != undefined) {
document.getElementById(container).className = cls;
        document.getElementById("fade-body").className = cls;
        }
}

function closeOverlay() {
showOverlay('overlay_message', 'display-none');
        window.scrollTo(0, 100);
}

function isPANOLd(str) {
if (str == undefined)
        return false;
        //str=M.trim(str);
        str = $.trim(str);
        var m = str.match(/^([A-Za-z]{5})+([0-9]{4})+([A-Za-z]{1})$/);
        return (m && m[0].length == 10);
}

function isPAN(str) {
if (str == undefined)
        return false;
        //str=M.trim(str);
        str = $.trim(str);
        var m = str.match(/^([A-Za-z]{5})+([0-9]{4})+([A-Za-z]{1})$/);
        return (m && m[0].length == 10 && str.substr(3, 1).toLowerCase() == 'p');
}

unformatMoney = function (str) {
if (str != undefined && str != "" && str.toString().indexOf(",") != "-1") {
var amount = ("" + str).replace(/\,/g, '');
        return (amount);
        } else {
return (str);
        }
}


iconGroupButtonAction = {
activeIcon: function (active_icon_object) {
if ($(active_icon_object).hasClass('radio') || $(active_icon_object).hasClass('employment-type')) {
var class_name = 'radio';
        if ($(active_icon_object).hasClass('employment-type')) {
class_name = 'employment-type';
        }
iconGroupButtonAction.resetGroupIcon(active_icon_object, class_name);
        }
$(active_icon_object).parent().addClass('selected');
        iconGroupButtonAction.scrollRow(active_icon_object);
        },
        resetGroupIcon: function (active_icon_object, class_name) {
        $('.' + class_name).each(function () {
        if ($(this).attr('name') == $(active_icon_object).attr('name')) {
        $(this).parent().removeClass('selected error');
                if (class_name != 'radio') {
        $("." + $(this).attr('key-name') + '-li').addClass('hide');
        }
        }
        });
                iconGroupButtonAction.hideAppendAction(active_icon_object);
                iconGroupButtonAction.anotherButtonSetup(active_icon_object);
        },
        scrollRow: function (active_icon_object) {
        if ($(active_icon_object).hasClass('pos-scroll')) {
        var position = $(active_icon_object).parents('div.panel').offset();
                $('body,html').animate({scrollTop: parseInt(position.top) + 25}, 1000);
        } else if ($(active_icon_object).hasClass('position-scroll-home')) {
        var position = $(active_icon_object).parents('div.panel').offset();
                $('body,html').animate({scrollTop: parseInt($(active_icon_object).parents('div.panel').css('height')) + parseInt(position.top) + 25}, 1000);
        } else if ($(active_icon_object).hasClass('scroll')) {
        var position = $(active_icon_object).parents('div.panel').offset();
                $('body,html').animate({scrollTop: parseInt($(active_icon_object).parents('div.panel').css('height')) + parseInt(position.top) + 10}, 800);
        } else if ($(active_icon_object).hasClass('val-scroll')) {
        var position = $(active_icon_object).parents('ul').position();
                $('body,html').animate({scrollTop: parseInt(position.top) - 50}, 1000);
        } else if ($(active_icon_object).attr('scroll') != undefined) {
        $('body,html').animate({scrollTop: parseInt($(active_icon_object).attr('scroll'))}, 1000);
        }
        },
        errorScrollRow: function (active_icon_object) {
        $('body,html').animate({scrollTop: parseInt($(active_icon_object).attr('error-scroll'))}, 1000);
        },
        textSetup: function (active_icon_object) {
        $('.text-label').each(function () {
        if ($(this).attr('group_label_type') == $(active_icon_object).attr('name')) {
        $(this).removeClass('hide');
        }
        });
                $('.button-label').each(function () {
        if ($(this).attr('group_label_type') == $(active_icon_object).attr('name')) {
        $(this).addClass('hide');
        }
        });
        },
        anotherButtonSetup: function (active_icon_object) {
        $('.text-label').each(function () {
        if ($(this).attr('group_label_type') == $(active_icon_object).attr('name')) {
        $(this).addClass('hide');
        }
        });
                $('.button-label').each(function () {
        if ($(this).attr('group_label_type') == $(active_icon_object).attr('name')) {
        $(this).removeClass('hide');
        }
        });
        },
        appendButtonAction: function (active_icon_object) {
        var object_class = "." + (($(active_icon_object).attr('name')) + '-li');
                if ($(object_class).hasClass("hide")) { //CHECKED FOR OPERA VERSION 12.17
        $(object_class).removeClass('hide');
        }
        var is_set = iconGroupButtonAction.unsetValue($(active_icon_object), quote_element_object);
                if (is_set == false) {
        iconGroupButtonAction.setValue($(active_icon_object), quote_element_object_second);
        }
        },
        hideAppendAction: function (active_icon_object) {
        var object_class = "." + (($(active_icon_object).attr('name')) + '-li');
                $(object_class).addClass('hide');
        },
        unsetValue: function (object, element_arraay) {

        var set_value = false;
                $.each(element_arraay, function (key, value) {
                if (key == $(object).attr('name')) {
                $(element_arraay).attr(key, '');
                        set_value = true;
                }
                });
                return set_value;
        },
        setValue: function (object, element_array) {
        var set_value = false;
                $.each(element_array, function (key, value) {
                if (key == $(object).attr('name') && $(object).attr('key-value') != "") {
                $(element_array).attr(key, $(object).attr('key-value'));
                        set_value = true;
                }
                });
                ////console.log($(element_array));
                return set_value;
        },
        appendValue: function (object, element_array) {
        var set_value = false;
                $.each(element_array, function (key, value) {
                if (key == $(object).attr('name') && $(object).attr('key-value') != "") {
                if (value.indexOf($(object).attr('key-value')) < 0) {
                var new_value = value + "," + $(object).attr('key-value');
                        new_value.replace(/^,|,$/g, '');
                        new_value = new_value.replace(/^,|,$/g, '');
                        $(element_array).attr(key, new_value);
                        set_value = true;
                }
                }
                });
                ////console.log($(element_array));
                return set_value;
        },
        removeValue: function (object, element_array) {

        var set_value = false;
                $.each(element_array, function (key, value) {

                if (key == $(object).attr('name') && $(object).attr('key-value') != "") {
                if (value.indexOf(',' + $(object).attr('key-value')) > 0)
                        new_value = value.replace(',' + $(object).attr('key-value'), '');
                        else
                        new_value = value.replace($(object).attr('key-value'), '');
                        new_value = new_value.replace(/^,|,$/g, '');
                        $(element_array).attr(key, new_value);
                        set_value = true;
                }
                });
                //console.log($(element_array));
                return set_value;
        },
        SetValueByValueAttr: function (object, element_array) {
        var set_value = false;
                $.each(element_array, function (key, value) {
                if (key == $(object).attr('name') && $(object).val() != "") {
                $(element_array).attr(key, $(object).val());
                        set_value = true;
                }
                });
                return set_value;
        }
}

/**
 * COMMON FUNCTION TO GET DATE PICKER
 */
getDate = function () {
var dateObject = new Date();
        $(this).datepicker({
changeMonth: true,
        changeYear: true,
        yearRange: '1930:' + dateObject.getFullYear(),
        minDate: new Date(dateObject.getFullYear() - 65, 1 - 1, 1),
        maxDate: new Date(dateObject.getFullYear() - 18, 12 - 1, 31),
        defaultDate: new Date(dateObject.getFullYear() - 25, 12 - 1, 31),
        selectDefaultDate: false
        });
}

dateValidate = {
day: "",
        month: "",
        year: "",
        dayValidate: function (date_object) {
        var month_object = $(date_object).next();
                var year_object = $(month_object).next();
                var maximum_value = '31';
                maximum_value = dateValidate.calculateDays($(month_object).val(), $(year_object).val());
                //var error_response = formatValidator('', $(date_object), '', '', '', '11', '1', maximum_value, '', '', '');
                var error_response = formatValidatorNew('', $(date_object), '', '', '', 4, '1', maximum_value, '', '', '');
                if (error_response == 1) {
        $(date_object).removeClass("error");
                if (parseInt($(year_object).val()) > 0 && parseInt($(month_object).val()) > 0) {
        $(year_object).removeClass("error");
                $(month_object).removeClass("error");
                validationStatus.validateSuccess($(date_object));
        }
        } else {
        $(date_object).addClass("error");
                if (parseInt($(year_object).val()) > 0 && parseInt($(month_object).val()) > 0) {
        validationStatus.validateFail($(date_object));
        }
        }
        },
        monthValidate: function (day, month, year) {
        if ($(month).val() == "") {
        return false;
        }
        dateValidate.dateAdjustment(day, month, year);
                formValidate.monthValidate(month);
        },
        yearValidate: function (day, month, year) {
        dateValidate.dateAdjustment(day, month, year);
                formValidate.yearValidate(year);
        },
        calculateDays: function (month, year) {
        var day_limit = '31';
                dateValidate.month = month;
                dateValidate.year = year;
                if (dateValidate.month == '4' || dateValidate.month == '6' || dateValidate.month == '9' || dateValidate.month == '11') {
        day_limit = '30';
        } else if (dateValidate.month == "02") {
        if (dateValidate.year != "") {
        if ((parseInt(dateValidate.year) % 4) != 0) {
        day_limit = '28';
        } else {
        day_limit = '29';
        }
        } else {
        day_limit = '29';
        }
        }
        return day_limit;
        },
        dateAdjustment: function (day, month, year) {
        //var dateValidate_obj =  dateValidate;
        //////console.log(dateValidate);a        
        dateValidate.month = $(month).val();
                dateValidate.day = $(day).val();
                dateValidate.year = $(year).val();
                var day_id = $(day).attr("id");
                // $("#" + day_id + " option:gt(0)").remove();

                var day_limit = "31";
                day_limit = dateValidate.calculateDays(dateValidate.month, dateValidate.year);
                for (var i = 1; i <= parseInt(day_limit); i++) {
        $(day).append("<option value='" + i + "'>" + i + "</option>");
        }
        if (day_limit == '28' && parseInt(dateValidate.day) <= 28) {
        $(day).val(dateValidate.day);
        } else if (day_limit == '29' && parseInt(dateValidate.day) <= 29) {
        $(day).val(dateValidate.day);
        } else if (day_limit == '30' && parseInt(dateValidate.day) <= 30) {
        $(day).val(dateValidate.day);
        } else if (day_limit == '31' && parseInt(dateValidate.day) <= 31) {
        $(day).val(dateValidate.day);
        }
        }
};
//function formatValidator(event, element_class, name, id, type, minimum_value, maximum_value, minimum_length, maximum_length, exact_value){
        function formatValidator(event, element, element_class, name, id, type, minimum_value, maximum_value, minimum_length, maximum_length, exact_value) {
        var is_validated = 1;
                var element_object = "";
                if (element != "") {
        element_object = $(element);
        } else if (element_class != "") {
        element_object = $("." + element_class);
        } else if (name != "") {
        element_object = $('[name="' + element_class + '"]');
        } else if (id != "") {
        element_object = $("#" + id);
        }

        $(element_object).val($.trim($(element_object).val()));
                if (event == "") {
        if ($(element_object).val() == "") {
        //////console.log("null error")
        return 0;
        } else {
        if (minimum_length != "" && $(element_object).val().length < parseInt(minimum_length)) {
        //////console.log("minimum_length");
        return 0;
        }
        if (maximum_length != "" && $(element_object).val().length > parseInt(maximum_length)) {
        //////console.log("maximum_length");
        return 0;
        }
        if (minimum_value != "") {
        minimum_input_value = $(element_object).val().replace(/\,/g, '');
                if (parseInt(minimum_input_value) < parseInt(minimum_value)) {
        //////console.log("minimum_value");
        return 0;
        }
        }
        if (maximum_value != "") {
        maximum_input_value = $(element_object).val().replace(/\,/g, '');
                if (parseInt(maximum_input_value) > parseInt(maximum_value)) {
        //console.log("maximum_value");
        return 0;
        }
        }
        }
        }

        var code = "";
                if (event != "") {
        code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        }

        switch (type) {
        case 1: // 1= alphabet only            
                //Code Explanation{ A-Z, 45=Insert, 13=Enter, 08=Backspace, 09=Tab}
                if (code != "") {
        if (!(((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code == 13 || code == 8 || code == 09)))) {
        return false;
        }
        } else {

        var pattern = /^[a-zA-Z]*$/
                if ($(element_object).val().match(pattern)) {
        // //////console.log("valid");
        } else {
        //////console.log("Error: alphabetic" + code);
        is_validated = 0;
        }
        }
        break;
                case 2: // 2= alphnumeric only
                break;
                case 3: // 3= alpha with space
                if (code != "") {
        if (!(((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code == 13 || code == 8 || code == 09)))) {
        return false;
        }
        } else {
        var pattern = /^[a-zA-Z][a-zA-Z\s]*$/
                if ($(element_object).val().match(pattern)) {
        // //////console.log("valid");
        } else {
        //////console.log("Error: alphabetic" + code);
        is_validated = 0;
        }
        }
        break;
                case 4: // 4= alpha with space
                break;
                case 5: // 5= alphaspecial only
                break;
                case 6: // 1= alphabet only
                break;
                case 7: // 7= alphanumeric with space only            
                //Code Explanation{ A-Z, 45=Insert, 13=Enter, 08=Backspace, 09=Tab}
                if (code != "") {
        if (!((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code == 13 || code == 8 || code == 09 || code == 46 || code == 32))) {
        return false;
        }
        } else {
        var pattern = /^[a-zA-Z0-9 ]*$/
                if ($(element_object).val().match(pattern)) {
        //////console.log("valid");
        } else {
        //////console.log("Error: alphanumeric with space" + code);
        //$(element_object).addClass('error');
        is_validated = 0;
        }
        }
        break;
                case 8: //8 rupeey with zero
                var value = $(element_object).val();
                value = value.replace(/\,/g, '');
                if (code != "") {
        if (!((code >= 48 && code <= 57) || (code == 13 || code == 8 || code == 09 || code == 46))) {
        //////console.log("Error: rupee numeric with zero" + code);
        return false;
        }
        } else {
        if (value >= 0) {
        //////console.log("valid");
        } else {
        //////console.log("Error: numeric with zero" + code);
        is_validated = 0;
        }
        }
        break;
                case 9: //9 rupeey without zero
                var value = $(element_object).val();
                value = value.replace(/\,/g, '');
                if (code != "") {
        if (!((code >= 48 && code <= 57) || (code == 13 || code == 8 || code == 09 || code == 46))) {
        //////console.log("Error: numeric without" + code);
        return false;
        }
        } else {
        if (value > 0) {
        //  //////console.log("valid");
        } else {
        //////console.log("Error: numeric without" + code);
        is_validated = 0;
        }
        }
        break;
                case 10: // 11= numeric >=0
                if (code != "") {
        if (!((code >= 48 && code <= 57) || (code == 13 || code == 8 || code == 09 || code == 46))) {
        //////console.log("Error: numeric with zero" + code);
        return false;
        }
        } else {
        if ($(element_object).val() >= 0) {
        // //////console.log("valid");
        } else {
        //////console.log("Error: numeric with zero" + code);
        is_validated = 0;
        }
        }
        break;
                case 11: // 11= numeric >0
                if (code != "") {
        if (!((code >= 48 && code <= 57) || (code == 13 || code == 8 || code == 09 || code == 46))) {
        //////console.log("Error: numeric without" + code);
        return false;
        }
        } else {
        if ($(element_object).val() > 0) {
        //  //////console.log("valid");
        } else {
        //////console.log("Error: numeric without" + code);
        is_validated = 0;
        }
        }
        break;
                case 13: // email
                var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if ($(element_object).val().match(emailPattern)) {
        //  //////console.log("valid");
        } else {
        //////console.log("Error: email" + code);
        is_validated = 0;
        }
        break;
                case 14: // 14=mobile
                ////console.log("-------");
                if (code != "") {
        if (!(code >= 48 && code <= 57 || code == 13 || code == 08 || code == 09)) {
        ////console.log(code);
        ////console.log("Error: numeric without" + code);
        $(element_object).addClass('error');
                $("#mobile_validator").addClass('validate_fail');
                return false;
        }

        } else {
        var first_variable = ($(element_object).val()).split("");
                first_variable = first_variable[0];
                if (($(element_object).val() > 0) && (parseInt(first_variable) >= 7) && (($(element_object).val().length) == 10)) {
        ////console.log("valid");
        } else {
        ////console.log("Error: wrong mobile format");
        /*$(element_object).addClass('error');
         $("#mobile_validator").addClass('validate_fail');*/
        is_validated = 0;
        }
        }
        break;
        }

        return is_validated;
        }


rupeeFormat = function (amount) {
result = null;
        amount = unformatMoney(amount);
        if (amount > 0) {
amount = amount.toString();
        var afterPoint = '';
        if (amount.indexOf('.') > 0) {
afterPoint = amount.substring(amount.indexOf('.'), amount.length);
        }
amount = Math.floor(amount);
        amount = amount.toString();
        var lastThree = amount.substring(amount.length - 3);
        var otherNumbers = amount.substring(0, amount.length - 3);
        if (otherNumbers != '') {
lastThree = ',' + lastThree;
        }
var result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        } else {
result = 0;
        }
return result;
}

checkDateOfBirth = function () {
if (this.value.length == this.maxLength) {
$(this).next('.datepick').focus();
        }
}

function GetClick(sRedirectURL, sCompany, sBanner, sessionid) {
var sURL = document.location;
        getLocation(sessionid, sURL, sCompany, sBanner);
        ////alert(sRedirectURL);
        window.open(sRedirectURL);
}

function getLocation(sessionid, urlN, CompanyName, BannerName) {
var TotalUrl = '?sessionid=' + sessionid + '&urlN=' + urlN + '&CompanyName=' + CompanyName + '&BannerName=' + BannerName;
        $.ajax({
        url: "http://www.policybazaar.com/PersonalLoan/mail/AdCounter/" + TotalUrl,
                context: document.body
        }).done(function (data) {

});
}

function formatValidatorNewOLD(event, element, element_class, name, id, type, minimum_value, maximum_value, minimum_length, maximum_length, exact_value) {
var is_validated = 1;
        var element_object = "";
        // //alert("charcode:"+event.charCode+"__keyCode:"+event.keyCode+" Name is " + navigator.appName + ". Code name is " + navigator.appCodeName+" Browser engine is " + navigator.product+" user Agent:"+navigator.userAgent);
        if (element != "") {
element_object = $(element);
        } else if (element_class != "") {
element_object = $("." + element_class);
        } else if (name != "") {
element_object = $('[name="' + element_class + '"]');
        } else if (id != "") {
element_object = $("#" + id);
        }

//$(element_object).val($.trim($(element_object).val()));
var element_value = $.trim($(element_object).val());
        if (event == "") {
if (element_value == "") {
//////console.log("null error")
return 0;
        } else {
if (minimum_length != "" && (element_value).length < parseInt(minimum_length)) {
////console.log("minimum_length");
return 0;
        }
if (maximum_length != "" && (element_value).length > parseInt(maximum_length)) {
////console.log("maximum_length");
return 0;
        }
if (minimum_value != "") {
var minimum_input_value = $(element_object).val().replace(/\,/g, '');
        if (minimum_value != "" && parseInt(minimum_input_value) < parseInt(minimum_value)) {
////console.log("minimum_value");
return 0;
        }
}
if (maximum_value != "") {
minimum_input_value = $(element_object).val().replace(/\,/g, '');
        if (maximum_value != "" && parseInt(minimum_input_value) > parseInt(maximum_value)) {
////console.log("maximum_value");
return 0;
        }
}
}
}

var code = "";
        if (event != "") {
code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        }
var result = false;
        switch (type) {
case 1: // 1= alphabet only 
        var patternStr = /^[a-zA-Z]+$/g;
        var patternStr2 = /[^a-zA-Z]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
return;
        } else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 2: // 2= alpha with space in middle..
        var patternStr = /^[a-zA-Z][a-zA-Z. ]*[a-zA-Z]$/g;
        if (event != "") {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
//alert(code);
if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 32 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//                    if (code == 32) {
//                        var chr = String.fromCharCode(code);
//                        var pos = ($(element_object).val()).lastIndexOf(chr);
//                        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
//                            return false;
//                        }
//                    }
//                    if (code == 46) {
//                        var chr = String.fromCharCode(code);
//                        var pos = ($(element_object).val()).lastIndexOf(chr);
//                        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
//                            return false;
//                        }
//                    }
return true;
        } else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 3: // 3= alpha with special characters [!@#$%^&*()-_+=[{]}:;"'|\\\/?,.]
        var patternStr = /^[a-zA-Z][!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z ]*[!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z]$/g;
        if (code == 96 || code == 126 || (code >= 48 && code <= 57)) {
return false;
        } else {
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
}

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 4: // 4= numeric without zero 0
        var patternStr = /^[1-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code > 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
return true;
        } else {
return false;
        }
} else {

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 5: // 5= numeric with zero 0

        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40 || code == 46) {
return true;
        }
else {
return false;
        }
} else {
var patternStr = /^[0-9]+$/g;
        result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}


break;
        case 6: // 6= Numeric with space
        var patternStr = /^[0-9][0-9 ]*[0-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 32 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
} else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 7: // 7= numeric with comma & zero(0)
        var patternStr = /^[0-9][0-9,]*$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 44 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code == 44) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
} else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 8: //8 numeric with comma and gereater than 0
        var patternStr = /^[1-9][0-9,]*$/g;
        if (event != "") {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 44 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
if ((($(element_object).val()).length) < 1 && code == 48) {
return false;
        }
if (code == 44) {
var chr = String.fromCharCode(code);
        //console.log("char" + chr)
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
} else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}

break;
        case 9: //9 Alpha Numeric
        var patternStr = /^[a-zA-Z0-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
}
else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}

break;
        case 10: // 10 Alpha numeric with space
        var patternStr = /^[a-zA-Z0-9][a-zA-Z0-9 ]*[a-zA-Z0-9]+$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40 || code == 32) {
//...
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}
}
else {
return false;
        }
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 11: // 11 Alpha Numeric with special characters
        var patternStr = /^[!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z0-9]+$/g;
        if (code == 96 || code == 126 || code == 32) {
return false;
        }
else {

}

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }

break;
        case 12: // 12 Alpha Numeric with special characters and space
        var patternStr = /^[a-zA-Z0-9][!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z0-9 ]*[!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z0-9]+$/g;
        if (event != '') {
if (code == 96 || code == 126) {
return false;
        } else {
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}
}
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 13: // Date (dd/mm/yyyy)
        var patternStr = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (event != "") {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 47 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (($(element_object).val()).length >= 10 && ((code >= 48 && code <= 57) || code == 47)) {
return false;
        }
if ((($(element_object).val()).length == 0 || $(element_object).val() == '') && (code >= 48 && code <= 57)) {
if (code >= 48 && code <= 51) {
return true;
        } else {
return false;
        }
}


if (($(element_object).val()).length == 2 && ((code >= 48 && code <= 57))) {
return false;
        }
if (($(element_object).val()).length == 5 && ((code >= 48 && code <= 57))) {
return false;
        }
//dd/mm/yyyy

if (($(element_object).val()).length < 2 && code == 47) {
return false;
        }
if (($(element_object).val()).length >= 3 && ($(element_object).val()).length < 5 && code == 47) {
return false;
        }
if (($(element_object).val()).length >= 6 && code == 47) {
return false;
        }
if (($(element_object).val()).length >= 6 && (code >= 48 && code <= 57)) {

if (($(element_object).val()).length == 6 && (code == 49 || code == 50)) {
//alert(code);
return true;
        } else if (($(element_object).val()).length == 7 && $(element_object).val()[6] == 1 && (code == 56 || code == 57)) {
return true;
        } else if (($(element_object).val()).length == 7 && $(element_object).val()[6] == 2 && (code == 48)) {
return true;
        } else if (($(element_object).val()).length >= 8 && (code >= 48 && code <= 57)) {
return true;
        } else {
return false;
        }
}

if ((($(element_object).val()).length >= 3) && (code >= 48 && code <= 57)) {

if (($(element_object).val()).length == 3) {
if (code >= 48 && code <= 49) { 
return true;
        } else {
return false;
        }
}
if (($(element_object).val()).length == 4) {
if ($(element_object).val()[3] == 1 && (code >= 48 && code < 51)) {
return true;
        } else if ($(element_object).val()[3] == 0 && (code > 48 && code <= 57)) {
return true;
        } else {
return false;
        }

if (!(code >= 48 && code <= 49)) {
return false;
        }
}

}

if ((($(element_object).val()).length == 1) && (code >= 48 && code <= 57)) {
if (($(element_object).val()[0] == 1 || $(element_object).val()[0] == 2 || $(element_object).val()[0] == 0) && (code >= 48 && code <= 57)) {
return true;
        } else if ($(element_object).val()[0] == 3 && (code >= 48 && code <= 49)) {
return true;
        } else {
return false;
        }
}
}
else {
return false;
        }

} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}


break;
        case 14: // 14 Date (yyyy-mm-dd) 
        // yyyy not less than 1850
        var patternStr = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
//alert(code+"~code~"+exact_value.indexOf('-'));
if ((code >= 48 && code <= 57) || code == 45 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (($(element_object).val()).length >= 10 && ((code >= 48 && code <= 57) || code == 45)) {
return false;
        }
if (($(element_object).val()).length == 4 && ((code >= 48 && code <= 57))) {
return false;
        }

if ((($(element_object).val()).length == 0 || $(element_object).val() == '') && (code == 48 || code >= 51)) {
return false;
        }
if ((($(element_object).val()).length == 1) && (code >= 48 && code <= 57)) {
if ($(element_object).val() == 1 && (code < 56)) {
return false;
        }
if ($(element_object).val() == 2 && (code != 48)) {
return false;
        }

}

if ((($(element_object).val()).length == 5) && (code >= 48 && code <= 57)) {
if (!(code >= 48 && code <= 49)) {
return false;
        }

}

if ((($(element_object).val()).length == 6) && (code >= 48 && code <= 57)) {

if ($(element_object).val()[5] == 1 && (code >= 48 && code < 51)) {
return true;
        } else if ($(element_object).val()[5] == 0 && (code > 48 && code <= 57)) {
return true;
        } else {
return false;
        }

if (!(code >= 48 && code <= 49)) {
return false;
        }
}

if ((($(element_object).val()).length == 8) && (code >= 48 && code <= 57)) {
if (!(code >= 48 && code <= 51)) {
return false;
        }

}

if ((($(element_object).val()).length == 9) && (code >= 48 && code <= 57)) {
if (($(element_object).val()[8] == 1 || $(element_object).val()[8] == 2 || $(element_object).val()[8] == 0) && (code >= 48 && code <= 57)) {
return true;
        } else if ($(element_object).val()[8] == 3 && (code >= 48 && code <= 49)) {
return true;
        } else {
return false;
        }
}

if ((($(element_object).val()).length < 4 || ($(element_object).val()).length == 5 || ($(element_object).val()).length == 6 || ($(element_object).val()).length == 8 || ($(element_object).val()).length == 9) && code == 45) {

return false;
        }
if (($(element_object).val()).length == 7 && ((code >= 48 && code <= 57))) {
return false;
        }

}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 15: // 15 Day (00-31) 
        var patternStr = /^(0[1-9]|[1-2][0-9]|3[0-1])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {

if (code >= 48 && code <= 57) {
// if(exact_value == '' || exact_value.length == 0) {
// document.getElementById(id).value = '0'+''+(code-48);
// return false;
// }

if (parseInt($(element_object).val() + (code - 48)) > 31)
        {
//alert(exact_value+"~"+code+"~"+(code-48));
        document.getElementById(id).value = 31;
                return false;
                }

}
//alert(exact_value+"~"+code+"~"+(code-48));
}
else {
return false;
        }

// if(parseInt(exact_value)>=32) {
// return false;
// }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 16: // Day with single digit (1-31) 
        var patternStr = /^([1-9]|[1-2][0-9]|3[0-1])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code > 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (parseInt($(element_object).val() + (code - 48)) > 31)
        {
//alert(exact_value+"~"+code+"~"+(code-48));
        document.getElementById(id).value = 31;
                return false;
                }

}
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 17: // Month (01-12) 
        var patternStr = /^(0[1-9]|1[0-2])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (parseInt($(element_object).val() + (code - 48)) > 12)
        {
//alert(exact_value+"~"+code+"~"+(code-48));
        document.getElementById(id).value = 12;
                return false;
                }
}
}
else {
return false;
        }
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 18: // Month with single digit(1-12) 
        var patternStr = /^([1-9]|1[0-2])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (parseInt($(element_object).val() + (code - 48)) > 12) {
//alert(exact_value+"~"+code+"~"+(code-48));
document.getElementById(id).value = 12;
        return false;
        }
}
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 19: // Mobile Number 
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (($(element_object).val()).length == 0 || $(element_object).val() == '') {
if (code <= 53) {
return false;
        }
}
}
} else {
return false;
        }
} else {
var patternStr = /^[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/g;
        result = patternStr.test($(element_object).val());
        if (result) {
//var inArray = mobile_number_array.indexOf( parseInt((element_object).val()));
var inArray = $.inArray(parseInt((element_object).val()), mobile_number_array);
        if (inArray >= 0) {
is_validated = 0;
        } else {
is_validated = 1;
        }
} else {
is_validated = 0;
        }
}
break;
        case 20: // Email ID 

        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }

if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 64 || code == 46 || code == 95 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
if (code == 64) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}

} else {
return false;
        }
} else {
var patternStr = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/g;
        result = patternStr.test($(element_object).val());
        if (result) {
//var inArray = email_Array.indexOf( $(element_object).val());
var inArray = $.inArray($(element_object).val(), email_Array);
        if (inArray >= 0) {
is_validated = 0;
        } else {
var first_part = $(element_object).val().split('@');
        if (first_part[0].length < 2) {
is_validated = 0;
        } else {
var middle_part = first_part[1].split(".");
        if (middle_part[0].length < 2) {
is_validated = 0;
        } else {
is_validated = 1;
        }
}
}
} else {
is_validated = 0;
        }
}
break;
        case 21: // PAN CARD 
        var patternStr = /^[a-zA-Z][a-zA-Z][a-zA-Z][pP][a-zA-Z][0-9][0-9][0-9][0-9][a-zA-Z]$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
// if(exact_value.length == 0 || exact_value == '') {
// if(code)
// return false;
// }
if (($(element_object).val()).length >= 5 && ($(element_object).val()).length <= 8 && ((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
return false;
        }
if (($(element_object).val()).length == 9 && (code >= 48 && code <= 57)) {
return false;
        }
if (($(element_object).val()).length == 10) {
return false;
        }
}
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 22: // Numeric with decimal & zero 
        //var patternStr=/^[0-9]*[.]*[0-9]$/g;
        var patternStr = /^[-+]?[0-9]*\.?[0-9]+$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 45 || code == 46 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if ($(element_object).val().indexOf('.') >= 1 && code == 46) {
return false;
        }
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 23: // Numeric with decimal but greater than zero 
        //var patternStr=/^[0-9]*[.]*[0-9]$/g;
        var patternStr = /^[-+]?[1-9]+\.?[0-9]+$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 46 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if ($(element_object).val().indexOf('.') >= 1 && code == 46) {
return false;
        }
if (($(element_object).val() == '' || ($(element_object).val()).length == 0) && (code == 48 || code == 46)) {
return false;
        }
} else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 24:// do not allow forward slash
        if (event.charCode == 92) {
return false;
        }
if (code == 92) {
return false;
        }
break;
        }
return is_validated;
}

function formatValidatorNew(event, element, element_class, name, id, type, minimum_value, maximum_value, minimum_length, maximum_length, exact_value) {
var is_validated = 1;
        var element_object = "";
        // //alert("charcode:"+event.charCode+"__keyCode:"+event.keyCode+" Name is " + navigator.appName + ". Code name is " + navigator.appCodeName+" Browser engine is " + navigator.product+" user Agent:"+navigator.userAgent);
        if (element != "") {
element_object = $(element);
        } else if (element_class != "") {
element_object = $("." + element_class);
        } else if (name != "") {
element_object = $('[name="' + element_class + '"]');
        } else if (id != "") {
element_object = $("#" + id);
        }

//$(element_object).val($.trim($(element_object).val()));
var element_value = $.trim($(element_object).val());
        if (event == "") {
if (element_value == "") {
//////console.log("null error")
return 0;
        } else {
if (minimum_length != "" && (element_value).length < parseInt(minimum_length)) {
////console.log("minimum_length");
return 0;
        }
if (maximum_length != "" && (element_value).length > parseInt(maximum_length)) {
////console.log("maximum_length");
return 0;
        }
if (minimum_value != "") {
var minimum_input_value = $(element_object).val().replace(/\,/g, '');
        if (minimum_input_value.substring(0, 1) == '0'){
minimum_input_value = minimum_input_value.substring(1, minimum_input_value.length);
        }
//console.log("minimum_input_value"+(minimum_input_value));
if (minimum_value != "" && parseInt(minimum_input_value) < parseInt(minimum_value)) {
//console.log("minimum_value error");
return 0;
        }
}
if (maximum_value != "") {
minimum_input_value = $(element_object).val().replace(/\,/g, '');
        if (maximum_value != "" && parseInt(minimum_input_value) > parseInt(maximum_value)) {
// console.log("maximum_value");
return 0;
        }
}
}
}

var code = "";
        if (event != "") {
code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        }
var result = false;
        switch (type) {
case 1: // 1= alphabet only 
        var patternStr = /^[a-zA-Z]+$/g;
        var patternStr2 = /[^a-zA-Z]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
return true;
        } else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 2: // 2= alpha with space in middle..
        var patternStr = /^[a-zA-Z][a-zA-Z. ]*[a-zA-Z]$/g;
        if (event != "") {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
//alert(code);
if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 32 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//                    if (code == 32) {
//                        var chr = String.fromCharCode(code);
//                        var pos = ($(element_object).val()).lastIndexOf(chr);
//                        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
//                            return false;
//                        }
//                    }
//                    if (code == 46) {
//                        var chr = String.fromCharCode(code);
//                        var pos = ($(element_object).val()).lastIndexOf(chr);
//                        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
//                            return false;
//                        }
//                    }
return true;
        } else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 3: // 3= alpha with special characters [!@#$%^&*()-_+=[{]}:;"'|\\\/?,.]
        var patternStr = /^[a-zA-Z][!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z ]*[!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z]$/g;
        if (event != "") {
if (code == 96 || code == 126 || (code >= 48 && code <= 57)) {
return false;
        } else {
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
}
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 4: // 4= numeric without zero 0
        var patternStr = /^[1-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code > 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
return true;
        } else {
return false;
        }
} else {

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 5: // 5= numeric with zero 0

        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40 || event.charCode == 46) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40 || code == 46) {
return true;
        }
else {
return false;
        }
} else {
var patternStr = /^[0-9]+$/g;
        result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}


break;
        case 6: // 6= Numeric with space
        var patternStr = /^[0-9][0-9 ]*[0-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 32 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
} else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 7: // 7= numeric with comma & zero(0)
        var patternStr = /^[0-9][0-9,]*[0-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 44 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code == 44) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
} else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 8: //8 numeric with comma and gereater than 0
        var patternStr = /^[1-9][0-9,]*$/g;
        if (event != "") {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 44 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
if ((($(element_object).val()).length) < 1 && code == 48) {
return false;
        }
if (code == 44) {
var chr = String.fromCharCode(code);
        //console.log("char" + chr)
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }
}
} else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}

break;
        case 9: //9 Alpha Numeric
        var patternStr = /^[a-zA-Z0-9]+$/g;
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
}
else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}

break;
        case 10: // 10 Alpha numeric with space
        var patternStr = /^[a-zA-Z0-9][a-zA-Z0-9 ]*[a-zA-Z0-9]+$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40 || code == 32) {
//...
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}
}
else {
return false;
        }
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 11: // 11 Alpha Numeric with special characters
        var patternStr = /^[!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z0-9]+$/g;
        if (event != "") {
if (code == 96 || code == 126 || code == 32) {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 12: // 12 Alpha Numeric with special characters and space
        var patternStr = /^[a-zA-Z0-9][!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z0-9 ]*[!@#\$%\^&\*\(\)\-_\+=\[\{\]\}:;"'\|\\\/?,.a-zA-Z0-9]+$/g;
        if (event != '') {
if (code == 96 || code == 126) {
return false;
        } else {
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}
}
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        case 13: // Date (dd/mm/yyyy)
        var patternStr = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (event != "") {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 47 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (($(element_object).val()).length >= 10 && ((code >= 48 && code <= 57) || code == 47)) {
return false;
        }
if ((($(element_object).val()).length == 0 || $(element_object).val() == '') && (code >= 48 && code <= 57)) {
if (code >= 48 && code <= 51) {
return true;
        } else {
return false;
        }
}


if (($(element_object).val()).length == 2 && ((code >= 48 && code <= 57))) {
return false;
        }
if (($(element_object).val()).length == 5 && ((code >= 48 && code <= 57))) {
return false;
        }
//dd/mm/yyyy

if (($(element_object).val()).length < 2 && code == 47) {
return false;
        }
if (($(element_object).val()).length >= 3 && ($(element_object).val()).length < 5 && code == 47) {
return false;
        }
if (($(element_object).val()).length >= 6 && code == 47) {
return false;
        }
if (($(element_object).val()).length >= 6 && (code >= 48 && code <= 57)) {

if (($(element_object).val()).length == 6 && (code == 49 || code == 50)) {
//alert(code);
return true;
        } else if (($(element_object).val()).length == 7 && $(element_object).val()[6] == 1 && (code == 56 || code == 57)) {
return true;
        } else if (($(element_object).val()).length == 7 && $(element_object).val()[6] == 2 && (code == 48)) {
return true;
        } else if (($(element_object).val()).length >= 8 && (code >= 48 && code <= 57)) {
return true;
        } else {
return false;
        }
}

if ((($(element_object).val()).length >= 3) && (code >= 48 && code <= 57)) {

if (($(element_object).val()).length == 3) {
if (code >= 48 && code <= 49) {        //alert(exact_value.length+"~~~"+code);
return true;
        } else {
return false;
        }
}
if (($(element_object).val()).length == 4) {
if ($(element_object).val()[3] == 1 && (code >= 48 && code < 51)) {
return true;
        } else if ($(element_object).val()[3] == 0 && (code > 48 && code <= 57)) {
return true;
        } else {
return false;
        }

if (!(code >= 48 && code <= 49)) {
return false;
        }
}

}

if ((($(element_object).val()).length == 1) && (code >= 48 && code <= 57)) {
if (($(element_object).val()[0] == 1 || $(element_object).val()[0] == 2 || $(element_object).val()[0] == 0) && (code >= 48 && code <= 57)) {
return true;
        } else if ($(element_object).val()[0] == 3 && (code >= 48 && code <= 49)) {
return true;
        } else {
return false;
        }
}
}
else {
return false;
        }

} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}


break;
        case 14: // 14 Date (yyyy-mm-dd) 
        // yyyy not less than 1850
        var patternStr = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
//alert(code+"~code~"+exact_value.indexOf('-'));
if ((code >= 48 && code <= 57) || code == 45 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (($(element_object).val()).length >= 10 && ((code >= 48 && code <= 57) || code == 45)) {
return false;
        }
if (($(element_object).val()).length == 4 && ((code >= 48 && code <= 57))) {
return false;
        }

if ((($(element_object).val()).length == 0 || $(element_object).val() == '') && (code == 48 || code >= 51)) {
return false;
        }
if ((($(element_object).val()).length == 1) && (code >= 48 && code <= 57)) {
if ($(element_object).val() == 1 && (code < 56)) {
return false;
        }
if ($(element_object).val() == 2 && (code != 48)) {
return false;
        }

}

if ((($(element_object).val()).length == 5) && (code >= 48 && code <= 57)) {
if (!(code >= 48 && code <= 49)) {
return false;
        }

}

if ((($(element_object).val()).length == 6) && (code >= 48 && code <= 57)) {

if ($(element_object).val()[5] == 1 && (code >= 48 && code < 51)) {
return true;
        } else if ($(element_object).val()[5] == 0 && (code > 48 && code <= 57)) {
return true;
        } else {
return false;
        }

if (!(code >= 48 && code <= 49)) {
return false;
        }
}

if ((($(element_object).val()).length == 8) && (code >= 48 && code <= 57)) {
if (!(code >= 48 && code <= 51)) {
return false;
        }

}

if ((($(element_object).val()).length == 9) && (code >= 48 && code <= 57)) {
if (($(element_object).val()[8] == 1 || $(element_object).val()[8] == 2 || $(element_object).val()[8] == 0) && (code >= 48 && code <= 57)) {
return true;
        } else if ($(element_object).val()[8] == 3 && (code >= 48 && code <= 49)) {
return true;
        } else {
return false;
        }
}

if ((($(element_object).val()).length < 4 || ($(element_object).val()).length == 5 || ($(element_object).val()).length == 6 || ($(element_object).val()).length == 8 || ($(element_object).val()).length == 9) && code == 45) {

return false;
        }
if (($(element_object).val()).length == 7 && ((code >= 48 && code <= 57))) {
return false;
        }

}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 15: // 15 Day (00-31) 
        var patternStr = /^(0[1-9]|[1-2][0-9]|3[0-1])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {

if (code >= 48 && code <= 57) {
// if(exact_value == '' || exact_value.length == 0) {
// document.getElementById(id).value = '0'+''+(code-48);
// return false;
// }

if (parseInt($(element_object).val() + (code - 48)) > 31)
        {
//alert(exact_value+"~"+code+"~"+(code-48));
        document.getElementById(id).value = 31;
                return false;
                }

}
//alert(exact_value+"~"+code+"~"+(code-48));
}
else {
return false;
        }

// if(parseInt(exact_value)>=32) {
// return false;
// }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 16: // Day with single digit (1-31) 
        var patternStr = /^([1-9]|[1-2][0-9]|3[0-1])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code > 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (parseInt($(element_object).val() + (code - 48)) > 31)
        {
//alert(exact_value+"~"+code+"~"+(code-48));
        document.getElementById(id).value = 31;
                return false;
                }

}
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 17: // Month (01-12) 
        var patternStr = /^(0[1-9]|1[0-2])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (parseInt($(element_object).val() + (code - 48)) > 12)
        {
//alert(exact_value+"~"+code+"~"+(code-48));
        document.getElementById(id).value = 12;
                return false;
                }
}
}
else {
return false;
        }
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 18: // Month with single digit(1-12) 
        var patternStr = /^([1-9]|1[0-2])$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (parseInt($(element_object).val() + (code - 48)) > 12) {
//alert(exact_value+"~"+code+"~"+(code-48));
document.getElementById(id).value = 12;
        return false;
        }
}
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 19: // Mobile Number 
        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if (code >= 48 && code <= 57) {
if (($(element_object).val()).length == 0 || $(element_object).val() == '') {
if (code <= 53) {
return false;
        }
}
}
} else {
return false;
        }
} else {
var patternStr = /^[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/g;
        result = patternStr.test($(element_object).val());
        if (result) {
//var inArray = mobile_number_array.indexOf( parseInt((element_object).val()));
var inArray = $.inArray(parseInt((element_object).val()), mobile_number_array);
        if (inArray >= 0) {
is_validated = 0;
        } else {
is_validated = 1;
        }
} else {
is_validated = 0;
        }
}
break;
        case 20: // Email ID 

        if (event != '') {
if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }

if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 64 || code == 46 || code == 95 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
if (code == 64) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}

} else {
return false;
        }
} else {
var patternStr = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/g;
        result = patternStr.test($(element_object).val());
        if (result) {
//var inArray = email_Array.indexOf( $(element_object).val());
var inArray = $.inArray($(element_object).val(), email_Array);
        if (inArray >= 0) {
is_validated = 0;
        } else {
var first_part = $(element_object).val().split('@');
        if (first_part[0].length < 2) {
is_validated = 0;
        } else {
var middle_part = first_part[1].split(".");
        if (middle_part[0].length < 2) {
is_validated = 0;
        } else {
is_validated = 1;
        }
}
}
} else {
is_validated = 0;
        }
}
break;
        case 21: // PAN CARD 
        var patternStr = /^[a-zA-Z][a-zA-Z][a-zA-Z][pP][a-zA-Z][0-9][0-9][0-9][0-9][a-zA-Z]$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
// if(exact_value.length == 0 || exact_value == '') {
// if(code)
// return false;
// }
if (($(element_object).val()).length >= 5 && ($(element_object).val()).length <= 8 && ((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
return false;
        }
if (($(element_object).val()).length == 9 && (code >= 48 && code <= 57)) {
return false;
        }
if (($(element_object).val()).length == 10) {
return false;
        }
}
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 22: // Numeric with decimal & zero 
        //var patternStr=/^[0-9]*[.]*[0-9]$/g;
        var patternStr = /^[-+]?[0-9]*\.?[0-9]+$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 45 || code == 46 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if ($(element_object).val().indexOf('.') >= 1 && code == 46) {
return false;
        }
}
else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 23: // Numeric with decimal but greater than zero 
        //var patternStr=/^[0-9]*[.]*[0-9]$/g;
        var patternStr = /^[-+]?[1-9]+\.?[0-9]+$/g;
        if (event.charCode == 37 || event.charCode == 38 || event.charCode == 39 || event.charCode == 40) {
return false;
        }
if ((code >= 48 && code <= 57) || code == 46 || code == 8 || code == 9 || code == 37 || code == 38 || code == 39 || code == 40) {
//...
if ($(element_object).val().indexOf('.') >= 1 && code == 46) {
return false;
        }
if (($(element_object).val() == '' || ($(element_object).val()).length == 0) && (code == 48 || code == 46)) {
return false;
        }
} else {
return false;
        }

result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
break;
        case 24:// do not allow forward slash
        if (event.charCode == 92) {
return false;
        }
if (code == 92) {
return false;
        }
break;
        case 25: // 25 Alpha Numeric space and limited special characters            
        var patternStr = /^[a-zA-Z0-9 \/\\.,\[\]][a-zA-Z0-9 \\.,\[\]]*$/g;
        if (event != '') {
if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code == 8 || code == 9 || code == 32 || code == 91 || code == 92 || code == 93 || code == 44 || code == 46 || code == 47) {
//...
if (code == 32) {
var chr = String.fromCharCode(code);
        var pos = $(element_object).val().lastIndexOf(chr);
        if ((parseInt(($(element_object).val()).length) - parseInt(pos)) == 1) {
return false;
        }

}
}
else {
return false;
        }
} else {
result = patternStr.test($(element_object).val());
        if (result) {
is_validated = 1;
        } else {
is_validated = 0;
        }
}
break;
        }
return is_validated;
}

function getSlider(quote_element_object, quote_element_object_second) {
var slider_count = 0;
        $slider_array = [];
        $('.awesome-slider').each(function () {
slider_count++;
        $slider_array[slider_count] = $(this).slider({max: parseInt($(this).attr('max')), min: parseInt($(this).attr('min')), value: parseInt($(this).attr('value')), step: parseInt($(this).attr('step')), animate: true, range: 'min', id_type: slider_count, slide: function (event, ui) {
var id_counter = $(this).attr('id').split('_');
        $("#slider_" + id_counter[1] + "_txt").val(NewMoneyFormatInr(ui.value));
        if ($("#slider_" + id_counter[1] + "_txt").hasClass('notnull') || $("#slider_" + id_counter[1] + "_txt").hasClass('error')) {
if (ui.value > 0) {
FirstPageErrorHandler.removeErrorIndicator($("#slider_" + id_counter[1] + "_txt"));
        $("#slider_" + id_counter[1] + "_txt").removeClass('error');
        } else {
FirstPageErrorHandler.addErrorIndicator($("#slider_" + id_counter[1] + "_txt"), 'Missing field');
        $("#slider_" + id_counter[1] + "_txt").addClass('error');
        }
}
if ($(this).attr('show_optin')) {
showOptin(ui.value);
        }
$("#slider_" + id_counter[1] + "_inword").html(digitToWordConvertor(ui.value));
        $("#slider_" + id_counter[1] + "_inword").show();
}}).draggable();
        $slider_array[slider_count].slider("pips", {rest: "label", prefix: "Rs."}).slider("float").draggable();
        $(document).on('keyup', "#slider_" + slider_count + '_txt', function (event) {
var attribute_value = $(quote_element_object).attr($(this).attr('name'));
        if (typeof attribute_value !== typeof undefined && attribute_value !== false) {
changeSliderValue(event, $(this), quote_element_object);
        } else {
changeSliderValue(event, $(this), quote_element_object_second);
        }
$(this).val(NewMoneyFormatInr($(this).val()));
        var id_array = ($(this).attr('id')).split('_');
        var slider_number = id_array[1];
        if ($(this).val() != 0) {
$("#slider_" + slider_number + "_inword").html(digitToWordConvertor(unformatMoney($(this).val())));
        $("#slider_" + slider_number + "_inword").show();
        } else {
$("#slider_" + slider_number + "_inword").html();
        $("#slider_" + slider_number + "_inword").hide();
        }
});
        });
}

function closeLightbox() {
$("#html-content").html("");
        $("#fade-body").removeClass('display-block');
        $("#fade-body").addClass('display-none');
        $("#light-box").removeClass('display-block');
        $("#light-box").addClass('display-none');
}

Element = {
getPosition: function (object) {
return $(object).parent().position();
        }
}
/* NEW FUNCTION */
function digitToWordConvertor(junkVal) {
junkVal = Math.floor(junkVal);
        var obStr = new String(junkVal);
        numReversed = obStr.split("");
        actnumber = numReversed.reverse();
        if (Number(junkVal) >= 0) {
//do nothing
}
else {
////alert('wrong Number cannot be converted');
return false;
        }
if (Number(junkVal) == 0) {
return '';
        //return false;
        }

if (actnumber.length > 11) {
//alert('Oops!!!! the Number is too big to covert');
return false;
        }

var iWords = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
        var ePlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
        var tensPlace = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];
        var iWordsLength = numReversed.length;
        var totalWords = "";
        var inWords = new Array();
        var finalWord = "";
        j = 0;
        for (i = 0; i < iWordsLength; i++) {
switch (i)
        {
        case 0:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
        inWords[j] = '';
                }
        else {
        inWords[j] = iWords[actnumber[i]];
                }
        inWords[j] = inWords[j] + ' Only';
                break;
                case 1:
                tens_complication();
                break;
                case 2:
                if (actnumber[i] == 0) {
        inWords[j] = '';
                }
        else if (actnumber[i - 1] != 0 && actnumber[i - 2] != 0) {
        inWords[j] = iWords[actnumber[i]] + ' Hundred and';
                }
        else {
        inWords[j] = iWords[actnumber[i]] + ' Hundred';
                }
        break;
                case 3:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
        inWords[j] = '';
                }
        else {
        inWords[j] = iWords[actnumber[i]];
                }
        if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
        inWords[j] = inWords[j] + " Thousand";
                }
        break;
                case 4:
                tens_complication();
                break;
                case 5:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
        inWords[j] = '';
                }
        else {
        inWords[j] = iWords[actnumber[i]];
                }
        if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
        inWords[j] = inWords[j] + " lac";
                }
        break;
                case 6:
                tens_complication();
                break;
                case 7:
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
        inWords[j] = '';
                }
        else {
        inWords[j] = iWords[actnumber[i]];
                }
        if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
        inWords[j] = inWords[j] + " crore";
                }
        break;
                case 8:
                tens_complication();
                break;
                case 9 :
                if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
        inWords[j] = '';
                }
        else {
        inWords[j] = iWords[actnumber[i]];
                }
        inWords[j] = inWords[j] + " billion";
                break;
                case 10:
                tens_complication();
                break;
                default:
                break;
                }
j++;
        }

function tens_complication() {
if (actnumber[i] == 0) {
inWords[j] = '';
        }
else if (actnumber[i] == 1) {
inWords[j] = ePlace[actnumber[i - 1]];
        }
else {
inWords[j] = tensPlace[actnumber[i]];
        }
}
inWords.reverse();
        for (i = 0; i < inWords.length; i++) {
finalWord += inWords[i];
        }
finalWord = finalWord.toLowerCase();
        finalWord = $.trim(finalWord);
        finalWord = (finalWord.substring(0, 1).toUpperCase() + finalWord.substring(1, finalWord.length))
        return RUPEE + " " + finalWord;
}

function showTab(id, pos) {
var idValue = Array('description2', 'usage2', 'download2','review_tab');
        for (var i = 0; i < idValue.length; i++) {
var j = i + 1;
        if (idValue[i] == id) {
$('#' + idValue[i]).css("display", "block");
        $('ul.menu li:nth-child(' + (i + 1) + ')').addClass('active');
        } else {
$('#' + idValue[i]).css("display", "none");
        $('ul.menu li:nth-child(' + j + ')').removeClass('active');
        }
}

}

function showOptin(monthlySalary) {
var result = "";
        var dob = "";
        var employmentTypeId = "";
        var cityId = "";
        monthlySalary = monthlySalary || $("input[name='monthly_income']").val();
        monthlySalary = unformatMoney(monthlySalary);
        if ($("#other_city").hasClass('hide')) {
$("input[name='city_name'],input[name='city_id']").each(function () {
if ($(this).parent().hasClass('selected'))
        cityId = $(this).attr('key-value');
        });
        } else {
cityId = $("#city,#other_city_id").val()
        }

$("input[name='employment_type_id']").each(function () {
if ($(this).parent().hasClass('selected')) {
employmentTypeId = $(this).attr('key-value');
        }
});
        if (employmentTypeId != "" && employmentTypeId == 2) {
monthlySalary = Math.round(monthlySalary / 12);
        }
if ($('#day_of_birth').val() != "" && $('#month_of_birth').val() != "" && $('#year_of_birth').val() != "") {
dob = $('#month_of_birth').val() + "-" + $('#day_of_birth').val() + "-" + $('#year_of_birth').val();
        }

if (monthlySalary < pincode_display_limit) {
$("#pin_code_div").addClass('hide');
        } else {
$("#pin_code_div").removeClass('hide');
        }
result = showOptinResult(monthlySalary, dob, cityId);
        $.each(result, function (key, value) {
        if (value.display == "block") {
        $("#optin_" + key).removeClass('hide');
                $("#optin_line_" + key).html(value.line)
        } else {
        $("#optin_" + key).addClass('hide');
                $("#optin_line_" + key).html('');
        }
        });
}

function convert_roman(e) {
e = parseInt(e);
        var a = new Array("1000000", "900000", "500000", "400000", "100000", "90000", "50000", "40000", "10000", "9000", "5000", "4000", "1000", "900", "500", "400", "100", "90", "50", "40", "10", "9", "5", "4", "1"), t = new Array("<span style='text-decoration: overline'>M</span>", "<span style='text-decoration: overline'>CM</span>", "<span style='text-decoration: overline'>D</span>", "<span style='text-decoration: overline'>CD</span>", "<span style='text-decoration: overline'>C</span>", "<span style='text-decoration: overline'>XC</span>", "<span style='text-decoration: overline'>L</span>", "<span style='text-decoration: overline'>XL</span>", "<span style='text-decoration: overline'>X</span>", "<span style='text-decoration: overline'>IX</span>", "<span style='text-decoration: overline'>V</span>", "<span style='text-decoration: overline'>IV</span>", "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I");
        if (!(e > 3999999 || 1 > e)) {
for (var r = "", n = e; n > 0; ) {
var i;
        for (i = 0; i < a.length; i++)
        if (n >= a[i]) {
r += t[i], n -= a[i];
        break
        }
}
return r
        }
}


function saveClickRecord(sRedirectURL, CompanyName, BannerName, productCategorySubId, clickScrollId, flag) {
var urlN = document.location;
        var data = 'step=save_click_record&link=' + sRedirectURL + '&mainUrl=' + urlN + '&CompanyName=' + CompanyName + '&BannerName=' + BannerName + '&productCategorySubId=' + productCategorySubId +
        '&clickScrollId=' + clickScrollId;
        $.ajax({
        type: "POST",
                url: "/common-request",
                dataType: 'json',
                data: data,
                success: function (response) {
                if (response.status == 'success') {
                //console.log(response.status);
                }
                }
        });
        if (flag != undefined) {
window.location.href = sRedirectURL;
        } else {
window.open(sRedirectURL);
        }
}

calculateEmi = function (loan_amount, rate_of_interest, time_duration) {
    
if (loan_amount == "" || loan_amount == 0 || rate_of_interest == "" || rate_of_interest == 0 || time_duration == "" || time_duration == 0) {
return "-";
        }
var rate_of_interest_monthly = rate_of_interest / 12 / 100;
        var emi_val = loan_amount * rate_of_interest_monthly * ((Math.pow((1 + rate_of_interest_monthly), time_duration)) / (Math.pow((1 + rate_of_interest_monthly), time_duration) - 1))
        return parseInt(emi_val);
}

calculatetotalalAmount = function (loan_amount, rate_of_interest, time_duration) {
	if (loan_amount == "" || loan_amount == 0 || rate_of_interest == "" || rate_of_interest == 0 || time_duration == "" || time_duration == 0) {
	return "-";
	        }
	var rate_of_interest_monthly = rate_of_interest / 12 / 100;
	var emi_val = loan_amount * rate_of_interest_monthly * ((Math.pow((1 + rate_of_interest_monthly), time_duration)) / (Math.pow((1 + rate_of_interest_monthly), time_duration) - 1))
	var totalamt = parseInt(emi_val) * (time_duration);
	return parseInt(totalamt);
}

calculateFDMaturityAmount = function (deposit_amount, rate_of_interest, time_duration, tenure_type) {

if (deposit_amount == "" || deposit_amount == 0 || rate_of_interest == "" || rate_of_interest == 0 || time_duration == "" || time_duration == 0) {
//return "0";
}
// FD calculation formula
// A = P × (1 + r/n)nt
// Where: 
// A = final amount 
// P = deposit amount (initial investment) 
// r = annual nominal interest rate 
// t = number of years 
// n = number of compounding periods per year (for example, 12 for monthly compounding)
var n = 4;
        var tenure = 0;
        //console.log(time_duration+'~~time_duration');
        /*if (tenure_type == 'months') {
         tenure = parseInt(time_duration * 30);
         } else if (tenure_type == 'years') {
         tenure = parseInt(time_duration * 365);
         }*/
        tenure = parseFloat(time_duration / 12);
        var maturity_amount = parseInt(deposit_amount * Math.pow((1 + parseFloat(rate_of_interest / (n * 100))), (n * tenure)));
        //console.log(deposit_amount + '~tenure~' + tenure + '~tenure~' + rate_of_interest + '~rate_of_interest' + maturity_amount + '~maturity_amount');

        return parseFloat(maturity_amount);
}

calculateRDMaturityAmount = function (deposit_amount, rate_of_interest, time_duration, tenure_type) {
//console.log(tenure_type);
if (deposit_amount == "" || deposit_amount == 0 || rate_of_interest == "" || rate_of_interest == 0 || time_duration == "" || time_duration == 0) {
//return "0";
}
var tenure = 0;
        /*if (tenure_type == 'months') {
         tenure = time_duration;
         } else if (tenure_type == 'years') {
         tenure = parseInt(time_duration) * 12;
         }*/
        tenure = time_duration;
        //console.log(tenure+'~~'+time_duration);
        rate_of_interest = parseFloat(rate_of_interest / 100);
        /*
         * Formula
         A = P * (1 + (r/n))^(nt)
         
         Where,
         A = final amount
         P = principal amount (initial investment)
         r = annual nominal interest rate (as a decimal, not in percentage)
         n = number of times the interest is compounded per year
         t = number of years
         */
        var n = 4;
        var r = rate_of_interest;
        var p = deposit_amount;
        var month_in_year = 0;
        var maturity_amount = 0;
        var nt = 0;
        var one_plus_r_by_n = 0;
        one_plus_r_by_n = parseFloat(1 + (r / n));
        for (var i = tenure; i > 0; i--) {
month_in_year = parseFloat(i / 12);
        nt = n * month_in_year;
        maturity_amount += parseFloat(p * Math.pow(one_plus_r_by_n, nt));
        }
return parseInt(Math.ceil(maturity_amount));
}

function calculateLoanAmountByEmi(emi, interest_rate, time_duration) {
if (emi == "" || emi == 0 || emi == "" || interest_rate == 0 || time_duration == "" || time_duration == 0) {
return "-";
        }
loan_amount = ((emi * (Math.pow(1 + (interest_rate / (12 * 100)), time_duration) - 1)) / (Math.pow(1 + (interest_rate / (12 * 100)), time_duration) * (interest_rate / (12 * 100))));
        return parseInt(loan_amount);
}

getCalculatorSlider = function () {
var slider_count = 0;
        $slider_array = [];
        $('.awesome-slider').each(function () {
        var max_value = parseInt($(this).attr('max'));
        var min_value = parseInt($(this).attr('min'));
        var value = $(this).attr('value');
        var step = parseFloat($(this).attr('step'));
        var prefix = $(this).attr('prefix');
        var suffix = $(this).attr('suffix');
        slider_count++;
        $slider_array[slider_count] = $(this).slider({max: max_value, min: min_value, value: value, step: step, animate: true, range: 'min', id_type: slider_count,
        slide: function (event, ui) {
        var id_counter = $(this).attr('id').split('_');
                var prefix_symbol = "";
                if (prefix != "") {
        prefix_symbol = RUPEE;
        }
        if (id_counter[1] == 1 || id_counter[1] == 4) {
        $(".slider_" + id_counter[1] + "_span").html(prefix_symbol + ' ' + NewMoneyFormatInr(ui.value) + ' ' + $(this).attr('suffix'));
                $(".slider_" + id_counter[1] + "_txt").val(' ' + NewMoneyFormatInr(ui.value));
        } else {
        $(".slider_" + id_counter[1] + "_span").html(prefix_symbol + ' ' + (ui.value) + ' ' + $(this).attr('suffix'));
                $(".slider_" + id_counter[1] + "_txt").val(' ' + NewMoneyFormatInr(ui.value));
        }
        if ($("#slider_" + id_counter[1] + "_txt").hasClass('notnull') || $("#slider_" + id_counter[1] + "_txt").hasClass('error')) {
        if (ui.value > 0) {
        $("#slider_" + id_counter[1] + "_txt").removeClass('error');
        } else {
        $("#slider_" + id_counter[1] + "_txt").addClass('error');
        }
        }
        calculateData();
        },
        change: function () {
        if (typeof saveEMIResult == 'function') {   //console.log('sssss');
        setTimeout(function () {
        saveEMIResult();
        }, 800);
        }
        }
}).draggable();
        $slider_array[slider_count].slider("pips", {rest: "label", prefix: prefix, suffix: suffix}).slider("float").draggable();
        $(document).on('keypress', ".slider_" + slider_count + '_txt', function (event) {
return formatValidatorNew(event, $(this), '', '', '', 22, '', '', '', '10', '');
        });
        $(document).on('keyup', ".slider_" + slider_count + '_txt', function (event) {

var patt1 = /[^0-9,.]/g;
        var result = ($(this).val()).replace(patt1, '');
        if (result == '') {
result = 0;
        }
$(this).val(result);
        //console.log(result);
        //$(this).val($(this).val().replace(/^0-9,/,''));
        if (typeof changeSliderValue == 'function') {
return  $(this).changeSliderValue(event);
        }
});
        $(document).on('blur', ".slider_" + slider_count + '_txt', function (event) {
var patt1 = /[^0-9,.]/g;
        var result = ($(this).val()).replace(patt1, '');
        if (result == '' || result.length == 0) {
result = 0;
        }
$(this).val(result);
        //console.log(result);
        //$(this).val($(this).val().replace(/^0-9,/,''));
        if (typeof changeSliderValue == 'function') {
return  $(this).changeSliderValue(event);
        }
});
        });
}
getRelativeSlider = function (slider_id, slider_max_value, attribute_id) {
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
logout = function () {
showLoader('loading', 'display-block');
        $.post("/common-request", "&step=logout", "", "json")
        .done(function (response) {
        showLoader('loading', 'display-none')
                if (response.status == "success") {
        window.location.reload();
        }
        });
}
/* code for my account start*/
$.fn.extend({
//FOR COUPON CODE
saveCouponCompanyInformation: function () {
if ($(this).data("url") != undefined && $(this).data("url") != "") {

window.open($(this).data("url"), '_blank');
        }
var data_object = {coupon_company_code: $(this).data("id"), step: 'send_coupon_company_flag', message: $("#coupon_message" + $(this).data("id")).text(), quote_id: $(this).data("quote_id"), product: $(this).data("product")};
        //win.focus();
        $.ajax({
        type: "POST",
                url: "/common-request",
                data: data_object,
                dataType: 'json',
                success: function (response) {
                if (response.status == "success") {

                } else {

                }
                }
        });
        },
        openPopup: function (pop_up_id) {
        var loginBox = $("#" + pop_up_id);
                $(loginBox).fadeIn(300);
                $(loginBox).css({
        'margin-top': - (($(loginBox).height() + 24) / 2),
                'margin-left': - ($(loginBox).width() + 24) / 2
        });
                $('body').append('<div id="mask"></div>');
                $('#mask').fadeIn(300);
                return false;
        },
        myaccount_validate: function (event) {
        var is_active = true;
                $this = $(this);
                if (event != '' && event != undefined) {
        if ($(this).hasClass("ma_numeric")) {
        return $this.numericValidate(event);
        } else {
        return $this.mobileValidate(event);
        }
        } else {
        var is_mobile_active = $this.mobileValidate();
                if (is_mobile_active == false) {
        is_active = false;
        }
        }
        return is_active;
        },
        numericValidate: function (event) {
        if (event != '' && event != undefined) {
        status = formatValidatorNew(event, $(this), '', '', '', 5, '', '', '', '', '');
                return status;
        }
        },
        mobileValidate: function (event) {
        var is_active = 1;
                if (event != '' && event != undefined) {
        return formatValidatorNew(event, $(this), '', '', '', 19, '', '', '', '', '');
        } else {
        is_active = formatValidatorNew('', $(this), '', '', '', 19, '', '', 10, 10, '');
                if (is_active == 0) {
        $(this).addClass('error');
                if($('.msg-div-alert').length > 0){   
                    $('.msg-div-alert').each(function(){
                        if(!$(this).hasClass('hide')){
                            $(this).removeClass('valid_div');
                            $(this).addClass('valid_div_eror');
                        }
                    });                    
                }
                return false;
        } else {
        $(this).removeClass('error');
                if($('.msg-div-alert').length > 0){   
                    $('.msg-div-alert').each(function(){
                        if(!$(this).hasClass('hide')){
                            $(this).removeClass('valid_div_eror');
                            $(this).addClass('valid_div');
                        }
                    });                    
                }
                return true;
        }
        }
        },
        sendPassword: function () {
        if (!is_login_process) {
        is_login_process = true;
                var $otp_element = $(this);
                $object = $(this);
                $mobile = $('.ma_mobile');
                var mobile_validate = $mobile.mobileValidate();
                if (mobile_validate == 1) {
        var data_object = {mobile_number: $mobile.val(), step: 'send_password'};
                showLoader('loading', 'display-block');
                $.post("/my-account", data_object, '', 'json')
                .done(function (response) {
                is_login_process = false;
                        showLoader('loading', 'display-none');
                        if (response.status == 'success') {
                if (response.message == 'OTP_VERIFIED') {
                $('#cust_identity').html(response.html);
                } else {
                if (!$otp_element.hasClass('resendsms')) {
                $(".custid_signin").children('li:first-child').after(response.html);
                        $object.parents('li').remove();
                } else {
                //$(".my_account_status_success").text("").show("slow");
                }
                $mobile.prop('readonly', true).prop('disabled', true);
                }
                } else {
                return false;
                }
                });
        } else {
        is_login_process = false;
        }
        }
        },
        validateOtpProcess: function () {
        var data_object = {otp_code: $('#txtCustomerSMScode').val(), step: 'validate_otp'};
                showLoader('loading', 'display-block');
                $.post("/my-account", data_object, '', 'json')
                .done(function (response) {
                all_request = 0;
                        showLoader('loading', 'display-none');
                        if (response.status == 'success') {
                window.location.href = "/my-account/";
                        $('#main_content').html(response.html);
                        $('ul.namelist').css('visibility', 'visible');
                } else {
                $(".my_account_status_error").text(response.message).show("slow");
                        $("#txtCustomerSMScode").addClass("error");
                }
                });
        },
        changeNumber: function () {
        $mobile = $('.ma_mobile');
                $mobile.prop('readonly', false).prop('disabled', false).val('').focus();
                $(this).parent('span').remove();
                $('.retrieve_quote').removeClass('validate_otp').addClass('send_password').val('SMS Password');
                $('#divSMSCode').remove();
        }
});
        /* code for my account end*/

//FUNCTION TO GET POPUP ON QUOTES PAGE
        quoteWaitPopUp = function () {

        if ($(document).find('div').hasClass('proceed') && $('#quote_wait_popup').length) {

        setTimeout(function () {
        $(this).openPopup("quote_wait_popup");
        }, 30000);
        }

        }

//FUNCTION TO SAVE POPUP ON QUOTES PAGE DETAIL IN TABLE
saveQuoteWaitStatus = function (status, banner_name, product_action) {
var product_id = $(".cross").data("value");
        var data = {step: 'save_quote_wait_status', product_id: product_id, status: status, banner_name: banner_name, product_action: product_action};
        $.ajax({
        url: "/common-request",
                dataType: "json",
                data: data,
                success: function (returnObj) {
                $('#mask , #quote_wait_popup').fadeOut(300, function () {
                $('#mask').remove();
                });
                }
        })
}

//function to switch to gold loan from any CJ
function switchToGoldLoan(product_id, quote_id, lead_id, switch_is_interested) {
var loan_type_id = '';
        if ($('.gold_loan_type:checked').length == 0) {
$(".thanx-question").addClass("error");
        return false;
        } else {
$(".thanx-question").removeClass("error");
        loan_type_id = $('.gold_loan_type:checkbox:checked').map(function () {
return this.value;
        }).get();
        }

var validator_status = 0;
        var gold_weight = $.trim($("#gold_weight").val());
        if (gold_weight != "" && gold_weight > 0 && gold_weight <= 999 && !isNaN(gold_weight)) {
validator_status = 1;
        }
//alert(validator_status);
//var validator_status = formatValidatorNew('', $("#gold_weight"), '', '', '', 23, 0, 9999, "", '', '');
if (validator_status == 1 || validator_status == true) {
$("#gold_weight").closest('.mRight').find('.thanx-question').removeAttr('style');
        } else {
$("#gold_weight").closest('.mRight').find('.thanx-question').css("color", "red")
        return false;
        }

//Save Pincode for gl journey,23112015
var validate_resonse = 0;
        var gold_pincode = $.trim($("#gold_pincode").val());
        var gold_pincode_length = gold_pincode.length;
        if (gold_pincode != "" && gold_pincode > 0 && gold_pincode_length == 6) {
validate_resonse = 1;
        }
if (validate_resonse == 1) {
$("#gold_pincode").closest('.mRight').find('.thanx-question').removeAttr('style');
        } else {
$("#gold_pincode").closest('.mRight').find('.thanx-question').css("color", "red")
        return false;
        }
//End


showLoader('loading', 'display-block');
        var data = {step: 'switch_to_gold_loan', product_id: product_id, quote_id: quote_id, lead_id: lead_id, mode: 'switch_to_gold_loan', switch_is_interested: switch_is_interested, loan_type_id: loan_type_id, gold_weight: $.trim($("#gold_weight").val()), pincode: $.trim($("#gold_pincode").val())};
        $.post("/gold-loan", data, '', 'json')
        .done(function (response) {
        showLoader('loading', 'display-none');
                if (switch_is_interested == 1 && response.redirect_url != undefined) {
        window.location = response.redirect_url;
        } else {
        noLoanResponseMessage();
                $('.proceed_to_gl_step').remove();
        }

        console.log(response);
                return false;
        });
}


function switchToGoldLoanOld(product_id, quote_id, lead_id) {
//personal_information
//switch_to_gold_loan
showLoader('loading', 'display-block');
        var data = {step: 'switch_to_gold_loan', product_id: product_id, quote_id: quote_id, lead_id: lead_id, mode: 'switch_to_gold_loan'};
        //alert(data);
        $.post("/gold-loan", data, '', 'json')
        .done(function (response) {
        if (response.status == 'success') {
        // alert('+++success');
        // console.log(response);
        autolistener = 0;
                $("#main_content").hide(100, function () {
        $("#main_content").html(response.html);
                //getSliderForAmountAndTenure();
                $("#main_content").show(100);
                showLoader('loading', 'display-none');
                $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 100);
        });
        } else if (response.redirect_url != undefined) {
        //console.log(response.redirect_url+'++++>');
        window.location = response.redirect_url;
        }
        });
}

var ExcelFormulas = {
PVIF: function (rate, nper) {
return Math.pow(1 + rate, nper);
        },
        FVIFA: function (rate, nper) {
        return rate == 0 ? nper : (this.PVIF(rate, nper) - 1) / rate;
        },
        PMT: function (rate, nper, pv, fv, type) {
        if (!fv)
                fv = 0;
                if (!type)
                type = 0;
                if (rate == 0)
                return - (pv + fv) / nper;
                var pvif = Math.pow(1 + rate, nper);
                var pmt = rate / (pvif - 1) * - (pv * pvif + fv);
                if (type == 1) {
        pmt /= (1 + rate);
        }
        ;
                return pmt;
        },
        IPMT: function (pv, pmt, rate, per) {
        var tmp = Math.pow(1 + rate, per);
                return 0 - (pv * tmp * rate + pmt * (tmp - 1));
        },
        PPMT: function (rate, per, nper, pv, fv, type) {
        if (per < 1 || (per >= nper + 1))
                return null;
                var pmt = this.PMT(rate, nper, pv, fv, type);
                var ipmt = this.IPMT(pv, pmt, rate, per - 1);
                return pmt - ipmt;
        },
        DaysBetween: function (date1, date2) {
        var oneDay = 24 * 60 * 60 * 1000;
                return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
        },
        // Change Date and Flow to date and value fields you use
        XNPV: function (rate, values) {
        var xnpv = 0.0;
                var firstDate = new Date(values[0].Date);
                for (var key in values) {
        var tmp = values[key];
                var value = tmp.Flow;
                var date = new Date(tmp.Date);
                xnpv += value / Math.pow(1 + rate, this.DaysBetween(firstDate, date) / 365);
        }
        ;
                return xnpv;
        },
        XIRR: function (values, guess) {
        if (!guess)
                guess = 0.1;
                var x1 = 0.0;
                var x2 = guess;
                var f1 = this.XNPV(x1, values);
                var f2 = this.XNPV(x2, values);
                for (var i = 0; i < 100; i++) {
        if ((f1 * f2) < 0.0)
                break;
                if (Math.abs(f1) < Math.abs(f2)) {
        f1 = this.XNPV(x1 += 1.6 * (x1 - x2), values);
        }
        else {
        f2 = this.XNPV(x2 += 1.6 * (x2 - x1), values);
        }
        }
        ;
                if ((f1 * f2) > 0.0)
                return null;
                var f = this.XNPV(x1, values);
                if (f < 0.0) {
        var rtb = x1;
                var dx = x2 - x1;
        }
        else {
        var rtb = x2;
                var dx = x1 - x2;
        }

        for (var i = 0; i < 100; i++) {
        dx *= 0.5;
                var x_mid = rtb + dx;
                var f_mid = this.XNPV(x_mid, values);
                if (f_mid <= 0.0)
                rtb = x_mid;
                if ((Math.abs(f_mid) < 1.0e-6) || (Math.abs(dx) < 1.0e-6))
                return x_mid;
        }
        ;
                return null;
        }

};
        function presentValue(rate, periods, payment, future, type) {
        // Initialize type
        var type = (typeof type === 'undefined') ? 0 : type;
                // Evaluate rate and periods (TODO: replace with secure expression evaluator)
                rate = eval(rate);
                periods = eval(periods);
                // Return present value
                if (rate === 0) {
        return - payment * periods - future;
        } else {
        return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
        }
        }

function numDifferentiation(val) {
var response = val;
        if (val >= 10000000) {
caption = " cr";
        response = (val / 10000000).toFixed(2) + caption;
        } else if (val >= 100000) {
caption = " lacs";
        if (val == 100000) {
caption = " lac";
        }
response = (val / 100000).toFixed(2) + caption;
        }
//else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';
return response;
}
function getCreditCardDetail(bank_id, element_id) {
var data = 'step=get_credit_card_detail&bank_id=' + bank_id;
        $.ajax({
        type: "POST",
                url: "/common-request",
                dataType: 'json',
                data: data,
                success: function (response) {
                if (response.status == 'success') {
                $("#" + element_id).empty().append(response.html);
                } else {
                $("#" + element_id).empty().append('<option value = "">Select Credit Card</option>');
                }
                }
        });
}


function switchToOtherJourney(object) {
var product_id = $(object).attr('product_id');
        var quote_id = $(object).attr('quote_id');
        var lead_id = $(object).attr('lead_id');
        var step = $(object).attr('step');
        var controller = $(object).attr('controller');
        if (product_id == '' || product_id == 0 || quote_id == '' || quote_id == 0 || lead_id == '' || lead_id == 0) {
alert('Sorry! some error occurred');
        return;
        } else {
showLoader('loading', 'display-block');
        var data = {step: step, product_id: product_id, quote_id: quote_id, lead_id: lead_id, mode: step};
        $.post("/" + controller, data, '', 'json')
        .done(function (response) {
        if (response.status == 'success') {
        // alert('+++success');
        // console.log(response);
        autolistener = 0;
                $("#main_content").hide(100, function () {
        $("#main_content").html(response.html);
                //getSliderForAmountAndTenure();
                $("#main_content").show(100);
                showLoader('loading', 'display-none');
                $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 100);
        });
        } else if (response.redirect_url != undefined) {
        window.location = response.redirect_url;
        }
        });
        }
}


function switchToOtherJourneyOld(product_id, quote_id, lead_id, step, controller) {
showLoader('loading', 'display-block');
        var data = {step: step, product_id: product_id, quote_id: quote_id, lead_id: lead_id, mode: step};
        $.post("/" + controller, data, '', 'json')
        .done(function (response) {
        if (response.status == 'success') {
        // alert('+++success');
        // console.log(response);
        autolistener = 0;
                $("#main_content").hide(100, function () {
        $("#main_content").html(response.html);
                //getSliderForAmountAndTenure();
                $("#main_content").show(100);
                showLoader('loading', 'display-none');
                $('body,html').animate({scrollTop: $("#wrapper").children('.top').css('height')}, 100);
        });
        } else if (response.redirect_url != undefined) {
        //console.log(response.redirect_url+'++++>');
        window.location = response.redirect_url;
        }
        });
}

clickToCall = function () {
$("#click_to_call").removeClass('hide');
        $("#blckshow").removeClass('hide');
        showLoader('clicktocall_loader', 'display-block');
}
closeClickTocall = function () {
$("#click_to_call").addClass('hide');
        $("#blckshow").addClass('hide');
}

/* CODE START FOR COMPARE POP UP */
$(function () {
//compare check
var total_checked = 0;
        $('body').on('click', '.compare-check', function(){
total_checked = getTotalCheckedBox(this, total_checked);
        if (total_checked > 0 && total_checked <= 4){
$('#compare-container').slideDown();
        }
checkCompareBtn(total_checked);
        });
        $('body').on('click', '.close', function(){//alert('working');
var card = $(this).attr('card');
        $(this).parent().parent().remove();
        total_checked -= 1;
        if (total_checked == 3){
$('.compare-check').removeAttr('disabled');
        }
uncheckCheckedBox(card);
        if (total_checked == 0){
$('#compare-container').slideUp();
        }
checkCompareBtn(total_checked);
        });
        $('body').on('click', '#compare-btn a', function(){
if (total_checked > 1){
var url = "/common-request";
        var cards = Object();
        $("#compare-container-inner").children().each(function(index, element){
$(cards).attr('product_' + (index + 1), $(element).attr('card'));
        });
        $(cards).attr('kot-val', $('#compare-container').attr('kot-val'));
        $(cards).attr('prod', $('#compare-container').attr('prod'));
    if ($('#compare-container[income]').length>0) {
        $(cards).attr('income', $('#compare-container').attr('income'));
    }
        $(cards).attr('step', 'compare');
        //console.log(cards);
        var result = sendRequest(url, cards);
        //console.log(result);
        if (result.res === true){
showLoader('loading', 'display-none');
        $(".compare-popup").removeClass('display-none');
        $(".compare-popup").html(result.html);
        resizePopup();
        } else{
showLoader('loading', 'display-none');
        $(".compare-popup").html(result.html);
        resizePopup();
        }
}
});
        //close compare dialog
        $(document).on('click', '.compare-box-close', function () {
$(".compare-popup").html('');
        $(".compare-popup").addClass('display-none');
        $(".overlay").fadeOut("fast");
        });
});
        checkCompareBtn = function(total_checked){
        if (total_checked > 1 && total_checked <= 4){
        $('#compare-btn').css('opacity', '1');
                $('#compare-btn a').attr('disabled', false);
        } else{
        $('#compare-btn').css('opacity', '0.1');
                $('#compare-btn a').attr('disabled', true);
                $('#compare-btn a').css('text-decoration', 'none');
                $('#compare-btn a').hover(function(){
        $(this).css('text-decoration', 'none');
        });
                $('#compare-btn a').click(function(e){
        e.preventDefault();
        });
        }
        }

uncheckCheckedBox = function(card){
$('input:checked').each(function(index, element){
if ($(element).is(':checked')){
if ($(element).attr('data-val') == card){
$(element).prop('checked', false);
        }
}
});
}

getTotalCheckedBox = function(curElement, currentVal){
var checked_element = currentVal;
        var html = "";
        //console.log(checked_element);
        var element = curElement;
        var direction = $(element).attr('dir'); //getting the checkbox position
        if ($(element).is(':checked')){
if (checked_element < 4){
checked_element += 1;
        var checkboxObj = $(element);
        var checkboxObjVal = $(checkboxObj).val();
        var productArr = checkboxObjVal.split('|');
        var card = $(element).attr('data-val');
        if (direction === 'left'){
parentElement = $(element).parent().parent();
        $(parentElement).find('.compare-check').prop('checked', true);
        } else if (direction === 'right'){
parentElement = $(element).parent().parent().parent().parent();
        $(parentElement).find('.compare-check').prop('checked', true);
        }

if ($.trim(productArr[1]) != ""){
html += '<div card="' + card + '" class="' + card + ' compare-bar-card-main"><div class="compare-bar-card-img-block"><a card="' + card + '" class="close compare-bar-card-close" href="javascript:void(0)"><img src="/components/images/close-icon.png" alt="close icon" title="remove" width="23" /></a><img width="75" src="' + productArr[1] + '" /></div><div class="compare-bar-card-name-main"><div class="compare-bar-card-name-text ora-col">' + productArr[0] + '</div></div>';
        $('#compare-container-inner').append(html);
        }


//console.log(checkboxObj);
if (checked_element == 4){
$('.compare-check').each(function(chkIndex, chkElement){
if ($(chkElement).is(':checked') == false){
$(chkElement).attr('disabled', 'disabled');
        }
});
        }
}
} else if ($(element).is(':checked') == false){
if (checked_element >= 1 && checked_element <= 4){
var card = $(curElement).attr('data-val');
        $('.' + card).remove();
        checked_element -= 1;
        if (direction === 'left'){
var parentElement = $(element).parent().parent();
        $(parentElement).find('.compare-check').prop('checked', false);
        } else if (direction === 'right'){
var parentElement = $(element).parent().parent().parent().parent();
        $(parentElement).find('.compare-check').prop('checked', false);
        }

if (checked_element == 3){
$('.compare-check').removeAttr('disabled');
        }
if (checked_element == 0){
$('#compare-container').slideUp();
        }
}
} else{
//console.log('not accessiable');
}

//console.log('total checked after=',checked_element);
return checked_element;
}

sendRequest = function(requestUrl, requestData){
var result = "";
        showLoader('loading', 'display-block');
        $(function () {
        $.ajax({
        type:"POST",
                data:requestData,
                async:false,
                url:requestUrl,
                dataType:"json",
                success:function(response){
                showLoader('loading', 'display-none');
                        result = response;
                }
        });
        });
        return result;
}



/* CODE END FOR COMPARE POP UP */


/*FOR EMAIL VERIFICATION*/
emailverification = function (inputobj) {
$.ajax({
type: "GET",
        url: "/common-request",
        cache : false,
        data: "step=email_verify&email=" + inputobj.value,
        dataType: 'json',
        success: function (response) {
        if (response.status == "success") {
        if ($('#' + inputobj.id + '_validator').length > 0) {
        $('#' + inputobj.id + '_validator').removeClass('validate_fail');
                $('#' + inputobj.id).removeClass('error');
        }
        } else {
        if ($('#email_error_indicator').length > 0) {
        $('#email_error_indicator').removeClass('hide');
                $('#email_error_message').html(response.message);
                $('#' + inputobj.id).addClass('error');
                return false;
        } else if ($('#' + inputobj.id + '_validator').length > 0) {
        $('#' + inputobj.id + '_validator').addClass('validate_fail');
                $('#' + inputobj.id).addClass('error');
                return false;
        } else if ($('#email').length > 0) {
        $('#email').addClass('error');
                return false;
        }
        }
        }
});
}

emailvarification = function (inputobj) {
$.ajax({
type: "GET",
        url: "/common-request",
        cache : false,
        data: "step=email_verify&email=" + inputobj.value,
        dataType: 'json',
        success: function (response) {
        if (response.status == "success") {
        if ($('#' + inputobj.id + '_validator').length > 0) {
        $('#' + inputobj.id + '_validator').removeClass('validate_fail');
                $('#' + inputobj.id).removeClass('error');
        }
        } else {
        if ($('#email_error_indicator').length > 0) {
        $('#email_error_indicator').removeClass('hide');
                $('#email_error_message').html(response.message);
                $('#' + inputobj.id).addClass('error');
                return false;
        } else if ($('#' + inputobj.id + '_validator').length > 0) {
        $('#' + inputobj.id + '_validator').addClass('validate_fail');
                $('#' + inputobj.id).addClass('error');
                return false;
        } else if ($('#email').length > 0) {
        $('#email').addClass('error');
                return false;
        }
        }
        }
});
}

/* Compare popup resizing */
resizePopup = function() {
$(".compare-popup #main-container").height($(".compare-popup").height() - 100).css("margin-top", "50");
        $("#cardComaprePopup").height($(".compare-popup #main-container").height() - $(".card-detail").height() - 6);
};
        $(window).bind("load, resize", function(){
resizePopup();
});
        /* Compare popup resizing */
                function dateDifference(start_date, end_date) { // date should be(Y-m-d)eg (2015-12-31)
                var days = "";
                        if (end_date == undefined || end_date == "" || end_date == "0000-00-00" || start_date == undefined || start_date == "" || start_date == "0000-00-00") {

                } else {
                var start = new Date(start_date);
                        var end = new Date(end_date);
                        var diff = new Date(end - start);
                        days = diff / 1000 / 60 / 60 / 24;
                }

                return days;
                }
        checkPANVerification = function (pan_number, lead_id, product_id, name) {
        var pan_verification_response = "";
                showLoader('pan_loading', 'display-block');
                $.ajax({
                type: "POST",
                        url: "/common-request",
                        data: "step=pan_check&pan_number=" + pan_number + "&lead_id=" + lead_id + "&product_id=" + product_id + "&name=" + name,
                        dataType: 'json',
                        async: false,
                        success: function (response) {
                        showLoader('pan_loading', 'display-none');
                                pan_verification_response = response;
                                if (response.status == true) {
                        $(".pan_loader").html("<img src='/components/images/tick.png' class='city-loader'/>");
                                $("#pan_status_text").html("(Your PAN card is verified.)");
                        }
                        //return response;
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        //console.info( errorThrown );
                        }
                });
                return pan_verification_response;
        }
        function showEquifaxPopUp() {
        var complete_name = $('.name').val();
                var address = $('#address_line1').val() + ' ' + $('#address_line2').val();
                var email = $('#email').val();
                $('#equi_popup_name').html(complete_name);
                $('#equi_popup_address').html(address);
                $('#equi_popup_team').html(' Team ');
                $('#equi_popup_email').html(email);
                $('#equi').removeClass('display-none').addClass('display-block');
                //$('body,html').animate({scrollTop: $("#main_content")}, 800);
        }

        submitAnswers = function () {
        //showLoader('loading', 'display-block');
        //$('body,html').animate({scrollTop: $("#main_content")}, 100);
        //alert('in submit answers-func');
        var is_validated = false;
                var a1_flag = false;
                var a2_flag = false;
                var a1_list = '';
                var a2_list = '';
                $('.a1').each(function () {
        if ($(this).is(':checked')) {
        if (a1_list != '') {
        a1_list = a1_list + ',' + $(this).attr('value');
        } else {
        a1_list = $(this).attr('value');
        }
        a1_flag = true;
        } else {

        }
        });
                $('.a2').each(function () {
        if ($(this).is(':checked')) {
        if (a2_list != '') {
        a2_list = a2_list + ',' + $(this).attr('value');
        } else {
        a2_list = $(this).attr('value');
        }
        a2_flag = true;
        } else {

        }
        });
                if (!a1_flag && !a2_flag) {
        $('.a1').parent().addClass('error-text');
                $('.a2').parent().addClass('error-text');
                is_validated = false;
        } else {
        if (!a1_flag) {
        $('.a1').parent().addClass('error-text');
                is_validated = false;
        } else if (!a2_flag) {
        $('.a2').parent().addClass('error-text');
                is_validated = false;
        } else {
        is_validated = true;
        }
        }

        //alert(is_validated + '~is_validated');    
        if (!is_validated) {
        $('#msg_span').html('Please select appropriate answer!').parent(".form-group").addClass("has-error error-bq");
                showLoader('loading', 'display-none');
                return false;
        } else {
        $('#msg_span').html('').removeClass('has-error error-bq');
                $('.a1').parent().removeClass('error-text');
                $('.a2').parent().removeClass('error-text');
                $(question_answer).attr('a1_list', a1_list);
                $(question_answer).attr('a2_list', a2_list);
                $(bureau_check_journey).attr('question_answer', question_answer);
                //console.log(question_answer);
                //return false;
                return true;
        }
        }
        function validate_aadhaars(params_obj)
                {
                var is_validated = false;
                        var aadhaarno = params_obj.aadhaarno;
                        var pincode = params_obj.pincode;
                        var name = params_obj.name;
                        var gender = params_obj.gender;
                        var empcode = params_obj.empcode;
                        var lead_id = params_obj.lead_id;
                        var product_id = params_obj.product_id;
                        if (aadhaarno != "" && aadhaarno.length == 12 && pincode != "" && name != "" && gender != "") {
                data = "step=adhaar_validate&aadhaar_no=" + aadhaarno + "&pincode=" + pincode + "&name=" + name + "&gender=" + gender + "&empcode=" + empcode + "&lead_id=" + lead_id + "&product_id=" + product_id;
                        $.ajax({
                        type: "POST",
                                url: "/common-request",
                                data: data,
                                dataType: 'json',
                                async: false,
                                success: function(response) {
                                if (response.status == 'success') {
                                is_validated = true;
                                } else {
                                is_validated = false;
                                }
                                }
                        });
                }
                else
                {
                is_validated = false;
                }
                return is_validated;
                        }