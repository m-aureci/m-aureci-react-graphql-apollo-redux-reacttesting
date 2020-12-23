import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { render, screen, wait } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import Details from '../components/Details/Details';
import { DETAILS } from '../queriesservice/queries';


// Criar um renderizador para usar nos testes.
const renderWithRouter = (ui, { route = '/react-graphql-apollo-redux/661' } = {}) => {

  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })

}

// Cria um mock de um detalhe de país, que será consumido pela página Details.
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
					
					location: [{longitude: 123, latitude: 456}],

					distanceToOtherCountries: [{countryName: "123", distanceInKm: "456"}],

					_id: "661"
				}
			}
		}
	}
];

const match = {
	params: {
		id: "661"
	}
};


describe('Details component', () => {

	// Tenta renderizar o componente Details.
	it('renders Details component without errors', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks} addTypename={false}>
				<Details match={match} />	
			</MockedProvider>

		);

		await wait();

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
				<Details match={match} />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("Falha :(")).not.toBeNull());

	});


	// Verifica se está renderizando o estado "Carregando..." inicialmente.
	it('should render loading state initially', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Details match={match} />	
			</MockedProvider>

		);

		expect(screen.getByText("Carregando...")).not.toBeNull();
		await wait();

	});


	// Testa menssagem de tratamento quando não acha o país.
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
				<Details match={match} />	
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
				<Details match={match} />	
			</MockedProvider>

		);

		await wait(() => expect(screen.getByText("Carregando...")).not.toBeNull());

	});


	// Testa se está carregando o campo Bandeira do país.
	it('renders flag field', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Details match={match} />	
			</MockedProvider>
		);

		await wait(() => {

			const flag = screen.getByAltText("Bandeira Brasil");
			expect(flag).not.toBeNull();
			expect(flag.src).toBe("https://restcountries.eu/data/bra.svg");

		});

	});

	// Testa se está renderizando o campo capital corretamente.
	it('renders capital field', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Details match={match} />	
			</MockedProvider>

		);

		await wait(() => {

			expect(screen.getByText("Capital")).not.toBeNull();
			expect(screen.getByText("Brasília")).not.toBeNull()

		});

	});


	// Testa se está carregando o campo "Área".
	it('renders area field', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Details match={match} />	
			</MockedProvider>

		);

		await wait(() => {

			expect(screen.getByText("Área")).not.toBeNull();
			expect(screen.getByText("8515767 km²")).not.toBeNull();

		});

	});


	// Testa se está carregando o campo população.
	it('renders population field', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Details match={match} />	
			</MockedProvider>

		);

		await wait(() => {

			expect(screen.getByText("População")).not.toBeNull();
			expect(screen.getByText("206135893")).not.toBeNull();

		});

	});


	// Testa se está carregando o campo "Domínio".
	it('renders topLevelDomains field', async () => {

		renderWithRouter(

			<MockedProvider mocks={mocks}>
				<Details match={match} />	
			</MockedProvider>

		);

		await wait(() => {

			expect(screen.getByText("Domínio")).not.toBeNull();
			expect(screen.getByText(".br")).not.toBeNull();

		});

	});
	
});