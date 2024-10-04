import React from "react";
import { FlipWords } from "./ui/flipwords";

export function FlipWordsDemo() {
    const words = ["Introducing SJCIT Connect", "An Initiative Of SJCIT CSE", "Student-Upload", "Faculty-Upload", "Modern-Analytics", "Developer-API's"];

    return (
        (<div className="h-[40rem] flex justify-center items-center px-4">
            <div
                className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                < FlipWords words={words} duration={5000} className="ddivcl" />
            </div>
        </div>)
    );
}
