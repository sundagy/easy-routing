import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import {UserBody, UserController} from "./UserController";
import * as fs from "fs";
import YAML from 'yaml'

const storage = getMetadataArgsStorage()
const specObj = routingControllersToSpec(storage, {
    controllers:[
        UserController
    ]
})

console.log(specObj);

fs.writeFileSync('openapi.yaml', YAML.stringify(specObj));

console.log('done!');