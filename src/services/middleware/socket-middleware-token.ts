import { getCookie } from '../../utils/cookie';
import { Dispatch } from 'redux';
import { TWsAction } from '../types/types';
import { TWsTokenServerActions } from '../types/types';

export const socketMiddlewareToken = (
  wsUrlToken: string,
  wsActionsToken: TWsTokenServerActions
) => {
  return (store: { getState: Function; dispatch: Dispatch }) => {
    let socket: WebSocket | null = null;
    return (next: Function) => (action: TWsAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActionsToken;
      if (type === wsInit) {
        socket = new WebSocket(
          `${wsUrlToken}?token=${getCookie('accessToken')}`
        );
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

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
