import React, { useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
// @ts-ignore
import { enquireScreen } from 'enquire-js';
import Nav from '@/pages/main/Nav';

// 主页
const Main: React.FC<{}> = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    enquireScreen((b: any) => setIsMobile(!!b))
  });

  return (
    <GridContent>
    {/*  导航栏 */}
      <div>
        <Nav isMobile={isMobile}/>
      </div>
    {/* banner页 */}

    {/* 总体介绍 */}

    {/* footer */}
    </GridContent>
  )
};

export default Main;
