// Tela inicial, apresenta o campo de pesquisa (Search) e a listagem de cards de países (List).
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LIST } from '../../queriesservice/queries';
import Search from '../Search/Search';
import List from '../List/List';


export default function Home () {

	const [ getList, { error, loading, data }] = useLazyQuery( LIST, 
		{ variables: { term: "" } }
	);

	useEffect( () => { 

		getList();

	},[getList]);


	const search = term => {

		getList({ variables: { term: term } });

	};

	return (

		<>
			<Search search={ search } />
			<List loading={ loading } error={ error } data={ data } />
		</>	
		
	);

}