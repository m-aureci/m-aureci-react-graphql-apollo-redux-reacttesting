import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import { LIST } from '../queriesservice/queries';
import Home from '../components/Home/Home';


// Cria um mock/cobaia de um país.
const mocks = [
	{ 
		request: { 
			query: LIST, 
			variables: { term: "" }
		},
		result: { 
			data: {
				list: [
					{
						area: 8515767,
						capital: "Brasília",
						flag: {svgFile: "https://restcountries.eu/data/bra.svg"},
						nameTranslations: [{value: "Brasil"}],
						population: 206135893,
						topLevelDomains: [{name: ".br"}],
						_id: "661"
					}
				]
			}
		}
	}
];


describe('Home component', () => {

	// Verifica se renderizou o componente "Home".
	it('renders Home component without errors', async () => {

		render(

			<MockedProvider mocks={mocks} addTypename={false}>
				<Home />	
			</MockedProvider>

		);

		await wait();

	});


	// Verifica se está renderizando o estado "Carregando..." inicialmente.
	it("checks if it's loading", async () => {

		render(

			<MockedProvider mocks={mocks} addTypename={false}>
				<Home />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("Carregando...")).not.toBeNull());
	});
	
});