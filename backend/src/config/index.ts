import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  nodeEnv: string;
  port: number;
  host: string;
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
  firebase: {
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    authUri: string;
    tokenUri: string;
    authProviderX509CertUrl: string;
    clientX509CertUrl: string;
  };
  database: {
    url: string;
  };
  redis: {
    url: string;
    password: string;
  };
  email: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
  sms: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
  upload: {
    maxFileSize: number;
    path: string;
    allowedTypes: string[];
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  cors: {
    origin: string[];
    credentials: boolean;
  };
  logging: {
    level: string;
    file: string;
  };
  security: {
    bcryptRounds: number;
    sessionSecret: string;
  };
}

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config: Config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  host: process.env.HOST || 'localhost',
  
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    clientId: process.env.FIREBASE_CLIENT_ID || '',
    authUri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
    tokenUri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL || ''
  },
  
  database: {
    url: process.env.DATABASE_URL || ''
  },
  
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD || ''
  },
  
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'noreply@darsni.com'
  },
  
  sms: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || ''
  },
  
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    path: process.env.UPLOAD_PATH || './uploads',
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,video/mp4,video/webm,application/pdf').split(',')
  },
  
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },
  
  cors: {
    origin: (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173').split(','),
    credentials: process.env.CORS_CREDENTIALS === 'true'
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log'
  },
  
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    sessionSecret: process.env.SESSION_SECRET || 'fallback-session-secret'
  }
};

// Validate configuration
if (config.port < 1 || config.port > 65535) {
  throw new Error('Invalid port number');
}

if (config.jwt.secret.length < 32) {
  throw new Error('JWT secret must be at least 32 characters long');
}

export default config;
