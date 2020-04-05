import React, { useState } from 'react';
import heoresImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2'
import api from '../../services/api'

import './style.scss'


function Logon() {
  const [id, setId] = useState('')
  const { register, handleSubmit, errors } = useForm();

  async function handleLogin (_,e) {
    e.preventDefault();

    await api.post('login', { id }).then(res => {
      localStorage.setItem('userId', id); //salvando no browser o id
      localStorage.setItem('userName', res.data.name)

      swal.fire({
        icon:'success',
        title: 'Parabéns!',
        text: `Olá ${res.data.name}! Seu login foi realizado com sucesso!`
      })
    }).catch(error => {
      swal.fire({
        icon:'error',
        text: 'Erro no Login, verifique se o ID está correto'
      })
    })
  }

  return (
   <div className="logon-container">
     <section className="form">
      <img src={logoImg} alt="Logo Be The Hero"/>

      <form onSubmit={handleSubmit(handleLogin)}>
        <h1>Faça seu Login</h1>
        <input
          placeholder="Sua Id"
          name="id"
          ref={register({
            required: 'Por favor insira seu ID'
            })}
          value={id}
          onChange={e => setId(e.target.value)}
        />
         <span className="error">
              {errors.id && errors.id.message}
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

export default Logon