$(document).ready(function () {
    $("#country_name").select2({
        placeholder: 'Select a country',
    });
    $("#city_name").select2({
        placeholder: 'Select city'
    });

    $("select").on("select2:open", function (event) {
        $(".select2-container.select2-container--default.select2-container--open").addClass(event.currentTarget.id + "_list");
        $('input.select2-search__field').attr('placeholder', 'Type here to search');
        $(".select2-search.select2-search--dropdown").after("<span class='cross-popup'></span>");
    });
    $("body").on('click', '.cross-popup', function () {
        $(this).remove();
        $('#country_name').select2('close');
        $('#city_name').select2('close');
    });
    //var wow = new WOW().init();
});