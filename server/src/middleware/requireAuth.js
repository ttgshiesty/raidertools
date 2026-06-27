import { jwtVerify, createRemoteJWKSet } from 'jose';

const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const AWS_REGION = process.env.AWS_REGION || 'us-east-2';
const JWKS_URL = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

let JWKS;
if (COGNITO_USER_POOL_ID) {
  JWKS = createRemoteJWKSet(new URL(JWKS_URL));
}

export const requireAuth = async (req, res, next) => {
  // Development fallback
  if (process.env.NODE_ENV !== 'production' && process.env.DEV_USER_ID) {
    req.user = {
      id: process.env.DEV_USER_ID,
      sub: process.env.DEV_USER_ID,
      email: 'dev@shiesty.me'
    };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!JWKS) {
        throw new Error('JWKS not initialized. Check COGNITO_USER_POOL_ID env var.');
    }
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`,
    });

    req.user = {
      id: payload.sub,
      sub: payload.sub,
      email: payload.email
    };

    next();
  } catch (err) {
    console.error('[Auth] Token verification failed:', err.message);
    return res.status(401).json({ error: 'Unauthorized', details: err.message });
  }
};

export default requireAuth;
