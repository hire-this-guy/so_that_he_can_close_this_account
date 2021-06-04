import React from "react";
import "./ErrorMessage.css"

interface ErrorMessageProps {
    children: unknown
    action?: Function;
    actionLabel?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({action, actionLabel, children}) => {
    return (
        <div className="ErrorMessage">
            <p className="ErrorMassage__text">{children}</p>
            {
                action && <button onClick={() => action()} className="ErrorMessage__button btn">{actionLabel}</button>
            }
        </div>
    )


}

export default ErrorMessage
