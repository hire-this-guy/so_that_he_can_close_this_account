import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AppData } from "../../types/app";
import { config } from "../../config";
import { AllAppsDataContext } from "../AllAppsDataProvider";
import AppItem from "../AppItem/AppItem";
import "./IndexView.css"

const IndexView = () => {
	const { setAllAppsData } = useContext(AllAppsDataContext);
	const { data, error } = useSWR<AppData[]>(config.getAllApps);
	const [searchVal, setSearchVal] = useState<string>("")

	useEffect(() => data && setAllAppsData(data));

	if (error) {
		return <div>Error while fetching data</div>;
	}
	if (!data) {
		return <div>loading</div>;
	}

	const inputOnChane = (event: React.ChangeEvent<HTMLInputElement>) => setSearchVal(event.currentTarget.value);

	let filteredData = [...data];

	const searcher = (needle: string, haystack: string): boolean => {
		// TODO filter nonword characters
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1
	}

	if (searchVal.length > 0) {
		filteredData = filteredData.filter((item) => {
			return searcher(searchVal, item.name) || (item?.author && searcher(searchVal, item.author))
		})
	}

	return (
		<main className="IndexView">
			<div className="search">
				<input type="search" placeholder="search" className="search__input" onChange={inputOnChane}/>
			</div>
			{filteredData.length > 0 && filteredData.map((item: AppData) => (
				<AppItem app={item} key={item.id}/>
			))}
			{filteredData.length === 0 && <div>No results found for {searchVal}</div>}
		</main>
	);
};

export default IndexView;
