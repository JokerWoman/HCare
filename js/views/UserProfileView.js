import UserController from '../controllers/UserController.js'
import User from '../models/User.js'

export default class UserProfileView {
    constructor() {

        this.userController = new UserController();

        /* User Profile Form */
        this.userProfileFirstName = document.querySelector("#userProfileFirstName")
        this.userProfileSurname = document.querySelector("#userProfileSurname")
        this.userProfileAddress = document.querySelector("#userProfileAddress")
        this.userProfilePhone = document.querySelector("#userProfilePhone")
        this.userProfileAvatarPhoto = document.querySelector("#userProfileAvatarPhoto")

        this.FillUserProfileDataInForm()
    }

    FillUserProfileDataInForm() {

        let user = this.userController.GetUserLoggedData()

        if (user != null) {
            this.userProfileFirstName.value = user.firstName
            this.userProfileSurname.value = user.surname
            this.userProfileAddress.value = user.address
            this.userProfilePhone.value = user.phone
            this.userProfileAvatarPhoto.src = user.avatarSourceImage
        }
    }

  }