import ProductIdPage from "../../../pages/ProductIdPage";
import Products from "../../../pages/Products";
import Login from "../../../pages/Login";
import Profile from "../../../pages/Profile";
import Basket from "../../../pages/Basket";

export const privateRoutes = [
    {path: '/profile', component: Profile, exact: true},
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductIdPage, exact: true},
    {path: '/basket', component: Basket, exact: true}
]

export const publicRoutes = [
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductIdPage, exact: true},
    {path: '/profile', component: Profile, exact: true},

    {path: '/login', component: Login, exact: true}
]