import createTimer from './timer.js';

function createTimerManager() {
    const timer = createTimer();

    const validKeyActions = {
        'Enter': toggleTimer
    };

    function handleKeydown({ keyPressed }) {
        const keyAction = validKeyActions[keyPressed];
        if (keyAction) { keyAction(); }
    }

    function toggleTimer() {
        if (timer.isRunning()) {
            timer.pause();
        } else {
            if (timer.isFinished()) {
                timer.restart();
            } else {
                timer.resume();
            }
        }
    }

    return {
        timer,
        handleKeydown
    };
}

export default createTimerManager;
