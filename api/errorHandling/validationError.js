class ValidationError extends Error {
  constructor(errors) {
    console.log(errors)
    super('validation-error');
    this.statusCode = 400;
    this.errors = errors || ['Erro de validação']
  }
}

module.exports = ValidationError;