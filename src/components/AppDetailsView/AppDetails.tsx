import { AppData } from "../../types/app";
import useSWR from "swr";
import { config } from "../../config";
import React, { useContext } from "react";
import { AllAppsDataContext } from "../AllAppsDataProvider";
import MarkdownView from "../Markdown";

interface AppItemProps {
	app?: AppData;
	appId?: AppData["id"];
}

const AppDetails: React.FC<AppItemProps> = ({ app, appId }) => {
	const { allAppsData } = useContext(AllAppsDataContext);

	// TODO use memo?
	const getDataForId = (id: string | undefined): AppData | undefined => {
		if (typeof id === "undefined") {
			return;
		}
		return allAppsData.find((item) => item.id === id);
	};

	// Do not do additional request when we already have all apps data
	const { data, error } = useSWR<AppData>(
		getDataForId(appId) ? null : config.getApp(appId!)
	);
	const dataToDisplay = getDataForId(appId) ? getDataForId(appId) : data;

	if (error) {
		return <div>Fetching error</div>;
	}

	if (!dataToDisplay) {
		return <div>loading</div>;
	}

	return (
		<>
			<h1>{dataToDisplay.name}</h1>
			<div>
				{dataToDisplay &&
					Object.entries(dataToDisplay).map((entry) => (
						<div>
							{entry[0]}: {entry[1]}
						</div>
					))}
			</div>
			{dataToDisplay.readmeURL && <MarkdownView url={dataToDisplay.readmeURL}/>}
		</>
	);
}

export default AppDetails;
