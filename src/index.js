import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {CartProvider} from './context/cart.context';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {store} from './store/store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<CartProvider>
					<App/>
				</CartProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
