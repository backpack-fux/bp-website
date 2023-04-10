// jest.setup.mjs
import '@testing-library/jest-dom/extend-expect';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

global.setImmediate = (cb) => {
    setTimeout(cb, 0);
  };

