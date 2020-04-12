//=======================
//Validator Customization
//=======================
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg !== value;
}, "Value must not equal arg.");




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
    disableThemeButton("#collapseButton2");
    disableThemeButton("#collapseButton3");
}

function init() {
    disableAllButtons();
    hideElement("#serviceBookingForm2");
}
//=======================================================
// Utility Functions For Form Flow Control Ends From Here
//=======================================================




//On Document Load 
$(function () {



    //=============================================
    //Intialization Functions For Form Flow Control
    //=============================================
    //init();




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
        //Perform Ajax Call here
        displayElement("#serviceBookingForm2");
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
        }
    });

    $('#serviceBookingForm2 input').on('keypress', function () {

        if ($("#serviceBookingForm2").valid()) {
            enableThemeButton("#submitButtonForm2");
        } else {
            disableThemeButton("#submitButtonForm2");
        }

    });

    $('#submitButtonForm2').on('click', function () {
        //Perform Ajax Call here                
        disableThemeButton("#submitButtonForm1");
        disableThemeButton("#submitButtonForm2");
        enableThemeButton("#collapseButton2");
        $("#collapseButton2").click();
    });
    //=================================================
    //Form 1 Validation and Flow Control Ends From Here
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

    $('#serviceBookingForm2 select').on('change', function () {

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
    });
    //=================================================
    //Form 3 Validation and Flow Control Ends From Here
    //=================================================




});