import DoctorController from '../controllers/DoctorController.js'
import UserController from '../controllers/UserController.js'


export default class SearchDoctorView {
    constructor() {
        this.doctorController = new DoctorController();
        this.userController = new UserController();


        this.filterDoctorSpecialty = document.getElementById('filterDoctorSpeciality')
        this.filterDoctorName = document.getElementById('filterDoctorName')
        this.btnSearch = document.querySelector('#btnSearch')


        this.initMap()




    }





    callDoctorMessageHandler(message, type) {
        this.doctorMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }



    bindCallDoctorButton() {
        let user = this.userController.GetUserLoggedEmail();

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        for (const callDoctorButton of document.getElementsByClassName("callDoctorAction")) {
            callDoctorButton.addEventListener('click', event => {
                event.preventDefault();
                try {
                    this.userController.createAppointments(user, doctor[i].firstName, doctor[i].lastName, doctor[i].specialty, date, time);
                    this.callDoctorMessageHandler("Doctor has been called", 'success')

                } catch (exception) {
                    this.callDoctorMessageHandler(exception, 'danger')
                }






            })
        }
    }






    geocodeAddress = function(geocoder, resultsMap) {

        let doctors = this.doctorController.getDoctors(this.filterDoctorName.value, this.filterDoctorSpecialty.value);

        for (let i = 0; i < doctors.length; i++) {

            geocoder.geocode({ 'address': doctors[i].adress },
                (results, status) => {
                    if (status === 'OK') {


                        var markers = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location,
                            icon: "https://img.icons8.com/fluent/32/000000/medical-doctor.png",
                            content: `
                            <div class="main-section text-center">
                            <div class="user-detail">
                            <br>
                                <div class="col-lg-12 col-sm-12 col-12">
                                    <img src="${doctors[i].photo}" class="rounded-circle img-thumbnail">
                                    <h5>${doctors[i].firstName} ${doctors[i].lastName}</h5>
                                    <h7>${doctors[i].specialty}</h7>
                                    <br>
                                    <button id="${doctors[i].email}" class="btn btn-primary callDoctorAction">Call Doctor</button>
                                    
                                </div>
                            </div>
                        </div> `,

                        });

                        this.bindCallDoctorButton();


                        var doctorWindow = new google.maps.InfoWindow({
                            content: markers.content
                        });

                        markers.addListener('click', function() {
                            doctorWindow.open(map, markers)

                        })




                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }


                });

        }






    }





    initMap = function() {

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();



        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 41.14961,
                lng: -8.61099
            },
            zoom: 12,

        });

        directionsRenderer.setMap(map);

        let infoWindow = new google.maps.InfoWindow;

        var contentString = '<h5>Sua posição</h5>';



        const userInfo = new google.maps.InfoWindow({
            content: contentString,
        });


        const geocoder = new google.maps.Geocoder();

        this.btnSearch.addEventListener('click', () => {
                this.geocodeAddress(geocoder, map)
            })
            /*
                    markers.addEventListener('click'), () => {
                            this.calcRoute(directionsService, directionsRenderer)
                        }
                        
                                this.addMarker({ lat: 41.3599, lng: -8.7458 });
                        */
            // Add a select listener to generate and render the route







        // Try HTML5 geolocation
        if (navigator.geolocation) {

            // returns the current position of the user 

            navigator.geolocation.getCurrentPosition(
                position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found!');
                    infoWindow.open(map);
                    map.setCenter(pos);


                    const marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        icon: "https://img.icons8.com/fluent/32/000000/cottage.png"

                    });

                    marker.addListener('click', function() {
                        userInfo.open(map, marker);
                    });


                },
                () => handleLocationError(true, infoWindow, map.getCenter())
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }


    }


    calcRoute(directionsService, directionsRenderer) {



        // Creation of a DirectionsRequest object 
        const request = {
            origin: pos,
            destination: markers.position,
            travelMode: google.maps.travelMode['DRIVING']
        };

        // call DirectionsService.route() to initiate a request to the Directions service
        // passing it a DirectionsRequest object literal containing the input terms and a callback method 
        // to execute upon receipt of the response.
        directionsService.route(request,
            (result, status) => {
                if (status == 'OK') {
                    directionsRenderer.setDirections(result);
                    const directionsData = result.routes[0].legs[0]; // Get data about the mapped route
                    if (directionsData) {
                        document.querySelector("#divResults").innerHTML = `
                  Driving distance is ${directionsData.distance.text} (${directionsData.duration.text})
                `
                    } else {
                        document.querySelector("#divResults").innerHTML = 'Directions request failed'
                    }
                } else {
                    document.querySelector("#divResults").innerHTML = status
                }
            });
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }




}