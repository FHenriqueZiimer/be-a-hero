import React, { Component } from 'react';
import heoresImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2'
import api from '../../services/api'

import './style.scss'


class Logon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      errors: {
        id: ''
      }
    }

    this.inputId = React.createRef();
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  validateForm () {
    let valid = true
    const errorsMessage = {};

    if(this.state.id.replace(/\s/g, '') === '') {
      valid = false
      this.inputId.current.style.borderColor = 'red'
      this.inputId.current.focus()
      errorsMessage.id = 'Por favor insira o seu ID'
    }

    if(!valid) {
      this.setState({
        errors: Object.assign({}, this.state.errors, errorsMessage)
      })
    }

    return valid
  }

  handleChange (e) {
    this.setState({ [e.target.name] : e.target.value })

    this.inputId.current.style.borderColor = ''
      this.setState({
        errors: ''
      })
  }

  async handleLogin (e) {
    e.preventDefault();

    const isValid = this.validateForm();

    if(isValid) {
      this.inputId.current.style.borderColor = ''
      this.setState({
        errors: ''
      })

      await api.post('login', { id: this.state.id }).then(async res => {
        localStorage.setItem('userId', this.state.id);
        localStorage.setItem('userName', res.data.name)

       await swal.fire({
          icon:'success',
          title: 'Parabéns!',
          text: `Olá ${res.data.name}! Seu login foi realizado com sucesso!`
        })

        this.props.history.push('/incidents');
      }).catch(error => {
        swal.fire({
          icon:'error',
          text: 'Erro no Login, verifique se o ID está correto'
        })
      })
    }
  }

  render() {
    return (
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="Logo Be The Hero"/>

          <form onSubmit={this.handleLogin}>
            <h1>Faça seu Login</h1>

            <input
              placeholder="* Seu Id"
              name="id"
              ref={this.inputId}
              value={this.state.id}
              onChange={e => this.handleChange(e)}
            />
            <span className="error">
              {this.state.errors.id}
            </span>
            <button className="button" type="submit">Entrar</button>
              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#E02041"/>
                  Não tenho cadastro
              </Link>
            </form>
          </section>
        <img src={heoresImg} alt="Heroes" />
      </div>
    )
  }
}




export default Logon