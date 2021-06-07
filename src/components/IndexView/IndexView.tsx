import React, { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { AppData } from "../../types/app";
import { config } from "../../config";
import { AllAppsDataContext } from "../AllAppsDataProvider";
import AppItem from "../AppItem/AppItem";
import "./IndexView.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import SmallHeader from "../SmallHeader/SmallHeader";

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

	const isSearchApplied = searchVal.length > 0;
	const hasSearchResults = filteredData.length > 0;

	return (
		<main className="IndexView">
			<header className="header">
				<h1 className="title">App catalog</h1>
				<div className="search">
					<input type="search" placeholder="search" className="search__input" ref={searchRef} onChange={inputOnChane} value={searchVal}/>
				</div>
			</header>

			{isSearchApplied && hasSearchResults && (<SmallHeader>Results</SmallHeader>)}
			{!isSearchApplied && (<SmallHeader>Featured</SmallHeader>)}

			{hasSearchResults && <div className="app-list">
				{filteredData.map((item: AppData) => (
					<AppItem app={item} key={item.id}/>
				))}
			</div>}

			{!hasSearchResults &&
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
