import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import RcScrollOverPack from 'rc-scroll-anim/es/ScrollOverPack';
import RcQueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';

const VideoContent: React.FC<{}> = () => {
  return (<GridContent style={{ background: '#fafafa', maxHeight: 720, height: 600 }}>
    <RcScrollOverPack style={{ maxWidth: 1200, position: 'relative', margin: 'auto', textAlign: 'center' }}>
      <RcQueueAnim leaveReverse
                   type="bottom"
      >
        <div style={{ marginTop: 100 }}>内容一</div>
        <div style={{ marginTop: 20 }}>内容一</div>
        <div style={{ width: 800, height: 400, marginTop: 20, display: 'inline-flex' }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video poster="https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg"
                 style={{ width: '100%', height: '100%', opacity: 1, cursor: 'pointer' }}
                 src="https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4"
          >
            <Icon type="play-circle" style={{ zIndex: 100 }}/>
          </video>
        </div>
      </RcQueueAnim>
    </RcScrollOverPack>
  </GridContent>)
};

export default VideoContent;
