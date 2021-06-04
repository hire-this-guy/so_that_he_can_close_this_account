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
		<Link to={`/app/${app.id}`} className="AppItem">
			<img src={app.iconURL} alt={app.name} className="AppItem__img"/>
			<div className="AppItem__info">
				<h2>{app.name}</h2>
				<div>{app.author}</div>
				<small>{app.version}</small>
			</div>
		</Link>
	);
};

export default AppItem;
