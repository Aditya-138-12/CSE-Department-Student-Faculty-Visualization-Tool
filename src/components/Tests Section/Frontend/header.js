import React from "react";

const Header = () => {
    return (
        <>
            <div className="main-header">
                <div className="header-inner">
                    <p className="header-inner-text" style={{ fontStyle: "normal !important" }}>SJCIT-Connect Tests</p>
                    <div className="header-login-button">Login</div>
                    {false && <div className="header-avatar"></div>}
                </div>
            </div>
        </>
    );
}

export default Header;