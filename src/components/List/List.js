// Faz parte da tela inicial, responsável por apresentar a listagem de cards dos países.
import React from 'react';
import { Container } from './styles';
import Card from '../Card/Card';
import Message from '../Message/Message';


export default function List ({ loading, error, data }) {

	// Tratamento de menssagens de usuário para os estados da página.
	if (error) return <Message>Falha :(</Message>;
	if (loading) return <Message>Carregando...</Message>;  	
  	if (data === undefined) return <Message>Carregando...</Message>;
  	if (data.list.length === 0) return <Message>País não encontrado. Tente novamente.</Message>;
  
	
	// Retorna listagem de cards dos países.
	return (
		<Container data-testid="list">
			{
				data.list.map(( country, i ) => 
					<Card key={ i } country={ country } />
				)
			}
		</Container>
	);
}