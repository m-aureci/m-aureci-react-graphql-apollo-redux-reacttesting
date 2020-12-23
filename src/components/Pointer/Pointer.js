// Marca um ponto no mapa da página de detalhes - É utilizado para marcar os 5 países mais próximos do país selecionado.
import PropTypes from "prop-types";
import React from "react";
import { PointerContainer } from './styles';


function Pointer({ text = 0 }) {

  return <PointerContainer>{Math.round(text)} KM</PointerContainer>;
}


Pointer.propTypes = {

  text: PropTypes.number.isRequired,  
};


export default Pointer;
