import { AppData } from "../types/app";
import { Link } from "react-router-dom";

interface AppItemProps {
	app: AppData;
	key: string;
}
const AppItem: React.FC<AppItemProps> = ({ app }) => {
	return (
		<Link to="/">
			<hr />
			<div>
				{Object.entries(app).map((entry) => (
					<div>
						{entry[0]}: {entry[1]}
					</div>
				))}
			</div>
		</Link>
	);
};

export default AppItem;
