import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import {UserController} from "./UserController";
import * as fs from "fs";
import YAML from 'yaml'

const storage = getMetadataArgsStorage()
const specObj = routingControllersToSpec(storage, {
    controllers:[
        UserController
    ]
})

fs.writeFileSync('openapi.yaml', YAML.stringify(specObj));

console.log('done!');