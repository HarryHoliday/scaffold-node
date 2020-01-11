class CustomError extends Error {
  code: string;
  isHandled: boolean;
  status: number;

  constructor({ name = 'ERROR_GENERAL', message = '', code = '', status = 500 }) {
    super(message);
    this.name = name;
    this.message = message;
    this.code = code;
    this.isHandled = true;
    this.status = status;
  }

  toJSON = (): object => {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      // stacktrace: this.stack,
    };
  };
}

export default CustomError;
//
export const get500Error = (message: string): Error => new CustomError({ message });
//
export const get400Error = (message: string): Error => new CustomError({ message, status: 400 });
//
export const getTimeoutError = (message = '네트워크 오류입니다.'): Error =>
  new CustomError({ name: 'ERROR_TIMEOUT', message });
//
export const getNotFoundError = (message = 'NOT_FOUND'): Error =>
  new CustomError({ name: 'ERROR_NOT_FOUND', message, status: 404 });
