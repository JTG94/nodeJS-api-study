function log(data) {
    console.log(data);
}

const getTime = () => {
    return Date.now();
}

const getCurrentHour = () => {
    return(new Date).getHours();
}

module.exports ={ log, getTime, getCurrentHour }