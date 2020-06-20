import UserController from '../controllers/UserController.js'
import User from '../models/User.js'

export default class AppointmentsView {
    constructor() {

        this.userController = new UserController();

        this.appointmentsVisualizations = document.querySelector('#appointmentsVisualization')
        this.updateAppointmentsVisualization()
        console.log(this.userController.getAllAppointments())
    }

    updateAppointmentsVisualization() {
        let loggedUserEmail = this.userController.GetUserLoggedEmail()


        let appointments = this.userController.getAllAppointments()
        appointments = appointments.filter(appointment => appointment.userEmail === loggedUserEmail)


        this.appointmentsVisualizations.innerHTML = ""

        for (let i = 0; i < appointments.length; i++) {
            this.appointmentsVisualizations.innerHTML += `
                        <div class="main-section text-center">
                        <div class="user-detail">
                            <div class="col-lg-12 col-sm-12 col-12">
                                <h5>${appointments[i].firstName} ${appointments[i].lastName}</h5>
                                <h7>${appointments[i].specialty} </h7>
                                <h7>${appointments[i].date} ${appointments[i].time}</h7>
                            </div>
                        </div>
                    </div> `
        }


    }



}