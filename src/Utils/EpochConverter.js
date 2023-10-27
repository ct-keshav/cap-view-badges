export function formatEpochTimestamp(epoch) {
    const epochInMiliSec = epoch * 1000
    const date = new Date(epochInMiliSec);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = date.toLocaleString('en-IN', options);
    return formattedDate;
}