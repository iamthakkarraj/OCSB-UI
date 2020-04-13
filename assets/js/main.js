//=======================
//Validator Customization
//=======================
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg !== value;
}, "Value must not equal arg.");




var API_URL = "http://localhost:51859/api/"




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

function showToast(title,text){
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
    disableThemeButton("#collapseButton2");
    disableThemeButton("#collapseButton3");
}

function addserviceCategory(categoryId,name){
    $('#servicesContainer')
        .append('<div class="card border-0" id="serviceCategory'+categoryId+'">'
                +'<div class="border-0" id="serviceCategoryHeading'+categoryId+'">'
                    +'<button id="serviceCategoryName'+categoryId+'"' 
                        + 'class="m-2 theme-button-primary"'
                        + 'type="button" data-toggle="collapse"' 
                        + 'data-target="#serviceCategoryCollpase'+categoryId+'"'
                        + 'aria-expanded="true"'+
                        + 'aria-controls="serviceCategoryCollpase'+categoryId+'">'
                            + name
                        + '</button>'
                + '</div>'
                + '<div id="serviceCategoryCollpase'+categoryId+'"' 
                    + 'class="collapse show"'
                    + 'aria-labelledby="serviceCategoryHeading'+categoryId+'"'
                    + 'data-parent="#servicesContainer">'
                        + '<div class="card-body">'
                        + '</div>'
                + '</div>'
            + '</div>');
}

function addService(categoryid, serviceid, name, price, description){
    $('#serviceCategoryCollpase'+categoryid+' > div')
        .append('<div class="form-group">'
                    + '<div id="category'+categoryid+'service'+serviceid+'description"' 
                        + 'class="custom-control custom-checkbox" data-toggle="tooltip"'
                        + 'data-placement="left" title="'+description+'">'
                            + '<input type="checkbox" class="custom-control-input service-checkbox"'
                                + 'id="category'+categoryid+'service'+serviceid+'" checked="">'
                            + '<label class="custom-control-label"'
                                + 'for="category3service1">'+name+'</label>'
                            + '<small id="category'+categoryid+'service'+serviceid+'price">'
                            + ' - '+price+' INR.</small>'
                    + '</div>'
                + '</div>');    
}

function selectService(serviceId,categoryId,name,price){
    $('#selectedServiceContainer')
        .append('<tr id="selectedService'+serviceId+categoryId+'">'
                    +'<td id="selectedServiceName'+serviceId+categoryId+'">'+name+'</td>'
                    + '<td id="selectedServicePrice'+serviceId+categoryId+'">'+price+'</td>'
                    + '<td>'
                        + '<button id="selectedService'+serviceId+categoryId+'"'
                        + 'service-id="'+serviceId+'"' 
                        + 'category-id="'+categoryId+'"'
                            + 'class="service-diselect-button shadow-md px-2 rounded">'
                            + '<i class="fa fa-times" aria-hidden="true"></i>'
                        + '</button>'
                    + '</td>'
                +'</tr>');                
        
    var currnetTotal = parseInt($('#serviceTotalCost').html());
    currnetTotal += parseInt(price);
    $('#serviceTotalCost').html(currnetTotal);    
}

function diselectService(serviceId,categoryId,price){
    console.log(price);
    $('#selectedService'+serviceId+categoryId).hide('slide', function(){ $('#selectedService'+serviceId+categoryId).remove(); });
    var currnetTotal = parseInt($('#serviceTotalCost').html());
    currnetTotal -= parseInt(price);
    $('#serviceTotalCost').html(currnetTotal); 
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
        disableThemeButton("#submitButtonForm1");                
        displayElement("#serviceBookingForm2");                                   
        showToast("Attention","Otp has been sent successfully to your email.");
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
        //on success add following code
                
    });
    //=================================================
    //Form 3 Validation and Flow Control Ends From Here
    //=================================================
    

    $('.service-checkbox').click(function(){

        var elementId = this.id;
        var name = $('#'+elementId+'name').html();
        var price = $('#'+elementId+'price').html();
        var serviceid = $(this.id).attr('service-id');
        var categoryid = $(this.id).attr('category-id');

        if($(this).prop("checked") == true){            
            selectService(serviceid,categoryid,name,price);            
        } else if($(this).prop("checked") == false){            
            diselectService(serviceid,categoryid,price);
        }
        
    });

    //Still in progress do not remove
    // $('.service-diselect-button').click(function(){
    //     var serviceid = $(this.id).attr('service-id');
    //     var categoryid = $(this.id).attr('category-id');
    //     diselectService(serviceid,categoryid);
    //     alert('#category'+serviceid+'service'+categoryid);
    //     $('#category'+serviceid+'service'+categoryid).click();
    // });


});