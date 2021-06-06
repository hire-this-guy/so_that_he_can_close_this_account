import React, { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { AppData } from "../../types/app";
import { config } from "../../config";
import { AllAppsDataContext } from "../AllAppsDataProvider";
import AppItem from "../AppItem/AppItem";
import "./IndexView.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";

const IndexView = () => {
	const { setAllAppsData } = useContext(AllAppsDataContext);
	const { data, error } = useSWR<AppData[]>(config.getAllApps);
	const [searchVal, setSearchVal] = useState<string>("")
	const searchRef = useRef<HTMLInputElement>(null)

	useEffect(() => data && setAllAppsData(data));
	useEffect(() => {
		document.title = config.documentTitle;
	});

	if (error) {
		return <ErrorMessage
			action={() => window.location.reload()}
			actionLabel="Try again"
		>
			Error while fetching data
		</ErrorMessage>;
	}
	if (!data) {
		return <Loading/>
	}

	// Searching

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

	const clearSearch = () => {
		setSearchVal("");
		searchRef.current?.focus()
	}

	return (
		<main className="IndexView">
			<div className="search">
				<input type="search" placeholder="search" className="search__input" ref={searchRef} onChange={inputOnChane} value={searchVal}/>
			</div>
			{filteredData.length > 0 && filteredData.map((item: AppData) => (
				<AppItem app={item} key={item.id}/>
			))}
			{filteredData.length === 0 &&
			<ErrorMessage
				action={clearSearch}
				actionLabel="Clear search">
					No results found
			</ErrorMessage>
			}
		</main>
	);
};

export default IndexView;
