"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./auth.middleware");
const jwtConfig = __importStar(require("../config/jwt.config"));
jest.mock('../config/jwt.config', () => ({
    verifyToken: jest.fn()
}));
describe('Middleware de autenticación', () => {
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
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Debería devolver 401 si no hay ningún encabezado de autorización presente', () => {
        (0, auth_middleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Authorization header must start with Bearer'
        });
    });
    it('Debería devolver 401 si el encabezado de autorización no comienza con Bearer', () => {
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
    it('Debería llamar a next() y configurar el usuario si el token es válido', () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            role: 'barber'
        };
        mockRequest.headers = {
            authorization: 'Bearer validToken123'
        };
        jwtConfig.verifyToken.mockReturnValue(mockUser);
        (0, auth_middleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(jwtConfig.verifyToken).toHaveBeenCalledWith('validToken123');
        expect(mockRequest.user).toEqual(mockUser);
        expect(nextFunction).toHaveBeenCalled();
    });
    it('Debería devolver 401 si falla la verificación del token', () => {
        mockRequest.headers = {
            authorization: 'Bearer invalidToken'
        };
        jwtConfig.verifyToken.mockImplementation(() => {
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