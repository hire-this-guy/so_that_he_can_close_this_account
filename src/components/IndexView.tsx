import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import { AppData } from "../types/app";
import { Link } from "react-router-dom";
import { config } from "../config";
import { AllAppsDataContext } from "./AllAppsDataProvider";

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
				<div key={item.id}>
					<Link to={`/app/${item.id}`}>{item.name}</Link>
				</div>
			))}
		</>
	);
};

export default IndexView;
