function createScreenManager() {
    const timeLeftElement = document.querySelector('#time-left');
    const mainElement = document.querySelector('main');

    let timer;

    function attachTimer(timerToAttach) {
        timer = timerToAttach;
        timer.subscribe(handleTimerCommand);
        setInitialScreenTimerValue();
    }

    const eventsBeingListened = {
        'update-time-left': updateScreenTimer,
        'update-stage': setStageStyles
    };

    function handleTimerCommand({ type, ...eventData }) {
        const eventAction = eventsBeingListened[type];
        if (eventAction) eventAction(eventData);
    }

    function setInitialScreenTimerValue() {
        timeLeftElement.innerText = timer.schedule[0] / 1000;
    }

    function updateScreenTimer() {
        const newTimeLeft = timer.getTimeLeftForCurrentStage();
        timeLeftElement.innerText = newTimeLeft / 1000;
    }

    const stageStyles = ['idle', 'break', 'running'];
    let currentStageStyle = 0;

    function setStageStyles() {
        mainElement.classList.remove(stageStyles[currentStageStyle]);

        if (timer.stage == 0) {
            currentStageStyle = 0;
        } else {
            if (timer.stage % 2 == 1) {
                currentStageStyle = 1;
            } else {
                currentStageStyle = 2;
            }
        }

        mainElement.classList.add(stageStyles[currentStageStyle]);
    }

    return {
        attachTimer
    };
}

export default createScreenManager;
