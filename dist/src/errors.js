"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerErrorHandler = exports.registerNotFoundHandler = exports.expressErrorHandler = void 0;
const runtime_1 = require("@tsoa/runtime");
const error_lib_1 = require("./error.lib");
/**
 * Unique application Error Handler
 * @param error Error
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
function expressErrorHandler(error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    return __awaiter(this, void 0, void 0, function* () {
        let statusCode;
        let errorResponse;
        if (error instanceof runtime_1.ValidateError) {
            statusCode = error_lib_1.ErrorCode.INVALID_ARGUMENT;
            errorResponse = error_lib_1.BaseError.buildError(error_lib_1.ErrorCode.INVALID_ARGUMENT, error.message || error.name, error_lib_1.ErrorStatus.INVALID_ARGUMENT, [error.fields]);
        }
        else if (error instanceof error_lib_1.BaseError) {
            statusCode = error.code;
            errorResponse = error.toObject();
            console.warn(error.toString());
        }
        else {
            // error not controlled
            console.error(`ERROR NOT OPERATIONAL
    Error:
    ${JSON.stringify(error)}

    Stack
    ${error.stack}
    `);
            const message = error.message || 'Unknown error';
            statusCode = error_lib_1.ErrorCode.INTERNAL;
            errorResponse = error_lib_1.BaseError.buildError(error_lib_1.ErrorCode.INTERNAL, message, error_lib_1.ErrorStatus.INTERNAL, []);
        }
        res.status(statusCode);
        return res.json(errorResponse);
        /*
      
        Error format as google api design guide lines
        https://cloud.google.com/apis/design/errors
      
        {
          "error": {
            "code": 401,
            "message": "Request had invalid credentials.",
            "status": "UNAUTHENTICATED",
            "details": [{
              "@type": "type.googleapis.com/google.rpc.RetryInfo",
              ...
            }]
          }
        }
      
       */
    });
}
exports.expressErrorHandler = expressErrorHandler;
/**
 * Register Not Found Handler
 * @param app Express App
 */
function registerNotFoundHandler(app) {
    app.use((req, res, next) => {
        next(error_lib_1.BaseError.createNotFoundError('Requested path not found'));
    });
}
exports.registerNotFoundHandler = registerNotFoundHandler;
/**
 * Register Error Handler
 * @param app Express App
 */
function registerErrorHandler(app) {
    app.use(expressErrorHandler);
}
exports.registerErrorHandler = registerErrorHandler;
//# sourceMappingURL=errors.js.map