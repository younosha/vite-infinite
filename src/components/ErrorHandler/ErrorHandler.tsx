import React from 'react';
import Styles from './ErrorHandler.module.css';

type ErrorHandlerProps = {
  children: string | JSX.Element | JSX.Element[];
};

export class ErrorHandler extends React.Component<ErrorHandlerProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={Styles.container}>
          Что-то пошло не так. Попробуйте перезагрузить страницу!
        </div>
      );
    }

    return this.props.children;
  }
}