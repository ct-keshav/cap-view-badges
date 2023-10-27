import React, { useEffect, useMemo, useState } from "react";
import { useStateContext } from '../Context';
import BadgeInfoCard from "../Cards/BadgeInfoCard";
import NoData from "./NoData";
import { validate } from "../Utils/ImageUrlValidator";
import BadgeDetails from "./BadgeDetails";

const Issued = ({ issuedBadges, customeId }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [elementData, setElementData] = useState(issuedBadges?.[0]);
    return issuedBadges?.length === 0 ? (
        <NoData />
    ) : (
        <div className="flex items-start justify-between w-full h-full">
            <div className="flex flex-col h-full gap-4 overflow-hidden overflow-y-auto">
                {issuedBadges?.map((element, key) => {
                    return (
                        <div
                            className="cursor-pointer "
                            key={key}
                            onClick={() => {
                                setElementData(element);
                                setActiveTab(activeTab === key ? null : key);
                            }}
                        >
                            <BadgeInfoCard
                                data={element}
                                key={key}
                                active={activeTab === key}
                            />
                        </div>
                    );
                })}
            </div>
            <BadgeDetails {...elementData} type={"issued"} customeId={customeId} />
        </div>
    )
};

export default Issued;
