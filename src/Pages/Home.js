import { useEffect, useMemo, useState } from "react";
import SkeletonLoader from "../Components/SkeletonLoader";
import AvailableToEnroll from "../Components/AvailableToEnroll";
import Expired from "../Components/Expired";
import AvailableToIssue from "../Components/AvailableToIssue";
import Issued from "../Components/Issued";
import { useStateContext } from '../Context';

const Home = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [issuedBadges, setIssuedBadges] = useState([]);
    const [expiredBadges, setExpiredBadges] = useState([]);
    const [availableToEarnBadges, setAvailableToEarnBadges] = useState([]);
    const [availableToIssueBadges, setAvailableToIssueBadges] = useState([]);
    const [customeId, setCustomerId] = useState(null);
    const {
        loading,
        FetchCustomer,
        FetchExpired,
        FetchIssued,
        FetchAvailableToEarn,
        FetchAvailableToIssue,
    } = useStateContext();
    useEffect(() => {

        const currentUrl = window.location.href;
        const urlParts = currentUrl.split('?');
        const queryString = urlParts[1];
        if (queryString !== undefined) {
            const keyValuePair = queryString;
            const [identifier, value] = keyValuePair?.split('=');
            FetchCustomer({ identifier, value }).then((res) => {
                setCustomerId(res);
                FetchIssued(res).then((res) => {
                    const activeItems = res?.filter((item) => item?.active === true);
                    setIssuedBadges(activeItems)
                }).catch((err) => console.error(err))
                FetchAvailableToIssue(res).then((res) => {
                    const activeItems = res?.filter((item) => item?.active === true);
                    setAvailableToIssueBadges(activeItems)
                }).catch((err) => console.error(err))
            }).catch((err) => console.error(err));
        } else {
            alert("Identifier not found");
        }
        FetchExpired().then((res) => {
            setExpiredBadges(res)
        }).catch((err) => console.error(err))
        FetchAvailableToEarn().then((res) => { setAvailableToEarnBadges(res) }).catch((err) => console.error(err))
    }, []);


    const handleButtonClick = (buttonValue) => {
        setSelectedButton(buttonValue);
    };

    return !loading ? (
        <div className="flex flex-col items-start justify-start">
            <div className=" p-5 flex h-[524px] w-[724px] flex-col items-start justify-start bg-icon-white">
                <div className="flex items-start justify-start gap-2 mb-5">
                    <button
                        type="button"
                        className={`h-[24px] shrink-0 rounded-full px-3 py-1 text-center text-xs font-normal text-character-activ ${selectedButton === 0
                            ? "bg-whitesmoke-200" : "bg-transparent box-border border-[1px] border-solid border-gray-200"
                            }`}
                        onClick={() => handleButtonClick(0)}
                    >
                        Available to enroll
                    </button>

                    <button
                        className={`h-[24px] shrink-0 rounded-full px-3 py-1 text-center text-xs font-normal text-character-activ ${selectedButton === 1
                            ? "bg-whitesmoke-200" : "bg-transparent box-border border-[1px] border-solid border-gray-200"
                            }`}
                        onClick={() => handleButtonClick(1)}
                    >
                        Available to issue
                    </button>
                    <button
                        className={`h-[24px] shrink-0 rounded-full px-3 py-1 text-center text-xs font-normal text-character-activ ${selectedButton === 2
                            ? "bg-whitesmoke-200" : "bg-transparent box-border border-[1px] border-solid border-gray-200"
                            }`}
                        onClick={() => handleButtonClick(2)}
                    >
                        Issued
                    </button>
                    <button
                        className={`h-[24px] shrink-0 rounded-full px-3 py-1 text-center text-xs font-normal text-character-activ ${selectedButton === 3
                            ? "bg-whitesmoke-200" : "bg-transparent box-border border-[1px] border-solid border-gray-200"
                            }`}
                        onClick={() => handleButtonClick(3)}
                    >
                        Expired
                    </button>
                </div>
                {selectedButton === 0 && (<AvailableToEnroll availableToEarnBadges={availableToEarnBadges} customeId={customeId} />)}
                {selectedButton === 1 && (<AvailableToIssue availableToIssueBadges={availableToIssueBadges} customeId={customeId} />)}
                {selectedButton === 2 && (<Issued issuedBadges={issuedBadges} customeId={customeId} />)}
                {selectedButton === 3 && (<Expired expiredBadges={expiredBadges} customeId={customeId} />)}
            </div>
        </div >
    ) : (
        <SkeletonLoader />
    );
};

export default Home;
