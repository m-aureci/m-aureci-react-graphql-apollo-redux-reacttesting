// Rotas -> Página principal de países -> Página detalhes do país  -> Página edição dos detalhes do país.
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Edit from '../components/Edit/Edit';
import Home from '../components/Home/Home';
import Details from '../components/Details/Details';

export default function Routes () {

	return (

		<Router>
			<Switch>
				<Route path="/react-graphql-apollo-redux" exact={true} component={ Home } />
				<Route path="/react-graphql-apollo-redux/:id" exact={true} render={ ({ match }) => <Details match={ match } />} />
				<Route path="/react-graphql-apollo-redux/editar/:id" render={ routeProps => <Edit { ...routeProps } />} />
				<Redirect to="/react-graphql-apollo-redux" />
			</Switch>
		</Router>

	);
}