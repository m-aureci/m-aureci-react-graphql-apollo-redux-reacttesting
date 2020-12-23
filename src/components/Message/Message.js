// Trata as menssagens de todas as telas do sistema. Menssagens de usuário para os estados da página. Ex.: "Carregando...".
import React from 'react';
import { Container } from './styles';

export default function Message ({ children }) {

	return (

		<Container>
			{ children }
		</Container>
	);
	
}