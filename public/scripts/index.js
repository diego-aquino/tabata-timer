import createKeyboardListener from './keyboardListener.js';
import createTimerManager from './timer/timerManager.js';
import createScreenManager from './screen/screenManager.js';

const timerManager = createTimerManager();

const screenManager = createScreenManager();
screenManager.attachTimer(timerManager.timer);

const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(timerManager.handleKeydown);
