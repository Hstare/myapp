import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import {
  Card,
  Col,
  Divider,
  Icon,
  Row,
  Tooltip as AntdTooltip,
  Progress,
  List,
  DatePicker,
  Dropdown,
  Menu,
  Table,
} from 'antd';
import { connect } from 'dva';
import { Chart, Tooltip, Geom, Axis, Coord, Guide, Legend } from 'bizcharts';
import moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import DataSet from '@antv/data-set';
import {
  IAnalysisOnlineSearchTableType,
  IAnalysisOnlineSearchType,
  IAnalysisPayNumsType,
  IAnalysisPercentType,
  IAnalysisRatioChartDataType,
  IAnalysisSalesRatioType,
  IAnalysisSalesType,
  IAnalysisStateType,
  IAnalysisVisitsType,
} from '@/models/dashboard/analysis';
import { ConnectState } from '@/models/connect';
import styles from './analysis.less';

interface IAnalysisProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
  visits: IAnalysisVisitsType;
  payNumbers: IAnalysisPayNumsType[];
  percent: IAnalysisPercentType;
  sales: IAnalysisSalesType[];
  onlineSearch: IAnalysisOnlineSearchType;
  salesRatio: IAnalysisSalesRatioType;
  ratioChartData: IAnalysisRatioChartDataType[];
}

interface IAnalysisState extends ConnectState {
  // analysis名字和namespace的名字保持一致t
  analysis: IAnalysisStateType;
}

interface IAnalysisInitState {
  key: string;
  chartSaleAndVisitTitle?: string;
  listSaleAndVisitTitle?: string;
  rangeDate?: RangePickerValue;
  selectedDate?: string;
  currentPage?: number;
  pageSize?: number;
}

const { RangePicker } = DatePicker;

@connect(({ loading, analysis }: IAnalysisState) => ({
  loading: loading.effects['analysis/getVisits'],
  visits: analysis.visits,
  payNumbers: analysis.payNumbers,
  percent: analysis.percent,
  sales: analysis.sales,
  onlineSearch: analysis.onlineSearch,
  salesRatio: analysis.salesRatio,
  ratioChartData: analysis.ratioChartData,
}))
class Analysis extends Component<IAnalysisProps, IAnalysisInitState> {
  constructor(props: IAnalysisProps) {
    super(props);
    this.state = {
      key: 'tab1',
      chartSaleAndVisitTitle: '销售趋势',
      listSaleAndVisitTitle: '门店销售额排名',
      rangeDate: [moment(), moment()],
      selectedDate: 'day',
      currentPage: 1,
      pageSize: 5,
    };
  }

  componentDidMount(): void {
    this.getVisits();
    this.getPayNumbers();
    this.getPercent();
    this.getSales();
    this.getOnlineSearch();
    this.getSalesRatioChartDate();
  }

  getVisits = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'analysis/getVisits',
    });
  };

  getPayNumbers = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'analysis/getPayNumbers',
    });
  };

  getPercent = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'analysis/getPercent',
    });
  };

  getSales = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'analysis/getSales',
    });
  };

  getOnlineSearch = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'analysis/getOnlineSearch',
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    });
  };

  getSalesRatioChartDate = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'analysis/getSalesRatioChartDate',
    });
  };

  onTabChange = (key: string) => {
    if (key !== 'tab1') {
      this.setState({
        key,
        chartSaleAndVisitTitle: '访问量趋势',
        listSaleAndVisitTitle: '门店访问量排名',
      });
    } else {
      this.setState({
        key,
        chartSaleAndVisitTitle: '销售趋势',
        listSaleAndVisitTitle: '门店销售额排名',
      });
    }
  };

  selectDate = (selectedDate: string) => {
    let currentDateVar: RangePickerValue;
    if (selectedDate === 'day') {
      currentDateVar = [moment(), moment()];
    } else if (selectedDate === 'week') {
      currentDateVar = [moment().weekday(0), moment().weekday(6)];
    } else if (selectedDate === 'month') {
      const monthStart = `${moment().year()}+${moment().month() + 1}+'01'`;
      const monthEnd = `${moment().year()}+${moment().month() + 1}+${moment().daysInMonth()}`;
      currentDateVar = [moment(monthStart, 'YYYY-MM-DD'), moment(monthEnd, 'YYYY-MM-DD')];
    } else if (selectedDate === 'year') {
      const yearStart = `${moment().year()}+'01'+'01'`;
      const yearEnd = `${moment().year()}+'12'+'31'`;
      currentDateVar = [moment(yearStart, 'YYYY-MM-DD'), moment(yearEnd, 'YYYY-MM-DD')];
    } else {
      currentDateVar = [moment(), moment()];
    }
    // @ts-ignore
    this.setState({ selectedDate, rangeDate: currentDateVar });
    this.setState({ selectedDate });
  };

  arraySum = (dataArray: number[], sum: number) => {
    // eslint-disable-next-line no-return-assign
    dataArray.forEach(item => (sum += item));
    return sum;
  };

  render() {
    const { DataView } = DataSet;
    const { Text } = Guide;
    const {
      loading,
      visits,
      payNumbers,
      percent,
      sales,
      onlineSearch,
      salesRatio,
      ratioChartData,
    } = this.props;
    // eslint-disable-next-line max-len
    const {
      key,
      chartSaleAndVisitTitle,
      listSaleAndVisitTitle,
      rangeDate,
      selectedDate,
    } = this.state;
    console.log('loading', loading);
    console.log('onlineSearch', onlineSearch);
    console.log('salesRatio', salesRatio);
    console.log('ratioChartData', ratioChartData);
    const dateScale = {
      date: {
        type: 'cat',
      },
    };
    const salesScale = {
      month: {
        type: 'cat',
      },
    };
    const tabList = [
      {
        key: 'tab1',
        tab: '销售额',
      },
      {
        key: 'tab2',
        tab: '访问量',
      },
    ];
    const chartSaleAndVisit = (
      <Row>
        <Col span={18}>
          <div style={{ marginBottom: 20 }}>{chartSaleAndVisitTitle}</div>
          <Chart height={300} data={sales} scale={salesScale} forceFit padding="auto">
            <Axis name="month" />
            <Axis name="value" />
            <Tooltip
              showTitle={false}
              crosshairs={{
                type: 'rect',
              }}
            />
            <Geom
              type="interval"
              position="month*value"
              tooltip={[
                'month*value',
                (month, value) => ({
                  name: month,
                  value,
                }),
              ]}
            />
          </Chart>
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: 20 }}>{listSaleAndVisitTitle}</div>
          <List
            dataSource={sales}
            renderItem={(item, index) => (
              <div>
                {index < 7 ? (
                  <List.Item key={item.id} extra={item.rank}>
                    {index < 3 ? (
                      <span
                        className={styles.sales}
                        style={{
                          color: '#fff',
                          backgroundColor: '#314659',
                        }}
                      >
                        {index + 1}
                      </span>
                    ) : (
                      <span className={styles.sales}>{index + 1}</span>
                    )}
                    <List.Item.Meta description={item.shop} />
                  </List.Item>
                ) : (
                  <span></span>
                )}
              </div>
            )}
          />
        </Col>
      </Row>
    );
    const contentList = {
      tab1: <Row>{chartSaleAndVisit}</Row>,
      tab2: <Row>{chartSaleAndVisit}</Row>,
    };
    const salesExtra = (
      <div>
        <a
          onClick={() => this.selectDate('day')}
          className={selectedDate === 'day' ? styles.currentDate : ''}
        >
          {'今日'}
        </a>
        <a
          onClick={() => this.selectDate('week')}
          className={selectedDate === 'week' ? styles.currentDate : ''}
        >
          {'本周'}
        </a>
        <a
          onClick={() => this.selectDate('month')}
          className={selectedDate === 'month' ? styles.currentDate : ''}
        >
          {'本月'}
        </a>
        <a
          onClick={() => this.selectDate('year')}
          className={selectedDate === 'year' ? styles.currentDate : ''}
        >
          {'全年'}
        </a>
        <RangePicker
          style={{ width: 256 }}
          defaultValue={rangeDate}
          format="YYYY-MM-DD"
          value={rangeDate}
        />
      </div>
    );
    const onlineSearchExtraItem = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
        <Menu.Item>操作三</Menu.Item>
      </Menu>
    );
    const onlineSearchExtra = (
      <Dropdown overlay={onlineSearchExtraItem}>
        <Icon type="ellipsis" />
      </Dropdown>
    );
    const columns = [
      {
        title: '排名',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '搜索关键字',
        dataIndex: 'keyword',
        key: 'keyword',
        render: (text: string, record: IAnalysisOnlineSearchTableType) => (
          <a>{`${text}-${record.id}`}</a>
        ),
      },
      {
        title: '用户数',
        dataIndex: 'users',
        key: 'users',
      },
      {
        title: '周涨幅',
        dataIndex: 'weekGain',
        key: 'weekGain',
        render: (text: number) =>
          text >= 0 ? (
            <span>
              {`${text}%`} <Icon type="caret-up" style={{ color: 'red' }} />
            </span>
          ) : (
            <span>
              {`${Math.abs(text)}%`}
              <Icon type="caret-down" style={{ color: 'green' }} />
            </span>
          ),
      },
    ];
    const dv = new DataView();
    dv.source(ratioChartData).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'value',
    });
    // @ts-ignore
    const totalSales = this.arraySum(
      ratioChartData.map(item => item.value),
      0,
    );
    return (
      <div>
        <Row gutter={16} style={{ paddingTop: 20 }}>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={22}>
                  <span style={{ color: 'rgba(0,0,0,.45)' }}>总销售额</span>
                </Col>
                <Col span={2}>
                  <AntdTooltip title="指标说明">
                    <Icon type="info-circle" />
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>¥ 126,560</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-up" style={{ color: 'red' }} />
                </Col>
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-down" style={{ color: 'green' }} />
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <span>日销售额￥12,423</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={22}>
                  <span style={{ color: 'rgba(0,0,0,.45)' }}>访问量</span>
                </Col>
                <Col span={2}>
                  <AntdTooltip title="指标说明">
                    <Icon type="info-circle" />
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>¥ 8,846</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={24}>
                  <Chart height={40} data={visits} forceFit padding="auto">
                    <Tooltip
                      showTitle={false}
                      crosshairs={{
                        type: 'rect',
                      }}
                    />
                    <Geom
                      type="area"
                      position="year*value"
                      tooltip={[
                        'year*value',
                        (year, value) => ({
                          name: year,
                          value,
                        }),
                      ]}
                    />
                    <Geom
                      type="line"
                      position="year*value"
                      tooltip={[
                        'year*value',
                        (year, value) => ({
                          name: year,
                          value,
                        }),
                      ]}
                    />
                  </Chart>
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <span>日访问量 1,234</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={22}>
                  <span style={{ color: 'rgba(0,0,0,.45)' }}>访问量</span>
                </Col>
                <Col span={2}>
                  <AntdTooltip title="指标说明">
                    <Icon type="info-circle" />
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>¥ 6,560</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={24}>
                  <Chart height={40} data={payNumbers} scale={dateScale} forceFit padding="auto">
                    <Tooltip
                      showTitle={false}
                      crosshairs={{
                        type: 'rect',
                      }}
                    />
                    <Geom
                      type="interval"
                      position="date*value"
                      tooltip={[
                        'date*value',
                        (date, value) => ({
                          name: date,
                          value,
                        }),
                      ]}
                    />
                  </Chart>
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <span>转化率 60%</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Row>
                <Col span={22}>
                  <span style={{ color: 'rgba(0,0,0,.45)' }}>运营活动效果</span>
                </Col>
                <Col span={2}>
                  <AntdTooltip title="指标说明">
                    <Icon type="info-circle" />
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>{percent.percent}%</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={24}>
                  <Progress type="line" strokeLinecap="square" percent={percent.percent} />
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <Row>
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-up" style={{ color: 'red' }} />
                </Col>
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-down" style={{ color: 'green' }} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: 20 }}>
          <Col span={24}>
            <Card
              tabBarExtraContent={salesExtra}
              tabList={tabList}
              activeTabKey={key}
              onTabChange={tabKey => this.onTabChange(tabKey)}
            >
              {contentList[key]}
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingTop: 20 }}>
          <Col span={12}>
            <Card title={onlineSearch.title} extra={onlineSearchExtra}>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={16}>
                      <span style={{ color: 'rgba(0,0,0,.45)' }}>{onlineSearch.searchUser}</span>
                    </Col>
                    <Col span={6}>
                      <AntdTooltip title="指标说明">
                        <Icon type="info-circle" />
                      </AntdTooltip>
                    </Col>
                  </Row>
                  <Row
                    style={{ height: 32, marginTop: 8 }}
                    // type="flex"
                    // align="top"
                  >
                    <Col span={12}>
                      <div style={{ height: 34 }}>
                        <span style={{ fontSize: 24 }}>{onlineSearch.searchUsers}</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ height: 34, lineHeight: 2.5 }}>
                        <span style={{ fontSize: 16 }}>{onlineSearch.userRatio}</span>
                        <Icon type="caret-up" style={{ color: 'red' }} />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={20}>
                      <Chart height={40} data={onlineSearch.users} forceFit padding="auto">
                        <Tooltip
                          showTitle={false}
                          crosshairs={{
                            type: 'rect',
                          }}
                        />
                        <Geom
                          type="area"
                          position="date*value"
                          tooltip={[
                            'date*value',
                            (date, value) => ({
                              name: date,
                              value,
                            }),
                          ]}
                        />
                        <Geom
                          type="line"
                          position="date*value"
                          tooltip={[
                            'date*value',
                            (date, value) => ({
                              name: date,
                              value,
                            }),
                          ]}
                        />
                      </Chart>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={16}>
                      <span style={{ color: 'rgba(0,0,0,.45)' }}>{onlineSearch.perSearch}</span>
                    </Col>
                    <Col span={6}>
                      <AntdTooltip title="指标说明">
                        <Icon type="info-circle" />
                      </AntdTooltip>
                    </Col>
                  </Row>
                  <Row style={{ height: 32, marginTop: 8 }} type="flex" align="top">
                    <Col span={12}>
                      <span style={{ fontSize: 24 }}>{onlineSearch.searchNum}</span>
                    </Col>
                    <Col span={12}>
                      <div style={{ height: 34, lineHeight: 2.5 }}>
                        <span style={{ fontSize: 16 }}>
                          {onlineSearch.searchRatio && Math.abs(onlineSearch.searchRatio)}
                        </span>
                        <Icon type="caret-down" style={{ color: 'green' }} />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={20}>
                      <Chart height={40} data={onlineSearch.search} forceFit padding="auto">
                        <Tooltip
                          showTitle={false}
                          crosshairs={{
                            type: 'rect',
                          }}
                        />
                        <Geom
                          type="area"
                          position="date*value"
                          tooltip={[
                            'date*value',
                            (date, value) => ({
                              name: date,
                              value,
                            }),
                          ]}
                        />
                        <Geom
                          type="line"
                          position="date*value"
                          tooltip={[
                            'date*value',
                            (date, value) => ({
                              name: date,
                              value,
                            }),
                          ]}
                        />
                      </Chart>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div style={{ marginTop: 20 }}>
                <Table
                  rowKey={(record: IAnalysisOnlineSearchTableType) => `${record.id}`}
                  columns={columns}
                  dataSource={onlineSearch.tables}
                  size="small"
                  pagination={{ position: 'bottom', defaultPageSize: 5 }}
                />
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={salesRatio.title} extra={onlineSearchExtra}>
              <Row type="flex" align="top">
                <Col span={4}>{salesRatio.chartTitle}</Col>
              </Row>
              <Row style={{ marginTop: 40 }} type="flex" align="bottom">
                <Col span={24}>
                  <Chart height={260} width={248} data={dv} padding="auto">
                    <Tooltip showTitle={false} />
                    <Coord type="theta" radius={0.85} innerRadius={0.7} />
                    <Axis name="value" />
                    <Geom
                      type="intervalStack"
                      position="value"
                      color="type"
                      tooltip={[
                        'type*value',
                        (type, value) => ({
                          name: type,
                          value: `${(value * 100).toFixed(2)}%`,
                        }),
                      ]}
                      style={{
                        lineWidth: 5,
                        stroke: '#fff',
                      }}
                    />
                    <Guide>
                      <Text
                        position={['50%', '45%']}
                        content="销售额"
                        style={{
                          lineHeight: 22,
                          fontSize: 14,
                          fontWeight: 400,
                          fill: 'rgba(0,0,0,.45)',
                          textAlign: 'center',
                        }}
                      ></Text>
                      <Text
                        position={['50%', '55%']}
                        content={`¥ ${totalSales}`}
                        style={{
                          lineHeight: 1.5,
                          fontSize: 25,
                          fill: 'rgba(0,0,0,.65)',
                          textAlign: 'center',
                        }}
                      ></Text>
                    </Guide>
                    <Legend
                      position="right-center"
                      useHtml
                      g2-legend={{ width: '100%' }}
                      itemTpl={(value, color, checked, index) => {
                        // @ts-ignore
                        const obj: IAnalysisRatioChartDataType = dv.rows[index];
                        // @ts-ignore
                        const nativeData: IAnalysisRatioChartDataType = ratioChartData[index];
                        const checkedStr = checked ? 'checked' : 'unChecked';
                        return (
                          `<li class="g2-legend-list-item item-${index} ${checkedStr}" 
                            data-value="${value}" data-color=${color} style="cursor: pointer;font-size: 14px;marginBottom: 16px; lineHeight: 22px; height: 22px; margin: 0 20px">` +
                          `<span width=150 style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;
                            background-color:${color};"></i>` +
                          `<span class="g2-legend-text" style="margin-right: 10px">${value}</span></span>` +
                          `<span style="text-align: right;border: none;padding-left:10px;">${!!obj &&
                            obj.value &&
                            (obj.value * 100).toFixed(2)}%</span>` +
                          `<span style="text-align: right;border: none;padding-right:0;float: right;">￥${!!nativeData &&
                            nativeData.value}</span>` +
                          '</li>'
                        );
                      }}
                    />
                  </Chart>
                </Col>
              </Row>
              <div style={{ height: 87.5 }}></div>
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: 20 }}>
          <Col span={24}></Col>
        </Row>
      </div>
    );
  }
}

export default Analysis;
