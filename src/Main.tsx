import React from "react";
import "./Main.css";

import useSWR from "swr";
import { config } from "./config";
import AppItem from "./components/appItem";
import { AppData } from "./types/app";

function Main() {
	const { data, error } = useSWR<AppData[]>(config.getAllApps);

	if (!data) {
		return <div>loading</div>;
	}
	if (error) {
		return <div>Error while fetching data</div>;
	}

	return (
		<>
			{data.map((item: AppData) => (
				<AppItem app={item} key={item.id} />
			))}
		</>
	);
}

export default Main;
