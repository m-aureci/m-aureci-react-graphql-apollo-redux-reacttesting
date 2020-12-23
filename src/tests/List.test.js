import React from "react";
import { Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import List from "../components/List/List";


// Cria um mock/cobaia de um país.
const dataList = {
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
};


describe("List component", () => {


	// Verifica se renderizou o componente "List".
	it("checks whether to render the error", () => {

		render(<List loading={false} error={true} />);
		expect(screen.getByText("Falha :(")).not.toBeNull();

	});


	// Verifica se o mock foi caregado.
	it("checks whether the list has rendered", () => {

		const history = createMemoryHistory();

		render(

			<Router history={history}>
				<List loading={false} error={false} data={dataList} />
			</Router>

		);

		expect(screen.getByTestId("list")).not.toBeNull();

	});


	it('shoulds render loading state initially', () => {

		render(<List loading={true} />);
		expect(screen.getByText("Carregando...")).not.toBeNull();

	});


	// Verifica se está renderizando o estado "Carregando..." inicialmente.
	it("checks if you didn't find countries", () => {

		render(<List loading={false} error={false} data={{list:[]}} />);
		expect(screen.getByText("País não encontrado. Tente novamente.")).not.toBeNull();

	});


	it("check if date is still undefined", () => {

		render(<List loading={false} error={false} />);
		expect(screen.getByText("Carregando...")).not.toBeNull();

	});
	
});