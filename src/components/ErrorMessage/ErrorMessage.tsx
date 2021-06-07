import React from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
	action?: Function;
	actionLabel?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({
	action,
	actionLabel,
	children,
}) => {
	return (
		<div className="ErrorMessage">
			<p className="ErrorMessage__text">{children}</p>
			{action && (
				<button onClick={() => action()} className="ErrorMessage__button">
					{actionLabel}
				</button>
			)}
		</div>
	);
};

export default ErrorMessage;
