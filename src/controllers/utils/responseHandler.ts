import { Response } from 'express';

interface ResponseData {
  statusCode: number;
  message: any;
  error?: boolean;
}

export const responseHandler = (
  res: Response,
  code: number,
  message: any,
  isError: boolean = false
): void => {
  const responseBody: ResponseData = {
    statusCode: code,
    message: message,
    error: isError, 
  };

  res.status(code).json(responseBody);
};
