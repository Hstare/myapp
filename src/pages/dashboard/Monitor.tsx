import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { Axis, Geom, Chart, Tooltip } from 'bizcharts';

interface IMonitorProps {
  dispatch: Dispatch<AnyAction>,
  loading: boolean,
}

class Monitor extends Component<IMonitorProps, {}> {
  render() {
    const data = [
      {
        year: '1951 年',
        sales: 38,
      },
      {
        year: '1952 年',
        sales: 52,
      },
      {
        year: '1956 年',
        sales: 61,
      },
      {
        year: '1957 年',
        sales: 145,
      },
      {
        year: '1958 年',
        sales: 48,
      },
      {
        year: '1959 年',
        sales: 38,
      },
      {
        year: '1960 年',
        sales: 38,
      },
      {
        year: '1962 年',
        sales: 38,
      },
    ];
    console.log('data', data);
    const cons = {
      date: {
        type: 'cat',
        // alias: '日期',
      },
      // value: {
      //   alias: '值',
      // }
    }
    const payNumbers = [
      {
        date: '2019-11-12',
        value: 6,
      },
      {
        date: '2019-11-13',
        value: 3,
      },
      {
        date: '2019-11-14',
        value: 4,
      },
      {
        date: '2019-11-15',
        value: 9,
      },
      {
        date: '2019-11-16',
        value: 2,
      },
      {
        date: '2019-11-17',
        value: 4,
      },
      {
        date: '2019-11-18',
        value: 11,
      },
    ];
    return (
      <div>
        这是新建的监控页面
        <Chart height={400} data={data} forceFit>
          <Axis name="year"/>
          <Axis name="sales"/>
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="year*sales"/>
        </Chart>
        <Chart height={400} data={payNumbers} scale={cons} forceFit>
          <Axis name="date"/>
          <Axis name="value"/>
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="date*value"/>
        </Chart>
        <Chart height={500} data={payNumbers} scale={cons} forceFit>
          {/*<Axis name="date" />*/}
          {/*<Axis name="value" />*/}
          <Tooltip
            showTitle={false}
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="date*value" tooltip={['date*value', (date, value) => ({
            name: date,
            value,
          })]}/>
        </Chart>
      </div>
    )
  }
}

export default Monitor;
