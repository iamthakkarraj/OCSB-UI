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
    if (title == "Error") {
        toastr.error(text);
    } else {
        toastr.success(text)
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

export function enableCollapseButton(id) {
    if ($(id).hasClass("collapse-button-disabled")) {
        $(id).removeClass("collapse-button-disabled");
        $(id).addClass("collapse-button-enabled");
        $(id).removeAttr('disabled');
    }
}

export function disableCollapseButton(id) {
    if ($(id).hasClass("collapse-button-enabled")) {
        $(id).removeClass("collapse-button-enabled");
        $(id).addClass("collapse-button-disabled");
        $(id).attr('disabled', 'true');
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
    disableCollapseButton("#collapseButton2");
    disableCollapseButton("#collapseButton3");
    disableCollapseButton("#collapseButton4");
    disableCollapseButton("#collapseButton5");
}

export function disableFrame1() {
    $("#Email").attr("disabled", true);
    $("#Otp").attr("disabled", true);
    disableThemeButton("#submitButtonForm1");
    disableThemeButton("#submitButtonForm2");
}

export function init() {
    //disableAllButtons();
    $('#date-picker').datepicker({
        format: "mm/dd/yyyy",
        startDate: "+2d",
        endDate: "+14d",
        daysOfWeekDisabled: [0, 6],
        todayBtn: "linked",
        clearBtn: true,
    });
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".page-heading").offset().top - 20
    }, 600);
    $('.mapboxgl-canvas').css('width', '100%');
    $('.mapboxgl-canvas').css('height', '100%');
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "Value must not equal arg.");
}

export function addVehicleCard(vehicleId, licensePlateNumber, brandName, brandImage, modelName, modelImage) {
    $('#VehicleListContainer')
        .append('<div data-provide="' + vehicleId + '" class="vehicle-card not-selected-vehicle-card card shadow-md mb-3 border-0 p-3">'
            + '<div class="d-flex justify-content-between">'
            + '<dl class="m-0">'
            + '<dt>Brand Name</dt>'
            + '<dd class="m-0">' + brandName + '</dd>'
            + '<dt>Model Name</dt>'
            + '<dd class="m-0">' + modelName + '</dd>'
            + '<dt>LicensePlateNumber</dt>'
            + '<dd class="m-0">' + licensePlateNumber + '</dd>'
            + '</dl>'
            + '<img id="BrandImage"'
            + 'src="' + brandImage + '" />'
            + '</div>');
}

export function addserviceCategory(categoryId, name) {
    $('#servicesContainer')
        .append('<div class="card border-0 col-12" id="serviceCategory' + categoryId + '">'
            + '<div class="border-0" id="serviceCategoryHeading' + categoryId + '">'
            + '<button id="serviceCategoryName' + categoryId + '"'
            + 'class="my-2 theme-button-primary"'
            + 'style="width:100%;"'
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
            + '</div>'
            + '</div>');
}

export function addService(categoryId, serviceId, name, price, description) {
    $('#serviceCategoryCollpase' + categoryId)
        .append('<div class="form-group m-0 d-flex justify-content-between">'
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
            + '</div>'
            + '<small id="category' + categoryId + 'service' + serviceId + 'price">' + price + '<i class="fa fa-inr" aria-hidden="true"></i> </small>'
            + '</div>');
}

export function selectService(serviceId, categoryId, name, price) {

    let vat = parseInt(ServiceList
        .filter(x => x.ServiceId == serviceId)[0]
        .ServiceDetailModels[0].VAT)
        + parseInt(ServiceList
            .filter(x => x.ServiceId == serviceId)[0]
            .ServiceDetailModels[1].VAT);

    $('#selectedServiceContainer')
        .append('<tr class="rounded" id="selectedService' + serviceId + categoryId + '">'
            + '<td id="selectedServiceName' + serviceId + categoryId + '">'
            + name + '<br> <small>'
            + '<em> VAT : </em> ' + vat + '<i class="fa fa-inr" aria-hidden="true"></i>'
            + '<em> Duration : <em>' + ServiceList[0].Duration + 'hrs.'
            + '</small>'
            + '</td>'
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
        .val(parseInt($('#serviceTotalCost')
            .html()));

    //Updating Selected Services Hidden Field
    $('#SelectedServices')
        .val($('#SelectedServices')
            .val() + '-' + serviceId);
}

export function diselectService(serviceId, categoryId, price) {

    if($('#searcQuerycategory'+categoryId+'service'+serviceId).length == 1){
        $('#searcQuerycategory'+categoryId+'service'+serviceId).prop('checked',false);
    }

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
        .val(parseInt($('#serviceTotalCost')
            .html()));

    //Updating Selected Services Hidden Field
    $('#SelectedServices')
        .val($('#SelectedServices')
            .val() + ''
                .replace('-' + serviceId, ''));
}

export function serviceQuery(service) {
    return (service.Name.search($('#ServiceSearch').val()) > 0);
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

export function addPreferredDealer(dealerId, name, phoneNo) {
    $('#dealerListContainer').append(
        '<div class="p-2 dealer-item">'
        + '<div class="custom-control custom-checkbox" data-placement="left">'
        + '<input type="checkbox"'
        + 'class="custom-control-input dealer-checkbox"'
        + 'aria-describedby="PreferredLabel"'
        + 'id="dealer' + dealerId + '" dealer-id="' + dealerId + '" />'
        + '<label class="custom-control-label" for="dealer' + dealerId + '">' + name + '</label> <br>'
        + '<small id="PreferredLabel" class="theme-bg-primary text-light px-2 rounded">Your Preferred</small>'
        + '</div>'
        + '</div>'
    )
}

export function parseServices() {
    SelectedServicesList = []
    var selectedServices = $('#SelectedServices').val();
    selectedServices = selectedServices.substring(1, selectedServices.length);
    var start = 0;
    for (let i = 0; i <= selectedServices.length; i++) {
        if (selectedServices.charAt(i) == '-' || i == selectedServices.length) {
            SelectedServicesList.push(parseInt(selectedServices.substring(start, i), 10));
            start = i + 1;
        }
    }
}

export function calculateDuration() {
    parseServices();
    let TotalDuration = 0;
    for (let i = 0; i < SelectedServicesList.length; i++) {
        TotalDuration = TotalDuration + ServiceList.filter(item => item.ServiceId == SelectedServicesList[i])[0].Duration;
    }
    return TotalDuration;
}

export function showSummary() {
    parseServices();
    $('#S_Email').html($('#Email').val());
    $('#S_LicensePlateNumber').html(VehicleList.filter(item => item.vehicleId == $('#vehicleId').val())[0].LicensePlateNumber);
    $('#S_ContactNo').html($('#ContactNo').val());
    $('#S_ContactPerson').html($('#ContactPerson').val());
    $('#S_CustomerNote').html($('#CustomerNote').val());
    $('#S_PlanDateTime').html($('#PlanDateTime').val());
    $('#S_TotalCost').html('<i class="fa fa-inr" aria-hidden="true"></i> &nbsp;' + $('#TotalCost').val());
    $('#S_DealerName').html(DealerList.filter(item => item.DealerId == $('#DealerId').val())[0].Name)
    $('#servicesContainerSummary').html('<dl><dt><i class="fa fa-cogs" aria-hidden="true"></i> Selected Services </dt> <hr>');
    for (let i = 0; i < SelectedServicesList.length; i++) {
        $('#servicesContainerSummary').append(
            '<dt>' + ServiceList.filter(item => item.ServiceId == SelectedServicesList[i])[0].Name + '</dt>'
            + '<dd>' + ServiceList.filter(item => item.ServiceId == SelectedServicesList[i])[0].Cost + ' <i class="fa fa-inr" aria-hidden="true"></i> </dd>'
        );
    }
    $('#servicesContainerSummary').append('</dl>');
    $('#AddressSummary').html('');
    if (PickUp) {
        $('#AddressSummary').append(
            '<dt> <i class="fa fa-location-arrow" aria-hidden="true"></i> Pick Up Address </dt>'
            + '<dd>' + $('#PickUpAddress').val() + '</dd>'
        )
    }
    if (Drop) {
        $('#AddressSummary').append(
            '<dt> <i class="fa fa-location-arrow" aria-hidden="true"></i> Drop Address </dt>'
            + '<dd>' + $('#DropAddress').val() + '</dd>'
        )
    }    
}

export function changeColorTheme(primary, primaryDark, primaryLight, primaryText, secondaryText) {
    var html = document.getElementsByTagName('html')[0];
    html.style.setProperty("--theme-color-primary", primary);
    html.style.setProperty("--theme-color-primary-dark", primaryDark);
    html.style.setProperty("--theme-color-primary-light", primaryLight);
    html.style.setProperty("--theme-color-accent", primary);
    html.style.setProperty("--theme-color-primary-text", primaryText);
    html.style.setProperty("--theme-color-secondary-text", secondaryText);
}