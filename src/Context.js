import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import axios from "axios";


const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    function generateRandom7DigitNumber() {
        const min = 1000000; // 1,000,000 (smallest 7-digit number)
        const max = 9999999; // 9,999,999 (largest 7-digit number)

        // Generate a random number between min and max
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
    const FetchCustomer = async ({ identifier, value }) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "GETCUSTOMERDETAILS",
                "identifier": identifier,
                "identifierValue": value
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if (response?.data?.response?.status?.success === "true") {
                console.log("UserId", response?.data?.response?.customers?.customer[0]?.user_id);
                setLoading(false);
                return (response?.data?.response?.customers?.customer[0]?.user_id);
            } else if (response?.data?.response?.status?.success === "false") {
                console.error(response?.customers?.customer?.[0]?.item_status?.message);
                console.error(response?.data?.response?.status?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const FetchIssued = async (customeId) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "GETBADGESWITHCUSTOMERID",
                "urlParams": "?badgeType=EARNED",
                "customerId": customeId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                console.log("issued", response?.data?.data?.badges);
                setLoading(false);
                return (response?.data?.data?.badges);
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
                return [];
            } else {
                console.error('Error fetching the issued badge meta');
                setLoading(false);
                return [];
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            return [];
        }
    };
    const FetchAvailableToIssue = async (customeId) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "GETBADGESWITHCUSTOMERID",
                "urlParams": "?badgeType=AVAILABLE",
                "customerId": customeId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                console.log("AvailabeToIssue", response?.data?.data?.badges);
                setLoading(false);
                return (response?.data?.data?.badges);
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
                return [];
            } else {
                console.error('Error fetching the availabe badge meta');
                setLoading(false);
                return [];
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            return [];
        }
    };

    const FetchAvailableToEarn = async () => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "GETBADGES",
                "urlParams": "?earnType=ISSUE_EARN&action=ACTIVATED&status=LIVE"
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                console.log("AvailabeToEarn", response?.data?.data?.metaBasicDetails);
                setLoading(false);
                return (response?.data?.data?.metaBasicDetails);
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
                return [];
            } else {
                console.error('Error fetching the issue earned badge meta');
                setLoading(false);
                return [];
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            return [];
        }
    };
    const FetchExpired = async () => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "GETBADGES",
                "urlParams": "?status=EXPIRED&action=ACTIVATED"
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                console.log("Expired", response?.data?.data?.metaBasicDetails);
                setLoading(false);
                return (response?.data?.data?.metaBasicDetails);
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
                return [];
            } else {
                console.error('Error fetching the expired badge meta');
                setLoading(false);
                return [];
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            return [];
        }
    };

    const RevokeEarn = async ({ badgeMetaId, customeId, earnedBadgeId }) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "REVOKEEARN",
                "postData": {
                    "badgeMetaId": badgeMetaId,
                    "customerId": customeId,
                    "earnedBadgeId": earnedBadgeId
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                setLoading(false);
                return;
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
            } else {
                console.error('Error posting the RevokeEarn api');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const RevokeIssue = async ({ badgeMetaId, customeId }) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "REVOKEISSUE",
                "postData": {
                    "badgeMetaId": badgeMetaId,
                    "customers": [
                        customeId
                    ]
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                setLoading(false);
                return;
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
            } else {
                console.error('Error posting the RevokeIssue api');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const IssueBulk = async ({ id, customeId }) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "ISSUEBULK",
                "postData": {
                    "badgeMetaId": id,
                    "triggeredBy": {
                        "ownerType": "Loyalty",
                        "referenceId": "xyz"
                    },
                    "requestId": generateRandom7DigitNumber(),
                    "customers": [
                        customeId
                    ]
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                setLoading(false);
                return;
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
            } else {
                console.error('Error posting the IssueBulk api');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const Earn = async ({ badgeMetaId }) => {
        try {
            setLoading(true);
            let data = JSON.stringify({
                "method": "EARNBADGES",
                "postData": {
                    "badgeMetaId": badgeMetaId,
                    "customerId": 0,
                    "requestId": generateRandom7DigitNumber(),
                    "triggeredBy": {
                        "ownerType": "Loyalty",
                        "referenceId": "xyz"
                    }
                }
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demoapps.capillarytech.com/wrapper/badges/api.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            if ((response?.data?.errors?.length === 0 || response?.data?.errors === null) && response?.data?.data !== null) {
                setLoading(false);
                return;
            } else if (response?.data?.errors?.length !== 0 || response?.data?.errors !== null) {
                response?.data?.errors?.map((error) => {
                    console.error(error.message);
                });
                setLoading(false);
            } else {
                console.error('Error posting the Earn call');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <stateContext.Provider
            value={{
                loading,
                FetchCustomer,
                FetchExpired,
                FetchIssued,
                FetchAvailableToEarn,
                FetchAvailableToIssue,
                IssueBulk,
                RevokeIssue,
                Earn,
                RevokeEarn
            }}
        >
            {children}
        </stateContext.Provider>
    );
};
export const useStateContext = () => useContext(stateContext);