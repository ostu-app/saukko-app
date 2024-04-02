import { Response, NextFunction } from 'express';
import { Request } from '../types/requestType';

const tokensMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth: string|undefined = req.cookies.token;
    const changePassword: string|undefined = req.cookies["change-token"];

    // Because user is accessed for that cookie via email, we cannot set that as http-only cookie
    // Only server can set the http-only cookies, not in client-side
    // However, this is a singleuse token and headers are also SSL encrypted so everything should be ok.
    const verifyEmail = req.headers["verification-token"] as string|undefined;

    req.tokens = {
      auth,
      changePassword,
      verifyEmail
    }

    next();
  } catch (error) {
    console.log("Error happened while trying to set cookies in tokensMiddleware");
    res.status(500).json({ errorMessage: "Internal" })
  }
}

export default tokensMiddleware;