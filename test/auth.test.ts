import request from 'supertest';
import app from '../src/config/express';
import { expect } from 'chai';

describe('POST /login', () => {
    it('should return 404', () => {
        return request(app).post('/login').expect(404);
    });
});

describe('POST /register', () => {
    it('should return 500', () => {
        return request(app).post('/register').expect(500);
    });
});

describe('POST /logout', () => {
    it('should return 500', () => {
        return request(app).post('/logout').expect(500);
    });
});

describe('PUT /modifyUser', () => {
    it('should return 500', () => {
        return request(app).put('/modifyUser').expect(500);
    });
});

describe('DELETE /deleteUser', () => {
    it('should return 500', () => {
        return request(app).delete('/deleteUser').expect(500);
    });
});
