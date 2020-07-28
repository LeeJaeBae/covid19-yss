import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function NoResult() {
	const location = useLocation();
	const history = useHistory();
	const agent = navigator.userAgent.toLowerCase();
	useEffect(() => {
		switch (location.pathname) {
			case "/":
				break;
			case "/map":
				break;
			case "/search":
				break;
			case "/creator":
				break;
			case "/404":
				break;
			default:
				history.push("/404");
				break;
		}
		if (agent.indexOf("chrome") != -1) {
		} else if (agent.indexOf("safari") != -1) {
		} else if (agent.indexOf("firefox") != -1) {
		} else {
			history.push("/404");
			alert(
				"죄송합니다. 인터넷 익스플로러 미지원 환경입니다. 다른 웹 브라우져를 사용해주세요."
			);
		}
	});
	return <div></div>;
}
