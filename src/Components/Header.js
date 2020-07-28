import React from "react";
import styled from "styled-components";

const A = styled.a`
	grid-area: ${(props) => props.grid};
`;
const Head = styled.div`
	display: grid;
	grid-template-rows: 40px 50px 30px;
	grid-template-columns: repeat(5, 240px);
	grid-template-areas:
		". . . . ."
		"a . b c d"
		". . . . .";
	justify-content: center;
	justify-items: center;
	align-items: center;
`;
const ButtonMap = styled.img`
	width: 112px;
	height: 23px;
	left: 877px;
	top: 49px;
`;
const ButtonList = styled.img`
	width: 112px;
	height: 24px;
	left: 1104px;
	top: 49px;
`;
const ButtonCreator = styled.img`
	width: 106px;
	height: 23px;
	left: 1332px;
	top: 49px;
`;
const ButtonLogo = styled.img`
	width: 154px;
	height: 46px;
	top: 37px;
	left: 300px;
`;
export default function Header() {
	return (
		<Head>
			<A grid="a" href="/">
				<ButtonLogo src="/img/logo.gif" />
			</A>
			<A grid="b" href="/map">
				<ButtonMap src="/img/menu01.gif" />
			</A>
			<A grid="c" href="/search">
				<ButtonList src="/img/menu02.gif" />
			</A>
			<A grid="d" href="/creator">
				<ButtonCreator src="/img/menu03.gif" />
			</A>
		</Head>
	);
}
