$(document).ready(function () {
    //TOGGLES DRAWER CLOSED
    function toggleDrawer(){
        $('#drawer, #map').toggleClass("drawerOpen");
        $('#search_stores_nav').toggleClass("selected");

    }
    function toggleIcons(){
        $('.expandable').on('click',(function(e){
            e.preventDefault();
            $(this).find("span").toggleClass("glyphicon-plus");
            $(this).find("span").toggleClass("glyphicon-minus");

        }));
    }
        $('#m_map,  #search_stores_nav').on('click',(function(){
            toggleDrawer();
        }));
    $('#filterToggle span').on('click',(function(){
        $(this).toggleClass("glyphicon-plus");
        $(this).toggleClass("glyphicon-minus");
        //Added this to toggle extra search button visibility 10-13-14
        $('.form .buttonWrapper').toggle("blind", "fast");
    }));

    //modified this function 10/16/14
    function toggleChevron( ) {
        $(this).find("i.indicator").toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('.accordion-toggle').on('click', toggleChevron);


    //add slider to distance filter
    var sliderAmountMap = [ 5, 10, 20, 30, 50, 100, 500];
        $( "#slider" ).slider({
            value: 1, //array index of onload selected default value on slider, for example, 45000 in same array will be selected as default on load
            min: 0, //the values will be from 0 to array length-1
            max: sliderAmountMap.length-1, //the max length, slider will snap until this point in equal width increments
            slide: function( event, ui ) {
                $( "#distance" ).val(sliderAmountMap[ui.value]+" miles" );
            }
        });
        $( "#distance" ).val(sliderAmountMap[$( "#slider" ).slider( "value")]+" miles" );

//DELETED COMMENTED CODE

// add polyfills
    var myPoly = function(){
    //REMOVED DATEPICKER FROM THIS POLYFILL FUNCTION
        $('.filters #slider').draggable();
    }
    Modernizr.load({
        test:  Modernizr.touch,
        nope:[ 'scripts/jquery.ui.touch-punch.min.js'],
        complete: function(){
            myPoly
        }

    });
    //ADDED THE FOLLOWING FOR NEW JQUERY UI DATE PICKER 10-16-14
    $(function() {
        $( "#from" ).datepicker({
            minDate: new Date(),
            defaultDate: "+1w",
            changeMonth: true,
            onSelect: function( selectedDate ) {
                $( "#to" ).datepicker( "option", "minDate", selectedDate );
            }

        });
        $( "#to" ).datepicker({

            minDate: new Date(),
            changeMonth: true,
            onSelect: function( selectedDate ) {
                $( "#from" ).datepicker( "option", "maxDate", selectedDate );
            }

        });
    });

    $("#side_bar a.classDetails").on("click", function(e){
        e.preventDefault();
        setTimeout(toggleBounce, 1500);
        if($("#map").css("position") == 'absolute'){
            $('#drawer, #map').toggleClass("drawerOpen");
            $('#search_stores_nav').toggleClass("selected");
        }
    });

});


