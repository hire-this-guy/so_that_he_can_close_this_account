import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import { AppData } from "../types/app";
import { Link } from "react-router-dom";
import { config } from "../config";
import { AllAppsDataContext } from "./AllAppsDataProvider";
import AppItem from "./AppItem/AppItem";

const IndexView = () => {
	const { setAllAppsData } = useContext(AllAppsDataContext);
	const { data, error } = useSWR<AppData[]>(config.getAllApps);

	useEffect(() => data && setAllAppsData(data));

	if (!data) {
		return <div>loading</div>;
	}
	if (error) {
		return <div>Error while fetching data</div>;
	}

	return (
		<>
			{data.map((item: AppData) => (
				<AppItem app={item} key={item.id}/>
			))}
		</>
	);
};

export default IndexView;
