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

    $("form").keypress(function (e) {
        //Enter key
        if (e.which == 13) {
            return false;
        }
    });

    $(document).on('hover', '.disabled-date', function () {
        $('.disabled-date').attr('title', ' <i class="fa fa-calendar-times-o" aria-hidden="true"></i> Dealer not available');
        $('.disabled-date').attr('data-toggle', 'tooltip');
        $('.disabled-date').attr('data-placement', 'left');
        $('.disabled-date').attr('data-html', 'true');
    });


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
        disableThemeButton("#submitButtonForm1");
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

    $(document).on('keydown keyup', '#Otp', function () {
        if (obj.value.length > 3) {
            setCaretPosition(obj, 3);
        }
    });

    function setCaretPosition(elem, caretPos) {
        if (elem != null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }

    $(document).on('keyup keypress change', '#serviceBookingForm2 input', function () {
        if ($("#serviceBookingForm2").valid()) {
            enableThemeButton("#submitButtonForm2");
        } else {
            disableThemeButton("#submitButtonForm2");
        }
    });

    $(document).on('click', '#submitButtonForm2', function () {
        disableThemeButton("#submitButtonForm2");
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
        //console.log(`Name : ${name} Price ${price} serviceId ${serviceId} categoryId ${categoryId}`);
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

    $(document).on('keyup', '#serviceSearch', function () {
        $('#searchResults').html('');
        if ($('#serviceSearch').val().trim().length > 0) {
            $('#servicesContainer').addClass('d-none');
            $('#searchResults').removeClass('d-none');
        } else {
            $('#servicesContainer').removeClass('d-none');
            $('#searchResults').addClass('d-none');
        }
        for (let i = 0; i < ServiceList.length; i++) {
            if (ServiceList[i].Name.toLowerCase().includes($('#serviceSearch').val().toLowerCase())) {
                var checked = ""
                if ($('#category' + ServiceList[i].ServiceGroupServiceGroupId + 'service' + ServiceList[i].ServiceId).not(':checked').length == 0) {
                    checked = 'checked';
                }
                $('#searchResults')
                    .append('<div class="form-group m-0 d-flex justify-content-between">'
                        + '<div id="searcQuerycategory' + ServiceList[i].ServiceGroupServiceGroupId + 'service' + ServiceList[i].ServiceGroupServiceGroupId + 'description"'
                        + 'class="custom-control custom-checkbox" data-toggle="tooltip"'
                        + 'data-placement="left" title="' + ServiceList[i].ServiceDetailModels[0].Description + '">'
                        + '<input type="checkbox" class="custom-control-input" '
                        + checked
                        + ' onClick="$(\'#category' + ServiceList[i].ServiceGroupServiceGroupId + 'service' + ServiceList[i].ServiceId + '\').click();" '
                        + 'id="searcQuerycategory' + ServiceList[i].ServiceGroupServiceGroupId + 'service' + ServiceList[i].ServiceId + '"/>'
                        + '<label class="custom-control-label"'
                        + 'id="searcQuerycategory' + ServiceList[i].ServiceGroupServiceGroupId + 'service' + ServiceList[i].ServiceId + 'name"'
                        + 'for="searcQuerycategory' + ServiceList[i].ServiceGroupServiceGroupId + 'service' + ServiceList[i].ServiceId + '">' + ServiceList[i].Name + '</label>'
                        + '</div>'
                        + '<small >' + ServiceList[i].Cost + '<i class="fa fa-inr" aria-hidden="true"></i> </small>'
                        + '</div>');
            } else {

            }
        }
    });

    $(document).on('click', '#submitButtonForm4', function () {
        disableThemeButton('#submitButtonForm4');
        if (DealerList == null) {
            getDealerList();
        } else {
            if($('#DealerId').val().length != 0){
                getDisabledDates();
            }
            enableThemeButton('#submitButtonForm4');
            $('#collapseButton4').click();
        }
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
            enableThemeButton("#submitButtonForm5");
            enableCollapseButton("#collapseButton5");            
            $("#collapseButton5").click();            
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
            getLocationForPickUp();
            $('#DisplayPickUpMap').click();
            PickUp = true;
        }
    });

    $(document).on('change', '#DropToggle', function () {
        if (Drop) {
            Drop = false;
        } else {
            getLocationForDrop();
            $('#DisplayDropMap').click();
            Drop = true;
        }
    });

    var geoCoders = $('.mapboxgl-ctrl-geocoder input');

    geoCoders[0].addEventListener('change', function () {
        reverseGeoCode(PickUpMarker, geoCoders[0].value, PickUpMap, DragEndForPickUp, '#PickUpAddress', '#PickUpCoord');
    });

    geoCoders[1].addEventListener('change', function () {
        reverseGeoCode(DropMarker, geoCoders[1].value, DropMap, DragEndForDrop, '#DropAddress', '#DropCoord');
    });

    $(document).on('click', '#submitButtonForm6', function () {
        if ($('#serviceBookingForm6').valid()) {
            console.log('Form is valid');
            if (PickUp && $('#PickUpAddress').val().length < 5) {
                console.log('Pickup Added' + $('#PickUpAddress').length);
                showToast('Error', 'Please enter a valid pick up address');
            } else {
                console.log('Pickup Added' + $('#PickUpAddress').length);                
            }
            if (Drop && $('#DropAddress').val().length < 5) {
                console.log('Drop Added' + $('#DropAddress').length);
                showToast('Error', 'Please enter a valid drop address');
            } else {
                console.log('Drop Added' + $('#DropAddress').length);
                showSummary();
                $('#DisplaySummaryButton').click();
            }
        } else {
            showToast('Error', 'Please fill in all details.');
        }
    });
    //===================================================
    //Form 6 Validation and Flow Control Starts From Here
    //===================================================

    //===================================================
    //Form 7 Validation and Flow Control Starts From Here
    //===================================================
    $(document).on('click', '#submitButtonForm7', function () {
        addAppointment();
    });
    //===================================================
    //Form 7 Validation and Flow Control Ends From Here
    //===================================================

});