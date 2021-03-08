/**
* Created by nghinv on Thu Apr 11 2019
* Copyright (c) 2019 nghinv@luci.vn
*/

import { globalApp } from './logs';
import { timer } from './helpers';

export function customLoger({ dispatch, getState }) {
  try {
    return (next) => (action) => {
      const enableLog = (globalApp.customLog && globalApp.customLog.enableLog) || false;
      if (!enableLog) return next(action);

      const logBuffer = [];
      const logEntry = {};

      logBuffer.push(logEntry);
      logEntry.started = timer.now();
      logEntry.startedTime = new Date();
      logEntry.prevState = getState();
      logEntry.action = action;
      logEntry.took = timer.now() - logEntry.started;
      logEntry.nextState = getState();

      if (globalApp.customLog) {
        globalApp.customLog.emitEvent({ type: 'redux', logBuffer });
      }

      return next(action);
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    return next => action => next(action);
  }
}
