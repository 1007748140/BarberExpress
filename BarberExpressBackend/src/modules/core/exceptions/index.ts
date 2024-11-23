// src/core/exceptions/index.ts
export class BaseException extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class NotFoundException extends BaseException {
    constructor(message: string = 'Recurso no encontrado') {
      super(message);
    }
  }
  
  export class BadRequestException extends BaseException {
    constructor(message: string = 'Solicitud inválida') {
      super(message);
    }
  }
  
  export class UnauthorizedException extends BaseException {
    constructor(message: string = 'No autorizado') {
      super(message);
    }
  }
  
  export class ForbiddenException extends BaseException {
    constructor(message: string = 'Acceso denegado') {
      super(message);
    }
  }
  
  export class ConflictException extends BaseException {
    constructor(message: string = 'Conflicto con el recurso') {
      super(message);
    }
  }