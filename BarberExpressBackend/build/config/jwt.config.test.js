"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("./jwt.config");
jest.mock('jsonwebtoken');
describe('JWT Configuration', () => {
    const mockUserId = 1;
    const mockEmail = 'test@test.com';
    const mockRole = 'user';
    const mockToken = 'mockToken123';
    const mockSecret = 'testSecret';
    beforeEach(() => {
        process.env.JWT_SECRET = mockSecret;
        jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
    });
    describe('generateToken', () => {
        it('should generate a token with correct payload', () => {
            const token = (0, jwt_config_1.generateToken)(mockUserId, mockEmail, mockRole);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({
                id: mockUserId,
                email: mockEmail,
                role: mockRole
            }, mockSecret, { expiresIn: expect.any(String) });
            expect(token).toBe(mockToken);
        });
    });
    describe('verifyToken', () => {
        const mockPayload = {
            id: mockUserId,
            email: mockEmail,
            role: mockRole
        };
        it('should verify and return token payload when token is valid', () => {
            jsonwebtoken_1.default.verify.mockReturnValue(mockPayload);
            const result = (0, jwt_config_1.verifyToken)(mockToken);
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith(mockToken, mockSecret);
            expect(result).toEqual(mockPayload);
        });
        it('should throw error when token verification fails', () => {
            jsonwebtoken_1.default.verify.mockImplementation(() => {
                throw new Error('Token verification failed');
            });
            expect(() => (0, jwt_config_1.verifyToken)(mockToken)).toThrow('Token verification failed');
        });
    });
});
//# sourceMappingURL=jwt.config.test.js.map