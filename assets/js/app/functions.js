import * as variables from './variables.js';
Object.entries(variables).forEach(([name, exported]) => window[name] = exported);

export function toggleThemeButton(id) {
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

export function showToast(title, text) {
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

export function disableThemeButton(id) {
    if ($(id).hasClass("theme-button-primary")) {
        $(id).removeClass("theme-button-primary");
        $(id).addClass("theme-button-disabled");
        $(id).attr('disabled', 'true');
    }
}

export function enableThemeButton(id) {
    if ($(id).hasClass("theme-button-disabled")) {
        $(id).removeClass("theme-button-disabled");
        $(id).addClass("theme-button-primary");
        $(id).removeAttr('disabled');
    }
}

export function displayElement(id) {
    $(id).show();
}

export function hideElement(id) {
    $(id).hide();
}

export function disableAllButtons() {
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

export function init() {
    //disableAllButtons();
    hideElement("#serviceBookingForm2");
    $('.mapboxgl-canvas').css('width', '100%');
    $('.mapboxgl-canvas').css('height', '100%');
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    Map.addControl(NavigationControl, 'bottom-right');
    GeoCoder.addTo('#GeoCoder');
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "Value must not equal arg.");
}

export function updateVehicleDetails(licensePlateNumber) {
    for (var i = 0; i < VehicleList.length; i++) {
        if (VehicleList[i].LicenseNumber == licensePlateNumber) {
            $('#BrandName').val(VehicleList[i].BrandName);
            $('#ModelName').val(VehicleList[i].ModelName);
            $('#BrandImage').attr('src', VehicleList[i].BrandImagePath);
            break;
        }
        else {
            continue;
        }
    }
}

export function addserviceCategory(categoryId, name) {
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

export function addService(categoryId, serviceId, name, price, description) {
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
            + '<small id="category' + categoryId + 'service' + serviceId + 'price">' + price + '</small>'
            + '</div>'
            + '</div>');
}

export function selectService(serviceId, categoryId, name, price) {

    $('#selectedServiceContainer')
        .append('<tr class="rounded" id="selectedService' + serviceId + categoryId + '">'
            + '<td id="selectedServiceName' + serviceId + categoryId + '">' + name + '</td>'
            + '<td id="selectedServicePrice' + serviceId + categoryId + '">' + price + '</td>'
            + '<td>'
            + '<button id="selectedService' + serviceId + categoryId + '"'
            + ' data-serviceId="' + serviceId + '"'
            + ' data-categoryId="' + categoryId + '"'
            + ' onclick="$(' + '\'#category' + categoryId + 'service' + serviceId + '\').click();"'
            + ' class="service-diselect-button shadow-md px-2 rounded">'
            + '<i class="fa fa-times" aria-hidden="true"></i>'
            + '</button>'
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

export function diselectService(serviceId, categoryId, price) {

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
        .val($('#SelectedServices')
            .val() + ''
                .replace('-' + serviceId + '-', ''));
}

export function addDealer(dealerId, name, phoneNo) {

    $('#dealerListContainer').append(
        '<div class="p-2 dealer-item">'
        + '<div class="custom-control custom-checkbox" data-placement="left">'
        + '<input type="checkbox"'
        + 'class="custom-control-input dealer-checkbox"'
        + 'id="dealer' + dealerId + '" dealer-id="' + dealerId + '" />'
        + '<label class="custom-control-label" for="dealer' + dealerId + '">' + name + '</label>'
        + '</div>'
        + '</div>'
    )

}

export function displayDealerDetails() {
    //TODO Implement this fucntion
}

export function highlighPreferredDealer(id) {
    //TODO Implement this fucntion
}

export function parseServices(){
    var selectedServices = $('#SelectedServices').val();        
    var start = 0;        
    for(let i=0; i<=selectedServices.length; i++){        
        if(selectedServices.charAt(i) == '-' || i == selectedServices.length){
            SelectedServicesList.push(parseInt(selectedServices.substring(start, i), 10));
            start=i+1;
        }        
    }    
}

export function showSummary(){
    parseServices();
    $('#S_Email').val($('#Email').val());
    $('#S_LicensePlateNumber').val($('#LicensePlateNumber').val());
    $('#S_ContactNo').val($('#ContactNo').val());
    $('#S_ContactPerson').val($('#ContactPerson').val());
    $('#S_PickUpAddress').val($('#PickUpAddress').val());
    $('#S_DropAddress').val($('#DropAddress').val());
    $('#S_CustomerNote').val($('#CustomerNote').val());
    $('#S_PlanDateTime').val($('#PlanDateTime').val());
    $('#S_TotalCost').val($('#TotalCost').val());
}