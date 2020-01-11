import logger from '~lib/logger';
import sleep from '~lib/sleep';
import app from './app';

const boot = async (): Promise<void> => {
  try {
    await sleep(100);
    logger.info(process.env, 'app env');
    // time check
    console.time('boot app');
    await app();
    console.timeEnd('boot app');
    //
    require('./health');
    //
  } catch (error) {
    logger.error(error);
  }
};

boot();
