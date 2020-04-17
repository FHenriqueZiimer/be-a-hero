import React from 'react';

import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

import './style.scss';

export default () => {
  return (
    <div className="containerError">
      <div className="contentError">
        <h1>404</h1>
          <p>Ops! Não encontramos oque você está procurando... Volte ao início para tentar novamente</p>
        <Link className="back-link" to="/">
          <FaHome height={16} color="#E02041" />
          Início
        </Link>
      </div>
    </div>
  );
};