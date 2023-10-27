import React, { useState } from "react";
import { useStateContext } from '../Context';
import NoData from "./NoData";
import BadgeInfoCard from "../Cards/BadgeInfoCard";
import BadgeDetails from "./BadgeDetails";


const Expired = ({ expiredBadges, customeId }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [elementData, setElementData] = useState(expiredBadges?.[0]);
    return expiredBadges?.length === 0 ? (
        <NoData />
    ) : (
        <div className="flex items-start justify-between w-full h-full">
            <div className="flex flex-col h-full gap-4 overflow-hidden overflow-y-auto">
                {expiredBadges?.map((element, key) => {
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
            <BadgeDetails {...elementData} type={"expired"} customeId={customeId} />
        </div>
    )
};

export default Expired;
