// Tela de detalhe do país. Com imagem da bandeira, mais 4 campos de textos, Google Maps e o botão Editar.

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { DETAILS } from '../../queriesservice/queries';
import { Btn, Container, Flag, Country, Table, THead, Cell, MapWorld } from './styles';
import MapsWorld from "../MapsWorld/MapsWorld";
import Message from '../Message/Message';


export default function Details ({ match }) {

	const [ getList, { error, loading, data }] = useLazyQuery( DETAILS,
		{ variables: { id: match.params.id } }
	);


	useEffect(() => {

		getList();

	},[getList]);
	

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

	  
	const name = data.details.nameTranslations[0].value;
	const { flag, capital, area, population, topLevelDomains } = data.details;
	

	// Retorna a imagem da bandeira, 4 campos de textos, botão Editar e Google Maps.
	return (

		<Container>
			<Link to="/react-graphql-apollo-redux"><Btn>Voltar</Btn></Link>
			<Flag>
				<img src={ flag.svgFile } alt={` Bandeira ${ name } `} />
			</Flag>
			<Country>{ name }</Country>
			<Table>
				<tbody>
					<tr>
						<THead>Capital</THead>
						<Cell>{ capital }</Cell>
					</tr>
					<tr>
						<THead>Área</THead>
						<Cell>{ area } km²</Cell>
					</tr>
					<tr>
						<THead>População</THead>
						<Cell>{ population }</Cell>
					</tr>
					<tr>
						<THead>Domínio</THead>
						<Cell>{ topLevelDomains[0].name }</Cell>
					</tr>
				</tbody>
			</Table>			

			<MapWorld>  

				<Link to={`/react-graphql-apollo-redux/editar/${match.params.id}`}><Btn>Editar</Btn></Link>

			</MapWorld>

			<MapWorld> <MapsWorld selectedCountry={data.details} /> </MapWorld>
		</Container>

	);
}