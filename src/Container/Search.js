import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";

const Container = styled.div``;
export default function Search() {
	return (
		<Container>
			<Header />
			<img
				src="/img/list_page.png"
				alt=""
				style={{ position: "absolute", left: "50%", margin: "0 0 0 -1000px", zIndex: "-1" }}
			/>
		</Container>
	);
}
