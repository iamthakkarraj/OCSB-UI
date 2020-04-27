//=======================
//Validator Customization
//=======================
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg !== value;
}, "Value must not equal arg.");




//=========================================
var API_URL = "http://localhost:51859/api/"
//=========================================




//=========================================================
// Utility Functions For Form Flow Control Starts From Here
//=========================================================
function toggleThemeButton(id) {
    if ($(id).hasClass("theme-button-primary")) {
        $(id).removeClass("theme-button-primary");
        $(id).addClass("theme-button-disabled");
        $(id).attr('disabled', 'true');
    } else {
        $(id).removeClass("theme-button-disabled");
        $(id).addClass("theme-button-primary");
        $(id).removeAttr('disabled');
    }
}

function toggleThemeSpinner(id) {
    if ($(id).hasClass("fade")) {
        $(id).addClass("show");
        $(id).removeClass("fade");
    } else {
        $(id).addClass("fade");
        $(id).removeClass("show");
    }
}

function showToast(title, text) {
    if ($('#notification-card').hasClass("fade")) {
        $('#notification-card').removeClass("fade");
        $('#notification-card').addClass("show");
        $('#notification-title').html(title);
        $('#notification-text').html(text);
        setTimeout(() => {
            $('#notification-card').removeClass("show");
            $('#notification-card').addClass("fade");
        }, 3000);
    }
}

function disableThemeButton(id) {
    if ($(id).hasClass("theme-button-primary")) {
        $(id).removeClass("theme-button-primary");
        $(id).addClass("theme-button-disabled");
        $(id).attr('disabled', 'true');
    }
}

function enableThemeButton(id) {
    if ($(id).hasClass("theme-button-disabled")) {
        $(id).removeClass("theme-button-disabled");
        $(id).addClass("theme-button-primary");
        $(id).removeAttr('disabled');
    }
}

function displayElement(id) {
    $(id).show();
}

function hideElement(id) {
    $(id).hide();
}

function disableAllButtons() {
    disableThemeButton("#submitButtonForm1");
    disableThemeButton("#submitButtonForm2");
    disableThemeButton("#submitButtonForm3");
    disableThemeButton("#submitButtonForm4");
    disableThemeButton("#submitButtonForm5");
    disableThemeButton("#submitButtonForm6");
    disableThemeButton("#collapseButton2");
    disableThemeButton("#collapseButton3");
    disableThemeButton("#collapseButton4");
    disableThemeButton("#collapseButton5");
}

function init() {
    disableAllButtons();
    hideElement("#serviceBookingForm2");
}
//=======================================================
// Utility Functions For Form Flow Control Ends From Here
//=======================================================




//===================================================
// Vehicle Service Related Functions Starts From Here
//===================================================
function addserviceCategory(categoryId, name) {
    $('#servicesContainer')
        .append('<div class="card border-0" id="serviceCategory' + categoryId + '">'
                    + '<div class="border-0" id="serviceCategoryHeading' + categoryId + '">'
                        + '<button id="serviceCategoryName' + categoryId + '"'
                            + 'class="m-2 theme-button-primary"'
                            + 'type="button" data-toggle="collapse"'
                            + 'data-target="#serviceCategoryCollpase' + categoryId + '"'
                            + 'aria-expanded="true"' +
                            + 'aria-controls="serviceCategoryCollpase' + categoryId + '">'
                                + name
                            + '</button>'
                    + '</div>'
                    + '<div id="serviceCategoryCollpase' + categoryId + '"'
                        + 'class="collapse"'
                        + 'aria-labelledby="serviceCategoryHeading' + categoryId + '"'
                        + 'data-parent="#servicesContainer">'
                            + '<div class="card-body"></div>'
                    + '</div>'
                + '</div>');
}

function addService(categoryId, serviceId, name, price, description) {
    $('#serviceCategoryCollpase' + categoryId + ' > div')
        .append('<div class="form-group">'
                    + '<div id="category' + categoryId + 'service' + serviceId + 'description"'
                        + 'class="custom-control custom-checkbox" data-toggle="tooltip"'
                        + 'data-placement="left" title="' + description + '">'
                            + '<input type="checkbox" class="custom-control-input service-checkbox"'
                                + 'id="category' + categoryId + 'service' + serviceId + '"'
                                + 'service-id="' + serviceId + '"'
                                + 'category-id="' + categoryId + '">'
                            + '<label class="custom-control-label"'
                                + 'id="category' + categoryId + 'service' + serviceId + 'name"'
                                + 'for="category' + categoryId + 'service' + serviceId + '">' + name + '</label>'
                            + '<small id="category' + categoryId + 'service' + serviceId + 'price">'
                                + ' - ' + price + ' INR.'
                            +'</small>'
                    + '</div>'
            + '</div>');
}

function selectService(serviceId, categoryId, name, price) {

    $('#selectedServiceContainer')
        .append('<tr class="rounded" id="selectedService' + serviceId + categoryId + '">'
            + '<td id="selectedServiceName' + serviceId + categoryId + '">' + name + '</td>'
            + '<td id="selectedServicePrice' + serviceId + categoryId + '">' + price + '</td>'
            + '<td>'
            // this button is right now not working but don't remove it
            // + '<button id="selectedService'+serviceId+categoryId+'"'
            // + ' data-serviceId="'+serviceId+'"' 
            // + ' data-categoryId="'+categoryId+'"'
            //     + ' class="service-diselect-button shadow-md px-2 rounded">'
            //     + '<i class="fa fa-times" aria-hidden="true"></i>'
            // + '</button>'
            + '</td>'
            + '</tr>');

    //Updating Cost in summary table    
    $('#serviceTotalCost')
        .html(parseInt($('#serviceTotalCost')
            .html())
            + parseInt(price));

    //Updating Total Cost Hiddne Field 
    $('#TotalCost')
        .val($('#serviceTotalCost')
            .html());

    //Updating Selected Services Hidden Field
    $('#SelectedServices')
        .val($('#SelectedServices')
            .val() + '-' + serviceId + '-');
}

function diselectService(serviceId, categoryId, price) {

    $('#selectedService' + serviceId + categoryId)
        .hide('slide', function () {
            $('#selectedService' + serviceId + categoryId)
                .remove();
        });

    //Updating Cost in summary table
    $('#serviceTotalCost')
        .html(parseInt($('#serviceTotalCost')
            .html())
            - parseInt(price));

    //Updating Total Cost Hiddne Field 
    $('#TotalCost')
        .val($('#serviceTotalCost')
            .html());

    //Updating Selected Services Hidden Field
    $('#SelectedServices')
        .val($('#SelectedServices').val() + ''.replace('-' + serviceId + '-', ''));
}
//=================================================
// Vehicle Service Related Functions Ends From Here
//=================================================




//==================================================
// Vehicle Dealer Related Functions Starts From Here
//==================================================
function addDealer(dealerId, name, phoneNo) {
    $('#dealerListContainer')
        .append('<tr>'
            + '<td>'
            + '<div class="custom-control custom-checkbox" data-placement="left">'
            + '<input type="checkbox"'
            + 'class="custom-control-input dealer-checkbox"'
            + 'id="dealer1" dealer-id="1" />'
            + '<label class="custom-control-label" for="dealer1"></label>'
            + '</div>'
            + '</td>'
            + '<td id="dealerName1"> Lorem Ipsum </td>'
            + '<td id="dealerPhoneNo1"> +99 9090909090 </td>'
            + '</tr>');
}

function displayDealerDetails() {

}
//================================================
// Vehicle Dealer Related Functions Ends From Here
//================================================




//==========================================
//On Document Load Function Starts From Here
//==========================================
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

    $('#serviceBookingForm1 input').on('keypress', function () {

        if ($("#serviceBookingForm1").valid()) {
            enableThemeButton("#submitButtonForm1");
        } else {
            disableThemeButton("#submitButtonForm1");
        }

    });

    $('#submitButtonForm1').on('click', function () {
        disableThemeButton("#submitButtonForm1");
        displayElement("#serviceBookingForm2");
        showToast("Attention", "Otp has been sent successfully to your email.");
        // $.ajax({
        //     url: API_URL,
        //     type: 'GET',
        //     contentType: 'application/json',
        //     success: function (response) {

        //         if(response != null){

        //             toggleThemeSpinner('#themeSpinner1');

        //             displayElement("#serviceBookingForm2");

        //             showToast("Attention","Otp has been sent successfully to your email.");

        //         }else{

        //             showToast("Error","Email Address Not Found");
        //             toggleThemeSpinner('#themeSpinner1');
        //             enableThemeButton("#submitButtonForm1");
        //         }
        //     },
        //     error: function(XMLHttpRequest, textStatus, errorThrown){
        //         alert("Status: " + textStatus); alert("Error: " + errorThrown);
        //         toggleThemeSpinner("#themeSpinner1");
        //         enableThemeButton("#submitButtonForm1");
        //     }
        // });
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
                minlength: 5,
                maxlength: 5
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

    $('#serviceBookingForm2 input').on('keypress', function () {

        if ($("#serviceBookingForm2").valid()) {
            enableThemeButton("#submitButtonForm2");
        } else {
            disableThemeButton("#submitButtonForm2");
        }

    });

    $('#submitButtonForm2').on('click', function () {

        disableThemeButton("#submitButtonForm2");

        //Perform Ajax Call here

        //And Populate The Car Details in Form Controls

        disableThemeButton("#submitButtonForm1");
        enableThemeButton("#collapseButton2");
        $("#collapseButton2").click();

    });
    //=================================================
    //Form 2 Validation and Flow Control Ends From Here
    //=================================================




    //===================================================
    //Form 3 Validation and Flow Control Starts From Here
    //===================================================
    $("#serviceBookingForm3").validate({

        rules: {
            LicensePlateNumber: { valueNotEquals: "default" }
        },

        messages: {
            LicensePlateNumber: { valueNotEquals: "Please select your car" }
        },

        success: function () {
            enableThemeButton("#submitButtonForm3");
        }

    });

    $('#serviceBookingForm3 select').on('change', function () {

        if ($("#serviceBookingForm3").valid()) {
            enableThemeButton("#submitButtonForm3");
        } else {
            disableThemeButton("#submitButtonForm3");
        }

    });

    $('#submitButtonForm3').on('click', function () {

        //Perform Ajax Call here

        disableThemeButton("#submitButtonForm3");
        enableThemeButton("#collapseButton3");
        $("#collapseButton3").click();

        //add ajax call for getting services.

    });
    //=================================================
    //Form 3 Validation and Flow Control Ends From Here
    //=================================================



    //===================================================
    //Form 4 Validation and Flow Control Starts From Here
    //===================================================
    $("#serviceBookingForm4").validate({

        rules: {
            AddedServices: {
                required: true
            },
            TotalCost: {
                required: true,
                range: [500, 2147483647]
            }
        },

        messages: {
            AddedServices: {
                required: "Please select any services"
            },
            TotalCost: {
                required: "",
                range: "Total bill amount needs to be atleast greater than 500"
            }
        },

    });

    $('.service-checkbox').on('click', function () {

        var name = $('#' + this.id + 'name').html();
        var price = $('#' + this.id + 'price').html();
        var serviceId = $('#' + this.id).attr('service-id');
        var categoryId = $('#' + this.id).attr('category-id');

        if ($(this).prop("checked") == true) {
            selectService(serviceId, categoryId, name, price);
        } else if ($(this).prop("checked") == false) {
            diselectService(serviceId, categoryId, price);
        }

        //  this code is right now not working but don't delete it
        // $('.service-diselect-button').on('click',function(){
        //     alert($('#'+this.id).attr(''));
        //     var serviceId = $('#'+this.id).attr('data-serviceId');
        //     console.log(serviceId);
        //     var categoryId = $('#'+this.id).attr('data-categoryId');
        //     console.log(categoryId);
        //     var price = $('#category'+categoryId+'service'+serviceId+'price').html();
        //     console.log(price);
        //     diselectService(serviceId,categoryId,price);
        //     $('#category'+serviceId+'service'+categoryId).click();
        // });    

        if ($("#serviceBookingForm4").valid()) {
            enableThemeButton("#submitButtonForm4");
        } else {
            disableThemeButton("#submitButtonForm4");
        }

    });

    $('#submitButtonForm4').on('click', function () {

        //Perform Ajax Call here

        disableThemeButton("#submitButtonForm4");
        enableThemeButton("#collapseButton4");
        $("#collapseButton4").click();

        //add ajax call for getting Dealer List

    });
    //=================================================
    //Form 4 Validation and Flow Control Ends From Here
    //=================================================



    //===================================================
    //Form 5 Validation and Flow Control Starts From Here
    //===================================================
    $('.dealer-checkbox').on('click', function () {

        var elementId = this.id;
        var dealerId = $('#' + elementId).attr('dealer-id');

        $("#DealerId").val(dealerId);

        enableThemeButton("#submitButtonForm5")

        $('.dealer-checkbox').each(function () {
            if (this.id == elementId) {
                $('#' + this.id).prop("checked", true);
            } else {
                $('#' + this.id).prop("checked", false);
            }
        });

    });

    $('#date-picker').datepicker({
        format: "mm/dd/yyyy",
        startDate: "d",
        endDate: "+14d",
        todayBtn: "linked",
        clearBtn: true,
    });
    
    $('#date-picker').on('changeDate', function () {
        $('#PlanDateTime').val($('#date-picker').datepicker('getFormattedDate'));
        console.log($('#PlanDateTime').val());
    });

    $('#submitButtonForm4').on('click', function () {

        if ($('#PlanDateTime').val() != null) {
            disableThemeButton("#submitButtonForm5");
            enableThemeButton("#collapseButton5");
            $("#collapseButton6").click();
        } else {
            disableThemeButton("#submitButtonForm5");
        }

        //Perform Ajax Call here
    });
    //===================================================
    //Form 5 Validation and Flow Control Starts From Here
    //===================================================



    //===================================================
    //Form 6 Validation and Flow Control Starts From Here
    //===================================================




    
    //===================================================
    //Form 6 Validation and Flow Control Starts From Here
    //===================================================




});
//========================================
//On Document Load Function Ends From Here
//========================================