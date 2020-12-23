// Formulário de edição dos detalhes dos países. 
// Monta uma tela com seis campos de textos e botão "Salvar".
import React, { useReducer } from 'react';
import { FormContainer, Group, Label, Field, Btn } from './styles';


export default function Form ({ country, edit }) {

	const name = country.nameTranslations[0].value;
	const { flag, capital, area, population, topLevelDomains } = country;


	const [ fields, setFields ] = useReducer(( fields, field ) => ({ ...fields, ...field }),
		{ flag: flag.svgFile, name, capital, area, population, topLevelDomains: topLevelDomains[0].name }
	);


	const change = event => setFields({[ event.target.name ]: event.target.value });


	const submit = event => {

		const edited = {

			...country,
			nameTranslations: [{ ...country.nameTranslations[0], value: fields.name }], 
			flag: { ...flag, svgFile: fields.flag },
			topLevelDomains: [{ ...topLevelDomains[0], name: fields.topLevelDomains }],
			capital: fields.capital,
			area: fields.area,
			population: fields.population
		};

		edit( edited );
		event.preventDefault();
	}

	const defaultAttrs = { onChange: change, required: true };


	const formModel = [

		{ label: "Bandeira", attrs: { name: "flag", type: "text", value: fields.flag } },
		{ label: "Nome", attrs: { name: "name", type: "text", value: fields.name } },
		{ label: "Capital", attrs: { name: "capital", type: "text", value: fields.capital } },
		{ label: "Área km²", attrs: { name: "area", type: "number", value: fields.area } },
		{ label: "População", attrs: { name: "population", type: "number", value: fields.population } },
		{ label: "Domínio", attrs: { name: "topLevelDomains", type: "text", value: fields.topLevelDomains } }

	];

	// uma tela com seis campos de textos e botão "Salvar".
	return (

		<FormContainer data-testid="edit" onSubmit={ submit }>
			{
				formModel.map(( item, i ) => 
					<Group key={i}>
						<Label htmlFor={item.attrs.name}>{ item.label }:</Label>
						<Field data-testid={`edit-input-${item.attrs.name}`} id={item.attrs.name} { ...item.attrs } { ...defaultAttrs } />
					</Group>
				)
			}
			<Btn>Salvar</Btn>
		</FormContainer>

	);
	
}