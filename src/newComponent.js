import React, { Component } from 'react';
import SommeComponent from './sommeComponent';

/**
 * [ 返回一个新类]
 * @param  {[type]} ComposedComponent [description]
 * @return {[type]}                   [description]
 */
const ComponentContainer = (ComposedComponent) => {
  class TempComponent extends Component {
    componentDidMount() {
      const { btName } = this.props;
      const bt = document.createElement('button');
      bt.innerText = btName;
      this.rootDom.appendChild(bt);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          domRef={(node) => { (this.rootDom = node); return node; }}
        />
      );
    }
  }

  TempComponent.defaultProps = {
    btName: '我是按钮',
  };

  return TempComponent;
};

export default ComponentContainer(SommeComponent);
