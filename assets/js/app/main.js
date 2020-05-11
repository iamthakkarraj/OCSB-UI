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

    $(document).on('keyup keypress blur change', '#serviceBookingForm1 input', function () {
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
                minlength: "OTP must be of 5 digits.",
                maxlength: "OTP must be of 5 digits."
            }
        },
        success: function () {
            enableThemeButton("#submitButtonForm2");
        },
    });

    $(document).on('keyup keypress blur change', '#serviceBookingForm2 input', function () {
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
    $("#serviceBookingForm3").validate({
        rules: {
            LicensePlateNumber: {
                valueNotEquals: "default"
            }
        },
        messages: {
            LicensePlateNumber: {
                valueNotEquals: "Please select your car"
            }
        },
        success: function () {
            enableThemeButton("#submitButtonForm3");
        }
    });

    $(document).on('change', '#serviceBookingForm3 select', function () {
        if ($("#serviceBookingForm3").valid()) {
            updateVehicleDetails($('#LicensePlateNumber').val());
            enableThemeButton("#submitButtonForm3");
        } else {
            disableThemeButton("#submitButtonForm3");
        }
    });

    $(document).on('click', '#submitButtonForm3', function () {
        disableThemeButton("#submitButtonForm3");
        getServiceGroupList();
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
        getDealerList();
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
        console.log(response[0]);
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
        var dealerId = $('#' + elementId).attr('dealer-id');
        //set hidden fields
        $("#DealerId").val(dealerId);
        getHolidayList();
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
        $('.disabled-date').attr('title', ' <i class="fa fa-calendar-times-o" aria-hidden="true"></i> PublicHoliday');
        $('.disabled-date').attr('data-toggle', 'tooltip');
        $('.disabled-date').attr('data-placement', 'left');
        $('.disabled-date').attr('data-html', 'true');
    });

    $(document).on('click', '#submitButtonForm5', function () {
        if ($('#PlanDateTime').val() != null) {
            disableThemeButton("#submitButtonForm5");
            enableThemeButton("#collapseButton5");
            $("#collapseButton5").click();
            getLocation();
        } else {
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

    $(document).on('input', '#serviceBookingForm6', function () {
        if ($("#serviceBookingForm6").valid()) {
            enableThemeButton("#submitButtonForm6");
        } else {
            disableThemeButton("#submitButtonForm6");
        }
    });

    $(document).on('change', '#PickUpDropToggle', function () {
        if (PickUpDrop) {
            PickUpDrop = false;
        } else {
            ajax.getLocation();
            PickUpDrop = true;
        }
    });

    $(document).on('change', '#AddressToggle', function () {
        if ($('#DropAddress').attr('disabled') == "disabled") {
            $('#DropAddress').attr('disabled', false);
        } else {
            $('#DropAddress').val($('#PickUpAddress').val());
            $('#DropAddress').attr('disabled', true);
        }
    });

    $(document).on('click', '#PickUpAddressConfirm', function () {
        console.log('Im Clicked');
        if ($('#PickUpAddress').attr('disabled') == 'disabled') {
            PickUpAddressConfirmed = false;
            $('#PickUpAddress').attr('disabled', false)
            console.log('true');
            $('#PickUpAddressConfirm').html('Confirm');
        } else {
            PickUpAddressConfirmed = true;
            PickUpMarker.setDraggable(false);
            console.log('true');
            $('#PickUpAddressConfirm').html('Change');
            $('#PickUpAddress').attr('disabled', true)
        }
    });

    $(document).on('input', '#PickUpAddress', function () {
        if ($('#DropAddress').attr('disabled') == 'disabled') {
            $('#DropAddress').val($('#PickUpAddress').val());
        }
    });

    $(document).on('change', '.mapboxgl-ctrl-geocoder input', function (e) {
        if (PickUpAddressConfirmed) {
            reverseGeoCode(variables.DropMarker, $('.mapboxgl-ctrl-geocoder input').val(), '#DropAddress', '#DropCoord');
        } else {
            reverseGeoCode(variables.PickUpMarker, $('.mapboxgl-ctrl-geocoder input').val(), '#PickUpAddress', '#PickUpCoord');
        }
    });

    $(document).on('click', '#SubmitButtonForm6', function () {
        $('#DisplaySummaryButton').click(); 
        if ($('#serviceBookingForm6').valid()) {
            if (PickUpDrop) {
                if ($('#PickUpAddress').val() != '' && $('#DropAddress').val() != '') {
                    showSummary();                    
                } else {
                    showToast('Error', 'Please provide pick up and drop locations');
                }
            } else {
                alert('Submit');
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