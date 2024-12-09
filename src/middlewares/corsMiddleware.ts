import { NextFunction, Request, Response } from 'express';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization, access-control-allow-credentials',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
  );

  res.header('Access-Control-Allow-Origin', req.headers.origin);

  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
}
