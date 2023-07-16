// this shim is required
import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { UserController } from './UserController';
import {Application} from "express";
import {AddressInfo} from "net";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    controllers: [UserController], // we specify controllers we want to use
    middlewares: [],
}) as Application;

const serv = app.listen(3000, () => {
    console.log('listening', (serv.address() as AddressInfo).port);
});