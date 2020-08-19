function createKeyboardListener() {
    const observers = [];

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        observers.forEach( observerFunction => observerFunction(command) );
    }

    window.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        notifyAll({ keyPressed: event.key });
    }

    return {
        subscribe
    };
}

export default createKeyboardListener;
