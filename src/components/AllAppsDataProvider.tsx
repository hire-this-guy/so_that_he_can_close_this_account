import React, { Dispatch, SetStateAction, useState } from "react";
import { AppData } from "../types/app";

const AllAppsDataContext = React.createContext<{
	allAppsData: AppData[];
	setAllAppsData: Dispatch<SetStateAction<AppData[]>>;
}>({ allAppsData: [], setAllAppsData: () => {} });

const AllAppsDataProvider = (props: { children: React.ReactNode }) => {
	const [allAppsData, setAllAppsData] = useState<AppData[]>([]);
	return (
		<AllAppsDataContext.Provider value={{ allAppsData, setAllAppsData }}>
			{props.children}
		</AllAppsDataContext.Provider>
	);
};

const AllAppsDataConsumer = AllAppsDataContext.Consumer;

export { AllAppsDataProvider, AllAppsDataConsumer, AllAppsDataContext };
