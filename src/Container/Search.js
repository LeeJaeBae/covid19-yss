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
				term.value = "";
				if (json.info.length < 1) {
					this.setState({ searchStatus: "nothing" });
				} else {
					this.setState({ searchStatus: "done", searchResult: json.info });
				}
			})
		);
		this.setState({ searchStatus: "standby" });
	};
	searchPost = () => {
		switch (this.state.searchStatus) {
			case "standby":
				return <Companies />;
			case "pending":
				return;
			case "nothing":
				return (
					<div className="list_wrap">
						<div className="list_box">
							<ul>
								<li className="tit"></li>
								<li></li>
								<li>검색 결과가 없습니다</li>
							</ul>
						</div>
					</div>
				);
			case "done":
				const companies = this.state.searchResult;

				let array = [];
				for (let i = 0; i < companies.length; i++) {
					array.push(
						<div className="list_box">
							<ul>
								<li className="tit">
									<Title>{companies[i].BPLCNM}</Title>
								</li>
								<li>
									<Address>
										{companies[i].RDNWHLADDR
											? companies[i].RDNWHLADDR
											: companies[i].SITEWHLADDR}
									</Address>
								</li>
								<li>
									<Contact>
										{companies[i].SITETEL ? companies[i].SITETEL : "번호 없음"}
									</Contact>
								</li>
							</ul>
							<div
								className="equi_btn"
								style={{
									position: "relative",
									top: "calc(50% - 25px)",
									cursor: "pointer",
								}}
								onClick={() => {
									for (let j = 0; j < companies.length; j++) {
										let reset = document.getElementById(`equi-box-${j}`);
										reset.style.display = "none";
									}
									let target = document.getElementById(`equi-box-${i}`);
									target.style.display = "block";
								}}
							>
								<div>
									<img
										src="/img/page/search/page3_list_btn.gif"
										alt="보유장비 보기"
									/>
								</div>
							</div>
							<Equi id={`equi-box-${i}`}>
								<div className="equi_box">
									<p>보유장비현황</p>
									<div className="equi_box_list">
										<ul>
											<li>
												초미립자살포기수
												<span>{companies[i].MICROSPKLNUM}개</span>
											</li>
											<li>
												방독면수 <span>{companies[i].GMKNUM}개</span>
											</li>
											<li>
												휴대용소독기수
												<span>{companies[i].HNDUSESTLZNUM}개</span>
											</li>
											<li>
												보호안경수 <span>{companies[i].PROTGLSNUM}개</span>
											</li>
										</ul>
										<ul>
											<li>
												동력분무기수
												<span>{companies[i].DYNPWSPRAYNUM}개</span>
											</li>
											<li>
												보호용의복수
												<span>{companies[i].PROTUSECLOTNUM}개</span>
											</li>
											<li>
												수동식분무기수
												<span>{companies[i].HDOPTDSPRAYNUM}개</span>
											</li>
											<li>
												진공청소기수
												<span>{companies[i].VACUCLERNUM}개</span>
											</li>
										</ul>
									</div>
									<div
										className="equi_box_close"
										onClick={() => {
											let target = document.getElementById(`equi-box-${i}`);
											target.style.display = "none";
										}}
										style={{ cursor: "pointer" }}
									>
										<img
											src="/img/page/search/page3_box_close.gif"
											alt="보유장비현황 닫기"
										/>
									</div>
								</div>
							</Equi>
						</div>
					);
				}
				return <div className="list_wrap">{array}</div>;
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
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								this.sendSearchTerm();
							}
						}}
					/>
					<SearchBtn onClick={this.sendSearchTerm}>
						<BtnImg src="/img/page/search/page3_search_btn.gif" />
					</SearchBtn>
				</SearchContainer>
				<Companies>{this.searchPost()}</Companies>
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

	padding: 0 0 0 10px;

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
const BtnImg = styled.img`
	width: calc(100% - 20px);
`;
const Companies = styled.div`
	position: relative;

	width: 1200px;

	left: calc(50% - 600px);
	min-height: calc(100vh - 277px - 120px - 5px - 86px - 140px);
	margin-bottom: 70px;
`;
const Equi = styled.div`
	display: none;
`;
const Title = styled.div`
	width: 250px;
`;
const Address = styled.div`
	width: 550px;

	overflow: hidden;
`;
const Contact = styled.div``;

export default Search;
