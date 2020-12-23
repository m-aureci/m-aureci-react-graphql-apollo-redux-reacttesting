import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Card from "../components/Card/Card";


// Criar um renderizador para usar nos testes.
const renderWithRouter = (ui, { route = '/' } = {}) => {

  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })

}


describe("Card component", () => {

	// Cria um mock de um país, que será consumido pelo objeto Card.
	const dataCard = {

		area: 8515767,
		capital: "Brasília",
		flag: {svgFile: "https://restcountries.eu/data/bra.svg"},
		nameTranslations: [{value: "Brasil"}],
		population: 206135893,
		topLevelDomains: [{name: ".br"}],
		_id: "661"

	};


	// Tenta renderizar o componente card.
	it('renders Card component', () => {

		renderWithRouter(<Card country={dataCard} />);
		expect(screen.getByTestId("card")).not.toBeNull();

	});

	
	// Atribui o mock de país ao componente "Card" e testa se ele recebeu e traduziu "Brazil" corretamente.
	describe("country name", () => {

		it('renders the country name', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByText(/Brasil/i)).not.toBeNull();

		});

		it('check if it is the correct name', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByText(/Brasil/i).textContent).toBe(dataCard.nameTranslations[0].value);

		});

	});


	// Atribui o mock de país ao componente "Card" e testa se ele recebeu a capital.
	describe("country capital", () => {

		it('renders the country capital', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByText(/Brasília/i)).not.toBeNull();

		});

		it('check if it is the correct capital', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByText(/Brasília/i).textContent).toBe(dataCard.capital);

		});

	});


	// Simula o usuário clicando num país (que é um Card) da lista de países da página inicial, levando-o a página de detalhes.
	describe("link for details", () => {

		it('renders link details', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByTestId("link-details")).not.toBeNull();

		});

		it('check click on the link details', () => {

			const history = createMemoryHistory();

			render(

				<Router history={history}>
					<Card country={dataCard} />
				</Router>

			);

			fireEvent.click(screen.getByTestId("link-details"));
			const path = history.location.pathname;
			expect(path).toBe(`/react-graphql-apollo-redux/${dataCard._id}`);

		});
	});


	// Testa se Card recebeu a Bandeira do mock.
	describe("country flag", () => {

		it('renders the country flag', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByAltText(/Bandeira/i)).not.toBeNull();

		});

		it('check if it is the correct flag', () => {

			renderWithRouter(<Card country={dataCard} />);
			expect(screen.getByAltText(/Bandeira/i).src).toBe(dataCard.flag.svgFile);
		});

	});
	
});