import { AxiosError } from 'axios';
import { client, readApiKey, RequiresAuth } from 'common/server';
import type { LoginRequest, RegisterRequest, User } from 'common/types';
import {
    RequestLoginEndpoint,
    RequestRegisterEndpoint,
} from 'common/utilities';
import {
    BadRequestException,
    Body,
    createHandler,
    Get,
    Post,
} from 'next-api-decorators';

type LoginResponse = User;
type RegisterResponse = User;

class authorizationHandler {
    @Post('/login')
    login(@Body() request: LoginRequest) {
        return client
            .post<LoginResponse>(RequestLoginEndpoint, request)
            .then((result) => result.data)
            .catch((error) => {
                throw new BadRequestException(error.response.data);
            });
    }

    @Get('/key')
    @RequiresAuth()
    key() {
        return readApiKey();
    }

    @Post('/register')
    register(@Body() request: RegisterRequest) {
        return client
            .post<RegisterResponse>(RequestRegisterEndpoint, request)
            .then((response) => response.data)
            .catch((error: AxiosError<string, string>) => {
                throw new BadRequestException(error.response?.data);
            });
    }
}

export default createHandler(authorizationHandler);
