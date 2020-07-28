import React, { Component } from "react";
import styled from "styled-components";
import Header from "../Components/Header";

class Search extends Component {
	state = {
		searchStatus: "standby",
		searchResult: {},
	};
	sendSearchTerm = () => {
		const term = document.getElementById("search-bar");
		const searchTerm = term.value ? { company_name: term.value } : { company_name: "nothing" };

		const url = "http://13.124.124.67/list/company_search";
		this.setState({ searchStatus: "pending" });
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(searchTerm),
		}).then((res) =>
			res.json().then((json) => {
				console.log(json);
				term.value = "";
				if (json.info.length < 1) {
					this.setState({ searchStatus: "nothing" });
				} else {
					this.setState({ searchStatus: "done", searchResult: json.info });
				}
			})
		);
	};
	searchPost = () => {
		switch (this.state.searchStatus) {
			case "standby":
				return <Companies />;
			case "pending":
				return <Companies>pending</Companies>;
			case "nothing":
				return (
					<Companies>
						<Result>결과없음</Result>
					</Companies>
				);
			case "done":
				return <Companies rows={this.state.searchResult.length} />;
			default:
				break;
		}
	};
	render() {
		return (
			<Container>
				<Header />
				<Banner src="/img/page/search/page3_banner.png" />
				<SearchContainer>
					<SearchBar
						type="text"
						placeholder="업체명을 검색하세요."
						id="search-bar"
						onKeyUp={(e) => {
							if (e.keyCode === 13) {
								this.sendSearchTerm();
							}
						}}
					/>
					<SearchBtn onClick={this.sendSearchTerm}>
						<BtnImg src="/img/page/search/page3_search_btn.gif" />
					</SearchBtn>
				</SearchContainer>
				{this.searchPost()}
				<Footer src="/img/partials/footer/copyright.png" />
			</Container>
		);
	}
}
// styled-components
const Container = styled.div`
	min-height: 100vh;
`;
const Banner = styled.img`
	position: relative;
	left: 50%;
	margin: 0 0 0 -1000px;
	z-index: -1;
`;
const Footer = styled.img`
	position: relative;
	left: 50%;
	bottom: 0;
	margin: 0 0 0 -1000px;
	z-index: -1;
`;
const SearchContainer = styled.div`
	position: relative;
	top: -45px;
	display: grid;
	grid-template-rows: 50px;
	grid-template-columns: repeat(12, 100px);
	grid-template-areas: ". . . search search search search search search-btn . . .";
	justify-content: center;
	justify-items: center;
	align-items: center;
`;
const SearchBar = styled.input`
	grid-area: search;
	width: 100%;
	height: 100%;
	border: none;

	padding: 0 0 0 30px;

	box-sizing: border-box;

	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;

	box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.1);

	font-size: 14px;

	:focus {
		outline: none;
	}
	::placeholder {
		font-weight: 700;
	}
`;
const SearchBtn = styled.div`
	display: flex;
	box-sizing: border-box;
	grid-area: search-btn;
	width: 100%;
	height: 100%;

	padding: 0 10px 0 10px;

	background-color: black;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;

	justify-items: center;
	align-items: center;
	box-shadow: 2px 4px 5px 1px rgba(0, 0, 0, 0.1);

	&:hover {
		cursor: pointer;
	}
`;
const BtnImg = styled.img``;
const Companies = styled.div`
	min-height: calc(100vh - 277px - 120px - 5px - 86px);
	display: grid;

	grid-template-rows: repeat(${(props) => (props.rows ? props.rows : "1")}, 60px);
	grid-template-columns: repeat(8, 150px);
	grid-template-areas: ${(props) => {
		if (props.searchStatus === "done") {
			return '"test . . ."';
		} else {
			return "'. result result reusult result result result .'";
		}
	}};
	justify-content: center;
	justify-items: center;
	align-items: center;
`;
const Result = styled.div`
	grid-area: result;
`;
// const Nothing = styled.div``;

export default Search;
