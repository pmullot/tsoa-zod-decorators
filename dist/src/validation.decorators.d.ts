import { ZodSchema } from 'zod';
export declare function Body(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export declare function ValidateBody(validationSchema: ZodSchema): (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
