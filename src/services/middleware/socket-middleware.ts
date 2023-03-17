import { Middleware, MiddlewareAPI } from 'redux';

import { TWsAction, TWsServerActions } from '../types/types';
import { AppDispatch, RootState } from '../..';

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsServerActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: Function) => (action: TWsAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
