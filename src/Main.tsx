import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SWRConfig } from "swr";
import { onErrorRetry, fetcher } from "./SWRConfig";

import "./Main.css";

import AppDetails from "./components/AppDetails";
import IndexView from "./components/IndexView";
import { AllAppsDataProvider } from "./components/AllAppsDataProvider";

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
