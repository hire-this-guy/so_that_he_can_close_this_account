import React from "react";
import "./SmallHeader.css"


const SmallHeader: React.FC = ({children}) => {
    return (
        <h2 className="SmallHeader">
            <span className="SmallHeader__text">{children}</span>
        </h2>
    )
}

export default SmallHeader
