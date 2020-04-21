import React, { Component } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom'
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import swal from 'sweetalert2'
import './style.scss';



class Incident extends Component {
  constructor(props) {
    super(props)

    this.state = {
      incidents: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleDeleteIncident = this.handleDeleteIncident.bind(this)

    this.userName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId');
    this.loadData();
  }

  handleChange(e) {
    const target = e.target;
    this.setState({ [target.name] : target.value });
  }

  async handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  async handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers : {
          Authorization : this.userId,
        }
    });
    this.loadData()
    this.setState(this.state.incidents.filter(incident => incident.id !== id));
    } catch (err) {
      console.log(err)
      swal.fire({
        icon:'error',
        text: 'Erro ao deletar caso, tente novamente'
      })
      }
  }

  async loadData() {
    if(this.userId === '' || this.userId === null) {
      this.props.history.push('/')
    }
    const response = await api.get('incidents', {
      headers: {
        Authorization: this.userId
      }
    });
    this.setState({ incidents: response.data });
  }



  render () {
    return (
      <div className="incidents-container">
        <header>
          <img src={logoImg} alt="Be the Hero" />
          <span>Bem vindo (a), <strong>{this.userName}</strong>!</span>

          <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
            <button onClick={this.handleLogout} type="button">
              <FiPower size={18} color="#E02041" />
            </button>
        </header>
        <h1>Casos cadastrados: <strong>{this.state.incidents.length}</strong></h1>

        <ul>
          {this.state.incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
                <p>{incident.title}</p>
              <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>
              <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
              <button onClick={() => this.handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#E02041" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Incident