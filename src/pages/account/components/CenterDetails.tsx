import React, { useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card } from 'antd';

const CenterDetails: React.FC<{}> = () => {
  const [key, setKey] = useState('article');
  const tabListNoTitle = [
    {
      key: 'article',
      tab: 'article',
    },
    {
      key: 'app',
      tab: 'app',
    },
    {
      key: 'project',
      tab: 'project',
    },
  ];
  return (
    <GridContent>
      <Card
        tabList={tabListNoTitle}
        activeTabKey={key}
        onTabChange={tab => setKey(tab)}
        style={{ padding: '0 12px' }}
      ></Card>
    </GridContent>
  );
};

export default CenterDetails;
/* export default connect(()=>({

}))(CenterDetails); */
