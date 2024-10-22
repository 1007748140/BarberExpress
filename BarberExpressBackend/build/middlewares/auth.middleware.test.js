"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./auth.middleware");
const jwt_config_1 = require("../config/jwt.config");
jest.mock('../../config/jwt.config', () => ({
    verifyToken: jest.fn()
}));
describe('Auth Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;
    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        nextFunction = jest.fn();
    });
    it('should return 401 if no authorization header is present', () => {
        (0, auth_middleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Authorization header must start with Bearer'
        });
    });
    it('should return 401 if authorization header does not start with Bearer', () => {
        mockRequest.headers = {
            authorization: 'Basic token123'
        };
        (0, auth_middleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Authorization header must start with Bearer'
        });
    });
    it('should call next() and set user if token is valid', () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            role: 'user'
        };
        mockRequest.headers = {
            authorization: 'Bearer validToken123'
        };
        jwt_config_1.verifyToken.mockReturnValue(mockUser);
        (0, auth_middleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(jwt_config_1.verifyToken).toHaveBeenCalledWith('validToken123');
        expect(mockRequest.user).toEqual(mockUser);
        expect(nextFunction).toHaveBeenCalled();
    });
    it('should return 401 if token verification fails', () => {
        mockRequest.headers = {
            authorization: 'Bearer invalidToken'
        };
        jwt_config_1.verifyToken.mockImplementation(() => {
            throw new Error('Token verification failed');
        });
        (0, auth_middleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid or expired token',
            error: 'Token verification failed'
        });
    });
});
//# sourceMappingURL=auth.middleware.test.js.map