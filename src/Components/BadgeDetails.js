import React, { useState } from "react";
import { validate } from "../Utils/ImageUrlValidator";
import DropDown from "../Utils/DropDown";
import { formatEpochTimestamp } from "../Utils/EpochConverter";
import { useStateContext } from '../Context';


const BadgeDetails = ({ customeId, type, name, badgeMetaId, description, startOn, expiresOn, earnType, id, badgeConstraints, tags, images, ownership, earnedBadgeId, customerConstraints }) => {

    const [showButtons, setShowButtons] = useState(false);

    const {
        IssueBulk,
        RevokeIssue,
        Earn,
        RevokeEarn
    } = useStateContext();

    function getUrlOfImage() {
        const Item = images?.find?.(item => item.tag === "EARNED");
        return Item ? Item.url : "";
    }

    const handleShowButton = () => {
        setShowButtons((prev) => !prev)
    }

    const handleIssue = async () => {
        IssueBulk({ id, customeId });

    }
    const handleEarn = async () => {
        Earn({ badgeMetaId })
    }
    const handleRevokeIssue = async () => {
        RevokeIssue({ badgeMetaId, customeId })
    }
    const handleRevokeEarn = async () => {
        RevokeEarn({ badgeMetaId, customeId, earnedBadgeId })
    }

    return <div className="justify-top flex h-[524px] w-[360px] flex-col items-start gap-4 rounded bg-neutral_1 p-4 font-footnote-regular text-xs  text-character-active">
        <ul className="flex flex-col items-start justify-start w-full list-none">
            <li className="flex items-center justify-between mb-[6px] w-full">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-neutral_2">
                        <img src={validate(getUrlOfImage()) ? getUrlOfImage() : "/badges/Altbadge.svg"} className="object-cover w-5 h-5 overflow-hidden rounded-md">
                        </img>
                    </div>
                    <span className="ml-1 overflow-hidden text-sm font-medium leading-5 truncate height-5 text-character-active w-[200px]">{name}</span>
                </div>
                <div className="relative">
                    <button type="button" onClick={handleShowButton}>
                        <img src="/badges/3dots.svg"></img>
                    </button>
                    {showButtons && (
                        <div className="absolute flex flex-col items-center justify-start left-[-110px] mt-1">
                            {type === "availableToEarnBadges" && (
                                <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black" type="button" onClick={handleIssue}>
                                    Enrol badge
                                </button>

                            )}
                            {type === "availableToIssue" && earnType === "ISSUE_EARN" && (
                                <>
                                    <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black" type="button" onClick={handleEarn}>
                                        Issue badge
                                    </button>
                                    <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black mt-[1px]" type="button" onClick={handleRevokeIssue}>
                                        Revoke enrollment
                                    </button>
                                </>
                            )}
                            {type === "availableToIssue" && earnType === "EARN" && (
                                <>
                                    <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black" type="button" onClick={handleEarn}>
                                        Issue badge
                                    </button>
                                </>
                            )}
                            {type === "issued" && (
                                <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black" type="button" onClick={handleRevokeEarn}>
                                    Revoke issual
                                </button>
                            )}
                            {type === "expired" && earnType === "ISSUE_EARN" && (
                                <>
                                    <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black" type="button" onClick={handleIssue}>
                                        Enrol badge
                                    </button>
                                    <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black mt-[1px]" type="button" onClick={handleEarn}>
                                        Issue badge
                                    </button>
                                </>
                            )}
                            {type === "expired" && earnType === "EARN" && (
                                <button className="box-border z-50 flex items-center justify-center bg-white rounded-[4px] shadow-sm h-8 w-28 shrink-0 shadow-black" type="button" onClick={handleIssue}>
                                    Enrol badge
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </li>
            {/* {type === "issued"?<li className="mb-4">
                {formatEpochTimestamp(lastUpdatedOn)}
            </li> : <li className="mb-4">
                {formatEpochTimestamp(lastUpdatedOn)}
            </li>} */}
            <li className="flex items-center justify-between w-full mt-2 mb-2">
                <span className="text-character_inactive">Badge ID</span>
                <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4 text-end">{type === "availableToEarnBadges" ? id : badgeMetaId}</span>
            </li>
            <li className="flex items-center justify-between w-full mb-2">
                <span className="text-character_inactive ">Description</span>
                <span title={description === undefined || description === null ? "-" : description} className="ml-1 overflow-hidden font-normal leading-4 truncate height-4 text-end w-[200px]">{description === undefined || description === null ? "-" : description}</span>
            </li>
            <li className="flex items-center justify-between w-full mb-2">
                <span className="text-character_inactive">Start date</span>
                <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4">{formatEpochTimestamp(startOn)}</span>
            </li>
            <li className="flex items-center justify-between w-full mb-2">
                <span className="text-character_inactive">End date</span>
                <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4">{formatEpochTimestamp(expiresOn)}</span>
            </li>
            <li className="flex items-center justify-between w-full mb-2">
                <span className="text-character_inactive">Type</span>
                <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4">{earnType}</span>
            </li>
            <li className="flex items-center justify-between w-full mb-2">
                <span className="text-character_inactive">Owned by</span>
                <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4 text-end w-[200px]">{ownership === undefined || ownership === null ? "-" : ownership?.restrictedToOwners?.map(item => `${item}, `).join('').slice(0, -2)}</span>
            </li>
            <li className="flex items-center justify-between w-full pb-4 border-b-[1px] border-solid border-neutral_4">
                <span className="text-character_inactive">Claimed by</span>
                <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4 text-end w-[200px]">{ownership === undefined || ownership === null ? "-" : ownership?.claims?.map(item => `${item?.ownerType}, `).join('').slice(0, -2)}</span>
            </li>
        </ul>
        <DropDown title={"Badge issual limits"} lable={"Total"} customerConstraints={customerConstraints} badgeConstraints={badgeConstraints} />
        <DropDown title={"Custom attributes"} lable={"Total"} tags={tags} />
    </div>;
};
export default BadgeDetails;
