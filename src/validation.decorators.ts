
import { FieldErrors, ValidateError } from '@tsoa/runtime';
import { ZodSchema } from 'zod';


// Function parameter Decorator Factory
// Overrides tsoa Body Decorator
export function Body() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const existingMetadata = Reflect.getOwnMetadata('Body', target, propertyKey) || [];
    existingMetadata.push(parameterIndex);
    Reflect.defineMetadata('Body', existingMetadata, target, propertyKey);
  };
}

// Function Decorator Factory
export function ValidateBody(validationSchema: ZodSchema) {
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // Retrieve the list of indices of the parameters that are decorated
      // in order to retrieve the body
      const bodyCandidates: number[] = Reflect.getOwnMetadata('Body', target, propertyKey) || [];
      if (bodyCandidates.length === 0) {
        throw new ValidateError({
          body: {
            message: 'Body parameter is missing'
          }
        }, 'Body parameter is missing');
      }
      const bodyIndex = bodyCandidates[0] as number;
      // we've found the body in the list of parameters
      // now we check if its payload is valid against the passed Zod schema
      const check = await validationSchema.safeParseAsync(args[bodyIndex]);
      if (!check.success) {
        // throw new Error(check.error.issues.map(issue => `${issue.message} for field/s [${issue.path.join(',')}]`).join(', '));
        // return { status: 400, error: check.error.issues.map(issue => `${issue.message} for field/s [${issue.path.join(',')}]`).join(', ') };
        const errorPayload: FieldErrors = {};
        check.error.issues.map(issue => {
          errorPayload[issue.path.join(',')] = {
            message: issue.message,
            value: issue.code
          };
        });
        throw new ValidateError(errorPayload, '');

      }
      // the payload checkout!
      // Call the original method with the arguments
      return originalMethod.apply(this, args);
    };
  };
}