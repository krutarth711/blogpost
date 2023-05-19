import { Router } from 'express';

const routes = new Router();

routes.use('/', (req, res, next) => {
    res.send('Reached user routes')
})

export default routes;