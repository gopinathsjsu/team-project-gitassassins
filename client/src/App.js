import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import hotel from "./pages/hotel";
import checkout from "./pages/checkout";
import Reservation from "./pages/Reservation/reservation";
import Reservations from "./pages/Reservation/Reservations";
import NavigationBar from "./components/NavigationBar";
import hotelSignup from "./pages/hotelSignup";
import hotelLogin from "./pages/hotelLogin";
import adminPage from "./pages/admin";
import cookie from "react-cookies";

//redux
import { LOGIN_USER } from "./redux/types"
import store from "./redux/store"

const user = cookie.load("customer")
// console.log(user._id, user.firstName, user.lastName, user.email);

if(user){
  let userDetails = {
	_id : user._id,
	firstName : user.firstName,
	lastName : user.lastName,
	email : user.email
  }
  store.dispatch({
	type : LOGIN_USER,
	payload : userDetails
  })
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<NavigationBar />
						<Switch>
							<Route exact path="/" component={home} />
							<Route exact path="/signup" component={signup} />
							<Route exact path="/login" component={login} />
							<Route
								exact
								path="/hotelSignup"
								component={hotelSignup}
							/>
							<Route
								exact
								path="/hotelLogin"
								component={hotelLogin}
							/>
							<Route exact path="/admin" component={adminPage} />
							<Route
								exact
								path="/customer/reservations"
								component={Reservation}
							/>
							<Route
								exact
								path="/hotel/get/:hotelId"
								component={hotel}
							/>
							<Route
								exact
								path="/checkout"
								component={checkout}
							/>
							<Route
								exact
								path="/reservations"
								component={Reservations}
							/>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
