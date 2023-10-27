export function formatEpochTimestamp(epoch) {
    const date = new Date(epoch);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = date.toLocaleString('en-IN', options);
    return formattedDate;
}