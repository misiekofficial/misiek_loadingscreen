import { makeAutoObservable, runInAction } from "mobx";
import { onGameLoadingEvent } from "./gameLoadingEvent";

const log = (...args) => {};

export enum InitFunctionType {
  INIT_UNKNOWN = 0,
  INIT_CORE = 1,
  INIT_BEFORE_MAP_LOADED = 2,
  INIT_AFTER_MAP_LOADED = 4,
  INIT_SESSION = 8,
}

// -- https://discord.gg/P8KKAb7D4q
// -- UI Projects for FiveM by totenmajkel_ (misiek_dev)

export const GameLoadingState = new (class GameLoadingState {
  public loadingProgress = 0;
  public logLineStatus = false;

  constructor() {
    makeAutoObservable(this);

    onGameLoadingEvent("loadProgress", ({ loadFraction }) => {
        log("loadProgress", loadFraction);

        runInAction(() => {
            this.loadingProgress = loadFraction;
        });
    });

    onGameLoadingEvent("startInitFunction", ({ type }) => {
        log("startInitFunction", type);
    });

    onGameLoadingEvent("startInitFunctionOrder", ({ type, order, count }) => {
        log("startInitFunctionOrder", {
            type,
            order,
            count,
        });
    });

    onGameLoadingEvent("initFunctionInvoking", ({ type, name, idx, count }) => {
        log("initFunctionInvoking", {
            type,
            name,
            idx,
            count,
        });
    });

    onGameLoadingEvent("initFunctionInvoked", ({ type, name }) => {
        log("initFunctionInvoked", {
            type,
            name,
        });
    });

    onGameLoadingEvent("endInitFunction", ({ type }) => {
        log("endInitFunction", type);
    });

    onGameLoadingEvent("startDataFileEntries", ({ count }) => {
        log("startDataFileEntries", count);
    });

    onGameLoadingEvent("performMapLoadFunction", ({ idx }) => {
        log("performMapLoadFunction", idx);
    });

    onGameLoadingEvent("onDataFileEntry", ({ type, isNew, name }) => {
        log("onDataFileEntry", {
            type,
            isNew,
            name,
        });
    });

    onGameLoadingEvent("onLogLine", ({ message }) => {
        log("onLogLine", message);

        this.logLineStatus = true
    });
  }

  resetLoadingProgress() {
    this.loadingProgress = 0;
    this.logLineStatus = false;
  }
})();

// -- https://discord.gg/P8KKAb7D4q
// -- UI Projects for FiveM by totenmajkel_ (misiek_dev)