import Vue from "vue";
import Router from "vue-router";
import Citys from "./views/citys.vue";
import Cinemas from "./views/cinemas.vue";
import Home from "./views/home.vue";
import Movie from "./components/movie.vue";
import Saler from "./components/saler.vue";
import Person from "./components/person.vue";
import Moviedetail from "./views/MovieDetail";
import Taketick from "./views/TakeTick";
import Map from "./views/map.vue";
import Order from "./views/order.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "citys",
            component: Citys
        },
        {
            path: "/cinemas",
            name: "cinemas",
            component: Cinemas
        },
        {
            path: "/home",
            component: Home,
            children: [{
                    path: "/",
                    redirect: "movie",
                    name: "home"
                },
                {
                    path: "/movie",
                    name: "movie",
                    component: Movie
                },
                {
                    path: "/saler",
                    name: "saler",
                    component: Saler
                },
                {
                    path: "/person",
                    name: "person",
                    component: Person
                }
            ]
        },
        {
            path: "/moviedetail",
            name: "moviedetail",
            component: Moviedetail
        },
        {
            path: "/taketick",
            name: "taketick",
            component: Taketick
        },
        {
            path: "/map",
            name: "map",
            component: Map
        },
        {
            path: "/order",
            name: "order",
            component: Order
        }
    ]
});