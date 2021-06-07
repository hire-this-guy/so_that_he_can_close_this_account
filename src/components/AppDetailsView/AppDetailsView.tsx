import { AppData } from "../../types/app";
import useSWR from "swr";
import { config } from "../../config";
import React, { useContext, useEffect } from "react";
import { AllAppsDataContext } from "../AllAppsDataProvider";
import MarkdownView from "../Markdown/Markdown";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./AppDetailsView.css";
import TopBar from "../TopBar/TopBar";
import Loading from "../Loading/Loading";

interface AppItemProps {
	appId?: AppData["id"];
}

const AppDetailsView: React.FC<AppItemProps> = ({ appId }) => {
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

	useEffect(() => {
		document.title = dataToDisplay?.name ?? config.documentTitle;
	});

	if (error) {
		return (
			<ErrorMessage
				action={() => window.location.reload()}
				actionLabel="Try again"
			>
				Error fetching readme
			</ErrorMessage>
		);
	}

	if (!dataToDisplay) {
		return <Loading />;
	}

	return (
		<>
			<div className="AppDetailsView">
				<TopBar />
				<header className="AppDetailsView__header">
					<div className="AppDetailsView__img-wrapper">
						<img
							src={dataToDisplay.iconURL}
							alt={dataToDisplay.name}
							className="AppDetailsView__img"
						/>
					</div>
					<h1 className="AppDetailsView__title">{dataToDisplay.name}</h1>
					<p>
						{dataToDisplay.description}
					</p>

					<p className="AppDetailsView__meta">
						{dataToDisplay.author && (
							<span className="AppDetailsView__meta-item">author: {dataToDisplay.author}</span>
						)}
						<span className="AppDetailsView__meta-item">version: {dataToDisplay.version}</span>
						{dataToDisplay.url && (<a href={dataToDisplay.url} className="AppDetailsView__meta-item">homepage</a>)}
					</p>
					<button className="button--primary">Install</button>
				</header>
				{dataToDisplay.readmeURL && (
					<MarkdownView
						className="AppDetailsView__readme"
						url={dataToDisplay.readmeURL}
					/>
				)}
			</div>
		</>
	);
};

export default AppDetailsView;
