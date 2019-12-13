import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router';

// 这里应该使用 antd 的 403 result 组件，
// 但是还没发布，先来个简单的。

const NoAuthorityPage: React.FC<{}> = () => (
  <div>
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你无权访问该页面。"
      extra={
        <Button type="primary" onClick={() => router.push('/')}>
          Back Home
        </Button>
      }
    ></Result>
  </div>
);

export default NoAuthorityPage;
