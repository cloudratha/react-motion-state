import React from "react";
import { Motion, spring } from "react-motion";

class MotionState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false
    };

    this.interpolateChild = this.interpolateChild.bind(this);
    this.onRest = this.onRest.bind(this);
  }

  interpolateChild(style) {
    if (!this.state.animating) {
      this.setState({ animating: true });
    }
    return this.props.children(style, this.state.animating);
  }

  onRest() {
    if (this.state.animating) {
      this.setState({ animating: false });
    }
  }

  render() {
    return (
      <Motion
        defaultStyle={{ left: 0 }}
        style={{ left: spring(300) }}
        onRest={this.onRest}
      >
        {this.interpolateChild}
      </Motion>
    );
  }
}

export default MotionState;
