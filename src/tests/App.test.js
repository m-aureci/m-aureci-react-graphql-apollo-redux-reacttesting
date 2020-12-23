import React from "react";
import { render, screen, wait } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import { contriesItemsVar } from '../queriesservice';
import { GETDATA } from '../queriesservice/queries';
import App from '../App';


// mock do país
const dataList = {
	Country: [
		{ 
			area: 8515767,
			capital: "Brasília",
			flag: {svgFile: "https://restcountries.eu/data/bra.svg"},
			nameTranslations: [{value: "Brasil"}],
			population: 206135893,
			topLevelDomains: [{name: ".br"}],

			
					
					location: [{longitude: 123, latitude: 456, x: 123, y: 456}],

					distanceToOtherCountries: [{countryName: "Paraguai", distanceInKm: "456"}],


			_id: "661"
		}
	]
};

const mocks = [{ request: { query: GETDATA }, result: { data: dataList }}];


describe('App component', () => {

	// Tenta renderizar o componente App sem erro.
	it('renders App component without errors', async () => {

		render(

			<MockedProvider mocks={mocks} addTypename={false}>
		      <App />
		    </MockedProvider>

		);

		await wait();

	});


	// Verifica se está renderizando o estado "Carregando..." inicialmente.
	it('should render loading state initially', async () => {

		render(

			<MockedProvider mocks={mocks} addTypename={false}>
		      <App />
		    </MockedProvider>

		);

		await wait(() => expect(screen.getByText("Carregando...")).not.toBeNull());

	});	


	// Testa se está armazenando os dados na variável reativa "contriesItemsVar". 
	it('store server data in the reactive variable', async () => {

		render(

			<MockedProvider mocks={mocks} addTypename={false}>
		      <App />
		    </MockedProvider>

		);

		await wait(() => expect(contriesItemsVar()).toEqual(dataList.Country));

	});


	// Testa se está emitindo erro corretamnete.
	it('should show error UI', async () => {

		const errorMocks = {

			request: {

				query: GETDATA
			},
			error: new Error('fail')

		};

		render(

			<MockedProvider mocks={[errorMocks]} addTypename={false}>
		      <App />
		    </MockedProvider>

		);

		await wait(() => expect(screen.getByText("Falha :(")).not.toBeNull());

	});
	
});