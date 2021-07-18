export class InternalError extends Error {
  constructor(
    public message: string,
    protected code: number = 500,
    protected description?: string
  ) {
    super(message);
    // Quando alguem chamar o constructor vai ver o nome da classa
    this.name = this.constructor.name;
    // Para ficar melhor de ver os erros, usando o stacktrace
    Error.captureStackTrace(this, this.constructor);
  }
}
