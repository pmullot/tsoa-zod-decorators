import { Express, NextFunction, Request, Response } from 'express';
import { BaseErrorInterface } from './error.lib';
/**
 * @tsoaModel
 */
export declare type InvalidArgumentError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type FailedPreconditionError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type OutOfRangeError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type UnauthenticatedError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type PermissionDeniedError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type NotFoundError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type AbortedError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type AlreadyExistsError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type ResourceExhaustedError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type CancelledError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type DataLossError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type UnknownError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type InternalError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type NotImplementedError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type UnavailableError = BaseErrorInterface;
/**
 * @tsoaModel
 */
export declare type DeadlineExceededError = BaseErrorInterface;
/**
 * Unique application Error Handler
 * @param error Error
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
export declare function expressErrorHandler(error: unknown, req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
/**
 * Register Not Found Handler
 * @param app Express App
 */
export declare function registerNotFoundHandler(app: Express): void;
/**
 * Register Error Handler
 * @param app Express App
 */
export declare function registerErrorHandler(app: Express): void;
