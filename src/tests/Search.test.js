import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from '../components/Search/Search';


describe('Search component', () => {


	// Verifica se renderizou o componente "Search".
	it('renders a form', () => {

		render(<Search />);
		expect(screen.getByTestId("search")).not.toBeNull();

	});


	// Testa se o campo de pesquisa consegue pesquisar.
	it('sends the search term when submitted', async () => {

		render(

			<Search
				search={ term =>
					expect(term).toEqual('')
				}
			/>

		);

		await fireEvent.submit(screen.getByTestId("search"));

	});


	// Verifica se renderizou o campo de pesquisa no padrão esperado.
	it('renders the search field by country as a text box', () => {

		render(<Search />);
		const field = screen.getByPlaceholderText("Pesquisar por país...");
		expect(field).not.toBeNull();
		expect(field.tagName).toEqual('INPUT');
		expect(field.type).toEqual('text');

	});


	// Verifica se renderizou o campo "label" de pesquisa no padrão esperado.
	it('renders a label for the search field', () => {

		render(<Search />);
		const label = screen.getByLabelText('Pesquisar por país');
		expect(label).not.toBeNull();

	});


	// Simula o usuário pesquisando o país Brasil.
	it('sends user-entered search term', async () => {

		const searchTerm = "Brasil";

		render(

			<Search
				search={ term =>
					expect(term).toEqual(searchTerm)
				}
			/>

		);

		await fireEvent.change(screen.getByPlaceholderText("Pesquisar por país..."), { target: { value: searchTerm } });

		await fireEvent.submit(screen.getByTestId("search"));
	});
	
});