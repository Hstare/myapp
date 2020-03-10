import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import RcTweenOne from 'rc-tween-one';
import bannerTitle from '@/assets/banner-title.png';
import { Button, Icon } from 'antd';
import './style/banner.less';

const Banner: React.FC<{}> = () =>
   (
    <GridContent>
      <div
        style={{
          backgroundImage: 'url("https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg")',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'auto',
          height: '100vh',
          width: '100%',
        }}
      >
        <RcTweenOne
          animation={{ opacity: 0.5, type: 'from' }}
          component="div"
          style={{
            padding: '0 24px',
            margin: 'auto',
            maxWidth: '1200px',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: '20%', left: 0, right: 0 }}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={bannerTitle} />
            <div style={{ paddingBottom: 20 }}>
              <span>这是一段话</span>
            </div>
            <div>
              <Button
                ghost
                style={{ height: 40, lineHeight: '40px', boxShadow: '0 0 0 transparent' }}
              >
                文字描述
              </Button>
            </div>
            <RcTweenOne
              animation={{ repeat: -1, y: -20, yoyo: true, duration: 1000 }}
              key="icon"
              className="banner-icon"
            >
              <Icon type="down" />
            </RcTweenOne>
          </div>
        </RcTweenOne>
      </div>
    </GridContent>
  );
export default Banner;
