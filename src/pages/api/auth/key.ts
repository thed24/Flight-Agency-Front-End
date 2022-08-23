import { createHandler, Get } from '@storyofams/next-api-decorators';
import { readApiKey, RequiresAuth } from 'common/server';

class keyHandler {
    @Get()
    @RequiresAuth()
    key() {
        return readApiKey();
    }
}

export default createHandler(keyHandler);
