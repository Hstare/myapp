import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';

// 这里应该使用 antd 的 403 result 组件，
// 但是还没发布，先来个简单的。

const NoAuthorityPage: React.FC<{}> = () => (
  <div>
    <Result
      status="403"
      title="403"
      subTitle={<FormattedMessage id="exception.403" defaultMessage="Sorry, you don't have access to this page."/>}
      extra={
        <Button type="primary" onClick={() => router.push('/')}>
          <FormattedMessage id="exception.back-home" defaultMessage="Back Home"/>
        </Button>
      }
    ></Result>
  </div>
);

export default NoAuthorityPage;
