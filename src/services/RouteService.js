const RouteService = {

    getParam(name) {
        let hash = window.location.hash.split('/');
        
        return hash[hash.indexOf(name) + 1];
    },

    getAction() {
        return RouteService.getHash().split('/').shift();
    },

    getHash() {
        return window.location.hash.substring(1);
    },

    open(address) {
        window.location.hash = address;
    }
}

export default RouteService;