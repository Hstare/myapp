import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { Axis, Geom, Chart, Tooltip } from 'bizcharts';
import { Icon, Pagination, Table } from 'antd';
import { IAnalysisOnlineSearchTableType } from '@/models/dashboard/analysis';

interface IMonitorProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

class Monitor extends Component<IMonitorProps, {}> {
  // render() {
  //   const data = [
  //     {
  //       year: '1951 年',
  //       sales: 38,
  //     },
  //     {
  //       year: '1952 年',
  //       sales: 52,
  //     },
  //     {
  //       year: '1956 年',
  //       sales: 61,
  //     },
  //     {
  //       year: '1957 年',
  //       sales: 145,
  //     },
  //     {
  //       year: '1958 年',
  //       sales: 48,
  //     },
  //     {
  //       year: '1959 年',
  //       sales: 38,
  //     },
  //     {
  //       year: '1960 年',
  //       sales: 38,
  //     },
  //     {
  //       year: '1962 年',
  //       sales: 38,
  //     },
  //   ];
  //   console.log('data', data);
  //   const cons = {
  //     date: {
  //       type: 'cat',
  //       // alias: '日期',
  //     },
  //     // value: {
  //     //   alias: '值',
  //     // }
  //   }
  //   const payNumbers = [
  //     {
  //       date: '2019-11-12',
  //       value: 6,
  //     },
  //     {
  //       date: '2019-11-13',
  //       value: 3,
  //     },
  //     {
  //       date: '2019-11-14',
  //       value: 4,
  //     },
  //     {
  //       date: '2019-11-15',
  //       value: 9,
  //     },
  //     {
  //       date: '2019-11-16',
  //       value: 2,
  //     },
  //     {
  //       date: '2019-11-17',
  //       value: 4,
  //     },
  //     {
  //       date: '2019-11-18',
  //       value: 11,
  //     },
  //   ];
  //   const columns = [
  //     {
  //       title: '排名',
  //       dataIndex: 'id',
  //       key: 'id',
  //     },
  //     {
  //       title: '搜索关键字',
  //       dataIndex: 'keyword',
  //       key: 'keyword',
  //       render: (text: string, record: IAnalysisOnlineSearchTableType) =>
  //         <a>{`${text}-${record.id}`}</a>,
  //     },
  //     {
  //       title: '用户数',
  //       dataIndex: 'users',
  //       key: 'users',
  //     },
  //     {
  //       title: '周涨幅',
  //       dataIndex: 'weekGain',
  //       key: 'weekGain',
  //       render: (text: number) =>
  //         (text >= 0 ? (<span>{`${text}%`} <Icon type="caret-up" style={{ color: 'red' }}/></span>) :
  //           (<span>{`${Math.abs(text)}%`}<Icon type="caret-down" style={{ color: 'green' }}/></span>)),
  //     },
  //   ];
  //   const tables = [{ id: 1, keyword: '搜索关键词', users: 403, weekGain: -3 },
  //     { id: 2, keyword: '搜索关键词', users: 445, weekGain: -91 },
  //     { id: 3, keyword: '搜索关键词', users: 527, weekGain: 22 },
  //     { id: 4, keyword: '搜索关键词', users: 343, weekGain: -74 },
  //     { id: 5, keyword: '搜索关键词', users: 395, weekGain: 3 },
  //     { id: 6, keyword: '搜索关键词', users: 847, weekGain: 57 },
  //     { id: 7, keyword: '搜索关键词', users: 170, weekGain: -59 },
  //     { id: 8, keyword: '搜索关键词', users: 893, weekGain: -6 },
  //     { id: 9, keyword: '搜索关键词', users: 420, weekGain: 94 },
  //     { id: 10, keyword: '搜索关键词', users: 461, weekGain: -38 },
  //     { id: 11, keyword: '搜索关键词', users: 739, weekGain: 19 },
  //     { id: 12, keyword: '搜索关键词', users: 317, weekGain: -22 },
  //     { id: 13, keyword: '搜索关键词', users: 632, weekGain: 44 },
  //     { id: 14, keyword: '搜索关键词', users: 834, weekGain: -57 },
  //     { id: 15, keyword: '搜索关键词', users: 647, weekGain: -23 },
  //     { id: 16, keyword: '搜索关键词', users: 876, weekGain: 2 },
  //     { id: 17, keyword: '搜索关键词', users: 983, weekGain: 10 },
  //     { id: 18, keyword: '搜索关键词', users: 400, weekGain: 74 },
  //     { id: 19, keyword: '搜索关键词', users: 175, weekGain: 70 },
  //     { id: 20, keyword: '搜索关键词', users: 684, weekGain: -98 },
  //     { id: 21, keyword: '搜索关键词', users: 236, weekGain: -61 },
  //     { id: 22, keyword: '搜索关键词', users: 368, weekGain: -94 },
  //     { id: 23, keyword: '搜索关键词', users: 752, weekGain: -2 },
  //     { id: 24, keyword: '搜索关键词', users: 139, weekGain: -5 },
  //     { id: 25, keyword: '搜索关键词', users: 807, weekGain: -23 },
  //     { id: 26, keyword: '搜索关键词', users: 221, weekGain: -59 },
  //     { id: 27, keyword: '搜索关键词', users: 273, weekGain: 32 },
  //     { id: 28, keyword: '搜索关键词', users: 496, weekGain: 4 },
  //     { id: 29, keyword: '搜索关键词', users: 397, weekGain: 52 },
  //     { id: 30, keyword: '搜索关键词', users: 782, weekGain: 58 },
  //     { id: 31, keyword: '搜索关键词', users: 235, weekGain: 20 },
  //     { id: 32, keyword: '搜索关键词', users: 378, weekGain: 48 },
  //     { id: 33, keyword: '搜索关键词', users: 156, weekGain: -17 },
  //     { id: 34, keyword: '搜索关键词', users: 179, weekGain: -80 },
  //     { id: 35, keyword: '搜索关键词', users: 331, weekGain: -96 },
  //     { id: 36, keyword: '搜索关键词', users: 196, weekGain: 77 },
  //     { id: 37, keyword: '搜索关键词', users: 855, weekGain: -70 },
  //     { id: 38, keyword: '搜索关键词', users: 847, weekGain: 61 },
  //     { id: 39, keyword: '搜索关键词', users: 763, weekGain: -48 },
  //     { id: 40, keyword: '搜索关键词', users: 876, weekGain: 52 },
  //     { id: 41, keyword: '搜索关键词', users: 639, weekGain: 74 },
  //     { id: 42, keyword: '搜索关键词', users: 948, weekGain: -25 },
  //     { id: 43, keyword: '搜索关键词', users: 609, weekGain: -71 },
  //     { id: 44, keyword: '搜索关键词', users: 833, weekGain: -30 },
  //     { id: 45, keyword: '搜索关键词', users: 867, weekGain: 45 },
  //     { id: 46, keyword: '搜索关键词', users: 576, weekGain: -75 },
  //     { id: 47, keyword: '搜索关键词', users: 677, weekGain: -41 },
  //     { id: 48, keyword: '搜索关键词', users: 154, weekGain: 45 },
  //     { id: 49, keyword: '搜索关键词', users: 504, weekGain: -78 },
  //     { id: 50, keyword: '搜索关键词', users: 251, weekGain: 55 }];
  //   return (
  //     <div>
  //       <Pagination size="small" total={50} />
  //       这是新建的监控页面
  //       <Chart height={400} data={data} forceFit>
  //         <Axis name="year"/>
  //         <Axis name="sales"/>
  //         <Tooltip
  //           crosshairs={{
  //             type: 'y',
  //           }}
  //         />
  //         <Geom type="interval" position="year*sales"/>
  //       </Chart>
  //       <Chart height={400} data={payNumbers} scale={cons} forceFit>
  //         <Axis name="date"/>
  //         <Axis name="value"/>
  //         <Tooltip
  //           crosshairs={{
  //             type: 'y',
  //           }}
  //         />
  //         <Geom type="interval" position="date*value"/>
  //       </Chart>
  //       <Chart height={500} data={payNumbers} scale={cons} forceFit>
  //         <Tooltip
  //           showTitle={false}
  //           crosshairs={{
  //             type: 'y',
  //           }}
  //         />
  //         <Geom type="interval" position="date*value" tooltip={['date*value', (date, value) => ({
  //           name: date,
  //           value,
  //         })]}/>
  //       </Chart>
  //       <div style={{ marginTop: 20 }}>
  //         {/*<Table rowKey={(record: IAnalysisOnlineSearchTableType) => `${record.id}`}*/}
  //         {/*       columns={columns}*/}
  //         {/*       dataSource={tables}*/}
  //         {/*       // size="small"*/}
  //         {/*       pagination={{ size: 'small', position: 'bottom', defaultPageSize: 5 }}/>*/}
  //         <Pagination size="small" total={50} />
  //       </div>
  //         <Pagination size="small" total={50} />
  //     </div>
  //   )
  // }
  render() {
    return (
      <div>
        <Pagination size="small" defaultPageSize={5} total={50} />
      </div>
    );
  }
}

export default Monitor;
