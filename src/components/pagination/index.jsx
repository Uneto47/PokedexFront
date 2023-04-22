import React from "react";
import "./index.css"

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRigthClick} = props
    return (
        <div className="pagination-container">
            <button className="Button" onClick={onLeftClick}>◀</button>
            <div className="Pages"> {page} de {totalPages} </div>
            <button className="Button" onClick={onRigthClick}>▶</button>
        </div>
    )
}

export default Pagination; 