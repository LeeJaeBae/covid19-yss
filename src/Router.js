import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import { Home, YSSMap, Creator } from "./Container";
import Search from "./Container/Search";

export default function Router() {
	return (
		<Routes>
			<Route path="/" exact component={Home} />
			<Route path="/map" exact component={YSSMap} />
			<Route path="/search" exact component={Search} />
			<Route path="/creator" exact component={Creator} />
		</Routes>
	);
}
