import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.scss';
import logoImg from '../../assets/logo.svg';

class newIncident extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      value: '',
      errors: {
        title: '',
        description: '',
        value: ''
      }
    }


    this.inputTitle = React.createRef();
    this.txtdescription = React.createRef();
    this.inputValue = React.createRef();

    this.handleChange = this.handleChange.bind(this)
    this.handleNewIncident = this.handleNewIncident.bind(this)

    this.userId = localStorage.getItem('userId');
  }

  validateNewIncident () {
    let valid = true;
    const errorsMessage = {};

    if(this.state.title.replace(/\s/g, '') === '') {
      this.inputTitle.current.style.borderColor = 'red'
      valid = false
      errorsMessage.title = 'Titulo obrigatório'
    }

    if(this.state.description.replace(/\s/g, '') === '') {
      this.txtdescription.current.style.borderColor = 'red'
      valid = false
      errorsMessage.description = 'Descrição obrigatória'
    }

    if(this.state.value.replace(/\s/g, '') === '') {
      this.inputValue.current.style.borderColor = 'red'
      valid = false
      errorsMessage.value = 'Valor obrigatório'
    }

    if(!valid) {
      this.setState({
        errors: Object.assign({}, this.state.errors, errorsMessage)
      })
    }

    return valid

  }

  handleChange(e) {
    const target = e.target;
    this.setState({ [target.name] : target.value });

    target.style.borderColor = '';

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [target.name]: ''
      }}
    ));
  }

  async handleNewIncident(e) {
    e.preventDefault();

    const isValid= this.validateNewIncident();

    if(isValid) {
      this.setState({ errors: '' })

      const data = {
        title: this.state.title,
        description: this.state.description,
        value: this.state.value,
      };

      try {
        await api.post("incidents/new", data,{
            headers: {
              Authorization: this.userId
            }
          }
        );
        this.props.history.push("/incidents");
      } catch (error) {
        alert("Error ao cadastrar caso");
      }
    }
  }


  render () {
    return (
      <div className="new-incident-container">
      <div className="content">
          <section>
              <img src={logoImg} alt="Be the Hero"/>
              <h1>Cadastrar novo caso</h1>
              <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
              <Link className="back-link" to="/incidents">
                  <FiArrowLeft size={16} color="#E02041" />
                  Voltar para Home
              </Link>
          </section>

          <form onSubmit={this.handleNewIncident}>
              <input
                name="title"
                ref={this.inputTitle}
                placeholder="* Titulo do caso"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />
              <span className="error">
                {this.state.errors.title}
              </span>

              <textarea
                name="description"
                ref={this.txtdescription}
                placeholder="* Descrição"
                value={this.state.description}
                onChange={e => this.handleChange(e)}
              />
              <span className="error">
                {this.state.errors.description}
              </span>

              <input
                name="value"
                ref={this.inputValue}
                placeholder="* Valor em reais"
                value={this.state.value.replace(/\D/g, "")}
                onChange={e => this.handleChange(e)}
              />
              <span className="error">
                {this.state.errors.value}
              </span>

              <button className="button" type="submit">Cadastrar</button>

          </form>
      </div>
  </div>
    )
  }
}

export default newIncident;