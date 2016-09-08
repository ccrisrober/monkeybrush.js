class WorkerPool {
    constructor() {
        this._doneCB = function () {
            // Nothing
        };
    }
    public onTasksDone(cb: () => void) {
        this._doneCB = cb;
    }
    public clearTasks() {
        this._tasks = [];
    }
    public addTask(data: any, handler?: any): number {
        let task = {
            id: this._tasks.length,
            data: data,
            handler: handler
        };
        data.__taskID = task.id;
        this._tasks.push(task);
        let wObj = this._getWorkerObj();
        wObj.tasks.push(task.id);

        this.runTask(wObj);
        return task.id;
    }
    private _getWorkerObj() {
        let min = 9999;
        let id = -1;
        for (let i = 0; i < this._pool.length; ++i) {
            if (this._pool[i].tasks.length === 0) {
                id = i;
                break;
            }
            else if (this._pool[i].tasks.length < min) {
                min = this._pool[i].tasks.length;
                id = i;
            }

        }
        return this._pool[id];
    }
    private runTask(wObj) {
        let tasks = wObj.tasks;
        if (wObj.currentTask === -1) {

            const id = tasks[0];
            if (id !== undefined) {

                const task = this._tasks[id];
                wObj.currentTask = task.id;
                wObj.worker.postMessage(task.data);
            }
        }

        let doCb = true;
        let pObj;
        for (let i = 0; i < this._pool.length; i++) {
            pObj = this._pool[i];
            if (pObj.currentTask !== -1 || pObj.tasks.length > 0) {
                doCb = false;
                break;
            }
        }

        if (doCb) {
            this._doneCB();
        }
    }
    protected _doneCB: () => void;
    protected _tasks = [];
    protected _pool = [];
};

export { WorkerPool };
