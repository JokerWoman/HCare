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





    geocodeAddress = function(geocoder, resultsMap, doctors = []) {


        for (const doctor of doctors) {

            geocoder.geocode({ 'address': doctor[i].adress },
                (results, status) => {
                    if (status === 'OK') {

                        var marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location



                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });

        }


    }




    initMap() {



        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 41.14961,
                lng: -8.61099
            },
            zoom: 12,

        });
        let infoWindow = new google.maps.InfoWindow;

        var contentString = '<h5>Sua posição</h5>';



        const userInfo = new google.maps.InfoWindow({
            content: contentString,
        });


        const geocoder = new google.maps.Geocoder();

        this.btnSearch.addEventListener('click', () => {
            this.geocodeAddress(geocoder, map, this.doctorController.getDoctors(this.filterDoctorName.value, this.filterDoctorSpecialty.value))
        })








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

                    })

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

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }



}