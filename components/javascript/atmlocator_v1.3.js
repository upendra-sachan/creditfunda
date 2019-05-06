$(document).ready(function() {
    $(document).on("change", '.selectBoxValid', function() {
        var bankid= $(".selectBoxValid").val();
        var bankname = $(".selectBoxValid option:selected").text();
        //console.log(bankname);
        //document.getElementById("bank").disabled=true;
        //getbankid (bankid,bankname);
        var url = "/"+action;
        bankname = bankname.replace(/\s+/g, "-");
        if(bankname == '---SELECT-YOUR-BANK---')
        {
            window.parent.location = url+"/";
        }else{
            var bankname = $(".selectBoxValid option:selected").attr('cms');
            //bankname = bankname.toLowerCase()
            url+= "/"+bankname+"/";
            window.parent.location = url;
        }
        
        
    });
    $(document).on("change", '.moselectBoxValid', function() {
        var bankid= $(".selectBoxValid").val();
        var stateid= $(".moselectBoxValid").val();
        //var bankname = $(".selectBoxValid option:selected").text();
        var bankname = $(".selectBoxValid option:selected").attr('cms');
        var statename = $(".moselectBoxValid option:selected").text();
        //document.getElementById("state").disabled=true;
        var url = "/"+action;
        bankname = bankname.replace(/\s+/g, "-");
        bankname = bankname.toLowerCase()
        url+= "/"+bankname;
        statename = statename.replace(/\s+/g, "-");
        
        if(statename == '---SELECT-YOUR-STATE---')
        {
            window.parent.location = url+"/";
        }else{
            statename = statename.toLowerCase()
            url+= "/"+statename+"/";
            window.parent.location = url;
        }
        //getcityid (bankid,stateid);
        
        
        
    });
    $(document).on("change", '.cmoselectBoxValid', function() {
        var bankid= $(".selectBoxValid").val();
        var stateid= $(".moselectBoxValid").val();
        var cityid= $(".cmoselectBoxValid").val();
        
        var cityname = $(".cmoselectBoxValid option:selected").text();
        //var bankname = $(".selectBoxValid option:selected").text();
        var bankname = $(".selectBoxValid option:selected").attr('cms');
        var statename = $(".moselectBoxValid option:selected").text();
        var url = "/"+action;
        
        bankname = bankname.replace(/\s+/g, "-");
        bankname = bankname.toLowerCase()
        url+= "/"+bankname;
        statename = statename.replace(/\s+/g, "-");
        statename = statename.toLowerCase()
        url+= "/"+statename;
        cityname = cityname.replace(/\s+/g, "-");
        
        if(cityname == '---SELECT-YOUR-CITY---')
        {
            window.parent.location = url+"/";
        }else{
            cityname = cityname.toLowerCase()
            url+= "/"+cityname+"/";
            window.parent.location = url;
        }
        //document.getElementById("city").disabled=true;
        //getbranchid (bankid,stateid,cityid);
        
        
        
    });
    
    $(document).on("change", '.bmoselectBoxValid', function() {
        var bankid= $(".selectBoxValid").val();
        var stateid= $(".moselectBoxValid").val();
        var cityid= $(".cmoselectBoxValid").val();
        var branchid= $(".bmoselectBoxValid").val();
        var cityname = $(".cmoselectBoxValid option:selected").text();
        //var bankname = $(".selectBoxValid option:selected").text();
        var bankname = $(".selectBoxValid option:selected").attr('cms');
        var statename = $(".moselectBoxValid option:selected").text();
        var branchname = $(".bmoselectBoxValid option:selected").text();
        var url = "/"+action;
        
        bankname = bankname.replace(/\s+/g, "-");
        bankname = bankname.toLowerCase()
        url+= "/"+bankname;
        statename = statename.replace(/\s+/g, "-");
        statename = statename.toLowerCase()
        url+= "/"+statename;
        cityname = cityname.replace(/\s+/g, "-");
        cityname = cityname.toLowerCase()
        url+= "/"+cityname;
        branchname = branchname.replace(/\s+/g, "-");
        if(branchname == '---SELECT-YOUR-BRANCH---')
        {
            window.parent.location = url+"/";
        }else{
            branchname = branchname.toLowerCase()
            url+= "/"+branchname+"/";
            window.parent.location = url;
        }
        //document.getElementById("branch").disabled=true;
        //getbranchdetail (bankid,stateid,cityid,branchid);
        
        
        
    }); 
    // BY IFSC CODE
    $("#ifsc_code").autocomplete({
	source: function(request, response) {
	    var $this = $(this);
	    var $element = $(this.element);
	    var jqrequest = $element.data('jqrequest');
	    if (jqrequest) {
		jqrequest.abort();
	    }
	    $element.data('jqrequest',
		    $.ajax({
			url: "/"+action+"/",
			dataType: "json",
			async: "false",
			mode: "abort",
			asyn: false,
			data: {
			    ifsc_code: request.term,
			    step: "showIfscCode"},
			beforeSend: function() {
			    if (document.getElementById('ifsc_code_exists') != undefined) {
				document.getElementById('ifsc_code_exists').innerHTML = "  <img height=\"25\" src=\"/components/images/loading.gif\">";
			    }
			},
                        
			success: function(returnObj) {
                            
                            //console.log(returnObj.html);
                            if (returnObj.html.length > 0) {
                            
			    response($.map(returnObj.html, function(item) {
				return {
				    label: item,
				    value: item
				};
			    }))
                            } else {
                            response([{ label: 'No results found.', val: -1}]);
                            window.location.href = 'search-by-ifsc-code/'+ui.item.value;
                        }
			    if (document.getElementById('ifsc_code_exists') != undefined) {
				document.getElementById('ifsc_code_exists').innerHTML = "";
			    }
			}
		    })
		    );
	},
	minLength: 3,
	selectFirst: true,
	selectOnly: true,
	select: function(event, ui) {
            //alert ("You have selected : " + ui.item.value);
            if(ui.item.value == 'No results found.')
            {
             window.location.href = 'search-by-ifsc-code/';   
            }else{
            window.location.href = 'search-by-ifsc-code/'+ui.item.value;
	    $("#ifsc_code").val(ui.item.label);
            //alert("test");
            return true;
	}}
    }).keydown(function(e, data, ui) {
	if (e.which == 13) {
	    setTimeout(function() {
		$(".ui-autocomplete").css('display', 'none');
		//$('#monthly_income').focus();
	    }, 500)
	}
	if (e.which == 9 || e.which == 13) {
	    if ($(".ui-autocomplete").css('display') != 'none') {
		var res = $(".ui-autocomplete li:first a").html();
		$("#ifsc_code").val(res);
                
		return true;
	    }
	}
    });
    //END
    
    // Auto Suggest BY MICR CODE
    $("#micr_code").autocomplete({
	source: function(request, response) {
	    var $this = $(this);
	    var $element = $(this.element);
	    var jqrequest = $element.data('jqrequest');
	    if (jqrequest) {
		jqrequest.abort();
	    }
	    $element.data('jqrequest',
		    $.ajax({
			url: "/"+action+"/",
			dataType: "json",
			async: "false",
			mode: "abort",
			asyn: false,
			data: {
			    micr_code: request.term,
			    step: "showMicrCode"},
			beforeSend: function() {
			    if (document.getElementById('micr_code_exists') != undefined) {
				document.getElementById('micr_code_exists').innerHTML = "  <img height=\"25\" src=\"/components/images/loading.gif\">";
			    }
			},
			success: function(returnObj) {
			    if (returnObj.html.length > 0) {
                            
			    response($.map(returnObj.html, function(item) {
				return {
				    label: item,
				    value: item
				};
			    }))
                            } else {
                            response([{ label: 'No results found.', val: -1}]);
                            //alert(request.term);
                            window.location.href = 'search-by-micr-code/'+request.term;
                        }
			    if (document.getElementById('micr_code_exists') != undefined) {
				document.getElementById('micr_code_exists').innerHTML = "";
			    }
			}
		    })
		    );
	},
	minLength: 3,
	selectFirst: true,
	selectOnly: true,
	select: function(event, ui) {
            //alert ("You have selected : " + ui.item.value);
            if(ui.item.value == 'No results found.')
            {
              window.location.href = 'search-by-micr-code/';  
            }else{
            window.location.href = 'search-by-micr-code/'+ui.item.value;
	    $("#micr_code").val(ui.item.label);
            //alert("test");
            return true;
        
	}}
    }).keydown(function(e, data, ui) {
	if (e.which == 13) {
	    setTimeout(function() {
		$(".ui-autocomplete").css('display', 'none');
		//$('#monthly_income').focus();
	    }, 500)
	}
	if (e.which == 9 || e.which == 13) {
	    if ($(".ui-autocomplete").css('display') != 'none') {
		var res = $(".ui-autocomplete li:first a").html();
		$("#micr_code").val(res);
                
		return true;
	    }
	}
    });
    //END
  
    

    
});