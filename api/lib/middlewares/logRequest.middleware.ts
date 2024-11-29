import {NextFunction, Request, RequestHandler, Response} from "express";

export const logRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const url = req.url;

    console.log(`[${method}] ${url} ${new Date().toISOString()}`);

    next();
}
