import {
    BadRequestException,
    Body,
    createHandler,
    Post,
} from '@storyofams/next-api-decorators';
import { AxiosError } from 'axios';
import { client } from 'common/server';
import { logger } from 'common/server/logging';
import type { RegisterRequest, User } from 'common/types';
import { RequestRegisterEndpoint } from 'common/utilities';

type RegisterResponse = User;
class registerHandler {
    @Post()
    login(@Body() request: RegisterRequest) {
        return client
            .post<RegisterResponse>(RequestRegisterEndpoint, request)
            .then((response) => response.data)
            .catch((error: AxiosError<string, string>) => {
                logger.error(`Failed to call API: ${error.response?.data}`);
                throw new BadRequestException(error.response?.data);
            });
    }
}

export default createHandler(registerHandler);
