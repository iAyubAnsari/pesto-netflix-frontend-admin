import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './hoc/PrivateRoute';
import Spinner from './pages/shared/Spinner';
import { login, logout } from './redux';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

const Movies = lazy(() => import('./pages/movies/Movies'));
const MovieCreateOrEdit = lazy(() => import('./pages/movies/MovieCreateOrEdit'));

const Users = lazy(() => import('./pages/users/Users'));
const UserCreateOrEdit = lazy(() => import('./pages/users/UserCreateOrEdit'));

const Error404 = lazy(() => import('./pages/error-pages/Error404'));

const Login = lazy(() => import('./pages/user-pages/Login'));

class AppRoutes extends Component {
	render() {
		return (
			<Suspense fallback={<Spinner />}>
				<Switch>
					<PrivateRoute exact path="/" component={Dashboard} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />

					<PrivateRoute exact={true} path="/users" component={Users} />
					<PrivateRoute exact={true} path="/users/create" component={UserCreateOrEdit} />

					<PrivateRoute exact={true} path="/movies" component={Movies} />
					<PrivateRoute
						exact={true}
						path="/movies/create"
						component={MovieCreateOrEdit}
					/>
					<Route path="/login" component={Login} />
					<Route path="*" component={Error404} />
				</Switch>
			</Suspense>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLogin: state.isLogin,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		login: () => dispatch(login()),
		logout: () => dispatch(logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
