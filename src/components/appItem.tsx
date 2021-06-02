import { AppData } from "../types/app";

interface AppItemProps {
	app: AppData;
	key: string;
}
const AppItem: React.FC<AppItemProps> = ({ app }) => {
	return (
		<>
			<hr />
			<div>
				{Object.entries(app).map((entry) => (
					<div>
						{entry[0]}: {entry[1]}
					</div>
				))}
			</div>
		</>
	);
};

export default AppItem;
