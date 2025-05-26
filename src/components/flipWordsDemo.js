import React from "react";
import { FlipWords } from "./ui/flipwords";

export function FlipWordsDemo() {
    const words = ["Introducing SJCIT Connect", "ಎಸ್‌ಜೆಸಿಐಟಿ ಕನೆಕ್ಟ್ ಅನ್ನು ಪರಿಚಯಿಸುತ್ತಿದ್ದೇವೆ", "An Initiative Of SJCIT CSE", "ಎಸ್‌ಜೆಸಿಐಟಿ ಸಿಎಸ್‌ಇಯ ಉಪಕ್ರಮ", "Student-Upload", "ವಿದ್ಯಾರ್ಥಿ ಅಪ್‌ಲೋಡ್", "Faculty-Upload", "ಅಧ್ಯಾಪಕರ ಅಪ್‌ಲೋಡ್", "Modern-Analytics", "ಆಧುನಿಕ ವಿಶ್ಲೇಷಣೆ", "Developer-API's", "ವಿಕಸಕರ ಎಪಿಐ", "More Than 7,000 Lines Of-Code Written", "7,000 ಕ್ಕೂ ಹೆಚ್ಚು ಸಾಲುಗಳ ಕೋಡ್-ಬರೆಯಲಾಗಿದೆ", "Namma Compiler", "ಅನುಸರಿಸಿ", "ನೆಮಕಾತಿ ವಿಭಾಗ", "ಪರೀಕ್ಷಾ ವಿಭಾಗ", "ನಮ್ಮ ಕಂಪೈಲರ್"];

    return (
        (<div className="h-[40rem] flex justify-center items-center px-4">
            <div
                className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                < FlipWords words={words} duration={5000} className="ddivcl" />
            </div>
        </div>)
    );
}
