/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class Loading extends Component {
  state = {
    show: this.props.show === undefined ? false : this.props.show,
    typeprops: this.props.type === undefined ? 'Puff' : this.props.type,
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    // Typical usage (don't forget to compare props):
    if (show !== prevProps.show) {
      // ! this.setState in didUpate is dangerous
      this.setState({ show });
    }
  }

  render() {
    const { show, typeprops } = this.state;
    if (show) {
      return (
        <Loader
          type={typeprops}
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
