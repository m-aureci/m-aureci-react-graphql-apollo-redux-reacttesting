import React from "react";
import { BrowserRouter, Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, wait, fireEvent } from "@testing-library/react";
import { DETAILS } from '../queriesservice/queries';
import { createMemoryHistory } from 'history';
import Edit from '../components/Edit/Edit';


// Criar um renderizador para usar nos testes.
const renderWithRouter = (ui, { route = '/react-graphql-apollo-redux/661' } = {}) => {

	window.history.pushState({}, 'Test page', route)

	return render(ui, { wrapper: BrowserRouter })

}

// Cria um mock/cobaia de um detalhe de país, que será consumido pelo Form de edição do Detalhe.
const mocks = [
	{ 
		request: { 
			query: DETAILS, 
			variables: { id: "661"}
		},
		result: { 
			data: {
				details: {
					area: 8515767,
					capital: "Brasília",
					flag: {svgFile: "https://restcountries.eu/data/bra.svg"},
					nameTranslations: [{value: "Brasil"}],
					population: 206135893,
					topLevelDomains: [{name: ".br"}],
					_id: "661"
				}
			}
		}
	}
];


// É passado um país como parãmetro, o qual vai ser editado no Form de edição.
const match = {
	params: {
		id: "661"
	}
};


describe('Edit component', () => {

	// Tenta renderizar o país no componente "Edit".
	it('renders Edit component without errors', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks} addTypename={false}>
				<Edit match={match} />	
			</MockedProvider>

		);

		await wait();

	});	


	// Carrega o componente "Edit" com um mock vazio e testa a menssagem de tratamento do país não localizado.
	it("check if you haven't found the country", async () => {

		const notFindMock = { 

			request: { 

				query: DETAILS, 
				variables: { id: "661"}

			},

			result: { 

				data: {

					details: []

				}
			}
		};		
	
		renderWithRouter(

			<MockedProvider mocks={[notFindMock]}>
				<Edit match={match} />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("País não encontrado. Tente novamente.")).not.toBeNull());
	});


	// Carrega um mock indefinido e testa tratamento para o erro "undefined".
	it("check if date is undefined", async () => {

		const notFindMock = { 

			request: { 

				query: DETAILS, 
				variables: { id: "661"}

			},

			result: { 

				data: undefined

			}
		};		
	
		renderWithRouter(

			<MockedProvider mocks={[notFindMock]}>
				<Edit match={match} />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("Carregando...")).not.toBeNull());
	});


	// Testa se está emitindo erro de falha corretamnete.
	it('should show error UI', async () => {

		const errorMock = {

			request: {
			query: DETAILS,
			variables: { id: '661' },
			},
			error: new Error('fail'),
		};

		renderWithRouter(

			<MockedProvider mocks={[errorMock]} addTypename={false}>
				<Edit match={match} />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("Falha :(")).not.toBeNull());

	});


	// Verifica se está renderizando o estado "Carregando..." inicialmente.
	it('should render loading state initially', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Edit match={match} />	
			</MockedProvider>

		);

		expect(screen.getByText("Carregando...")).not.toBeNull();
		await wait();

	});

	
	// Testa se está renderizando o botão de voltar.
	it('renders link go back', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Edit match={match} />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("Voltar")).not.toBeNull());

	});


	// Testa se está apresentando para o usuário o botão de editar.
	it("creates correct object to save changes", async () => {

		const history = createMemoryHistory()

		render(

			<MockedProvider mocks={mocks}>
				<Router history={history}>
			      <Edit match={match} history={history} />
			    </Router>	
			</MockedProvider>

		);

		await wait(() => fireEvent.submit(screen.getByTestId("edit")));

	});
	
});