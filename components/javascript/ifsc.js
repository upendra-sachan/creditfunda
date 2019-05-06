// When the DOM is ready, run this function
$(document).ready(function() {

/*logo Hover*/	
	$("a.logo").mouseover(function(){
		$(this).find("label").stop().fadeIn( 500 );
		$(this).find("img").stop().fadeOut( 500 );
	});
	$("a.logo").mouseout(function(){
		$(this).find("label").stop().fadeOut( 500 );
		$(this).find("img").stop().fadeIn( 500 );
	});
	
	
	$(".bankfaqsClick").click(function(){
		$("#banknews").css("display", "none");
		$("#bankfaqs").css("display", "block");
		$(".bankfaqsClick").parent().addClass("active");
		$(".banknewsClick").parent().removeClass("active");
	});
	$(".banknewsClick").click(function(){
		$("#banknews").css("display", "block");
		$("#bankfaqs").css("display", "none");
		$(".bankfaqsClick").parent().removeClass("active");
		$(".banknewsClick").parent().addClass("active");
	});
	
	
        
/**
 * Remove Selected class when user change the select value
 * */

        $(".bankDetail select").click(function(){
            $(this).removeClass('selectActive');
        });
/**
 * End Remove Selected class when user change the select value
 * */
});


