import React, { Component } from 'react';

/**
 * [增强容器]
 * @param  {[type]} ComposedComponent [description]
 * @return {[type]}                   [description]
 */
class SommeComponent extends Component {
  render() {
    return (
      <div ref={this.props.domRef} style={{ border: 'solid 1px red' }}>
组件名称：SommeComponent
        {' '}
        {this.props.foo}
      </div>
    );
  }
}

SommeComponent.defaultProps = {
  foo: '',
  domRef: 'root',
};

export default SommeComponent;
