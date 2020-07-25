import React from "react";
import styled from "styled-components";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import App from "./App";

const Home = () => {
	return (
		<Container>
			<img
				src="/img/map_main.png"
				alt=""
				style={{ position: "absolute", left: "50%", margin: "0 0 0 -1000px", zIndex: "-1" }}
			/>
			<Header>
				<a href="/">
					<ButtonLogo src="/img/logo.gif" />
				</a>
				<a href="/map">
					<ButtonMap src="/img/menu01.gif" />
				</a>
				<a href="/list">
					<ButtonList src="/img/menu02.gif" />
				</a>
				<a href="/creator">
					<ButtonCreator src="/img/menu03.gif" />
				</a>
			</Header>
		</Container>
	);
};
const List = () => {
	return (
		<Container>
			<img
				src="/img/list_page.png"
				alt=""
				style={{ position: "absolute", left: "50%", margin: "0 0 0 -1000px", zIndex: "-1" }}
			/>
			<Header>
				<a href="/">
					<ButtonLogo src="/img/logo.gif" />
				</a>
				<a href="/map">
					<ButtonMap src="/img/menu01.gif" />
				</a>
				<a href="/list">
					<ButtonList src="/img/menu02.gif" />
				</a>
				<a href="/creator">
					<ButtonCreator src="/img/menu03.gif" />
				</a>
			</Header>
		</Container>
	);
};
const Creator = () => {
	return (
		<Container>
			<img
				src="/img/continue_page.png"
				alt=""
				style={{ position: "absolute", left: "50%", margin: "0 0 0 -1000px", zIndex: "-1" }}
			/>
			<Header>
				<a href="/">
					<ButtonLogo src="/img/logo.gif" />
				</a>
				<a href="/map">
					<ButtonMap src="/img/menu01.gif" />
				</a>
				<a href="/list">
					<ButtonList src="/img/menu02.gif" />
				</a>
				<a href="/creator">
					<ButtonCreator src="/img/menu03.gif" />
				</a>
			</Header>
		</Container>
	);
};

const Container = styled.div`
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
`;
const Header = styled.div`
	position: absolute;
	top: 0;
	height: 120px;
	width: 100%;
`;
const ButtonMap = styled.img`
	position: absolute;
	width: 112px;
	height: 23px;
	left: 877px;
	top: 49px;
`;
const ButtonList = styled.img`
	position: absolute;
	width: 112px;
	height: 24px;
	left: 1104px;
	top: 49px;
`;
const ButtonCreator = styled.img`
	position: absolute;
	width: 106px;
	height: 23px;
	left: 1332px;
	top: 49px;
`;
const ButtonLogo = styled.img`
	position: absolute;
	width: 154px;
	height: 46px;
	top: 37px;
	left: 300px;
`;

export default function Router() {
	return (
		<Routes>
			<Route path="/" exact component={Home} />
			<Route path="/map" exact component={App} />
			<Route path="/list" exact component={List} />
			<Route path="/creator" exact component={Creator} />
		</Routes>
	);
}
