import { Router } from 'express';
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/post', postRoutes);

routes.use('/', (req, res, next) => {
    console.log("REACHING HERE>! ", req.url);
    return res.send('connected')
})

export default routes;