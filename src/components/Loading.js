/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show === undefined ? false : this.props.show,
      typeprops: this.props.type === undefined ? 'Puff' : this.props.type,
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show });
    }
  }

  render() {
    if (this.state.show) {
      return (
        <Loader
          type={this.state.typeprops}
          color="#EE6D42"
          height="110"
          width="110"
        />
      );
    }
    return (<span />);
  }
}

export default Loading;
