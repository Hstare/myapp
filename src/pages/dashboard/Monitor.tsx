import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { Button, Pagination } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IMonitorProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
class Monitor extends Component<IMonitorProps, {}> {
  render() {
    return (
      <PageHeaderWrapper title="monitor title~~~"
                         tabList={[{ tab: 'tab1', key: '1' }, { tab: 'tab2', key: '2' }]}
                         content={<div>这是content</div>}
                         tabBarExtraContent={<Button>tabBarExtraContent</Button>}
                         extraContent={<Button>按钮</Button>}
                         tabActiveKey="1">
        <Pagination size="small" defaultPageSize={5} total={50}/>
      </PageHeaderWrapper>
    );
  }
}

export default Monitor;
