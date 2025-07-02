import express from 'express';
import { AuthRouters } from '../modules/Auth/auth.routes';
import { UserRouters } from '../modules/User/user.routes';
import { BlogRouters } from '../modules/Blog/blog.route';
import { AboutRouters } from '../modules/About/about.route';
import { ProductRoutes } from '../modules/Product/product.route';
import ContactRoutes from '../modules/Contact/contact.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/blogs',
    route: BlogRouters
  },
  {
    path: '/about',
    route: AboutRouters
  },
  {
    path: '/products',
    route: ProductRoutes
  },
  {
    path: '/contact',
    route: ContactRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
