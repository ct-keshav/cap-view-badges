import React, { useState } from "react";
import { useStateContext } from '../Context';
import BadgeInfoCard from "../Cards/BadgeInfoCard";
import NoData from "./NoData";
import BadgeDetails from "./BadgeDetails";


const AvailableToEnroll = ({ availableToEarnBadges, customeId }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [elementData, setElementData] = useState(availableToEarnBadges?.[0]);
    return availableToEarnBadges?.length === 0 ? (
        <NoData />
    ) : (
        <div className="flex items-start justify-between w-full h-full">
            <div className="flex flex-col h-full gap-4 overflow-hidden overflow-y-auto">
                {availableToEarnBadges?.map((element, key) => {
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
            <BadgeDetails {...elementData} type={"availableToEarnBadges"} customeId={customeId} />
        </div>
    )
};

export default AvailableToEnroll;
