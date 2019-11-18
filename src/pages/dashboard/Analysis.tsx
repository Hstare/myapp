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
} from 'antd';
import { connect } from 'dva';
import { Chart, Tooltip, Geom, Axis } from 'bizcharts';
import moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import {
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
  // rangeDate?: [moment.Moment, moment.Moment],
  rangeDate?: RangePickerValue;
  selectedDate?: string;
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
      const monthEnd = `${moment().year()}+${moment().month() +
      1}+${moment().daysInMonth()}`;
      currentDateVar = [
        moment(monthStart, 'YYYY-MM-DD'),
        moment(monthEnd, 'YYYY-MM-DD'),
      ];
    } else if (selectedDate === 'year') {
      const yearStart = `${moment().year()}+'01'+'01'`;
      const yearEnd = `${moment().year()}+'12'+'31'`;
      currentDateVar = [
        moment(yearStart, 'YYYY-MM-DD'),
        moment(yearEnd, 'YYYY-MM-DD'),
      ];
    } else {
      currentDateVar = [moment(), moment()];
    }
    // @ts-ignore
    this.setState({ selectedDate, rangeDate: currentDateVar });
    this.setState({ selectedDate });
  };

  render() {
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
    const payNumbersScale = {
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
          <Chart
            height={300}
            data={sales}
            scale={salesScale}
            forceFit
            padding="auto"
          >
            <Axis name="month"/>
            <Axis name="value"/>
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
                    <List.Item.Meta description={item.shop}/>
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
        <Icon type="ellipsis"/>
      </Dropdown>
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
                    <Icon type="info-circle"/>
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>¥ 126,560</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-up" style={{ color: 'red' }}/>
                </Col>
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-down" style={{ color: 'green' }}/>
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }}/>
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
                    <Icon type="info-circle"/>
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
              <Divider style={{ margin: '12px 0' }}/>
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
                    <Icon type="info-circle"/>
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>¥ 6,560</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={24}>
                  <Chart
                    height={40}
                    data={payNumbers}
                    scale={payNumbersScale}
                    forceFit
                    padding="auto"
                  >
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
              <Divider style={{ margin: '12px 0' }}/>
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
                    <Icon type="info-circle"/>
                  </AntdTooltip>
                </Col>
              </Row>
              <span style={{ fontSize: 30 }}>{percent.percent}%</span>
              <Row style={{ height: 46 }} type="flex" align="bottom">
                <Col span={24}>
                  <Progress
                    type="line"
                    strokeLinecap="square"
                    percent={percent.percent}
                  />
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }}/>
              <Row>
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-up" style={{ color: 'red' }}/>
                </Col>
                <Col span={12}>
                  周同比&nbsp;12%
                  <Icon type="caret-down" style={{ color: 'green' }}/>
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
            <Card title="线上热门搜索" extra={onlineSearchExtra}>
              <Row>
                <Col
                  span={12}
                  style={{
                    paddingLeft: 34,
                    paddingRight: 34,
                    marginBottom: 24,
                  }}
                >
                  <Row>
                    <Col span={16}>
                      <span style={{ color: 'rgba(0,0,0,.45)' }}>
                        搜索用户数
                      </span>
                    </Col>
                    <Col span={6}>
                      <AntdTooltip title="指标说明">
                        <Icon type="info-circle"/>
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
                        <span style={{ fontSize: 24 }}>12,321</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ height: 34, lineHeight: 2.5 }}>
                        <span style={{ fontSize: 16 }}>17.1</span>
                        <Icon type="caret-up" style={{ color: 'red' }}/>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={12}
                  style={{
                    paddingLeft: 34,
                    paddingRight: 34,
                    marginBottom: 24,
                  }}
                >
                  <Row>
                    <Col span={16}>
                      <span style={{ color: 'rgba(0,0,0,.45)' }}>
                        人均搜索次数
                      </span>
                    </Col>
                    <Col span={6}>
                      <AntdTooltip title="指标说明">
                        <Icon type="info-circle"/>
                      </AntdTooltip>
                    </Col>
                  </Row>
                  <Row
                    style={{ height: 32, marginTop: 8 }}
                    type="flex"
                    align="top"
                  >
                    <Col span={12}>
                      <span style={{ fontSize: 24 }}>2.7</span>
                    </Col>
                    <Col span={12}>
                      <div style={{ height: 34, lineHeight: 2.5 }}>
                        <span style={{ fontSize: 16 }}>26.2</span>
                        <Icon type="caret-down" style={{ color: 'green' }}/>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Analysis;
