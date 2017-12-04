/*global $*/

(function($) {

    function preload(arrayOfImages) {
        $(arrayOfImages).each(function() {
            $('<img />').attr('src', this).appendTo('body').hide();
        });
    }

    preload([
        "/img/arrow-down.svg",
        "/img/arrow-up.svg",
        "/img/list-hover.svg",
        "/img/grid-hover.svg"

    ]);


    var $articleLibrary = $("#article-library"),
        $pageNumberSelect = $('.page-select'),
        $sortOptions = $('.sort-options'),
        $searchBar = $('.filter'),
        $pagination = $('.pagination'),
        $articleTitle = $('.article-title'),
        $card = $('.card'),
        $toggleBtn = $('.btn-view'),
        card = '.card';

    /* 
    
        CUSTOM JQUERY FUNCTIONS
    
    */
    $.fn.extend({
        clickableCard: function() {
            $(this).css('cursor', 'pointer');

            $('body').on('click', '.' + this[0].classList.value, function(e) {
                var url = this.querySelectorAll('a')[0].href;
                var newWnd = window.open(url);
                newWnd;
                newWnd.opener = null;
            });
            return this;
        },

        addCounter: function(element) {
            const totCount = this.totCount('.card');
            var count = 0;

            this.each(function(i, el) {
                if (!el.hidden) {
                    count++;
                }
                else {
                    count--;
                }
            });

            $('.count').append("<p>Displaying <span class='countNum'>" + count + "</span>&nbsp;of " + totCount + " articles</p>");
            return this;
        },

        totCount: function(element) {
            return $(element).length;
        },

        updateCounter: function(count, val) {
            return count !== 0 ? $(".countNum").html(val + "-" + count) : $(".countNum").html(count);
        },

        filterOn: function(evt) {

            $(this).on(evt, function() {
                var filter = $(this).val(),
                    count = 0;

                $card.each(function(i, el) {
                    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                        $(this).fadeOut();
                    }
                    else {
                        $(this).show();
                        count++;
                    }
                });


                count !== 0 ? $.fn.updateCounter(count, 1) : $.fn.updateCounter(count, 0);

                $articleLibrary.unmark({
                    done: function() {
                        $articleLibrary.mark(filter, {
                            "separateWordSearch": false,
                            "className": "highlight"
                        });
                    }
                });
            });


        },

        toggleView: function(e) {
            $(this).on('click', function(e) {
                var val = $(e.target).val(),
                    $lastRow = $('.card:last-child');

                if (val === "list") {
                    $card.css('flex', '1 1 100%');
                    $lastRow.css('flex', '1');
                }
                else if (val === "grid") {
                    $card.css('flex', '1 1 48.25%');
                    $lastRow.css('flex', '0 1 49.25%');
                }
            });

        },


        /*--------------------------------
        
            PAGINATION
            
        ----------------------------------*/

        paginate: function(min, max, element) {

            var count;
            max = parseInt(max, 10);
            min = parseInt(min, 10);

            $(element).hide();
            $(element).slice(min, max).show();

            count = $(card + ':visible').length;
            $.fn.updateCounter(count, 1);

            return this;
        },

        navigatePages: function() {

            $(this).on('click', '.pages', function() {
                var itemsPerPage = $pageNumberSelect.val(),
                    max = parseInt($(this).val(), 10) * itemsPerPage,
                    min = max - itemsPerPage;

                $card.hide();
                $card.slice(min, max).show();

                if (max > $card.length) {
                    max = $card.length;
                }

                $.fn.updateCounter(max, (min + 1));
            });

            return this;
        },

        resultsPerPage: function() {
            $(this).on('change', function(e) {
                var value = $(e.target).val(),
                    pages = Math.ceil($(card).length / value);

                $pagination.html("");

                if (value === "All") {
                    value = $.fn.totCount('.card');
                }

                var i = 0;
                while (i < pages) {
                    let pageNum = i + 1;
                    $pagination.append("<button value='" + pageNum + "' class='pages'>" + pageNum + "</button>");
                    i++;
                }
                
                $('.pages:first-child').addClass('active');
                $pagination.on('click', '.pages', function(e) {
                    $(e.target).addClass('active');
                    $(e.target).siblings().removeClass('active');
                });
                
                $pagination.navigatePages();
                $.fn.paginate(0, value, card);
                return this;
            });
        },


        /*--------------------------------
        
            SORTING LIBRARY
            
        ----------------------------------*/

        getSortOption: function() {

            $(this).on('change', function() {
                var option = $(this).val();
                switch (option) {
                    case "alpha":
                        $card.sortByTitle();
                        break;
                    case "recent":
                        $card.sortNewOld();
                        break;
                    case "old":
                        $card.sortOldNew();
                        break;
                }
            });

        },

        sortByTitle: function() {

            var childArr = $.makeArray(this);

            childArr.sort(function(a, b) {
                var titleA = $(a).find('.article-title').text(),
                    titleB = $(b).find('.article-title').text();

                if (titleA < titleB) { return -1 }
                if (titleA > titleB) { return 1 }
                return 0;

            });

            $articleLibrary.empty();

            childArr.forEach(function(el) {
                $articleLibrary.append(el);
            });
            return this;
        },

        sortNewOld: function() {

            var childArr = $.makeArray(this);

            childArr.sort(function(a, b) {
                var titleA = parseInt($(a).find('.year').text(), 10),
                    titleB = parseInt($(b).find('.year').text(), 10);

                if (titleA > titleB) { return -1 }
                if (titleA < titleB) { return 1 }
                return 0;

            });

            $articleLibrary.empty();

            childArr.forEach(function(el) {
                $articleLibrary.append(el);
            });

            return this;
        },

        sortOldNew: function() {

            var childArr = $.makeArray(this);

            childArr.sort(function(a, b) {
                var titleA = parseInt($(a).find('.year').text(), 10),
                    titleB = parseInt($(b).find('.year').text(), 10);

                if (titleA < titleB) { return -1 }
                if (titleA > titleB) { return 1 }
                return 0;

            });

            $articleLibrary.empty();

            childArr.forEach(function(el) {
                $articleLibrary.append(el);
            });

            return this;
        },
    });


    $card.sortNewOld().clickableCard().addCounter();

    $sortOptions.getSortOption();

    $pageNumberSelect.resultsPerPage();

    $searchBar.filterOn('input');

    $toggleBtn.toggleView();

})($);