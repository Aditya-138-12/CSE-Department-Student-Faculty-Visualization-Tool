import React from "react";
import './404Page.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();

    const redirect = () => {
        navigate("/home");
    }

    return (
        <div className="Image404NF">
            <button onClick={redirect} className="Image404NF_Button"></button>
        </div>

    );
}

export default PageNotFound;