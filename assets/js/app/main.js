import * as variables from './variables.js';
import * as functions from './functions.js';
import * as ajax from './ajax.js';

Object.entries(variables).forEach(([name, exported]) => window[name] = exported);
Object.entries(functions).forEach(([name, exported]) => window[name] = exported);
Object.entries(ajax).forEach(([name, exported]) => window[name] = exported);

$(function () {

    //=============================================
    //Intialization Functions For Form Flow Control
    //=============================================
    init();
    
    $(document).on('keydown keyup', '#Otp', function () {
        if (obj.value.length > 3) {
            setCaretPosition(obj, 3);
        }
    });

    function setCaretPosition(elem, caretPos) {
        if(elem != null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }

    $(document).on('click', '.collapse-button-enabled', function () {

        let elementId = '#' + this.id;
        let dataTartgetId = $(elementId).attr('data-target');
        let visiableFrames = $('.form-frame');

        if ($(dataTartgetId).hasClass('fade')) {
            $(dataTartgetId).removeClass('fade');
            $(dataTartgetId).addClass('show');
        }

        for (let i = 0; i < visiableFrames.length; i++) {
            if ($('#' + visiableFrames[i].id).hasClass('show') && '#' + visiableFrames[i].id != dataTartgetId) {
                $('#' + visiableFrames[i].id).removeClass('show')
                $('#' + visiableFrames[i].id).addClass('fade');
                enableCollapseButton($('#' + visiableFrames[i].id).attr('data-control'));
            }
        }

    });

    //===================================================
    //Form 1 Validation and Flow Control Starts From Here
    //===================================================
    $("#serviceBookingForm1").validate({
        rules: {
            Email: {
                required: true
            }
        },
        messages: {
            Email: {
                required: "Please enter your email-id."
            }
        },
        success: function () {
            enableThemeButton("#submitButtonForm1");
        }
    });

    $(document).on('keyup keypress change', '#serviceBookingForm1 input', function () {
        if ($("#serviceBookingForm1").valid()) {
            enableThemeButton("#submitButtonForm1");
        } else {
            disableThemeButton("#submitButtonForm1");
        }
    });

    $(document).on('click', '#submitButtonForm1', function () {
        sendOtp();
    });
    //=================================================
    //Form 1 Validation and Flow Control Ends From Here
    //=================================================




    //===================================================
    //Form 2 Validation and Flow Control Starts From Here
    //===================================================
    $("#serviceBookingForm2").validate({
        rules: {
            Otp: {
                required: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            Otp: {
                required: "Please enter the OTP.",
                minlength: "OTP must be of 4 digits.",
                maxlength: "OTP must be of 4 digits."
            }
        },
        success: function () {
            enableThemeButton("#submitButtonForm2");
        },
    });

    $(document).on('keyup keypress change', '#serviceBookingForm2 input', function () {
        if ($("#serviceBookingForm2").valid()) {
            enableThemeButton("#submitButtonForm2");
        } else {
            disableThemeButton("#submitButtonForm2");
        }
    });

    $(document).on('click', '#submitButtonForm2', function () {
        verifyOtp();
    });
    //=================================================
    //Form 2 Validation and Flow Control Ends From Here
    //=================================================





    //===================================================
    //Form 3 Validation and Flow Control Starts From Here
    //===================================================
    $(document).on('click', '.vehicle-card', function () {
        let elements = $('.vehicle-card');
        for (let i = 0; i < elements.length; i++) {
            if ($(elements[i]).hasClass('selected-vehicle-card')) {
                $(elements[i]).removeClass('selected-vehicle-card');
                $(elements[i]).addClass('not-selected-vehicle-card');
            }
        }
        if ($(this).hasClass('not-selected-vehicle-card')) {
            $(this).removeClass('not-selected-vehicle-card');
            $(this).addClass('selected-vehicle-card');

        }
        $("#VehicleId").val($(this).attr('data-provide'));
        enableThemeButton('#submitButtonForm3');
    });


    $(document).on('change', '#serviceBookingForm3 select', function () {
        if ($("#serviceBookingForm3").valid()) {
            enableThemeButton("#submitButtonForm3");
        } else {
            disableThemeButton("#submitButtonForm3");
        }
    });

    $(document).on('click', '#submitButtonForm3', function () {
        disableThemeButton("#submitButtonForm3");
        if (ServiceList == null) {
            getServiceGroupList();
        } else {
            enableThemeButton("#submitButtonForm3");
            $('#collapseButton3').click();
        }
    });
    //=================================================
    //Form 3 Validation and Flow Control Ends From Here
    //=================================================



    //===================================================
    //Form 4 Validation and Flow Control Starts From Here
    //===================================================
    $("#serviceBookingForm4").validate({
        rules: {
            SelectedServices: {
                required: true
            },
            TotalCost: {
                required: true,
                range: [500, 2147483647]
            }
        },
        messages: {
            SelectedServices: {
                required: "Please select any services"
            },
            TotalCost: {
                required: "",
                range: "Total bill amount needs to be atleast greater than 500"
            }
        },
    });

    $(document).on('click', '.service-checkbox', function () {

        //get all data for selected service
        var name = $('#' + this.id + 'name').html();
        var price = $('#' + this.id + 'price').html();
        var serviceId = $('#' + this.id).attr('service-id');
        var categoryId = $('#' + this.id).attr('category-id');
        //if checkbox was checked 
        if ($(this).prop("checked") == true) {
            //select that service
            selectService(serviceId, categoryId, name, price);
        } else if ($(this).prop("checked") == false) {
            //diselect that service
            diselectService(serviceId, categoryId, price);
        }
        //after each checkbox click validate the form 
        if ($("#serviceBookingForm4").valid()) {
            enableThemeButton("#submitButtonForm4");
        } else {
            disableThemeButton("#submitButtonForm4");
        }

    });

    $(document).on('click', '#submitButtonForm4', function () {
        if (DealerList == null) {
            getDealerList();
        }
        $('.mapboxgl-canvas').css('width', '100%');
        $('.mapboxgl-canvas').css('height', '100%');
    });
    //=================================================
    //Form 4 Validation and Flow Control Ends From Here
    //=================================================



    //===================================================
    //Form 5 Validation and Flow Control Starts From Here
    //===================================================
    $(document).on('mouseover', '.dealer-item', function () {
        var dealerId = $(this).children(':first').children(':first').attr('dealer-id')
        let response = DealerList.filter(item => item.DealerId == dealerId)
        DealerPopUp
            .setLngLat([response[0].Long, response[0].Lat])
            .setHTML(
                ' <span> <i class="fa fa-wrench mx-2" aria-hidden="true"></i>'
                + response[0].Name + '<span><br>'
                + '<span> <i class="fa fa-phone mx-2" aria-hidden="true"></i>'
                + response[0].ContactNo + '<span><br>'
                + '<span> <i class="fa fa-location-arrow mx-2" aria-hidden="true"></i>'
                + response[0].Address + '<span>').addTo(DealerListMap);
        DealerListMap.flyTo({ center: [response[0].Long, response[0].Lat] });
    });

    $(document).on('click', '.dealer-checkbox', function () {
        //get all data
        var elementId = this.id;
        parseServices();
        var dealerId = $('#' + elementId).attr('dealer-id');
        //set hidden fields
        $("#DealerId").val(dealerId);
        getDisabledDates();
        enableThemeButton("#submitButtonForm5")
        $('.dealer-checkbox').each(function () {
            if (this.id == elementId) {
                $('#' + this.id).prop("checked", true);
            } else {
                $('#' + this.id).prop("checked", false);
            }
        });
    });

    $(document).on('changeDate', '#date-picker', function () {
        $('#PlanDateTime').val($('#date-picker').datepicker('getFormattedDate'));
        $('.disabled-date').attr('title', ' <i class="fa fa-calendar-times-o" aria-hidden="true"></i> Dealer not available');
        $('.disabled-date').attr('data-toggle', 'tooltip');
        $('.disabled-date').attr('data-placement', 'left');
        $('.disabled-date').attr('data-html', 'true');
    });

    $(document).on('click', '#submitButtonForm5', function () {
        disableThemeButton("#submitButtonForm5");
        if ($('#PlanDateTime').val().length == 0) {
            enableThemeButton("#submitButtonForm5");
            showToast('Error', 'Select a valid date for your appointment');
        } else {
            enableCollapseButton("#collapseButton5");
            $("#collapseButton5").click();
            disableThemeButton("#submitButtonForm5");
        }
    });
    //===================================================
    //Form 5 Validation and Flow Control Starts From Here
    //===================================================



    //===================================================
    //Form 6 Validation and Flow Control Starts From Here
    //===================================================
    $("#serviceBookingForm6").validate({
        rules: {
            ContactNo: {
                required: true,
                maxlength: 10,
                minlength: 10
            },
            ContactPerson: {
                required: true
            }
        },
        messages: {
            ContactNo: {
                required: "Please enter contact no.",
                maxlength: "Please enter a valid number",
                minlength: "Please enter a valid number"
            },
            ContactPerson: {
                required: "Please enter contact person name",
            }
        },
    });

    $(document).on('keypress keyup input', '#serviceBookingForm6 input', function () {
        if ($("#serviceBookingForm6").valid()) {
            enableThemeButton("#submitButtonForm6");
        } else {
            disableThemeButton("#submitButtonForm6");
        }
    });

    $(document).on('change', '#PickUpToggle', function () {
        if (PickUp) {
            PickUp = false;
        } else {
            PickUp = true;
        }
    });

    $(document).on('change', '#DropToggle', function () {
        if (Drop) {
            Drop = false;
        } else {
            Drop = true;
        }
    });

    $(document).on('change', '.mapboxgl-ctrl-geocoder input', function (e) {
        if (PickUpAddressConfirmed) {
            reverseGeoCode(variables.DropMarker, $('.mapboxgl-ctrl-geocoder input').val(), '#DropAddress', '#DropCoord');
        } else {
            reverseGeoCode(variables.PickUpMarker, $('.mapboxgl-ctrl-geocoder input').val(), '#PickUpAddress', '#PickUpCoord');
        }
    });

    $(document).on('click', '#submitButtonForm6', function () {
        if ($('#serviceBookingForm6').valid()) {
            console.log('Form is valid');
            if (PickUp && $('#PickUpAddress').length > 5) {
                console.log('Pickup Added' + $('#PickUpAddress').length);
                showToast('Error', 'Please enter a valid pick up address');
            } else {
                console.log('Pickup Added' + $('#PickUpAddress').length);
                if (Drop && $('#DropAddress').length > 5) {
                    console.log('Drop Added' + $('#DropAddress').length);
                    showToast('Error', 'Please enter a valid drop address');
                } else {
                    console.log('Drop Added' + $('#DropAddress').length);
                    showSummary();
                    $('#DisplaySummaryButton').click();
                }
            }
        } else {
            showToast('Error', 'Please fill in all details.');
        }
    });


    //TODO
    // Add function to get user locations validate the     
    //data and add ajax call to post the appointment    
    //User following Data ids to get all the form data

    //#Email  
    //#Otp
    //#LicensePlateNumber
    //#SelectedServices
    //#TotalCost
    //#BrandName
    //#ModelName
    //#DealerId
    //#PlanDateTime
    //#PickUpAddress
    //#DropAddress
    //#CustomerNote

    //===================================================
    //Form 6 Validation and Flow Control Starts From Here
    //===================================================

});