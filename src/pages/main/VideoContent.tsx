import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import RcScrollOverPack from 'rc-scroll-anim/es/ScrollOverPack';
import { Icon } from 'antd';
import RcTweenOne from 'rc-tween-one';
import RcQueueAnim from 'rc-queue-anim';

const VideoContent: React.FC<{}> = () => {
  return (<GridContent style={{ background: '#fafafa', maxHeight: 720, height: 600 }}>
    <RcScrollOverPack style={{ maxWidth: 1200, position: 'relative', margin: 'auto', textAlign: 'center' }}
                      playScale={0.6}>
      <RcTweenOne animation={{ opacity: 1 }} style={{ transform: 'translateY(100px)', opacity: 0 }} yoyo>
        <RcQueueAnim type="bottom"
                     animConfig={{ opacity: [1, 0] }}
                     interval={1000}
                     leaveReverse>
            <div style={{ marginTop: 100 }} key="centent1">内容一</div>
            <div style={{ marginTop: 20 }} key="centent2">内容一</div>
            <div style={{ height: 'auto', marginTop: 20, display: 'inline-flex' }} key="centent3">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video poster="https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg"
                     style={{ width: '100%', height: '100%', opacity: 1, cursor: 'pointer' }}
                     controls
              >
                <source src="https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4"
                        type="video/mp4"
                />
                <Icon type="play-circle" style={{ zIndex: 100 }}/>
              </video>
            </div>
        </RcQueueAnim>
      </RcTweenOne>
    </RcScrollOverPack>
  </GridContent>)
};

export default VideoContent;
