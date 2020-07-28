import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";

const Container = styled.div``;

export default function Home() {
	return (
		<Container>
			<img
				src="/img/page/home/home.png"
				alt=""
				style={{
					position: "absolute",
					left: "50%",
					margin: "0 0 0 -1000px",
					zIndex: "-1",
				}}
			/>
			<Header />
		</Container>
	);
}
