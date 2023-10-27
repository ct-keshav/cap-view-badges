
import React from "react";
import { validate } from "../Utils/ImageUrlValidator";


const BadgeInfoCard = ({ data, active }) => {

    function getUrlOfImage() {
        const Item = data?.images?.find?.(item => item.tag === "EARNED");
        return Item ? Item.url : "";
    }

    return (
        <div className="flex items-center justify-start">
            <div class={`box-border border-[1px] border-solid border-gray-200  h-[74px] w-[308px] shrink-0 rounded-[4px] p-4 text-xs font-normal text-character-active${active
                ? " bg-aliceblue border-l-4  border-l-secondary_3" : "bg-[#DFE2E7] box-border border-[1px] border-solid border-neutral_4"
                }`}>

                <div>
                    <div className="flex items-center justify-start mb-[6px]">
                        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-neutral_2">  <img src={validate(getUrlOfImage()) ? getUrlOfImage() : "/badges/Altbadge.svg"} className="object-cover w-5 h-5 overflow-hidden rounded-md">
                        </img></div>
                        <span className="w-[89%] ml-1 overflow-hidden text-sm font-medium leading-5 truncate height-5">{data?.name}</span>
                    </div>
                    {/* <div>
                        10 Oct 2023, 10:30 AM
                    </div> */}
                    <div className="h-4 overflow-hidden leading-3 truncate">{data?.description === undefined || data?.description === null ? "-" : data?.description}</div>
                </div>
            </div>
            {
                active && (
                    <img src="/badges/Triangle.svg" className="w-2 h-4 text-start"></img>
                )
            }
        </div>
    )
};
export default BadgeInfoCard;
