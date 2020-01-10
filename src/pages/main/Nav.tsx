import React, { useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import img from '@/assets/main.png';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import './style/nav.less';

const { Item, SubMenu } = Menu;

interface MenuProps {
  key: string;
  title: string;
  subMenu?: MenuProps[];
}

const customMenu = [
  {
    key: 'item0',
    title: '菜单一',
    subMenu: [
      { key: 'subItem0', title: '子菜单一' },
      { key: 'subItem1', title: '子菜单二' },
    ],
  },
  { key: 'item1', title: '菜单二' },
  { key: 'item2', title: '菜单三' },
  { key: 'item3', title: '菜单四' },
];

interface NavProps {
  isMobile: boolean;
  menu?: MenuProps[];
}

const Nav: React.FC<NavProps> = props => {
  const { isMobile } = props;

  const [phoneOpen, setPhoneOpen] = useState(false);

  const phoneClick = () => setPhoneOpen(!phoneOpen);

  const renderMenu = (menus: MenuProps[]) =>
    menus.map(item => {
      if (item.subMenu) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {renderMenu(item.subMenu)}
          </SubMenu>
        );
      }
      return <Item key={item.key}>{item.title}</Item>;
    });

  console.log('isMobile', isMobile);
  const [moment, setMoment] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    phoneOpen === false ? setMoment(300) : setMoment(0);
  });
  return (
    <GridContent style={{ background: '#001529' }}>
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        style={{ padding: '0 24px', margin: 'auto', maxWidth: '1200px' }}
      >
        <div className={`home-page${phoneOpen ? ' open' : ''}`}>
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            style={{
              position: 'relative',
              display: 'inline-block',
              width: 150,
              lineHeight: '64px',
            }}
          >
            <img width="100%" src={img} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                zIndex: 100,
                width: 16,
                height: 14,
                cursor: 'pointer',
              }}
              onClick={() => phoneClick()}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: e => {
                      if (phoneOpen) {
                        e.target.style.height = 'auto';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : []
            }
            moment={moment}
            reverse={!!phoneOpen}
            style={{ display: 'inline-block', float: 'right' }}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['sub0']}
              theme="dark"
              style={{ lineHeight: '64px' }}
            >
              {renderMenu(customMenu)}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    </GridContent>
  );
};

export default Nav;
