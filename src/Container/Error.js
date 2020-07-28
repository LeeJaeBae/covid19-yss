import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";

const Container = styled.div``;
export default function Error() {
	return (
		<Container>
			<Header />
			<img
				src="/img/page/404/404.png"
				alt=""
				style={{ position: "relative", left: "50%", margin: "0 0 0 -1000px", zIndex: "-1" }}
			/>
		</Container>
	);
}
