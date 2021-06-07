import { AppData } from "../../types/app";
import { Link } from "react-router-dom";
import "./AppItem.css";

interface AppItemProps {
	app: AppData;
	key: string;
}
const AppItem: React.FC<AppItemProps> = ({ app }) => {
	return (
		// TODO single place for lin generation?
		<Link
			to={`/app/${app.id}`}
			className="AppItem"
			title={`Version: ${app.version}`}
		>
			<div className="AppItem__img-wrapper">
				<img src={app.iconURL} className="AppItem__img" />
			</div>
			<div className="AppItem__info">
				<h2 className="AppItem__name">{app.name}</h2>
			</div>
		</Link>
	);
};

export default AppItem;
