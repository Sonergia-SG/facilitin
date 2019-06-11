import React, { Component } from 'react';
import { useTransition, animated } from 'react-spring';
// @ts-ignore
import uuidv4 from 'uuid/v4';

import './Alert.css';

interface PublicMessage {
  duration: number;
  type: 'info' | 'warning' | 'error';
  message: string;
};

interface Message extends PublicMessage{
  key: string;
};

interface State {
  messages: Array<Message>;
}

let internalAddMessageToQueue: (message: PublicMessage) => void;

class Alert extends Component<{}, State> {
  state: Readonly<State> = {
    messages: [],
  };

  componentDidMount() {
    internalAddMessageToQueue = this.addMessage;
  }

  addMessage = (message: PublicMessage) => {
    this.setState(
      {
        messages: [...this.state.messages, { key: uuidv4(), ...message}],
      },
      () => {
        if (this.state.messages.length === 1) this.listenMessages();
      },
    );
  };

  listenMessages = () => {
    const current = this.state.messages[0];

    if (current) {
      setTimeout(() => {
        this.removeMessage();

        const next = this.state.messages[0];
        if (next) this.listenMessages();
      }, current.duration);
    }
  };

  removeMessage = () => {
    this.setState({
      messages: this.state.messages.slice(1),
    });
  };

  render() {
    const { messages } = this.state;

    return (
      <div className="Alert-Container">
        <Toasts messages={messages} />
      </div>
    );
  }
}

const Toasts = ({ messages }: { messages: Array<Message> }) => {
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
        </animated.div>
      ))}
    </div>
  );
};

const optToastClass = (toast: Message) => {
  switch (toast.type) {
    case 'error':
      return ' Alert-Toast-Error'
    case 'warning':
      return ' Alert-Toast-Warning'
    default:
      return ''
  }
}

export const addMessageToQueue = (message: PublicMessage) => {
  if (internalAddMessageToQueue) {
    internalAddMessageToQueue(message);
  }
};

export default Alert;
