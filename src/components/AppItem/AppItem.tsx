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
		<Link to={`/app/${app.id}`} className="AppItem" title={`Version: ${app.version}`}>
			<div className="AppItem__img-wrapper">
				<img src={app.iconURL} alt={app.name} className="AppItem__img"/>
			</div>
			<div className="AppItem__info">
				<h2 className="AppItem__name">{app.name}</h2>
				{app.author && (<div>by: {app.author}</div>)}
			</div>
		</Link>
	);
};

export default AppItem;
