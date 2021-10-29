import request from 'supertest';
import app from '../src/config/express';
import { expect } from 'chai';

describe('POST /login', () => {
    it('should return 404', () => {
        return request(app).post('/login').expect(404);
    });
});
