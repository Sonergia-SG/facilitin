import React, { Component } from 'react';
import { useTransition, animated } from 'react-spring';
// @ts-ignore
import uuidv4 from 'uuid/v4';

import './Alert.css';

interface PublicMessage {
  duration: number;
  type: 'info' | 'warning' | 'error';
  message: string;
}

interface Message extends PublicMessage {
  key: string;
}

interface State {
  messages: Array<Message>;
}

let internalAddMessageToQueue: (message: PublicMessage) => void;

const optToastClass = (toast: Message) => {
  switch (toast.type) {
    case 'error':
      return ' Alert-Toast-Error';
    case 'warning':
      return ' Alert-Toast-Warning';
    default:
      return '';
  }
};

class Alert extends Component<{}, State> {
  state: Readonly<State> = {
    messages: [],
  };

  componentDidMount() {
    internalAddMessageToQueue = this.addMessage;
  }

  addMessage = (message: PublicMessage) => {
    const { messages } = this.state;

    const key = uuidv4();

    this.setState(
      {
        messages: [...messages, { key, ...message }],
      },
      () => {
        setTimeout(() => {
          this.removeMessage(key);
        }, message.duration);
      },
    );
  };

  removeMessage = (key: string) => {
    const { messages } = this.state;

    const index = messages.findIndex(m => m.key === key);

    if (index !== -1) {
      this.setState({
        messages: [
          ...messages.slice(0, index),
          ...messages.slice(index + 1, messages.length),
        ],
      });
    }
  };

  render() {
    const { messages } = this.state;

    return (
      <div className="Alert-Container">
        <Toasts messages={messages} remove={this.removeMessage} />
      </div>
    );
  }
}

const Toasts = ({
  messages,
  remove,
}: {
  messages: Array<Message>;
  remove: (key: string) => void;
}) => {
  const transitions = useTransition(messages, m => m.key, {
    from: () => ({
      transform: 'translate3d(450px,0,0)',
      opacity: 0.2,
    }),
    enter: () => ({
      transform: 'translate3d(0,0,0)',
      opacity: 1,
    }),
    leave: () => ({
      transform: 'translate3d(450px,0,0)',
      opacity: 0.4,
    }),
  });

  return (
    <div>
      {transitions.map(({ item, key, props }) => (
        <animated.div
          key={key}
          style={props}
          className={`Alert-Toast${optToastClass(item)}`}
        >
          <p className="Alert-Message">{item.message}</p>
          <button onClick={() => remove(item.key)} type="button">
            <i className="fa fa-times" />
          </button>
        </animated.div>
      ))}
    </div>
  );
};

export const addMessageToQueue = (message: PublicMessage) => {
  if (internalAddMessageToQueue) {
    internalAddMessageToQueue(message);
  }
};

export default Alert;
