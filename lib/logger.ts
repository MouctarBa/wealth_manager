// lib/logger.ts
import pino from 'pino';

type SimpleLogger = {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
};

const isBrowser = typeof window !== 'undefined';

let logger: SimpleLogger;

if (isBrowser) {
  // In the browser, use console methods
  logger = {
    debug: console.debug.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };
} else {
  // On the server, write to file via pino
  // hide require calls from webpack bundler
  const fs = eval('require')('fs');
  const path = eval('require')('path');

  // ensure logs directory exists
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // set up file destination
  const dest = pino.destination({
    dest: path.join(logDir, 'app.log'),
    sync: false,
    minLength: 4096,
  });

  // create pino logger
  logger = pino(
    {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      redact: ['req.headers.authorization', 'user.password'],
    },
    dest
  );
}

export default logger;
