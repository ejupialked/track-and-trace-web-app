const navigateTo  = url => {
    history.pushState(null, null, url);
    router();
}
const router = async () => {
    const routes = [
        { path: '/', view : () => console.log("Homepage")},
        { path: '/venueCheckin', view : () => console.log("Venue check in...")},
        { path: '/userProfile', view : () => console.log("User Profile...")},
        { path: '/addUser', view : () => console.log("Add User")}
    ]

    const matchRoute = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname == route.path
        }
    }) 

    let match = matchRoute.find(matchRoute => matchRoute.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        } 
    }


    console.log(match.route.view())
};




document.addEventListener('DOMContentLoaded', () => {



    // Prevents from refreshing
    document.body.addEventListener('click', e => {
        if (e.target.matches("data-link")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
   router(); 
})