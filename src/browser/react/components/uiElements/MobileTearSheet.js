//manually importing Material-ui mobile tear sheet
import React, { Component, PropTypes } from 'react';

class MobileTearSheet extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

    const styles = {
      root: {
        paddingTop: '2vw',
        marginBottom: 24,
        marginRight: 24,
        maxWidth: '100%',
        width: '100%',
      },
      container: {
        border: 'solid 1px #d9d9d9',
        height: this.props.height,
        overflow: 'hidden',
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.container)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MobileTearSheet;