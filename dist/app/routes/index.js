"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const blog_route_1 = require("../modules/Blog/blog.route");
const about_route_1 = require("../modules/About/about.route");
const product_route_1 = require("../modules/Product/product.route");
const contact_route_1 = __importDefault(require("../modules/Contact/contact.route"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRouters,
    },
    {
        path: '/users',
        route: user_routes_1.UserRouters,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRouters
    },
    {
        path: '/about',
        route: about_route_1.AboutRouters
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes
    },
    {
        path: '/contact',
        route: contact_route_1.default
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
