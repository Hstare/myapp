import { Icon } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

// https://github.com/ant-design/pro-blocks/blob/master/DashboardAnalysis/src/components/Trend/index.tsx

export interface ITrendProps {
  colorful?: boolean;
  flag: 'up' | 'down';
  style?: React.CSSProperties;
  reverseColor?: boolean;
  className?: string;
}

const Trend: React.FC<ITrendProps> = ({
  colorful = true,
  reverseColor = false,
  flag,
  children,
  className,
  ...rest
}) => <div></div>;
