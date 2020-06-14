import NavLinksView from './views/NavLinksView.js'
import AdminView from './views/AdminView.js'
import RegisterView from './views/RegisterView.js'
import EditProfileView from './views/EditProfileView.js'
import AddDoctorView from '../js/views/AddDoctorView.js'
import SearchDoctorView from '../js/views/SearchDoctorView.js'

class App {
    constructor() {
        this._InstantiateView()
    }

    _InstantiateView() {
        const webPath = window.location.pathname
        const htmlFile = webPath.substr(webPath.lastIndexOf('/') + 1)

        switch (htmlFile) {
            case '':
            case 'index.html':
                new NavLinksView()
                break;
            case 'editProfile.html':
                new EditProfileView()
                new NavLinksView()
                break;
            case 'register.html':
                new NavLinksView()
                new RegisterView()
                break;
            case 'admin.html':
                new AdminView()
                break;
            case 'ratings.html':
                new EditProfileView()
                new NavLinksView()
                break;
            case 'addDoctor.html':
                new AddDoctorView()
                break;
            case 'searchdoctor.html':
                new SearchDoctorView()
                break;
            default:
                break;
        }
    }
}

new App()