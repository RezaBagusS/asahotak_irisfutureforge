import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || '';

interface TokenPayload {
  id: number;
  username: string | null; 
  email: string;
}

const generateAccessToken = (payload: TokenPayload): string => {
    const options: jwt.SignOptions = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, SECRET_KEY, options);
  };

const generateRefreshToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1d",
      });
    
    return token;
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error:any) {
    console.error('Invalid token:', error.message);
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, verifyToken };
