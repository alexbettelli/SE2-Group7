const URL = 'http://localhost:3001/'

export function getURL(endpoint){
    return `${URL}${endpoint}`
}

export function formatSeconds(seconds){
    const expected_minutes = seconds/60
    const expected_seconds = (expected_minutes.toFixed(2)-Math.floor(expected_minutes))*60;
    return `${Math.floor(expected_minutes)} minutes ${Math.floor(expected_seconds)} seconds`;
}