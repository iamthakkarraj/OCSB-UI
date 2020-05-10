import * as variables from './variables.js';
import * as functions from './functions.js';

Object.entries(variables).forEach(([name, exported]) => window[name] = exported);
Object.entries(functions).forEach(([name, exported]) => window[name] = exported);

export function sendOtp() {
    $.ajax({
        url: API_URL + 'Authentication/VerifyEmail/?Email=' + $('#Email').val(),
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            if (response != null) {
                if (response == "s_1111") {
                    showToast("Attention", "Otp has been sent successfully to your email.Otp is valid for next 5 mins!");
                    displayElement("#serviceBookingForm2");
                }
                else if (response == "e_1111") {
                    showToast("Error", "Entered Email is not Registered!");
                    enableThemeButton("#submitButtonForm1");
                }
            } else {
                showToast("Error", "It seems like our server is offline please try again later");
                enableThemeButton("#submitButtonForm1");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showToast("Error", "It seems like our server is offline please try again later");
            enableThemeButton("#submitButtonForm1");
        }
    });
}

export function verifyOtp() {
    $.ajax({
        url: API_URL + 'Authentication/VerifyOtp/?Email=' + $('#Email').val() + '&Otp=' + $('#Otp').val(),
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            if (response != null) {
                if (response == "s_1112") {
                    showToast("Attention", "Your otp is Valid, select your vehicle!");
                    enableThemeButton("#collapseButton2");
                    $("#collapseButton2").click();
                    getVehicleList();
                }
                else if (response == "e_1112") {
                    showToast("Error", "Your otp has been expired!");
                    enableThemeButton("#submitButtonForm2");
                }
                else if (response == "e_1113") {
                    showToast("Error", "Otp is not Valid!");
                    enableThemeButton("#submitButtonForm2");
                }
                else if (response == "e_1114") {
                    showToast("Error", "Entered Email is not Registered!");
                    enableThemeButton("#submitButtonForm2");
                }

            } else {
                showToast("Error", "It seems like our server is offline please try again later");
                enableThemeButton("#submitButtonForm2");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showToast("Error", "It seems like our server is offline please try again later");
            enableThemeButton("#submitButtonForm2");
        }
    });
}

export function getVehicleList() {
    $.ajax({
        url: API_URL + 'Authentication/GetVehicleList/?EmailId=' + $('#Email').val(),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            if (response != null) {
                VehicleList = response;
                if (response.length > 0 && response.length != 0) {
                    $('#LicensePlateNumber').html('');
                    var options = '<option value="default">---Select Vehicle---</option>';
                    for (let i = 0; i < response.length; i++) {
                        options += '<option value="' + response[i].LicenseNumber + '">' + response[i].LicenseNumber + '</option>';
                    }
                    $('#LicensePlateNumber').append(options);
                }
                else {
                    showToast("Error", "No vehicles are registered on this email");
                }
            } else {
                showToast("Error", "It seems like our server is offline please try again later");
            }
        },
        error: function (errormessage) {
            showToast("Error", "It seems like our server is offline please try again later");
        }
    });
}

export function getServiceList() {
    $.ajax({
        //Use This Commented Line While testing with database
        //url: API_URL + '/api/Appointment/GetServiceList/?LicensePlateNumber='+$('#LicensePlateNumber').val(),
        url: API_URL + 'Appointment/GetServiceList/?LicensePlateNumber=DD03SG6677',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response != null) {
                ServiceList = response;
                for (let i = 0; i < response.length; i++) {
                    addService(response[i].ServiceGroupServiceGroupId,
                        response[i].ServiceId,
                        response[i].Name,
                        response[i].Cost,
                        'Lorem Ipsum');
                }

                enableThemeButton("#collapseButton3");
                $("#collapseButton3").click();
                showToast("Title", "Your message");

            } else {
                showToast("Error", "It seems like our server is offline please try again later");
                enableThemeButton("#submitButtonForm3");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showToast("Error", "It seems like our server is offline please try again later");
            enableThemeButton("#submitButtonForm3");
        }
    });
}

export function getServiceGroupList() {
    $.ajax({
        url: API_URL + 'Appointment/GetServicesGroupList',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response != null) {
                ServiceGroupList = response
                for (let i = 0; i < response.length; i++) {
                    addserviceCategory(response[i].ServiceGroupId, response[i].ServiceGroupeName);
                }
                getServiceList();
            } else {
                showToast("Error", "It seems like our server is offline please try again later");
                enableThemeButton("#submitButtonForm3");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showToast("Error", "It seems like our server is offline please try again later");
            enableThemeButton("#submitButtonForm3");
        }
    });
}

export function getDealerList() {
    $.ajax({
        url: API_URL + 'Appointment/GetDealer',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response != null) {

                DealerList = response;

                for (let i = 0; i < response.length; i++) {
                    addDealer(response[i].DealerId,
                        response[i].Name,
                        response[i].ContactNo);
                }

                enableThemeButton("#collapseButton4");
                $("#collapseButton4").click();

            } else {
                enableThemeButton("#submitButtonForm4");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showToast("Error", "It seems like our server is offline please try again later");
            enableThemeButton("#submitButtonForm4");
        }
    });
}

export function getHolidayList() {
    $.ajax({
        url: API_URL + 'Appointment/GetHolidaysByDealerId/?DealerId=' + $('#DealerId').val(),
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response != null && response.length > 0) {

                var dateList = [];

                for (let i = 0; i < response.length; i++) {
                    dateList.push(new Date(response[i]).toLocaleDateString());
                }

                console.log(dateList);

                $('#date-picker').datepicker({
                    format: "mm/dd/yyyy",
                    startDate: "d",
                    endDate: "+14d",
                    datesDisabled: dateList,
                    todayBtn: "linked",
                    clearBtn: true,
                });

                $('.disabled-date').attr('title', ' <i class="fa fa-calendar-times-o" aria-hidden="true"></i> PublicHoliday');
                $('.disabled-date').attr('data-toggle', 'tooltip');
                $('.disabled-date').attr('data-placement', 'left');
                $('.disabled-date').attr('data-html', 'true');

            } else {

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showToast("Error", "It seems like our server is offline please try again later");
            enableThemeButton("#submitButtonForm[FormNo-1]");
        }
    });
}

export function forwardGeoCode(long, lat, addressId, coordId) {
    $.ajax({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + long + ',' + lat + '.json?&access_token=' + MapBoxAccessToken,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            $(addressId).val(response.features[0].place_name);
            $(coordId).val(long + '-' + lat);
        },
        error: function () {
            showToast('Error', 'Could not recieve your address please type manually');
        }
    });
}

export function reverseGeoCode(marker, query, addressId, coordId) {
    $.ajax({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?bbox=' + SouthBound + ',' + WestBound + ',' + NorthBound + ',' + EastBound + '&access_token=' + MapBoxAccessToken,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            $(addressId).val(query);
            setMarker(marker, response.features[0].center[0], response.features[0].center[1],addressId,coordId);
        },
        error: function () {
            showToast('Error', 'Could not recieve your address please type manually');
        }
    });
}

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentLocationSuccess, currentLocationError);
    } else {
        showToast("Error", "Geolocation is not supported by this browser.");
    }
}

export function currentLocationSuccess(position) {
    setMarker(PickUpMarker, position.coords.longitude, position.coords.latitude, "#PickUpAddress", "#PickUpCoord");
}

export function currentLocationError() {
    showToast('Error', 'Could not recieve your address please type manually');
}

function onDragEnd() {    
    if (PickUpAddressConfirmed) {               
        forwardGeoCode(DropMarker.getLngLat().lng, DropMarker.getLngLat().lat,"#DropAddress","#DropCoord");
    } else {                
        forwardGeoCode(PickUpMarker.getLngLat().lng, PickUpMarker.getLngLat().lat,"#PickUpAddress","#PickUpCoord");
    }
}

export function setMarker(marker, long, lat, addressId, coordId) {

    marker.setLngLat([long, lat]).addTo(Map);
    marker.on('dragend', onDragEnd);

    $(coordId).val(long + '-' + lat);

    Map.flyTo({ center: [long, lat] });

    forwardGeoCode(long, lat, addressId, coordId);

}

//========================================
//Template structure for all Ajax calls
//========================================
// $.ajax({
//     url: API_URL,
//     type: 'GET',
//     contentType: 'application/json',
//     success: function (response) {
//         if(response != null){
//             toggleThemeSpinner('#themeSpinner[FormNo]'); Spinner is not in use currently 
//             displayElement("#serviceBookingForm[FormNo]");
//             showToast("Title","Your message");
//         }else{
//             showToast("Error","Error Message");
//             toggleThemeSpinner('#themeSpinner[FormNo]'); Spinner is not in use currently 
//             enableThemeButton("#submitButtonForm[FormNo-1]");
//         }
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown){
//         alert("Status: " + textStatus); alert("Error: " + errorThrown);
//         toggleThemeSpinner("#themeSpinner[FormNo]"); Spinner is not in use currently 
//         enableThemeButton("#submitButtonForm[FormNo-1]");
//     }
// });