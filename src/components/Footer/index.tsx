import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import FooterView, { FooterProps } from '@ant-design/pro-layout/es/Footer';

const footer = {
    links: [{
      key: 'baidu',
      title: <span>百度</span>,
      href: 'https://www.baidu.com/',
      blankTarget: true,
    }, {
      key: 'antd',
      title: <span>Ant Design</span>,
      href: 'https://ant.design/index-cn',
      blankTarget: true,
    }],
  copyright: 'Hstare模仿antd建立的实例',
  };
// 自定义Footer组件，是因为没找到默认Footer组件！后来找到了，可是又写好了~~~
const Footer: React.FC<FooterProps> = props => {
  const { links, copyright } = props;
  return (<GridContent>
    <FooterView copyright={copyright || footer.copyright}
                links={links || footer.links }
                {...props}
    />
  </GridContent>)
};

export default Footer;
