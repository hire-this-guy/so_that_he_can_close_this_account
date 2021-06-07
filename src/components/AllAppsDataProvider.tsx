import React, { Dispatch, SetStateAction, useState } from "react";
import { AppData } from "../types/app";

const AllAppsDataContext = React.createContext<{
	allAppsData: AppData[];
	setAllAppsData: Dispatch<SetStateAction<AppData[]>>;
}>({ allAppsData: [], setAllAppsData: () => {} });

const AllAppsDataProvider: React.FC = ({children}) => {
	const [allAppsData, setAllAppsData] = useState<AppData[]>([]);
	return (
		<AllAppsDataContext.Provider value={{ allAppsData, setAllAppsData }}>
			{children}
		</AllAppsDataContext.Provider>
	);
};

const AllAppsDataConsumer = AllAppsDataContext.Consumer;

export { AllAppsDataProvider, AllAppsDataConsumer, AllAppsDataContext };
