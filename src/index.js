import React from 'react';
import ReactDOM from 'react-dom';

import Transferplus from './transferplus';
import 'antd/lib/transfer/style/css';

import SommeComponent from  './sommeComponent';
import NewComponent from  './newComponent'

const mockData = [];
for (let i = 0; i < 10; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i}`,
    description: `description of content${i}`,
  });
}

const oriTargetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

class App extends React.Component {
  state = {
    targetKeys: oriTargetKeys,
    selectedKeys: [],
    disabled: false,
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {

    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }



  handleSort = (direction, subcomp) => {

    // 右侧已选择项目，是key数组 
    if (direction == 'ASC') {
      subcomp.separatedDataSource.rightDataSource.sort((prev, next) => {
        return prev.key - next.key;
      });

      subcomp.props.targetKeys.sort((prev, next) => {
        return prev - next;
      });

    } else {
      subcomp.separatedDataSource.rightDataSource.sort((prev, next) => {
        return next.key - prev.key;
      });

      subcomp.props.targetKeys.sort((prev, next) => {
        return next - prev;
      });
    }


  }

  handleSn = () => {
    consoole.log(this.refs.trs.targetKeys)
    this.setState({
      sn: 'update'
    });
  }


  render() {
    const { targetKeys, selectedKeys, disabled } = this.state;
    return (
      <div>
        <div>
        <button onClick={this.handleSn}>更新序号</button>
        {targetKeys.map((item)=>{ 
          return  `${item}_`;
        })}
        </div>
        <Transferplus
          ref = 'trs'
          dataSource={mockData}
          showSearch={true}
          titles={['Source']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onSort={this.handleSort}
          render={item => item.title}
          disabled={disabled}
          listStyle={{width:300,}}
          rightColor='yellow'
        />
        <SommeComponent foo='haha' />
        <NewComponent foo='foo' btName='bar' />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
