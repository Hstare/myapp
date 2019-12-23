import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Row from 'antd/es/grid/row';
import Col from 'antd/es/grid/col';
import CenterInfo from '@/pages/account/components/CenterInfo';
import CenterDetails from '@/pages/account/components/CenterDetails';

const Center: React.FC<{}> = () => (
    <GridContent>
      <Row>
        <Col md={24} lg={7}><CenterInfo/></Col>
        <Col md={24} lg={17}><CenterDetails/></Col>
      </Row>
    </GridContent>
  );

export default Center;
