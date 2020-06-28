class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly errors?: {
    [key: string]: string;
  } | undefined;

  constructor(message: string, statusCode = 400, errors?: { [type: string]: string; } | undefined) {
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors
  }
}

export default AppError;
