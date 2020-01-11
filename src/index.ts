import logger from '~lib/logger';
import app from './app';
import './health';

const boot = async (): Promise<void> => {
  try {
    logger.info(process.env, 'app env');
    // time check
    console.time('boot app');
    await app();
    console.timeEnd('boot app');
    //
  } catch (error) {
    logger.error(error);
  }
};

boot();
