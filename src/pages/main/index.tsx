import React, { useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
// @ts-ignore
import { enquireScreen } from 'enquire-js';
import Nav from '@/pages/main/Nav';
import Banner from '@/pages/main/Banner';
import VideoContent from '@/pages/main/VideoContent';
import Footer from '@/components/Footer';

// 主页
const Main: React.FC<{}> = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    enquireScreen((b: any) => setIsMobile(!!b));
  });

  return (
    <GridContent>
      {/*  导航栏 */}
      <div>
        <Nav isMobile={isMobile} />
      </div>
      {/* banner页 */}
      <div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Banner />
      </div>
      {/* 视频内容 */}
      <VideoContent />
      <VideoContent />
      {/* 总体介绍 */}

      {/* footer */}
      <Footer />
    </GridContent>
  );
};

export default Main;
