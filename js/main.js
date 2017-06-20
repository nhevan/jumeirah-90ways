
function main() {

    (function() {
        'use strict';

        $('a.page-scroll').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 40
                    }, 900);
                    return false;
                }
            }
        });

        // affix the navbar after scroll below header
        $('#nav').affix({
            offset: {
                top: $('header').height()
            }
        });

        // skills chart
        $(document).ready(function(e) {
            //var windowBottom = $(window).height();
            var index = 0;
            $(document).scroll(function() {
                var top = $('#skills').height() - $(window).scrollTop();
                console.log(top)
                if (top < -300) {
                    if (index == 0) {

                        $('.chart').easyPieChart({
                            easing: 'easeOutBounce',
                            onStep: function(from, to, percent) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }
                        });

                    }
                    index++;
                }
            })
            //console.log(nagativeValue)
        });


        // Restaurant isotope filter
        $(window).load(function() {
            var $container = $('.restaurant-items');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            $('.cat a').click(function() {
                $('.cat .active').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });

        });


        // CounterUp
        $(document).ready(function($) {
            if ($("span.count").length > 0) {
                $('span.count').counterUp({
                    delay: 10, // the delay time in ms
                    time: 1500 // the speed time in ms
                });
            }
        });


        // Pretty Photo

        if ($(window).width() >= 768) { //disable prettyPhoto in mobile version
            $("a[rel^='prettyPhoto']").prettyPhoto({
                social_tools: false
            });
        }
        /*
         
         $("a[rel^='prettyPhoto']").prettyPhoto({
         social_tools: false
         });	
         */

// code added by shakil


//search in isotope

	// quick search regex
		var qsRegex;
		
		
		// use value of search field to filter
		var $quicksearch = $('.quicksearch').keyup( debounce( function() {
		  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		  var $grid = $('.restaurant-items').isotope({
		  itemSelector: '.restaurant-item',
		  layoutMode: 'fitRows',
		  filter: function() {
		    return qsRegex ? $(this).text().match( qsRegex ) : true;
		  }
		});
		}, 200 ) );
		
		// debounce so filtering doesn't happen every millisecond
		function debounce( fn, threshold ) {
		  var timeout;
		  return function debounced() {
		    if ( timeout ) {
		      clearTimeout( timeout );
		    }
		    function delayed() {
		      fn();
		      timeout = null;
		    }
		    timeout = setTimeout( delayed, threshold || 100 );
		  }
		}

// end search code


        $(document).ready(function() {
            $('#filter').on('click', function() {
                $(".categories").toggle('slow');
            });
        });

        $(document).ready(function() {
            if ($(window).width() < 768) {
                $('.hover-text').addClass('mobile-hover');
                $('.hover-text').removeClass('hover-text');

                $('.restaurant-item a').attr('href', '#');

                $('.my_modal').on("click", function(e) {
                    e.preventDefault();

                    var res_detail = $(this).attr('title');
                    var res_desc = $(this).find('img').attr('alt');
                    var res_title = $(this).find('h4').text();

                    $(".modal-header .modal-title").html(res_title);

                    $(".modal-body .restaurant_desc").html(res_desc);
//                     $(".modal-body .restaurant_detail").html(res_detail);

                    $(".res-title").css("display", "none");

                    $('#myModal').modal('show');

                });

            }


        });



    }());


}
main();