import {Controller, Param, Body, Get, Post, Put, Delete, QueryParam, BodyParam, ContentType} from 'routing-controllers';
import {OpenAPI} from "routing-controllers-openapi";
import {IsBoolean, IsOptional, IsPositive} from "class-validator";

class UserBody {
    @IsOptional()
    @IsPositive()
    limit?: number;

    @IsBoolean()
    isActive: boolean;
}

@Controller()
export class UserController {
    @Get('/users')
    getAll() {
        return 'This action returns all users';
    }

    @Get('/users/:id')
    @OpenAPI({
        description: 'Fucking fuck',
        responses: {
            '400': {
                description: 'Bad request',
            },
        },
    })
    getOne(@Param('id') id: number,
           @QueryParam('type', {required: true, type: Number}) type: string,
    ) {
        return 'This action returns user #' + id + '---' + typeof(type);
    }

    @Post('/users')
    post(@Body() user: any) {
        return 'Saving user...';
    }

    @Put('/users/:id')
    @ContentType("application/json")
    async put3334(@Param('id') id: number,
        @BodyParam("user", {
            required: true,
        }) user: UserBody,
    ): Promise<UserBody> {
        console.log(user)

        return {...user, limit: 1112};
    }

    @Delete('/users/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }
}