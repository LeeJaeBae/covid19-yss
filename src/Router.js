import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import { Home, YSSMap, Creator, Error, NoResult } from "./Container";
import Search from "./Container/Search";

export default function Router() {
	return (
		<Routes>
			<Route exact path="/" component={Home} />
			<Route path="/map" component={YSSMap} />
			<Route path="/search" component={Search} />
			<Route path="/creator" component={Creator} />

			<Route path="/404" component={Error} />
			<Route path="*" component={NoResult} />
		</Routes>
	);
}
