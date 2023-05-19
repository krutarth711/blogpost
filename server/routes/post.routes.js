import { Router } from 'express';

const routes = new Router();

routes.use('/', (req, res, next) => {
    res.send('Reached post routes')
})

export default routes;