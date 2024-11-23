"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.BaseException = void 0;
class BaseException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseException = BaseException;
class NotFoundException extends BaseException {
    constructor(message = 'Recurso no encontrado') {
        super(message);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends BaseException {
    constructor(message = 'Solicitud inválida') {
        super(message);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends BaseException {
    constructor(message = 'No autorizado') {
        super(message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends BaseException {
    constructor(message = 'Acceso denegado') {
        super(message);
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends BaseException {
    constructor(message = 'Conflicto con el recurso') {
        super(message);
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=index.js.map