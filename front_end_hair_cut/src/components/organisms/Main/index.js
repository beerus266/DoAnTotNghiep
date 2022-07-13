import StoreSection from "../StoreSection";
import { axios } from "utils/axios";
import { useEffect, useState } from "react";

const Main = ({}) => {
    return (
        <div className="mx-auto max-w-full md:max-w-60 xl:max-w-screen-xl">
            <div className="mb-40">
                <StoreSection />
            </div>
        </div>
    )
}

export default Main;

