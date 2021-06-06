import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SWRConfig } from "swr";
import { onErrorRetry, fetcher } from "./SWRConfig";

import "../node_modules/normalize.css/normalize.css";
import "./Main.css";
import "../node_modules/github-markdown-css/github-markdown.css";

import IndexView from "./components/IndexView/IndexView";
import { AllAppsDataProvider } from "./components/AllAppsDataProvider";
import AppDetails from "./components/AppDetailsView/AppDetails";

const Main = () => {
	return (
		<SWRConfig
			value={{
				onErrorRetry,
				fetcher,
				revalidateOnFocus: false,
			}}
		>
			<AllAppsDataProvider>
				<Router>
					<Switch>
						<Route
							exact
							path="/app/:appId"
							render={(props) => {
								return <AppDetails appId={props.match.params.appId} />;
							}}
						/>
						<Route path="/">
							<IndexView />
						</Route>
					</Switch>
				</Router>
			</AllAppsDataProvider>
		</SWRConfig>
	);
};

export default Main;
