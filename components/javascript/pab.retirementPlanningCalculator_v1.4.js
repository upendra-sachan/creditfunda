$(function () {
    retirementplanCalculator();
    $(document).on("click", "input[type='button']", function () {
	$(this).buttonAction();
	retirementplanCalculator();
    });
    $(document).on("blur", "input[type='text']", function () {
	$(this).inputValidate();
	if(!$(this).hasClass("error")){
	    if($(this).attr("id") == "txtPresentAge"){
		$("#txtRetireAge").data("options").min = parseInt($(this).val()) + 1;
		$("#txtRetireAge").inputValidate();
	    } else if($(this).attr("id") == "txtRetireAge"){
		$("#txtLifeExpectancy").data("options").min = parseInt($(this).val()) + 1;
		$("#txtLifeExpectancy").inputValidate();
	    }
	}
    });
    $(document).on("keyup", "input[type='text']", function () {
	if ($(this).attr("id") == "txtMonthlyExpenses" || $(this).attr("id") == "txtExistingSavings") {
	    if($(this).val() == null){
		$(this).val("0");
	    }	    
	    $(this).val(rupeeFormat($(this).val()));
	}
	retirementplanCalculator();
    });
    $(document).on("keypress", "input[type='text']", function (event) {
	var is_validated = $(this).keyValidate(event);
	return is_validated;
    });
})

$.fn.extend({
    buttonAction: function () {
	var action = "minus";
	var ele = $(this).next();
	if ($(this).hasClass("qtyplus")) {
	    action = "plus";
	    ele = $(this).prev();
	}
	$(ele).increaseDecreaseValue(action);
	$(ele).inputValidate();
	if ($(ele).attr("id") == "txtPresentAge" || $(ele).attr("id") == "txtRetireAge") {
	    $(ele).adjustRetirementMinimumAge();
	}
    },
    increaseDecreaseValue: function (action) {
	var min_range = parseInt($(this).data("options").min);
	var max_range = parseInt($(this).data("options").max);
	var current_value = parseInt($(this).val());
	if ($(this).val() == "") {
	    $(this).val(min_range);
	}
	if (action == "plus" && current_value < max_range) {
	    $(this).val(current_value + 1);
	}
	if (action == "minus" && current_value > min_range) {
	    $(this).val(current_value - 1);
	}
    },
    adjustRetirementMinimumAge: function () {
	if($(this).attr("id") == "txtPresentAge"){
	$("#txtRetireAge").data("options").min = parseInt($(this).val()) + 1;
	$("#txtRetireAge").inputValidate("blank");
	} else {
	    $("#txtLifeExpectancy").data("options").min = parseInt($(this).val()) + 1;
	    $("#txtLifeExpectancy").inputValidate("blank");
	}
	
    },
    keyValidate: function (event) {
	var validate_case = 5;
	if($(this).attr("id") == "txtExistingSavings"){
	    validate_case = 7;
	}	
	var is_validated = formatValidatorNew(event, $(this), "", "", "", validate_case, "", "", "", "");
	if(is_validated == 1 || is_validated == true){
	    return true;
	} else {
	    return false;
	}
    },
    inputValidate: function (event) {
	var is_validated = true;
	var validateCase = 5;
	if ($(this).attr("id") == "txtMonthlyExpenses" || $(this).attr("id") == "txtExistingSavings") {
	    validateCase = 7;
	}
	var min_val = "";
	var max_val = "";
	if($(this).data("options") != undefined){
	    min_val = $(this).data("options").min;
	    max_val = $(this).data("options").max;
	}
	
	var is_numeric = formatValidatorNew("", $(this), "", "", "", validateCase,min_val, max_val, "", "");
	if (is_numeric == 0) {
	    is_validated = false;
	}

	if (event == undefined) {
	    if (!is_validated) {
		$(this).addClass("error");
	    } else {
		$(this).removeClass("error");
	    }
	} else if (event == "blank") {
	    if (!is_validated) {
		$(this).val("");
	    }
	}
	return is_validated;
    }
})

retirementplanCalculator = function () {
    var presentAge = parseInt($("#txtPresentAge").val());
    var reteirementAge = parseInt($("#txtRetireAge").val());
    var lifeExpectancy = parseInt($("#txtLifeExpectancy").val());
    var monthlyExpense = parseInt(unformatMoney($("#txtMonthlyExpenses").val()));
    var inflationRate = parseInt($("#txtInflationRate").val());
    var investment_rate = parseInt($("#txtReturnRate").val()) / 100;
    var existingSavings = parseInt(unformatMoney($("#txtExistingSavings").val()));
    var yrsLeftForRetirement = 0;
    var yrsLeftForRetirement = reteirementAge - presentAge;
    var lifeExpectancyPostRetirement = lifeExpectancy - reteirementAge;
    
    var monthlyExpenseOnRetirement = 0;
    var monthlyExpenseOnRetirement_display = "Nil";
    
    var totalCorpusAmount = 0;
    
    if(monthlyExpense > 0 && inflationRate > 0 && yrsLeftForRetirement > 0){	
	$("#resMonthlyExp").prevAll("i:eq(0)").removeClass("hide");
	monthlyExpenseOnRetirement = parseInt(monthlyExpense * (Math.pow((1 + (inflationRate / 100)), yrsLeftForRetirement)));
	if(monthlyExpenseOnRetirement < 0){
	    monthlyExpenseOnRetirement_display = "Nil";
	    $("#resMonthlyExp").prevAll("i:eq(0)").addClass("hide");
	    monthlyExpenseOnRetirement = 0;
	} else if(monthlyExpenseOnRetirement > 99999){
	    monthlyExpenseOnRetirement_display = numDifferentiation(monthlyExpenseOnRetirement);
	} else {
	    monthlyExpenseOnRetirement_display = rupeeFormat(monthlyExpenseOnRetirement);
	}
    } else {
	monthlyExpenseOnRetirement_display = "Nil";
	$("#resMonthlyExp").prevAll("i:eq(0)").addClass("hide");
    }
        
    if(investment_rate > 0 && yrsLeftForRetirement > 0 && monthlyExpenseOnRetirement > 0 && future_interest_rate > 0 && lifeExpectancyPostRetirement>0 && monthlyExpenseOnRetirement > 0){
	if(existingSavings > 0 ){
	    var calculated_corpus = parseInt(existingSavings * (Math.pow((1 + investment_rate), yrsLeftForRetirement)));
	} else {
	    calculated_corpus = 0;
	}
	
	var totalCorpusAmountTemp = parseInt(presentValue(future_interest_rate / 12, (lifeExpectancyPostRetirement * 12), (monthlyExpenseOnRetirement * (-1)), 1));
	totalCorpusAmount = totalCorpusAmountTemp - calculated_corpus;
	if(totalCorpusAmount > 99999){
	    total_calculated_corpus_display = numDifferentiation(totalCorpusAmount);
	} else {
	    total_calculated_corpus_display = rupeeFormat(totalCorpusAmount);
	}
    }
    requiredMonthlySavings = 0;
    if(investment_rate > 0 && yrsLeftForRetirement > 0 && totalCorpusAmount > 0){
	var requiredMonthlySavings = parseInt(ExcelFormulas.PMT(investment_rate / 12, (yrsLeftForRetirement * 12), 0, (totalCorpusAmount * -1), 1));
	//console.log(requiredMonthlySavings)
	if(requiredMonthlySavings < 0){
	} else {
	    requiredMonthlySavings_display = rupeeFormat(requiredMonthlySavings);
	}
    }
    
    if(requiredMonthlySavings <= 0 || requiredMonthlySavings == ""){
	$("#resMonthlySaving").prevAll("i:eq(0)").addClass("hide");	
	requiredMonthlySavings_display = "Nil";
    } else{
	$("#resMonthlySaving").prevAll("i:eq(0)").removeClass("hide");
    }
    
    if(totalCorpusAmount <= 0 || totalCorpusAmount == ""){
	$("#resSumOnRet").prevAll("i:eq(0)").addClass("hide");	
	total_calculated_corpus_display = "Nil";
    } else{
	$("#resSumOnRet").prevAll("i:eq(0)").removeClass("hide");
    }
        
    $("#resSumOnRet").html(total_calculated_corpus_display).data("value", totalCorpusAmount);
    $("#resMonthlyExp").html((monthlyExpenseOnRetirement_display)).data("value", monthlyExpenseOnRetirement);
    $("#resMonthlySaving").html(requiredMonthlySavings_display);
    saveResult();
}

saveResult = function () {
    var data = {step: "SaveResult", presentAge: unformatMoney($("#txtPresentAge").val()), lifeExpectancy: unformatMoney($("#txtLifeExpectancy").val()), retirementAge: unformatMoney($("#txtRetireAge").val()), presentMonthlyExpense: unformatMoney($("#txtMonthlyExpenses").val()), inflationRate: $("#txtInflationRate").val(), corpusAmount: (($("#resSumOnRet").data("value"))), monthlyExpense: parseInt(($("#resMonthlyExp").data("value"))), monthlySavings: parseInt(unformatMoney($("#resMonthlySaving").text())), investmentRate: parseInt(unformatMoney($("#txtReturnRate").val())), existingSavings: unformatMoney($("#txtExistingSavings").val())};
    var saveRes = null;
    if (saveRes == null) {
	$.ajax({
	    type: "POST",
	    url: "/retirement-planning-calculator/",
	    data: data,
	    success: function (response) {
//                    $('#price').html(NewMoneyFormatInr(parseInt(response.price)));
//                    $('#price_change').html(response.change);
	    }
	});
    }
}