import React, { useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import img from '@/assets/main.png';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import { getChildrenToRender } from '@/pages/main/util/utils';
import './style/nav.less';

const { Item, SubMenu } = Menu;

const menu = {
    className: 'header-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航一', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系',
                },
              ],
            },
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系',
                },
              ],
            },
          },
        ],
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航二', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航三', name: 'text' }],
        },
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: '导航四', name: 'text' }],
        },
      },
    ],
  };

interface NavProps {
  isMobile: boolean
}

const Nav: React.FC<NavProps> = props => {
  const { isMobile } = props;

  const [phoneOpen, setPhoneOpen] = useState(false);

  const phoneClick = () => setPhoneOpen(!phoneOpen);

  const navChildren = menu.children.map((item) => {
    const { children: a, subItem, ...itemProps } = item;
    if (subItem) {
      return (
        <SubMenu
          key={item.name}
          {...itemProps}
          title={
            <div
              {...a}
              className={`header-item-block${a.className}`.trim()}
            >
              {a.children.map(getChildrenToRender)}
            </div>
          }
          popupClassName="header0-item-child"
        >
          {subItem.map(($item, ii) => {
            const { children: childItem } = $item;
            const child = childItem.href ? (
              <a {...childItem}>
                {childItem.children.map(getChildrenToRender)}
              </a>
            ) : (
              <div {...childItem}>
                {childItem.children.map(getChildrenToRender)}
              </div>
            );
            return (
              <Item key={$item.name || ii.toString()} {...$item}>
                {child}
              </Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Item key={item.name} {...itemProps}>
        <a {...a} className={`header-item-block ${a.className}`.trim()}>
          {a.children.map(getChildrenToRender)}
        </a>
      </Item>
    );
  });

  console.log('isMobile', isMobile);
  const [moment, setMoment] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    phoneOpen === false ? setMoment(300) : setMoment(0);
  });
  return (
    <GridContent>
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        className="header home-page-wrapper"
      >
        <div
          className={`home-page${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            className="header-logo"
          >
            <img width="100%" src={img} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              className="header-mobile-menu"
              onClick={() => phoneClick()}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...menu}
            animation={
              isMobile
                ? {
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
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
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['sub0']}
              theme="dark"
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    </GridContent>
  )
};

export default Nav;
