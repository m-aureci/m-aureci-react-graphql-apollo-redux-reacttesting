// Responsável por preparar e chamar o Form de edição dos detalhes.
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { DETAILS } from '../../queriesservice/queries';
import { contriesItemsVar } from '../../queriesservice/index';
import { Btn, Container } from './styles';
import Message from '../Message/Message';
import Form from '../Form/Form';


export default function Edit ({ match, history }) {

	const [ getDetails, { error, loading, data }] = useLazyQuery( DETAILS, 
		{ variables: { id: match.params.id } }
	);


	useEffect( () => {

		getDetails();

	},[getDetails]);
	
	
	// Tratamento de menssagens de usuário para os estados da página.
	if (error) return <Message>Falha :(</Message>;
	if (loading) return <Message>Carregando...</Message>;
	if (data === undefined) return <Message>Carregando...</Message>;
	  
  	if (data.details.length === 0) {

  		return <Message>
			País não encontrado. Tente novamente. <br />
			<Link to="/react-graphql-apollo-redux">Voltar</Link>
		</Message>
  	}


  	const edit = edited => {

  		const newLocalData = contriesItemsVar().map( item => {

  			if ( item._id === edited._id )
				  return edited;
				  
  			return item;
  		});

  		contriesItemsVar([ ...newLocalData ]);

  		history.push("/react-graphql-apollo-redux");
  	};
	
	  
	return (

		<Container>

			
			<Link to="/react-graphql-apollo-redux"><Btn>Voltar</Btn></Link> 

			<Form country={ data.details } edit={ edit } />
			
		</Container>

	);

}