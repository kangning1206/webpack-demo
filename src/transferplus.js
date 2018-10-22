import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Transfer from 'antd/lib/transfer';

/**
 * [增强容器]
 * @param  {[type]} ComposedComponent [description]
 * @return {[type]}                   [description]
 */
let Enhance = ComposedComponent => class extends Component {

  componentDidMount() {
    // 如果定义了onSort方法，则执行排序
    if (this.props.onSort) {

      // 在组件内查看dom，动态插入按钮，绑定事件
      let wrap = this.refs.wrap;
      let wrapDom = ReactDOM.findDOMNode(wrap);
      // 注意查找需要容错，查找Transfer右侧
      let header = wrapDom.querySelectorAll('.ant-transfer-list-header')[1];
      // 测试属性
      header.style.background = this.props.rightColor;

      // 生成按钮且插入到头部位置
      let up = document.createElement('button');
      up.innerText = 'ASC';
      up.style.padding = '0 4px';
      up.onclick = this.handleSort.bind(null, 'ASC');
      header.appendChild(up);

      // 生成按钮且插入到头部位置
      let down = document.createElement('button');
      down.innerText = 'DESC';
      down.style.padding = '0 4px';
      down.onclick = this.handleSort.bind(null, 'DESC');
      header.appendChild(down);
    }
  }

  // 响应排序按钮
  handleSort = (direction) => {
    // 如果定义了onSort方法，则执行排序
    let { onSort, targetKeys } = this.props;
    if (!onSort) {
      return;
    }
    // 此处我们将排序规则抛出到业务层处理，
    // 可以根据rightDataSource 数组key 设置升序和倒序
    //if (selectedKeys.length > 0) {
    if (targetKeys.length > 0) {
      //this.refs.wrap.separatedDataSource
      // onSort(direction, this.refs.wrap.separateDataSource());
      onSort(direction, this.refs.wrap);
      // 排序后刷新，否则右侧不会变化
      this.setState({ direction: direction });
    }
  }


  render() {
    return <ComposedComponent {...this.props}  ref='wrap' />;
  }
};

export default Enhance(Transfer);
