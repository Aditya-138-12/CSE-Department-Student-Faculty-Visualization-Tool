import React, { useEffect, useRef } from 'react';

const RazorpayButton = () => {
    const formRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.setAttribute("data-payment_button_id", "pl_Qa78WQjYRzvGQN"); // replace with your actual ID
        script.async = true;

        if (formRef.current) {
            formRef.current.appendChild(script);
        }

        return () => {
            // Optional: clean up the script if the component unmounts
            if (formRef.current) {
                formRef.current.innerHTML = "";
            }
        };
    }, []);

    return <form ref={formRef}></form>;
};

export default RazorpayButton;
