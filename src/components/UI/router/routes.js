import ProductIdPage from "../../../pages/ProductIdPage";
import Products from "../../../pages/Products";
import Login from "../../../pages/Login";
import Profile from "../../../pages/Profile";

export const privateRoutes = [
    {path: '/profile', component: Profile, exact: true},
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductIdPage, exact: true},
]

export const publicRoutes = [
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductIdPage, exact: true},
    {path: '/profile', component: Profile, exact: true},

    {path: '/login', component: Login, exact: true}
]