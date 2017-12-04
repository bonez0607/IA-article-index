 /*
        
         |||||||||     ||      |||||    |||      ||||||
            |||      ||||||    ||  ||   |||      |||
            |||     |||  |||   ||||||   |||      |||||
            |||     ||||||||   ||   ||  |||      |||
            |||     |||  |||   ||||||   |||||||  |||||||

  


    $(".no-results, .make-selection").hide();
    $(".filter").on('input', function() {
        var filter = $(this).val(),
            count = 0,
            $row = $("#article-library tbody .item"),
            $tbody = $("#article-library tbody");


        $(".no-results").hide();

        $row.each(function() {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
                setTimeout(function() {
                    if (count === 0) {
                        $('.no-results').show();
                    }
                }, 500);
            }
            else {
                $(this).show();
                count++;
                $('.countNum').text(count);
            }
        });

        $tbody.unmark({
            done: function() {
                $tbody.mark(filter, {
                    "separateWordSearch": false,
                    "className": "highlight"
                });
            }

        });

    });


        |-------------------------------------------------------------
        |  Counter Functions
        |-----------------------------------------------------------
        

        function addCounter() {
            const totCount = $('#article-library tbody tr').length;
            const visibleRow = $("tbody tr:visible");
            const countNum = $(".countNum");

            $('.count').append("<p style='padding:10px'>Displaying <span class='countNum'>" + visibleRow.length + "</span> of " + totCount + " articles</p>");
            return visibleRow.is(".make-selection, .no-results") ? countNum.html(0) : $(".countNum").html(visibleRow.length);
        }

        addCounter();

        function updateCounter() {
            const visibleRow = $("tbody tr:visible");
            return $(".countNum").html(visibleRow.length)
        }

     
        |-----------------------------------------------------------
        |  Sorting Functions
        |-----------------------------------------------------------
        

        $('#article-library').tablesorter({
            headers: {
                0: {
                    sorter: false

                }
            }
        });




        |-----------------------------------------------------------
        |  Pagination Tables


        function paginate(min, max) {
            max = parseInt(max);
            min = parseInt(min);

            $('tbody tr').hide();
            $('tbody tr').slice(min, max).show();

        }


        $('.page-select').on('change', function(e) {
            var value = $(e.target).val(),
                pages = Math.ceil($('tr').length / value);

            const $pagination = $('.pagination');

            $pagination.html("")

            if (value === "All") {
             value = 55;   
            }
                var i = 0;
                while (i < pages) {
                    let pageVal = (i) * value;
                    $pagination.append("<button value='" + pageVal + "' class='pages'>" + (i + 1) + "</button>")
                    i++
                }

            paginate(0, value);
            updateCounter();
        })
            |-----------------------------------------------------------
        */
