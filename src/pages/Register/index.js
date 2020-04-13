import React, { Component }  from 'react';
import InputMask from 'react-input-mask';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.scss';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      number: '',
      city: '',
      uf: '',
      errors: {
        name: '',
        email: '',
        number: '',
        uf: '',
      }
    };

    this.inputName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputNumber = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  };

  handleChange (e) {
    const target = e.target;

    this.setState({ [target.name] : target.value });

    target.style.borderColor = '';

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [target.name]: ''
      }}
    ));
   };

  validateRegister () {
    let valid = true;
    const errorsMessage = {};

    if(this.state.name.replace(/\s/g, '') === '') {
      this.inputName.current.style.borderColor = 'red'
      valid = false
      errorsMessage.name = 'Nome obrigatório'
    }

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

    if(this.state.number ===  '') {
      this.inputNumber.style.borderColor = 'red'
      valid = false
      errorsMessage.number = 'Número obrigatório'
    }

    if(!valid) {
      this.setState({
        errors: Object.assign({}, this.state.errors, errorsMessage)
      })
    }

    return valid
  }

  async handleRegister (e) {
    e.preventDefault();

    const isValid= this.validateRegister()

    if(isValid) {
      this.setState({ errors: '' })

      const data = {
        name: this.state.name,
        email: this.state.email,
        number: this.state.number,
        city: this.state.city,
        uf: this.state.uf
      }

     await api.post('user', data).then(res => {
        swal.fire({
          text: `Seu id foi criado: ${res.data.id}`,
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
          text: 'Erro no cadastro, tente novamente',
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

render () {
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo Be The Hero"/>
             <h1>Cadastro</h1>
             <p>Faça seu cadastro, entre na plataforma e veja como esse projeto funciona!</p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041"/>
                Login
            </Link>
        </section>

        <form onSubmit={this.handleRegister}>
          <input
            name="name"
            ref={this.inputName}
            placeholder="* Nome"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
          />
          <span className="error">
            {this.state.errors.name}
          </span>

          <input
            name="email"
            ref={this.inputEmail}
            placeholder="* E-mail"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />
            <span className="error">
              {this.state.errors.email}
            </span>

          <InputMask
            mask="(99) 9999-99999"
            name="number"
            inputRef={(input) => this.inputNumber = input}
            placeholder="* WhatsApp"
            value={this.state.number}
            onChange={(e) => this.handleChange(e)}
          />
          <span className="error">
            {this.state.errors.number}
          </span>

        <div className="input-group">
          <input
            placeholder="Cidade"
            name="city"
            value={this.state.city}
            onChange={(e) => this.handleChange(e)}
          />

          <input
            maxLength="2"
            placeholder="UF"
            name="uf"
            style={{width: 80}}
            value={this.state.uf.toUpperCase()}
            onChange={(e) => this.handleChange(e)}
          />
          <span className="error">
            {this.state.errors.uf}
          </span>

        </div>

          <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Register