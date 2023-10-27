import React, { useState } from "react";


const vctr = {
    up: require("../Images/up.svg").default,
    down: require("../Images/down.svg").default,
};

const DropDown = ({ title, tags, lable, customerConstraints, badgeConstraints }) => {

    const [visible, setVisible] = useState(false);

    let totalConstraints = 0;

    if (customerConstraints) {
        totalConstraints += customerConstraints.length;
    }

    if (badgeConstraints) {
        totalConstraints += badgeConstraints.length;
    }

    const handleClick = () => {
        setVisible((prev) => !prev)
    }

    function formatNumber(number) {
        if (number >= 10000000) {
            return (number / 10000000).toFixed(2).replace(/\.0+$/, '') + " Cr";
        } else if (number >= 100000) {
            return (number / 100000).toFixed(2).replace(/\.0+$/, '') + " L";
        } else if (number >= 1000) {
            return (number / 1000).toFixed(2).replace(/\.0+$/, '') + " K";
        }
        return number;
    }

    function countMaxEarn(customerConstraints, badgeConstraints) {
        if (customerConstraints === undefined) {
            customerConstraints = [];
        }

        if (badgeConstraints === undefined) {
            badgeConstraints = [];
        }

        const maxEarnTypes = {
            maxEarnForDays: 0,
            maxEarnForWeeks: 0,
            maxEarnForMonths: 0,
            maxEarnLimit: 0,
        };

        const constraintsArrays = [customerConstraints, badgeConstraints];

        constraintsArrays?.forEach?.((constraints) => {
            constraints?.forEach?.((constraint) => {
                if (!constraint) return;

                if (constraint.maxEarnForDays !== undefined && constraint.maxEarnForDays !== null) {
                    maxEarnTypes.maxEarnForDays++;
                }
                if (constraint.maxEarnForWeeks !== undefined && constraint.maxEarnForWeeks !== null) {
                    maxEarnTypes.maxEarnForWeeks++;
                }
                if (constraint.maxEarnForMonths !== undefined && constraint.maxEarnForMonths !== null) {
                    maxEarnTypes.maxEarnForMonths++;
                }
                if (constraint.maxEarnLimit !== undefined && constraint.maxEarnLimit !== null) {
                    maxEarnTypes.maxEarnLimit++;
                }
            });
        });

        const sum = maxEarnTypes.maxEarnForDays + maxEarnTypes.maxEarnForWeeks + maxEarnTypes.maxEarnForMonths + maxEarnTypes.maxEarnLimit;
        return sum;
    }

    function countMaxEarnTypes(constraints) {
        let sum = 0;

        constraints?.forEach?.((constraint) => {
            if (constraint) {
                if (constraint.maxEarnForDays !== undefined && constraint.maxEarnForDays !== null) {
                    sum++;
                }
                if (constraint.maxEarnForWeeks !== undefined && constraint.maxEarnForWeeks !== null) {
                    sum++;
                }
                if (constraint.maxEarnForMonths !== undefined && constraint.maxEarnForMonths !== null) {
                    sum++;
                }
                if (constraint.maxEarnLimit !== undefined && constraint.maxEarnLimit !== null) {
                    sum++;
                }
            }
        });

        return sum;
    }

    return <>
        {title === "Custom attributes" ? <div className="w-full pb-4 border-b-[1px] border-solid border-neutral_4 ">
            <button className="flex items-center justify-between w-full cursor-pointer" onClick={handleClick} type="button">
                <span className="font-medium ">{title}</span>
                <div className="flex items-center">
                    <span className="mr-2 text-character_inactive">{lable} <span className="text-black">{tags === undefined || null ? 0 : tags.length}</span></span>
                    {visible ? <img src={vctr.up} className="w-3 h-3" /> : <img src={vctr.down} className="w-3 h-3" />}
                </div>
            </button>
            {visible && <ui className="flex flex-col items-center justify-start w-full pb-3 mt-3 list-none">
                {tags?.map?.((item, i) => {
                    return (
                        <li className="flex items-center justify-between w-full mb-2" key={i}>
                            <span className="text-character_inactive ">{item?.name}</span>
                            <span className="ml-1 overflow-hidden font-normal leading-4 truncate height-4 text-end w-[150px]">{item?.value}</span>
                        </li>
                    )
                })}
            </ui>}
        </div> : <div className="w-full pb-4 border-b-[1px] border-solid border-neutral_4 ">
            <button className="flex items-center justify-between w-full cursor-pointer" onClick={handleClick} type="button">
                <span className="font-medium ">{title}</span>
                <div className="flex items-center">
                    <span className="mr-2 text-character_inactive">{lable} <span className="text-black">{countMaxEarn(customerConstraints, badgeConstraints)}</span></span>
                    {visible ? <img src={vctr.up} className="w-3 h-3" /> : <img src={vctr.down} className="w-3 h-3" />}
                </div>
            </button>
            {visible && countMaxEarn(customerConstraints, badgeConstraints) !== 0 && <ui className="flex flex-col items-start justify-start w-full pb-3 mt-3 list-none">
                {customerConstraints?.length > 0 && (
                    <>
                        <li className="flex items-center justify-between w-full ">
                            <span className="font-medium ">Individual member limits</span><span>{countMaxEarnTypes(customerConstraints)} limits</span>
                        </li>
                        <span className="mt-1">Max. No. of badges that can be issued to a member</span>
                    </>
                )}

                {customerConstraints?.map?.((item, i) => {
                    if (item?.constraintType === "CUSTOMER_BADGE_FIXED_VALUE") {
                        return (
                            <>
                                <li className="flex items-center justify-between w-full mt-2" key={i}>
                                    <div className="bg-whitesmoke-100 px-2 py-[2px] rounded-xl">Overall limit</div><span>{formatNumber(item?.maxEarnLimit)}</span>
                                </li>
                            </>
                        )
                    }
                    if (item?.constraintType === "CUSTOMER_BADGE_ROLLING_WINDOW") {
                        return (<>
                            <li className="flex flex-col w-full gap-2 mt-2 items-between" key={i}>
                                {item?.maxEarnForDays && item?.rollForDays && <span className="flex items-center justify-between"><span>in last <span className="bg-whitesmoke-100 px-2 py-[2px] rounded-xl">{item?.rollForDays} days</span></span> <span>{formatNumber(item?.maxEarnForDays)}</span></span>}
                                {item?.maxEarnForWeeks && item?.rollForWeeks && <span className="flex items-center justify-between"><span>in last <span className="bg-whitesmoke-100 px-2 py-[2px] rounded-xl">{item?.rollForWeeks} weeks</span></span> <span>{formatNumber(item?.maxEarnForWeeks)}</span></span>}
                                {item?.maxEarnForMonths && item?.rollForMonths && <span className="flex items-center justify-between"><span>in last <span className="bg-whitesmoke-100 px-2 py-[2px] rounded-xl">{item?.rollForMonths} months</span></span> <span>{formatNumber(item?.maxEarnForMonths)}</span></span>}
                            </li>
                        </>)
                    }
                })}
                {badgeConstraints?.length > 0 && (
                    <>
                        <li className="flex items-center justify-between w-full mt-5">
                            <span className="font-medium ">Across member limits</span><span>{countMaxEarnTypes(badgeConstraints)} limits</span>
                        </li>
                        <span className="mt-1">Max. No. of badges that can be issued to across member</span>
                    </>
                )}

                {badgeConstraints?.map?.((item, i) => {
                    if (item?.constraintType === "BADGE_FIXED_VALUE") {
                        return (
                            <>
                                <li className="flex items-center justify-between w-full mt-2" key={i}>
                                    <div className="bg-whitesmoke-100 px-2 py-[2px] rounded-xl">Overall limit</div><span>{formatNumber(item?.maxEarnLimit)}</span>
                                </li>
                            </>
                        )
                    }
                    if (item?.constraintType === "BADGE_ROLLING_WINDOW") {
                        return (<>
                            <li className="flex flex-col w-full gap-2 mt-2 items-between" key={i}>
                                {item?.maxEarnLimit && item?.rollValue && <span className="flex items-center justify-between"><span>in last <span className="bg-whitesmoke-100 px-2 py-[2px] rounded-xl">{item?.rollValue} {item?.rollType?.toLowerCase()}</span></span> <span>{formatNumber(item?.maxEarnLimit)}</span></span>}
                            </li>
                        </>)
                    }
                })}
            </ui>}
        </div>}
    </>
};
export default DropDown;
