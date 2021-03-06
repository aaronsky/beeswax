import { EventEmitter } from 'events';

namespace Emitter {
    const emitter = new EventEmitter();

    type EventHandler = (...args) => Promise<void>;

    export function subscribe(eventName: string, handler: EventHandler): EventEmitter {
        return emitter.on(eventName, handler);
    }

    export function subscribeOnce(eventName: string, handler: EventHandler): EventEmitter {
        return emitter.once(eventName, handler);
    }

    export function cancel(eventName: string, handler: EventHandler): EventEmitter {
        return emitter.removeListener(eventName, handler);
    }

    export function cancelAll(eventName: string): EventEmitter {
        return emitter.removeAllListeners(eventName);
    }

    export function emit(eventName: string, ...args) {
        emitter.emit(eventName, ...args);
    }
}
export default Emitter;