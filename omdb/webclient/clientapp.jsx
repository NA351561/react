import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,IndexRoute, browserHistory} from 'react-router';

import {Movie, DBMovies, NavBar, Login} from './components/movie';

ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/" component={Login}>
				<IndexRoute component={Login} />
			</Route>
			<Route path="/navbar" component={NavBar}>
					<IndexRoute component={Movie} />
					<Route path="/search" component={Movie} />
					<Route path="/display" component={DBMovies} />
			</Route>
		</Router>,
  	document.getElementById('mountapp')
);
