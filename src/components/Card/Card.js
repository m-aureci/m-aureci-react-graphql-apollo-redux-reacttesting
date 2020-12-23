// Apresenta cada país na tela inicial, vai formar uma listagem de cards de países.
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Flag, Country, Capital } from './styles';


export default function Card ({ country }) {

	const name = country.nameTranslations[0].value;
	const { flag, capital, _id } = country;

	// retorna um cartão de país contendo a bandeira, nome e capital.
	return (

		<Container data-testid="card">
			<Link data-testid="link-details" to={`/react-graphql-apollo-redux/${ _id }`}>
				<div>
					<Flag src={ flag.svgFile } alt={` Bandeira ${ name } `} />
				</div>
				<div>
					<Country>{ name }</Country>
					<Capital>{ capital }</Capital>
				</div>
			</Link>
		</Container>

	);
	
}