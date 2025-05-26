import React from "react";
import "./footerSection.css"

const FooterSection = () => {

    return (
        <>
            <div className="main-footer">
                <p style={{ marginRight: "10px" }}>© 2025 SJCIT-Connect. All rights reserved. </p>
                <a href="/">Home</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a>Refund Policy</a>
                <a>Terms And Conditions</a>
                <a>Pricing Policy</a>
                <a>Cancellation Policy</a>
            </div>
        </>
    );
}

export default FooterSection;