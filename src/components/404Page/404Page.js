import React from "react";
import './404Page.css';
import { useNavigate } from "react-router-dom";

const PageNotFound = ({ pathToNavigate }) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(pathToNavigate);
    }

    return (
        <div className="Image404NF">
            <button onClick={redirect} className="Image404NF_Button"></button>
        </div>

    );
}

export default PageNotFound;