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
exports.ValidateBody = exports.Body = void 0;
const runtime_1 = require("@tsoa/runtime");
// Function parameter Decorator Factory
// Overrides tsoa Body Decorator
function Body() {
    return function (target, propertyKey, parameterIndex) {
        const existingMetadata = Reflect.getOwnMetadata('Body', target, propertyKey) || [];
        existingMetadata.push(parameterIndex);
        Reflect.defineMetadata('Body', existingMetadata, target, propertyKey);
    };
}
exports.Body = Body;
// Function Decorator Factory
function ValidateBody(validationSchema) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                // Retrieve the list of indices of the parameters that are decorated
                // in order to retrieve the body
                const bodyCandidates = Reflect.getOwnMetadata('Body', target, propertyKey) || [];
                if (bodyCandidates.length === 0) {
                    throw new runtime_1.ValidateError({
                        body: {
                            message: 'Body parameter is missing'
                        }
                    }, 'Body parameter is missing');
                }
                const bodyIndex = bodyCandidates[0];
                // we've found the body in the list of parameters
                // now we check if its payload is valid against the passed Zod schema
                const check = yield validationSchema.safeParseAsync(args[bodyIndex]);
                if (!check.success) {
                    // throw new Error(check.error.issues.map(issue => `${issue.message} for field/s [${issue.path.join(',')}]`).join(', '));
                    // return { status: 400, error: check.error.issues.map(issue => `${issue.message} for field/s [${issue.path.join(',')}]`).join(', ') };
                    const errorPayload = {};
                    check.error.issues.map(issue => {
                        errorPayload[issue.path.join(',')] = {
                            message: issue.message,
                            value: issue.code
                        };
                    });
                    throw new runtime_1.ValidateError(errorPayload, '');
                }
                // the payload checkout!
                // Call the original method with the arguments
                return originalMethod.apply(this, args);
            });
        };
    };
}
exports.ValidateBody = ValidateBody;
//# sourceMappingURL=validation.decorators.js.map