//Update 7-06-17 by Joseph Banegas
/* 
- Changed To OO format
- to call methods use webinarLibrary.method
*/
/* global $ */

$(document).ready(function() {

    /*
    |-----------------------------------------------------------
    |  jquery Cache Selectors
    |-----------------------------------------------------------
    */

    const $table = $('table');
    const $fixed = $(".fixed");
    const $webinar = $(".webinar");
    const $noResults = $(".no-results");
    const $makeSelection = $(".make-selection");
    const $uncheck = $(".uncheck");


    /*
    |-----------------------------------------------------------
    |  Add Checkboxes
    |-----------------------------------------------------------
    */
    var webinarLibrary = {
        'itemCount': (arr, el) => {
            let count = {};
            arr.forEach(function(item) {
                count[item] = count[item] ? count[item] + 1 : 1;
            });
            return count[el];
        },

        'addTotalCount': () => {
            const totCount = $('#webinar tr').length - 2;
            const visibleRow = $("tbody tr:visible");
            const countNum = $(".countNum");
            $fixed.find(".count").length === 0 ? $fixed.append("<div class='count'>Displaying <span class='countNum'>" + visibleRow.length + "</span> of " + totCount + "</div>") : false;
            return visibleRow.is(".make-selection, .no-results") ? countNum.html(0) : $(".countNum").html(visibleRow.length);
        },

        'addCheckbox': el => {
            let $filterClass = $("." + el);
            let mappedArr = $filterClass.map(function(index, item, self) {
                return item.innerHTML;
            }, []).get()

            let checkBoxNames = mappedArr.filter((item, index, self) => {
                return self.indexOf(item) === index;
            });

            let isNumericString = checkBoxNames.filter(function(i) {
                            return !isNaN(i);
                        }).length > 0;

                        if (isNumericString) {
                            checkBoxNames = checkBoxNames.sort(function(a, b) {
                                return a - b;
                            });
                            checkBoxNames.forEach(function(item) {
                                return $fixed.prepend("<label>" + "<input type='checkbox' name='" + $filterClass[0].className + "' value='" + item + "'/>" + item + "<span style='font-size:10px; padding:0; margin:0;'>(" + webinarLibrary.itemCount(mappedArr, item) + ")</span>" + "</label>");
                            });
                        }
                        else {
                            checkBoxNames = checkBoxNames.sort(function(a, b) {
                                if (a < b) {
                                    return 1;
                                }
                                else if (a > b) {
                                    return -1;
                                }
                                return 0;
                            });

                            checkBoxNames.forEach(function(item) {
                                return $fixed.prepend("<label>" + "<input type='checkbox' name='" + $filterClass[0].className + "' value='" + item.toLowerCase().replace(/\s+/g, '-') + "'/>" + item + "<span style='font-size:10px; padding:0; margin:0;'>(" + webinarLibrary.itemCount(mappedArr, item) + ")</span>" + "</label>");
                            });
                        }

                        //Creates title for checkbox groups
                        $fixed.prepend("<br /><h2>Filter by " + $filterClass[0].className.charAt(0).toLocaleUpperCase() + $filterClass[0].className.slice(1) + "</h2>");
        },
        
        'filter': () => {
            window.scrollTo(0, 0);
            let $checkedLength = $("#checkboxes input[type='checkbox']:checked").length;
            $filterCheckboxes.each(function(_) {
                if ($checkedLength > 0) {
                    let selectedFilters = {};
                    $makeSelection.hide();

                    $filterCheckboxes.filter(':checked').each(function() {
                        if (!selectedFilters.hasOwnProperty(this.name)) {
                            selectedFilters[this.name] = [];
                        }
                        selectedFilters[this.name].push(this.value);
                    });

                    // create a collection containing all of the filterable elements
                    let $filteredResults = $webinar;

                    // loop over the selected filter name -> (array) values pairs
                    $.each(selectedFilters, function(name, filterValues) {
                        // filter each .webinar element
                        $filteredResults = $filteredResults.filter(function() {
                            let matched = false,
                                currentFilterValues = $(this).data('category').split(' ');

                            // loop over each category value in the current .webinar's data-category
                            $.each(currentFilterValues, function(_, currentFilterValue) {

                                // if the current category exists in the selected filters array
                                // set matched to true, and stop looping. as we're ORing in each
                                // set of filters, we only need to match once

                                if ($.inArray(currentFilterValue, filterValues) !== -1) {
                                    matched = true;
                                    return false;
                                }
                            });

                            // if matched is true the current .webinar element is returned
                            return matched;
                        });
                    });

                    $webinar.hide().filter($filteredResults).fadeIn(300);
                    webinarLibrary.addTotalCount().delay(500);
                    $table.trigger('applyWidgets');
                    $(".webinar:visible").length === 0 ? $noResults.fadeIn(500) : $noResults.hide();
                    return false;
                }
                else {
                    $webinar.hide();
                    $makeSelection.fadeIn(500);
                }
            });
        },
        'addRowClick': () => {
            $webinar.click(function() {
                    window.location = $(this).find('a').prop('href');
                })
                .hover(function() {
                    $(this).toggleClass('hover').css('cursor', 'pointer');
                });
        },
        'defaultCheck': () => {
            var $checkBoxes = $("#checkboxes input[type='checkbox']");
            if (!$checkBoxes.is(":checked", false)) {
                $checkBoxes.prop("checked", true);
            }
        },
        'hideAll': () => {
            $filterCheckboxes.prop("checked", false);
            $webinar.hide();
            $noResults.hide();
            $makeSelection.fadeIn(500);
        },
        'showAll': () => {
            $filterCheckboxes.prop("checked", true);
            $noResults.hide();
            $makeSelection.fadeOut(200);
            $webinar.delay(100).fadeIn(501);
        }
    }

    ///Add chkbx by calling class
    webinarLibrary.addCheckbox("year")
    webinarLibrary.addCheckbox("practice")
    webinarLibrary.addTotalCount();
    webinarLibrary.addRowClick();
    webinarLibrary.defaultCheck();

    /*
    |-----------------------------------------------------------
    |  Filter Items From Table
    |-----------------------------------------------------------
    */

    //Checkbox Change Function	
    let $filterCheckboxes = $("#checkboxes input[type='checkbox']");

    $uncheck.click(() => {
        window.scrollTo(0, 0);
        if ($filterCheckboxes.is(":checked")) {
            return webinarLibrary.hideAll();
        }
        else {
            webinarLibrary.showAll();
        }
        webinarLibrary.addTotalCount().delay(50);
    });

    $filterCheckboxes.on('change', webinarLibrary.filter);

    //!!	Table Sort should always be after headers have been called	!!
    $table.tablesorter({
        sortList: [
            [0, 0]
        ],
        widgets: ["zebra"],
        widgetOptions: {
            zebra: ['stripe', 'nostripe']
        }
    });
});