import React from 'react';
import { MotionState } from '..';

class DirectionalStateMotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: this.props.direction,
    };
  }

  componentDidUpdate() {
    if (this.state.direction !== this.props.direction) {
      this.setState({ direction: this.props.direction });
    }
  }

  getStyle = () => {
    return this.props.states[this.state.direction];
  }

  render() {
    return (
      <MotionState
        defaultStyle={this.props.defaultStyle}
        style={this.getStyle()}
        onRest={this.props.onRest}
      >
        {this.props.children}
      </MotionState>
    );
  }
}

export default DirectionalStateMotion;
