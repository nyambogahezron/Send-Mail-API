import { Request, Response, NextFunction } from 'express';

export const AsyncHandler =
	(fn: any) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
