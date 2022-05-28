import ProductIdPage from "../../../pages/ProductIdPage";
import Products from "../../../pages/Products";
import Login from "../../../pages/Login";
import Profile from "../../../pages/Profile";
import Basket from "../../../pages/Basket";
import OrderHistory from "../../../pages/OrderHistory";
import Registration from "../../../pages/Registration";
import Users from "../../../pages/Users";

export const privateRoutes = [
    {path: '/profile', component: Profile, exact: true},
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductIdPage, exact: true},
    {path: '/basket', component: Basket, exact: true},
    {path: '/order_history', component: OrderHistory, exact: true},
    {path: '/users', component: Users, exact: true}
]

export const publicRoutes = [
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductIdPage, exact: true},
    {path: '/profile', component: Profile, exact: true},
    {path: '/registration', component: Registration, exact: true},
    {path: '/login', component: Login, exact: true}
]