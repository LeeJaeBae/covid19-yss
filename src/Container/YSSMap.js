import React, { Component } from "react";
import styled from "styled-components";
import icon from "../icon/off_location_ico.png";
import iconRed from "../icon/current_location_ico.png";

class YSSMap extends Component {
	state = {
		isLoading: false,
		toggle: true,
		marker: [],
		map: {},
		currentIcon: new window.kakao.maps.MarkerImage(
			icon,
			new window.kakao.maps.Size(66, 76),
			new window.kakao.maps.Point(29, 62)
		),
		selectIcon: new window.kakao.maps.MarkerImage(
			iconRed,
			new window.kakao.maps.Size(66, 76),
			new window.kakao.maps.Point(29, 62)
		),
		myPosition: {},
		companies: [],
		service: new window.kakao.maps.services.Places(),
		currentLocationOn: false,
		guInfomation: [
			{ center: { latitude: 37.5173319258532, longitude: 127.047377408384 }, name: "강남구" },
			{ center: { latitude: 37.5301933196159, longitude: 127.123792501252 }, name: "강동구" },
			{ center: { latitude: 37.6397513275882, longitude: 127.025538071854 }, name: "강북구" },
			{ center: { latitude: 37.5509646154244, longitude: 126.849533759514 }, name: "강서구" },
			{ center: { latitude: 37.4783683761333, longitude: 126.951561853868 }, name: "관악구" },
			{ center: { latitude: 37.5385583136667, longitude: 127.082385189457 }, name: "광진구" },
			{ center: { latitude: 37.4954330863648, longitude: 126.88750531451 }, name: "구로구" },
			{ center: { latitude: 37.4568411485785, longitude: 126.895456780023 }, name: "금천구" },
			{ center: { latitude: 37.6543617567057, longitude: 127.056430475216 }, name: "노원구" },
			{
				center: { latitude: 37.5745229817122, longitude: 127.039657001091 },
				name: "동대문구",
			},
			{ center: { latitude: 37.6686914100284, longitude: 127.04721049936 }, name: "도봉구" },
			{ center: { latitude: 37.5124820423519, longitude: 126.93931505634 }, name: "동작구" },
			{ center: { latitude: 37.5662141900954, longitude: 126.901955141101 }, name: "마포구" },
			{ center: { latitude: 37.579161863979, longitude: 126.9368156604 }, name: "서대문구" },
			{ center: { latitude: 37.4835924256371, longitude: 127.032693842117 }, name: "서초구" },
			{ center: { latitude: 37.563427205337, longitude: 127.036930141185 }, name: "성동구" },
			{ center: { latitude: 37.5893588153919, longitude: 127.016702905651 }, name: "성북구" },
			{ center: { latitude: 37.5145909234015, longitude: 127.105922243305 }, name: "송파구" },
			{ center: { latitude: 37.5169884752609, longitude: 126.866501409661 }, name: "양천구" },
			{
				center: { latitude: 37.5263671784802, longitude: 126.896278443882 },
				name: "영등포구",
			},
			{ center: { latitude: 37.5324310391314, longitude: 126.990582345331 }, name: "용산구" },
			{ center: { latitude: 37.6028246477271, longitude: 126.928945504408 }, name: "은평구" },
			{ center: { latitude: 37.5731294715895, longitude: 126.979230043705 }, name: "종로구" },
			{ center: { latitude: 37.563814978331, longitude: 126.997555182057 }, name: "중구" },
			{ center: { latitude: 37.6065432383919, longitude: 127.092820287004 }, name: "중랑구" },
		],
	};
	componentDidMount() {
		const { currentLocationOn } = this.state;
		let mapContainer = document.getElementById("kakao-map");
		let myPosition = [];
		currentLocationOn
			? navigator.geolocation.getCurrentPosition((res) => {
					myPosition.push(res.coords.latitude);
					myPosition.push(res.coords.longitude);
					this.setState({
						isLoading: true,
						map: this.makeMap(mapContainer, ...myPosition),
						myPosition: myPosition,
					});
			  })
			: this.setState({
					isLoading: true,
					map: this.makeMap(mapContainer, 37.555121, 126.970768),
					myPosition: false,
			  });
		let array = [];
		for (let i = 0; i < 100; i++) {
			let obj = { latitude: 37.555121 + i * 0.01, longitude: 126.970768 };
			array.push(obj);
		}
		this.setState({ locations: array });
	}
	makeMap = (container, latitude, longitude) => {
		const { kakao } = window;
		let option = {
			center: new kakao.maps.LatLng(latitude, longitude),
			level: 4,
		};
		let map = new kakao.maps.Map(container, option);
		return map;
	};
	sendGuInfo = () => {
		const { map } = this.state;
		let location = map.getBounds();
		location = {
			end_lat: location.ja,
			start_lat: location.ka,
			start_lng: location.da,
			end_lng: location.ia,
		};
		this.resetMarkers();
		let url = `http://13.124.124.67/list`;
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(location),
		}).then((res) =>
			res
				.json()
				.then((json) => {
					let marker = new window.kakao.maps.Marker();
					if (!json.success) {
						console.log("false");
					} else {
						this.setState({ companies: json.info, marker: marker });
					}
				})
				.then(() => {
					this.makeMarkers();
				})
				.then(() => {
					this.setMarkers();
				})
		);
	};
	sendGuInfo = (value) => {
		for (let i = 0; i < this.state.guInfomation.length; i++) {
			if (this.state.guInfomation[i].name === value) {
				this.resetMarkers();
				let url = `http://13.124.124.67/list/gu_search`;
				fetch(url, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ gu_name: value }),
				}).then((res) =>
					res
						.json()
						.then((json) => {
							let marker = new window.kakao.maps.Marker();
							if (!json.success) {
								console.log("false");
							} else {
								this.setState({ companies: json.info, marker: marker });
							}
						})
						.then(() => {
							this.makeMarkers();
						})
						.then(() => {
							this.setMarkers();
							this.setMapPosition(
								this.state.guInfomation[i].center.latitude,
								this.state.guInfomation[i].center.longitude
							);
						})
				);
			}
		}
	};
	setMapPosition = (latitude, longitude) => {
		this.state.map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
		this.state.map.setLevel(5);
	};
	makeMarkers = () => {
		const { currentIcon, companies } = this.state;
		let array = [];
		for (let i = 0; i < companies.length; i++) {
			let marker = new window.kakao.maps.Marker({
				opacity: 1,
			});
			marker.setImage(currentIcon);

			marker.setPosition(new window.kakao.maps.LatLng(companies[i].lat, companies[i].lng));
			array.push(marker);
		}

		this.setState({ marker: array });
	};
	resetMarkers = () => {
		const { marker } = this.state;
		for (let i = 0; i < marker.length; i++) {
			marker[i].setMap(null);
		}
	};
	setMarkerIcon = (i, bool) => {
		const { marker } = this.state;
		if (bool) {
			marker[i].setImage(this.state.selectIcon);
			marker[i].setZIndex(9999);
		} else {
			marker[i].setImage(this.state.currentIcon);
			marker[i].setZIndex(0);
		}
	};
	setMarkers = () => {
		const { marker, map } = this.state;
		for (let i = 0; i < marker.length; i++) {
			marker[i].setMap(map);
		}
	};
	makeResult = () => {
		const { companies } = this.state;
		let array = [];
		for (let j = 0; j < 200; j++) {
			let initializing = document.getElementById(`result-${j}-discription`);
			initializing ? (initializing.style.display = "none") : console.log();
		}
		for (let i = 0; i < companies.length; i++) {
			array.push(
				<>
					<Result
						id={`result-${i}`}
						// onClick={function () {
						// 	let id = document.getElementById(`result-${i}`);
						// 	if (id.style.height === "max-content") {
						// 		id.style.height = "100px";
						// 	} else {
						// 		id.style.height = "max-content";
						// 	}
						// }}
						onMouseEnter={() => {
							this.setMarkerIcon(i, true);
						}}
						onMouseLeave={() => {
							this.setMarkerIcon(i, false);
						}}
						onClick={() => {
							this.setMarkerIcon(i, true);
							let child = document.getElementById(`result-${i}-discription`);
							child.style.display = "block";
						}}
					>
						<ResultTitle>{companies[i].BPLCNM}</ResultTitle>
						<ResultAddr>
							{companies[i].RDNWHLADDR
								? companies[i].RDNWHLADDR
								: companies[i].SITEWHLADDR}
						</ResultAddr>
						<ResultContact>
							전화번호 : {companies[i].SITETEL ? companies[i].SITETEL : "번호 없음"}
						</ResultContact>
						{/* <ResultBody>관리번호 {companies[i].MGTNO}</ResultBody>
					<ResultBody>인허가일자 {companies[i].APVPERMYMD}</ResultBody> */}
					</Result>
					<Result
						id={`result-${i}-discription`}
						onClick={() => {
							let me = document.getElementById(`result-${i}-discription`);
							me.style.display = "none";
						}}
						notColor
						style={{ display: "none" }}
					>
						<ResultTitle style={{ fontSize: "14px" }}>보유장비현황</ResultTitle>
						<ul>
							<li style={{ marginTop: "10px" }}>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									초미립자살포기수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].MICROSPKLNUM}
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									방독면수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].GMKNUM}
								</span>
							</li>
							<li style={{ marginTop: "10px" }}>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									휴대용소독기수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].HNDUSESTLZNUM}
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									보호안경수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].PROTGLSNUM}
								</span>
							</li>
							<li style={{ marginTop: "10px" }}>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									동력분무기수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].DYNPWSPRAYNUM}
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									보호용의복수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].PROTUSECLOTNUM}
								</span>
							</li>
							<li style={{ marginTop: "10px" }}>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									수동식분무기수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].HDOPTDSPRAYNUM}
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "125px",
										display: "inline-block",
										color: "#919191",
									}}
								>
									진공청소기수
								</span>
								<span
									style={{
										fontSize: "13px",
										width: "45px",
										display: "inline-block",
										color: "#000",
									}}
								>
									{companies[i].VACUCLERNUM}
								</span>
							</li>
						</ul>
					</Result>
				</>
			);
		}
		return array;
	};
	render() {
		const { isLoading } = this.state;
		return (
			<Container>
				<NavBar>
					{isLoading ? (
						<>
							<SearchContainer>
								<img
									src="/img/map_top_bg.jpg"
									alt=""
									style={{
										position: "absolute",
										width: "390px",
										height: "195px",
									}}
								/>
								<a href="/">
									<Menu>
										<img src="/img/list_menu_button.png" alt="" />
									</Menu>
								</a>
								<SearchBar
									id="test"
									onChange={() => {
										let value = document.getElementById("test").value;
										this.sendGuInfo(value);
									}}
								>
									{" "}
									<SearchOption value={false}>지역구를 선택하세요.</SearchOption>
									{this.state.guInfomation.map((element) => {
										return (
											<SearchOption value={element.name}>
												{element.name}
											</SearchOption>
										);
									})}
									{/* <SearchOption value="">========지역구=======</SearchOption>
									<SearchOption value="강남구">강남구</SearchOption>
									<SearchOption value="강동구">강동구</SearchOption>
									<SearchOption value="강북구">강북구</SearchOption>
									<SearchOption value="강서구">강서구</SearchOption>
									<SearchOption value="관악구">관악구</SearchOption>
									<SearchOption value="광진구">광진구</SearchOption>
									<SearchOption value="구로구">구로구</SearchOption>
									<SearchOption value="금천구">금천구</SearchOption>
									<SearchOption value="노원구">노원구</SearchOption>
									<SearchOption value="동대문구">동대문구</SearchOption>
									<SearchOption value="도봉구">도봉구</SearchOption>
									<SearchOption value="동작구">동작구</SearchOption>
									<SearchOption value="마포구">마포구</SearchOption>
									<SearchOption value="서대문구">서대문구</SearchOption>
									<SearchOption value="서초구">서초구</SearchOption>
									<SearchOption value="성동구">성동구</SearchOption>
									<SearchOption value="성북구">성북구</SearchOption>
									<SearchOption value="송파구">송파구</SearchOption>
									<SearchOption value="양천구">양천구</SearchOption>
									<SearchOption value="영등포구">영등포구</SearchOption>
									<SearchOption value="용산구">용산구</SearchOption>
									<SearchOption value="은평구">은평구</SearchOption>
									<SearchOption value="종로구">종로구</SearchOption>
									<SearchOption value="중구">중구</SearchOption>
									<SearchOption value="중랑구">중랑구</SearchOption> */}
								</SearchBar>
								{/* <SearchBtn src="/img/search_ico.png" onClick={this.sendGuInfo}>
									<img
										src="/img/search_ico.png"
										alt=""
										style={{
											position: "relative",
											left: "calc(50% - 10px)",
											top: "calc(50% - 10px)",
										}}
									/>
								</SearchBtn> */}
							</SearchContainer>
							<ResultContainer>{this.makeResult()}</ResultContainer>
						</>
					) : (
						<>Loading</>
					)}
				</NavBar>
				<KakaoMap id="kakao-map" />
			</Container>
		);
	}
}

const Container = styled.div`
	font-family: "Noto Sans KR", sans-serif;
`;
const KakaoMap = styled.div`
	position: absolute;
	right: 0px;
	width: calc(100% - 390px);
	height: 100vh;
	z-index: 0;
`;
const NavBar = styled.div`
	position: absolute;
	width: calc(100% - 1200px);
	height: 100vh;
	left: 0px;
`;
const Menu = styled.div`
	position: absolute;
	width: 67px;
	height: 15px;

	top: 1rem;
	left: 1rem;
`;
const SearchContainer = styled.div`
	width: 390px;
	height: 195px;
	border-bottom: 1px solid #888888;
	background-color: #888888;
`;
const SearchBar = styled.select`
	font-weight: 300;
	position: absolute;
	box-sizing: border-box;
	width: 330px;
	height: 50px;
	padding: 0 15px 0 15px;
	top: 115px;
	left: 30px;
	font-size: 22px;
	border-radius: 4px;
	border-style: none;
	:focus {
		outline: none;
	}
	::placeholder {
		font-size: 13px;
		color: #aeaeae;
		line-height: 50px;
	}
`;
const SearchOption = styled.option`
	position: absolute;
	box-sizing: border-box;
	width: 330px;
	height: 50px;
	padding: 0 15px 0 15px;
	top: 115px;
	left: 30px;
	font-size: 22px;
	border-radius: 4px;
	border-style: none;
	:focus {
		outline: none;
	}
	::placeholder {
		font-size: 13px;
		color: #aeaeae;
		line-height: 50px;
	}
`;

// const SearchBtn = styled.div`
// 	position: absolute;
// 	width: 60px;
// 	height: 40px;
// 	border-radius: 4px;
// 	left: 0px;
// 	top: 120px;
// 	background-color: white;
// 	:hover {
// 		cursor: pointer;
// 	}
// `;
const ResultContainer = styled.div`
	position: absolute;
	width: 390px;
	height: calc(100% - 200px);
	background-color: rgba(255, 255, 255, 0.1);

	overflow: scroll;
`;
const Result = styled.div`
	position: relative;
	/* width: ; */
	height: max-content;

	${(props) => (props.notColor ? "background-color: #f5f5f5;" : "background-color: white;")}
	&:hover {
		cursor: pointer;
		${(props) => (props.notColor ? "" : "background-color: #eff7ff;")}
	}

	padding: 30px 20px;
	border-bottom: 2px solid rgba(0, 0, 0, 0.05);

	overflow: hidden;
`;
const ResultTitle = styled.p`
	position: relative;
	font-weight: 700;
	font-size: 18px;
`;
const ResultAddr = styled.p`
	position: relative;
	margin-top: 10px;
	font-size: 12px;
`;
const ResultContact = styled.p`
	position: relative;
	margin-top: 5px;

	font-size: 12px;
`;
// const ResultBody = styled.p`
// 	font-size: 12px;
// `;

export default YSSMap;
