$(document).ready(function(){function e(e){try{_pb_tracker.trackEvent(["clevertab"],"EL_SUBMIT_PQ1",{DATA:e})}catch(e){}}function r(e){try{_pb_tracker.trackEvent(["clevertab"],"EL_VIEWED_PQ2",{DATA:""})}catch(e){}}function o(e,r,o){$("input[name=co_borrower_relationship_id]:checked").val()==r&&$("#change_text_emp_name").text(e)}function a(e){var r=!0,o=$("#country_name").val(),a=$("input[type=radio][name=course_name]:checked").val(),t=$("input[name=course_type]:checked").val(),n=$("#city_name").val(),i=$("#mobile_number").val(),s=formatValidatorNew("",$("#mobile_number"),"","","",19,"","","","","");return""!=o&&0!=o&&void 0!==o||($("#country_name").addClass("error"),$("#country_name").val(""),r=!1),""!=a&&void 0!==a||($(".course_name").addClass("error"),r=!1),""!=t&&0!=t&&void 0!==t||($(".course_type").addClass("error"),$("#course_type").val(""),r=!1),""!=n&&0!=n&&void 0!==n||($("#city_name").addClass("error"),$("#city_name").val(""),r=!1),""!=i&&s&&void 0!==n||($(".mobile_number_verification").hide(),$("#mobile_number").val(""),$(".mobile_number").addClass("error"),r=!1),!!r}function t(o){1==o?$(".loder-txt").text("You will receive an OTP on your provided mobile number shortly"):2==o&&$(".loder-txt").text("We are fetching best offers for you"),$("#el_loder").addClass("active"),$("body").addClass("ofH p-F");var a=$(".dob").val();if(""!=a&&null!=a){var t=a.split("-"),n=t[2],i=t[1],_=t[0];""!=n&&""!=i&&""!=_&&(s(_,i,n),l(i),c(n));var m=n+"-"+i+"-"+_}else m=null;var d=$("#el-form-1").serialize()+"&"+$("#el-form-2").serialize()+"&date_of_birth="+m;$.ajax({url:"/education-loan",data:d+"&step=pb_otp_code&form_no="+o,type:"POST",dataType:"json",success:function(a){1==o?"success"==a.status?($(".otp_digit_1").val("").removeClass("otp_error otp_type_clr"),$(".otp_digit_2").val("").removeClass("otp_error otp_type_clr"),$(".otp_digit_3").val("").removeClass("otp_error otp_type_clr"),$(".otp_digit_4").val("").removeClass("otp_error otp_type_clr"),$("#otp-verification").addClass("active"),$(".otp_digit_1").focus(),$("#el_loder").removeClass("active"),e(d),function(){try{_pb_tracker.trackEvent(["clevertab"],"EL_REQUEST_OTP",{verfied:""})}catch(e){}}()):"otpverified"==a.status?($("#el-form-1").hide(),$("#part2").css({opacity:1,height:"auto"}),$("body").removeClass("ofH p-F"),$("#el_loder").removeClass("active"),e(d),r()):"error"==a.status&&($("#el-form-1").hide(),$("#part2").css({opacity:1,height:"auto"}),$("body").removeClass("ofH p-F")):2==o&&void 0!=a.redirect_url&&(!function(e){try{_pb_tracker.trackEvent(["clevertab"],"EL_SUBMIT_PQ2",{DATA:""})}catch(e){}}(),window.parent.location=a.redirect_url)},error:function(e){}})}function n(e){e=Math.floor(e);var r=new String(e);if(numReversed=r.split(""),actnumber=numReversed.reverse(),!(Number(e)>=0))return!1;if(0==Number(e))return"";if(actnumber.length>11)return!1;var o=["Zero"," One"," Two"," Three"," Four"," Five"," Six"," Seven"," Eight"," Nine"],a=["Ten"," Eleven"," Twelve"," Thirteen"," Fourteen"," Fifteen"," Sixteen"," Seventeen"," Eighteen"," Nineteen"],t=["dummy"," Ten"," Twenty"," Thirty"," Forty"," Fifty"," Sixty"," Seventy"," Eighty"," Ninety"],n=numReversed.length,s=new Array,l="";for(j=0,i=0;i<n;i++){switch(i){case 0:0==actnumber[i]||1==actnumber[i+1]?s[j]="":s[j]=o[actnumber[i]],s[j]=s[j]+" Only";break;case 1:c();break;case 2:0==actnumber[i]?s[j]="":0!=actnumber[i-1]&&0!=actnumber[i-2]?s[j]=o[actnumber[i]]+" Hundred and":s[j]=o[actnumber[i]]+" Hundred";break;case 3:0==actnumber[i]||1==actnumber[i+1]?s[j]="":s[j]=o[actnumber[i]],(0!=actnumber[i+1]||actnumber[i]>0)&&(s[j]=s[j]+" Thousand");break;case 4:c();break;case 5:0==actnumber[i]||1==actnumber[i+1]?s[j]="":s[j]=o[actnumber[i]],(0!=actnumber[i+1]||actnumber[i]>0)&&(s[j]=s[j]+" lac");break;case 6:c();break;case 7:0==actnumber[i]||1==actnumber[i+1]?s[j]="":s[j]=o[actnumber[i]],(0!=actnumber[i+1]||actnumber[i]>0)&&(s[j]=s[j]+" crore");break;case 8:c();break;case 9:0==actnumber[i]||1==actnumber[i+1]?s[j]="":s[j]=o[actnumber[i]],s[j]=s[j]+" billion";break;case 10:c()}j++}function c(){0==actnumber[i]?s[j]="":1==actnumber[i]?s[j]=a[actnumber[i-1]]:s[j]=t[actnumber[i]]}for(s.reverse(),i=0;i<s.length;i++)l+=s[i];return l=l.toLowerCase(),"Rupees "+(l=(l=$.trim(l)).substring(0,1).toUpperCase()+l.substring(1,l.length))}function s(e,r,o){var a;return a=function(e,r){var o="31";month=parseInt(e),year=parseInt(r),"4"==month||"6"==month||"9"==month||"11"==month?o="30":"02"==month&&(o=""!=year&&parseInt(year)%4!=0?"28":"29");return o}(r,o),parseInt(e)>0&&parseInt(e)<=a&&parseInt(r)>0&&parseInt(o)>0}function l(e){var r=parseInt(e);return""!=r&&r>0&&r<=12}function c(e){var r=parseInt(e),o=(new Date).getFullYear();return""!=r&&r>1942&&r<o}$(document).on("keyup",".amount",function(){$(this).attr("key-value",$(this).val()),$(this).val(rupeeFormat($(this).val()))}),$("#mobile_number").keyup(function(){var e=$("#mobile_number").val().length;$("#charNum").text(e)}),$(document).on("keyup","#txtDate",function(e){var r=e.keyCode||e.charCode;2!=$(this).val().length&&5!=$(this).val().length||8==r||46==r||$(this).val($(this).val()+"-")}),$(document).on("keypress","input[name='dob']",function(e){if((e.which<48||e.which>57)&&8!=e.which&&46!=e.which)return!1}),$(".dob").on("blur",function(){!function(){var e=$(".dob").val().split("-"),r=!0,o=!0,a=!0,t=e[2],n=e[1],i=e[0];""!=t&&""!=n&&""!=i&&(r=s(i,n,t),o=l(n),a=c(t));""!=t&&a&&""!=n&&o&&""!=i&&r?$(".dob").addClass("valid"):($(".dob").val(""),$(".c").text("Please enter valid date of birth"),$(".dob").addClass("error"),$(".dob").removeClass("valid"))}()}),$(".back-btn-p1").click(function(){$("#part2").css({opacity:0,height:0}),$("#el-form-1").show()}),$("#country_name").on("change",function(){$("#country_name").removeClass("error"),$(".course_name").removeClass("error"),$(".course_type").removeClass("error"),$("#city_name").removeClass("error"),$(".mobile_number").removeClass("error")}),$("input[type=radio][name=course_name]").change(function(){$(".course_name").removeClass("error"),$(".course_type").removeClass("error"),$("#city_name").removeClass("error"),$(".mobile_number").removeClass("error"),""!=$("#country_name").val()&&void 0!==$("#country_name").val()||$("#country_name").addClass("error")}),$("input[type=radio][name=course_type]").change(function(){$(".course_type").removeClass("error"),$("#city_name").removeClass("error"),$(".mobile_number").removeClass("error"),""!=$("input[name=course_name]:checked")&&void 0!==$("input[name=course_name]:checked").val()||$(".course_name").addClass("error"),""!=$("#country_name").val()&&void 0!==$("#country_name").val()||$("#country_name").addClass("error")}),$("#city_name").on("change",function(){$(".mobile_number").removeClass("error"),$("#city_name").removeClass("error"),""!=$("input[name=course_type]:checked")&&void 0!==$("input[name=course_type]:checked").val()||$(".course_type").addClass("error"),""!=$("input[name=course_name]:checked")&&void 0!==$("input[name=course_name]:checked").val()||$(".course_name").addClass("error"),""!=$("#country_name").val()&&void 0!==$("#country_name").val()||$("#country_name").addClass("error")}),$(".mobile_number").on("focus",function(e){$(".mobile_number").removeClass("error"),""!=$("#city_name").val()&&void 0!==$("#city_name").val()||$("#city_name").addClass("error"),""!=$("input[name=course_type]:checked")&&void 0!==$("input[name=course_type]:checked").val()||$(".course_type").addClass("error"),""!=$("input[name=course_name]:checked")&&void 0!==$("input[name=course_name]:checked").val()||$(".course_name").addClass("error"),""!=$("#country_name").val()&&void 0!==$("#country_name").val()||$("#country_name").addClass("error")}),$("input[type=radio][name=title]").change(function(){$("#co_borrower_monthly_income").removeClass("error"),$(".radio-gender").removeClass("error"),$(".customer_name").removeClass("error"),$(".dob").removeClass("error"),$(".email").removeClass("error"),$(".co_borrower_relationship_id").removeClass("error"),$(".co_borrower_employment_type_id").removeClass("error"),$("#co_borrower_monthly_income").removeClass("error")}),$("#customer_name").on("focus",function(e){$("#co_borrower_monthly_income").removeClass("error"),$(".customer_name").removeClass("error"),$(".dob").removeClass("error"),$(".email").removeClass("error"),$(".co_borrower_relationship_id").removeClass("error"),$(".co_borrower_employment_type_id").removeClass("error"),""!=$("input[type=radio][name=title]:checked").val()&&void 0!==$("input[type=radio][name=title]:checked").val()||$(".radio-gender").addClass("error")}),$(".dob").on("focus",function(e){$("#co_borrower_monthly_income").removeClass("error"),$(".dob").removeClass("error"),$(".email").removeClass("error"),$(".co_borrower_relationship_id").removeClass("error"),$(".co_borrower_employment_type_id").removeClass("error"),""==$("#customer_name").val()&&$(".customer_name").addClass("error"),""!=$("input[type=radio][name=title]:checked").val()&&void 0!==$("input[type=radio][name=title]:checked").val()||$(".radio-gender").addClass("error")}),$("#email").on("focus",function(e){$("#co_borrower_monthly_income").removeClass("error"),$(".email").removeClass("error"),$(".co_borrower_relationship_id").removeClass("error"),$(".co_borrower_employment_type_id").removeClass("error"),""==$("#customer_name").val()&&$(".customer_name").addClass("error"),""==$(".dob").val()&&$(".dob").addClass("error"),""!=$("input[type=radio][name=title]:checked").val()&&void 0!==$("input[type=radio][name=title]:checked").val()||$(".radio-gender").addClass("error")}),$("input[type=radio][name=co_borrower_relationship_id]").change(function(){var e=[];e[2]="Father's",e[3]="Mother's",e[4]="Brother's",e[5]="Sister's",e[1]="Guardian's",e.forEach(o),$(".co_borrower_relationship_id").removeClass("error"),$(".co_borrower_employment_type_id").removeClass("error"),$("#co_borrower_monthly_income").removeClass("error"),""==$("#customer_name").val()&&$(".customer_name").addClass("error"),""==$(".dob").val()&&$(".dob").addClass("error"),""==$("#email").val()&&$(".email").addClass("error"),""!=$("input[type=radio][name=title]:checked").val()&&void 0!==$("input[type=radio][name=title]:checked").val()||$(".radio-gender").addClass("error")}),$("input[type=radio][name=co_borrower_employment_type_id]").change(function(){$(".co_borrower_employment_type_id").removeClass("error");var e=$("input[name=co_borrower_employment_type_id]:checked").val();2==e?($("#monthly_income_div").show(),$("#co_borrower_monthly_income").val(""),$("#mon-ann-income").text("Annual Income")):1==e?($("#monthly_income_div").show(),$("#co_borrower_monthly_income").val(""),$("#mon-ann-income").text("Monthly Income")):4==e&&($("#monthly_income_div").hide(),$("#co_borrower_monthly_income").val(0)),$("#co_borrower_monthly_income").removeClass("error"),""==$("#customer_name").val()&&$(".customer_name").addClass("error"),""==$(".dob").val()&&$(".dob").addClass("error"),""==$("#email").val()&&$(".email").addClass("error"),""!=$("input[type=radio][name=title]:checked").val()&&void 0!==$("input[type=radio][name=title]:checked").val()||$(".radio-gender").addClass("error"),""!=$("input[type=radio][name=co_borrower_relationship_id]:checked").val()&&void 0!==$("input[type=radio][name=co_borrower_relationship_id]:checked").val()||$(".co_borrower_relationship_id").addClass("error")}),$("#co_borrower_monthly_income").on("focus",function(e){$(".co_borrower_monthly_income").removeClass("error"),""==$("#customer_name").val()&&$(".customer_name").addClass("error"),""==$(".dob").val()&&$(".dob").addClass("error"),""==$("#email").val()&&$(".email").addClass("error"),""!=$("input[type=radio][name=co_borrower_relationship_id]:checked").val()&&void 0!==$("input[type=radio][name=co_borrower_relationship_id]:checked").val()||$(".co_borrower_relationship_id").addClass("error"),""!=$("input[type=radio][name=co_borrower_employment_type_id]:checked").val()&&void 0!==$("input[type=radio][name=co_borrower_employment_type_id]:checked").val()||$(".co_borrower_employment_type_id").addClass("error"),""!=$("input[type=radio][name=title]:checked").val()&&void 0!==$("input[type=radio][name=title]:checked").val()||$(".radio-gender").addClass("error")}),$("#co_borrower_monthly_income").on("keyup",function(e){$(".co_borrower_monthly_income").removeClass("error"),$(".note_txt").hide(),$(".income_inword").html(n(unformatMoney($("#co_borrower_monthly_income").val())))}),$(document).on("keypress","input[name='mobile_number']",function(e){return formatValidatorNew(e,$(this),"","","",19,"","","","","")}),$(document).on("keypress","input[name='customer_name']",function(e){return formatValidatorNew(e,$(this),"","","",2,"","","","","")}),$(document).on("keypress","input[name='co_borrower_monthly_income']",function(e){return formatValidatorNew(e,$(this),"","","",5,"","","","","")}),$("#co_borrower_monthly_income").on("blur",function(){0==$("#co_borrower_monthly_income").val()||$("#co_borrower_monthly_income").val().length>14?($("#co_borrower_monthly_income").removeClass("valid"),$("#co_borrower_monthly_income").val(""),$(".co_borrower_monthly_income").addClass("error"),$(".co_borrower_monthly_income_error").text("Incorrect Monthly Income"),$(".co_borrower_monthly_income_inword").text("")):($("#co_borrower_monthly_income").addClass("valid"),$(".co_borrower_monthly_income_inword").html(n(unformatMoney($("#annual_income").val()))))}),$("#mobile_number").on("blur",function(){10==$("#mobile_number").val().length?$("#mobile_number").addClass("valid"):($("#mobile_number").removeClass("valid"),$("#mobile_number").addClass("error"))}),$("#mobile_number").on("keyup",function(e){$(".mobile_number").removeClass("error"),$(".mobile_number_verification").show()}),$(document).on("blur","input[name='customer_name']",function(e){var r=$("#customer_name").val(),o=(r=r.replace(/^\s+|\s+$/g," ")).split(" ");""===r||r.length<3||o.length<2?($(".customer_name").addClass("error"),$("#customer_name").removeClass("valid")):$("#customer_name").addClass("valid")}),$(document).on("blur","input[name='email']",function(e){formatValidatorNew("",$("#email"),"","","",20,"","",6,31,"")?$("#email").addClass("valid"):($("#email").val(""),$(".email_error").text("Please enter valid email address"),$("#email").addClass("error"),$("#email").removeClass("valid"))}),$(document).on("submit","#el-form-1",function(e){e.preventDefault(),a($(this))&&$("#el-form-1").parsley().isValid()&&t(1)}),$(document).on("submit","#el-form-2",function(e){e.preventDefault();var r=a($(this)),o=function(e){var r=$("input[name='title']:checked").val(),o=$("input[name='co_borrower_relationship_id']:checked").val(),a=$("input[name='co_borrower_employment_type_id']:checked").val(),t=unformatMoney($("#co_borrower_monthly_income").val()),n=$("#customer_name").val(),i=(n=n.replace(/^\s+|\s+$/g,"")).split(" "),_=$("#email").val(),m=formatValidatorNew("",$("#email"),"","","",20,"","",6,31,""),d=$(".dob").val().split("-"),u=!0,p=!0,v=!0,y=d[2],b=d[1],h=d[0];""!=y&&""!=b&&""!=h&&(u=s(h,b,y),p=l(b),v=c(y));var C=$("input[type=radio][name=course_name]:checked").val(),f=$("input[name=course_type]:checked").val(),g=$("#city_name").val(),w=$("#mobile_number").val(),k=formatValidatorNew("",$("#mobile_number"),"","","",19,"","","","",""),j=!0;(""===n||n.length<3||i.length<2)&&($(".customer_name").addClass("error"),j=!1);""!=y&&v&&""!=b&&p&&""!=h&&u||($(".dob").val(""),$(".dob").addClass("error"),j=!1);""!=_&&m||($("#email").val(""),$(".email").addClass("error"),j=!1);""==t&&($(".co_borrower_monthly_income").addClass("error"),$("#co_borrower_monthly_income").val(""),j=!1);""!=country_name&&0!=country_name||($(".country_name").addClass("error"),$("#country_name").val(""),j=!1);""==C&&($(".course_name").addClass("error"),j=!1);""!=f&&0!=f||($(".course_type").addClass("error"),$("#course_type").val(""),j=!1);""!=g&&0!=g||($(".city_name").addClass("error"),$("#city_name").val(""),j=!1);""!=w&&k||($("#mobile_number").val(""),$(".mobile_number").addClass("error"),j=!1);""!=r&&void 0!==r||($(".radio-gender").addClass("error"),j=!1);""!=o&&void 0!==o||($(".co_borrower_relationship_id").addClass("error"),j=!1);""!=a&&void 0!==a||($(".co_borrower_employment_type_id").addClass("error"),j=!1);return!!j}($(this));r&&o&&$("#el-form-1").parsley().isValid()&&$("#el-form-2").parsley().isValid()&&t(2)}),$(".graduation_checkbok").click(function(){$("#pg_div").addClass("hide-el"),$("#graduation_div").removeClass("hide-el"),$("#crs-spn").text("Graduation"),$("input[type=radio][name=course_type]:checked").prop("checked",!1)}),$(".pg_checkbok").click(function(){$("#pg_div").removeClass("hide-el"),$("#graduation_div").addClass("hide-el"),$("#crs-spn").text("Post Graduation"),$("input[type=radio][name=course_type]:checked").prop("checked",!1)}),$(".numericOnly").on("keypress keyup blur",function(e){$(this).val($(this).val().replace(/[^\d].+/,"")),(e.which<48||e.which>57)&&e.preventDefault()}),$(".otp_digit_1").keyup(function(e){var r=e.keyCode||e.charCode;8==r||46==r?$(this).val("").removeClass("otp_type_clr"):1==$(this).val().length&&($(".otp_digit_1").removeClass("otp_error").addClass("otp_type_clr"),$(".otp_digit_2").focus())}),$(".otp_digit_2").keyup(function(e){var r=e.keyCode||e.charCode;8==r||46==r?($(this).val(""),$(".otp_digit_1").val("").removeClass("otp_type_clr"),$(".otp_digit_1").focus()):1==$(this).val().length&&($(".otp_digit_2").removeClass("otp_error").addClass("otp_type_clr"),$(".otp_digit_3").focus())}),$(".otp_digit_3").keyup(function(e){var r=e.keyCode||e.charCode;8==r||46==r?($(this).val(""),$(".otp_digit_2").val("").removeClass("otp_type_clr"),$(".otp_digit_2").focus()):1==$(this).val().length&&($(".otp_digit_3").removeClass("otp_error").addClass("otp_type_clr"),$(".otp_digit_4").focus())}),$(".otp_digit_4").keyup(function(e){var r=e.keyCode||e.charCode;8==r||46==r?($(this).val(""),$(".otp_digit_3").val("").removeClass("otp_type_clr"),$(".otp_digit_4").removeClass("otp_type_clr"),$(".otp_digit_3").focus()):$(".otp_digit_4").removeClass("otp_error").addClass("otp_type_clr")}),$(".otp_digit_4").on("keyup",function(){""!=$(".otp_digit_1").val()&&""!=$(".otp_digit_2").val()&&""!=$(".otp_digit_3").val()&&""!=$(".otp_digit_4").val()&&(verifyOTPCode(),$(this).trigger("blur"))}),$("#close-model-otp").click(function(){$("#otp-verification").removeClass("active"),$(".otp_digit_1").val("").removeClass("otp_error otp_type_clr"),$(".otp_digit_2").val("").removeClass("otp_error otp_type_clr"),$(".otp_digit_3").val("").removeClass("otp_error otp_type_clr"),$(".otp_digit_4").val("").removeClass("otp_error otp_type_clr"),$("body").removeClass("ofH p-F")}),verifyOTPCode=function(){$("body").addClass("ofH p-F");var e="mobile_number="+$("#mobile_number").val()+"&otp_code="+($(".otp_digit_1").val()+""+$(".otp_digit_2").val()+$(".otp_digit_3").val()+$(".otp_digit_4").val());$.ajax({type:"POST",url:"/education-loan",data:e+"&step=validate_otp_code",dataType:"json",success:function(e){"success"==e.status?($("body").removeClass("ofH p-F"),$("#el-form-1").hide(),$("#part2").css({opacity:1,height:"auto"}),$("#otp-verification").removeClass("active"),function(){try{_pb_tracker.trackEvent(["clevertab"],"EL_VERIFIED_OTP",{verfied:""})}catch(e){}}(),r()):"error"==e.status&&($(".otp_digit_1").val("").addClass("otp_error").removeClass("otp_type_clr"),$(".otp_digit_2").val("").addClass("otp_error").removeClass("otp_type_clr"),$(".otp_digit_3").val("").addClass("otp_error").removeClass("otp_type_clr"),$(".otp_digit_4").val("").addClass("otp_error").removeClass("otp_type_clr"),$("#error_otp").removeClass("hide"),$(".otp_digit_1").focus())}})},sendOTPCode=function(e){$.ajax({type:"POST",url:"/education-loan",data:"mobile_number="+e+"&step=otp_code",dataType:"json",success:function(e){"success"==e.status||e.status}})},$(document).on("click","#request_otp_again",function(){$("#request_otp_again").hide(),$("#not_receive_otp").show(),$(".otp_digit_1").val("").removeClass("otp_error").focus(),$(".otp_digit_2").val("").removeClass("otp_error"),$(".otp_digit_3").val("").removeClass("otp_error"),$(".otp_digit_4").val("").removeClass("otp_error"),$.ajax({type:"POST",url:"education-loan",data:"step=resend_code",dataType:"json",success:function(e){"success"==e.status?($("#not_receive_otp").show(),$("#request_otp_again").show(),setTimeout(function(){$("#resend_validator").html("<span>SMS has been sent. Please verify with OTP code</span>")},1e3)):"error"==e.status&&($("#not_receive_otp").show(),$("#request_otp_again").show())}})})});