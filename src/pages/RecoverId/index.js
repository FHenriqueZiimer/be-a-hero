import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import swal from 'sweetalert2'
import './style.scss'
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'

class RecoverId extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errors: {
        email: ''
      }
    }

    this.inputEmail = React.createRef();

    this.handleRecover = this.handleRecover.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const target = e.target

    this.setState({ [target.name] : target.value })

    target.style.borderColor = '';

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [target.name]: ''
      }}
    ));
  }


  validateRecover () {
    let valid = true;
    const errorsMessage = {};

    if(this.state.email.replace(/\s/g, '') === '') {
      this.inputEmail.current.style.borderColor = 'red'
      valid = false
      errorsMessage.email = 'Email obrigatório'
    }

    if(!this.state.email.includes('@') || !this.state.email.includes('.')) {
      this.inputEmail.current.style.borderColor = 'red'
      valid = false
      errorsMessage.email = 'Email inválido'
    }

    if(!valid) {
      this.setState({
        errors: Object.assign({}, this.state.errors, errorsMessage)
      })
    }

    return valid
  }

  async handleRecover(e) {
    e.preventDefault()

    const isValid= this.validateRecover()

    if(isValid) {
      this.setState({ errors: '' })

      const data= {
        email: this.state.email
      }

      await api.post('recover', data).then(async res => {
        await swal.fire({
          text: `Seu Id é: ${res.data.id}`,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
        }
      });
        this.props.history.push('/');
      }).catch(error => {
        console.log(error)
        swal.fire({
          icon: 'error',
          text: 'Email não encontrado, tente novamente',
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        });
      })
    }


  }


  render() {
    return (
      <div className="container-recover">
        <div className="content-recover">
           <img src={logoImg} alt="Logo Be The Hero"/>

          <form onSubmit={this.handleRecover} className="recover">
            <h1>Insira o seu email para recuperar o ID</h1>
              <input
                placeholder="* Email"
                name="email"
                ref={this.inputEmail}
                value={this.state.email}
                onChange={e => this.handleChange(e)}
              />
               <span className="error">
                 {this.state.errors.email}
              </span>
            <button className="button" type="submit">Recuperar ID</button>
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041"/>
                Login
            </Link>
           </form>
        </div>
      </div>
    );
  }

}

export default RecoverId;
