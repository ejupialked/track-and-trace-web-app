import Homepage from "./views/Homepage.js";
import VenueCheckin from "./views/VenueCheckin.js";
import RegisterUser from "./views/RegisterUser.js";
import RegisterVenue from "./views/RegisterVenue.js";
import CheckinUser from "./views/CheckinUser.js";
import UserLocations from "./views/UserLocations.js";
import VenueVisitors from "./views/VenueVisitors.js";
import InfectedUsers from "./views/InfectedUsers.js";
import ReportPositiveTest from "./views/ReportPositiveTest.js";


const navigateTo  = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
      { path: "/", view: Homepage },
      { path: "/venueCheckin", view: VenueCheckin },
      { path: "/registerVenue", view: RegisterVenue },
      { path: "/registerUser", view: RegisterUser },
      { path: "/checkinUser", view: CheckinUser },
      { path: "/userLocations", view: UserLocations },
      { path: "/venueVisitors", view: VenueVisitors },
      { path: "/infectedUsers", view: InfectedUsers },
      { path: "/reportPositiveTest", view: ReportPositiveTest },
    ];

    const matchRoute = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname == route.path
        }
    });

    let match = matchRoute.find(matchRoute => matchRoute.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    //create new instance of view
    const view = new match.route.view(); 
    
    document.querySelector("#app").innerHTML = await view.getHtml();

    view.init();
};

//reloads page when going back
window.addEventListener('popstate', (e) => {
    router();
});

document.addEventListener('DOMContentLoaded', () => {
    // Prevents from refreshing
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault(); //stops from the following the link
            navigateTo(e.target.href); //navigate to the page
        }
    });
    router(); 
});


