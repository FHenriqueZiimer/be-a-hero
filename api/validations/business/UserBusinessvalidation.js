const connection = require('../../database/connection');

class UserBusinnesValidation {
  constructor() {
    this.errors = [];
  }

  async validateCreation(req) {
    await this.validateUser(req.email);

    return {
      errors: this.errors,
      valid: this.errors.length == 0
    }
  }

  async validateUser(email) {

    const getEmail =  await connection('user').select('email').where('email', email).first();

    if(getEmail !== undefined) {
      this.errors.push('Email já cadastrado');
    }
  }

}

module.exports = UserBusinnesValidation