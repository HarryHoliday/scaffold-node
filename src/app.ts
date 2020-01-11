// import path from 'path';

// ex) use express or cote

const app = async (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // console.log('====================================');
      // console.log(path.resolve(__dirname, '/'));
      // console.log('====================================');
      resolve();
    }, 1000);
  });
};

export default app;
