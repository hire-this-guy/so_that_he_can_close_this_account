const apiBase = "http://localhost:2000";

export const config = {
	getAllApps: `${apiBase}/apps`,
	getApp: (id: string): string => `${apiBase}/apps/${id}`,
	documentTitle: "App catalog"
};
