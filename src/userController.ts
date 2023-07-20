import {Body, Controller, Example, Get, Path, Post, Query, Route, Security, SuccessResponse,} from "tsoa";
import {User} from "./user";
import {UserCreationParams, UsersService} from "./userService";
import {AuthScope, AuthSecurity} from "./authentication";

@Route("users")
export class UsersController extends Controller {
    /**
     * dfsdfs sfsdfsd fsd
     * @param userId Th user identifier
     * @param name Filter by name
     * @summary A summary text
     */
    @Example({
        userId: 23,
        name: 'gdfgdf'
    })
    @Get("{userId}")
    public async getUser(
        @Path() userId: number,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(userId, name);
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Security(AuthSecurity.Jwt, [AuthScope.Admin])
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<User> {
        this.setStatus(201); // set return status 201
        return new UsersService().create(requestBody);
    }
}