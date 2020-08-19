function interval(timeInMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeInMilliseconds);
    });
}

export default interval;
