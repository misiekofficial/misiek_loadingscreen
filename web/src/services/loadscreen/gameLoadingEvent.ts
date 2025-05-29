import React from "react";
import { fetchNui } from "../../utils/fetchNui";

export type WindowEventListener<T> = (data: T) => void;
export type WindowMessageListener = (data: any, origin: string) => void;

export type WindowEventType = string;

const loadingEventListeners: Record<string, Set<WindowEventListener<unknown>>> = Object.create(null);

interface LoadingScreenEvent {
  eventName: string,
  [key: string]: any,
}

function sendEvent(name, data = {}) {
  if ((window as any).invokeNative) {
    // we cant use GetParentResourceName here :(
    fetch(`https://misiek_loadscreen/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    })
  } else {
    console.log(data)
  }
}

export const onGameLoadingEvent = <DataType>(eventName: string, listener: WindowEventListener<DataType>): (() => void) => {
  if (!loadingEventListeners[eventName]) {
    loadingEventListeners[eventName] = new Set();
  }

  loadingEventListeners[eventName].add(listener);

  return () => loadingEventListeners[eventName].delete(listener);
};

const fallbackHandler = function (data) {
  if (data.handover) {
    console.log("Handover data received:", data.handover);
    sendEvent("handover", (window as any).nuiHandoverData || {})
  }
}

window.addEventListener('message', function (e) {
  const listeners = loadingEventListeners[e.data.eventName || "null"];

  if (listeners) {
    for (const listener of listeners) {
      listener(e.data);
    }
  } else {
    fallbackHandler(e.data)
  }
});