const apiBase = process.env.REACT_APP_APIBASE || "http://localhost:3000";

export const config = {
	getAllApps: `${apiBase}/apps`,
	getApp: (id: string): string => `${apiBase}/apps/${id}`,
	documentTitle: "App catalog"
};
