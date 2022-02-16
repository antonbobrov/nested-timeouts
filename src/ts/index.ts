interface Timeouts {
    timeout: NodeJS.Timeout;
    callback: () => void;
    delay: number;
}

/**
 * Nested Timeouts
 */
export default class NestedTimeouts {
    private _timeouts: Timeouts[];
    private get timeouts () {
        return this._timeouts;
    }
    private set timeouts (val) {
        this._timeouts = val;
    }

    constructor () {
        this._timeouts = [];
    }

    /**
     * Add a timeout
     */
    public add (
        callback: () => void,
        delay: number,
    ) {
        const timeout = setTimeout(callback, delay);
        this.timeouts.push({
            timeout,
            callback,
            delay,
        });
        return this;
    }

    /**
     * Add a timeout that will be launched after the last added timeout
     */
    public then (
        callback: () => void,
        delay: number,
    ) {
        if (this.timeouts.length === 0) {
            return this.add(callback, delay);
        }
        const lastTimeout = this.timeouts[this.timeouts.length - 1];
        if (lastTimeout) {
            return this.add(callback, lastTimeout.delay + delay);
        }
        return this;
    }

    /**
     * Clear all timeout that were ever added
     */
    public clear () {
        this.timeouts.forEach((data) => {
            clearTimeout(data.timeout);
        });
        this.timeouts = [];
        return this;
    }
}
