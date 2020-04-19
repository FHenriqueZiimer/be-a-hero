class ValidationError extends Error {
  constructor(errors) {
    super('validation-error');
    this.statusCode = 400;
    this.errors = errors || ['Erro de validação']
  }
}

module.exports = ValidationError;