function createScreenManager() {
    const timeLeftElement = document.querySelector('#time-left');
    const timeMessageElement = document.querySelector('#time-message');
    const mainElement = document.querySelector('main');

    let timer;

    function attachTimer(timerToAttach) {
        timer = timerToAttach;
        timer.subscribe(handleTimerCommand);
        setInitialScreenTimerValue();
        updateTimeMessage();
    }

    const eventsBeingListened = {
        'update-time-left': updateScreenTimer,
        'update-stage': updateScreenStage
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

    let currentScreenStage = 0;
    const modes = ['idle', 'break', 'running'];
    const messages = [
        'Press <Enter> to start',
        'Get ready!',
        'Take a short break',
        'Go!',
        'Done!'
    ];

    function updateScreenStage() {
        updateTimeMessage();
        updateScreenToNewStageStyles();
    }

    function updateTimeMessage() {
        let message;

        if (timer.stage == 0) {
            if (currentScreenStage == 0) {
                message = messages[0];
            } else {
                message = messages[4];
            }
        } else if (timer.stage == 1) {
            if (currentScreenStage == 0) {
                message = messages[1];
            } else {
                message = messages[2];
            }
        } else if (timer.stage == 2) {
            message = messages[3];
        }

        timeMessageElement.innerText = message;
    }

    function updateScreenToNewStageStyles() {
        mainElement.classList.remove(modes[currentScreenStage]);
        currentScreenStage = timer.stage;
        mainElement.classList.add(modes[currentScreenStage]);
    }

    return {
        attachTimer
    };
}

export default createScreenManager;
