import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle={<FormattedMessage id="exception.404" defaultMessage="Sorry, the page you visited does not exist."/>}
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        <FormattedMessage id="exception.back-home" defaultMessage="Back Home"/>
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
