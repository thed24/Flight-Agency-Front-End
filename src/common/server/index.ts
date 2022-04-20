import axios from 'axios';

export { readApiKey } from './secrets';
export { Cache } from './cache';
export { RequiresAuth } from './decorators';

export const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:8080',
});
