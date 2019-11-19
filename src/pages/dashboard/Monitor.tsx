import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { Pagination } from 'antd';

interface IMonitorProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
class Monitor extends Component<IMonitorProps, {}> {
  render() {
    return (
      <div>
        <Pagination size="small" defaultPageSize={5} total={50}/>
      </div>
    );
  }
}

export default Monitor;
