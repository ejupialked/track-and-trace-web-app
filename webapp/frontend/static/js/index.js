import Homepage from "./views/Homepage.js"
import VenueCheckin from "./views/VenueCheckin.js"
import AddUser from "./views/AddUser.js"


const navigateTo  = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: '/', view: Homepage}, //Class reference
        { path: '/venueCheckin', view : VenueCheckin},
        { path: '/addUser', view : AddUser},
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
    })
    router(); 
})

