import interval from './interval.js';

function createTimer() {
    const timer = {
        schedule: [10000, 20000],
        stage: 0,
        repeatCount: 8,
        totalTimeLapsed: 0,
        stageTimeLapsed: 0,
        running: false
    };

    const observers = [];

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(event) {
        observers.forEach( observerFunction => observerFunction(event) );
    }

    let totalScheduleTime = getTotalScheduleTime();

    function getTotalScheduleTime() {
        return (
            timer.repeatCount *
            timer.schedule.reduce((total, current) => total + current, 0)
        );
    }

    function getTimeLeftForCurrentStage() {
        return timer.schedule[timer.stage - 1] - timer.stageTimeLapsed;
    }

    function isRunning() {
        return timer.running;
    }

    function isFinished() {
        return timer.totalTimeLapsed == totalScheduleTime;
    }

    function restart() {
        timer.totalTimeLapsed = 0;
        run();
    }

    function resume() {
        run();
    }

    function pause() {
        requestedToStopTimer = true;
        timer.running = false;
    }

    let requestedToStopTimer = false;

    async function run() {
        timer.running = true;
        requestedToStopTimer = false;
        if (timer.stage == 0) setStage(1);

        let cyclesLeft = getNumberOfCyclesLeft();

        for (let i = 0; i < cyclesLeft; i++) {
            if (requestedToStopTimer) return;

            await interval(100);
            timer.totalTimeLapsed += 100;
            timer.stageTimeLapsed += 100;

            if (currentStageIsFinished()) updateToNextStage();

            notifyAll({
                type: 'update-time-left',
            });
        }

        if (!requestedToStopTimer) {
            timer.running = false;
            setStage(0);
        }

        function getNumberOfCyclesLeft() {
            return (totalScheduleTime - timer.totalTimeLapsed) / 100;
        }

        function currentStageIsFinished() {
            return timer.stageTimeLapsed == timer.schedule[timer.stage - 1];
        }

        function setStage(newStage) {
            timer.stage = newStage;
            timer.stageTimeLapsed = 0;

            notifyAll({
                type: 'update-stage'
            });
        }

        function updateToNextStage() {
            timer.stageTimeLapsed = 0;

            if (inLastStage()) {
                timer.stage = 1;
            } else {
                timer.stage++;
            }

            notifyAll({
                type: 'update-stage'
            });

            function inLastStage() {
                return timer.stage == timer.schedule.length;
            }
        }
    }

    Object.assign(timer, {
        subscribe,
        getTimeLeftForCurrentStage,
        isRunning,
        isFinished,
        restart,
        resume,
        pause
    });

    return timer;
}

export default createTimer;
