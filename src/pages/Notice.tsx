import React, { Component } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { AnyAction, Dispatch } from 'redux';
import { NoticeStateType } from '@/models/notice';
import { CurrentUser } from '@/models/user';

interface INotices {
  dispatch: Dispatch<AnyAction>;
  notices: NoticeStateType;
  loading: boolean;
  user: CurrentUser;
}

export interface NoticeState extends ConnectState {
  /**
   * notice类型和model的state类型保持一致
   */
  notice: NoticeStateType,
}

@connect(({ loading, notice }: NoticeState) => ({
  notices: notice,
  loading: loading.effects['notice/getNotices'],
}))
class Notice extends Component<INotices, {}> {
  componentDidMount(): void {
    this.getNotices();
  }

  getNotices = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'notice/getNotices',
    })
  };

  onClick = () => {
    console.log('被点击了');
  };

  render() {
    const { loading } = this.props;
    const { notices } = this.props.notices;
    return (
      <div>
        { !loading && notices && (<div>
            {notices.map(item => (<p key={item.id}>{item.title}</p>))}
          </div>
        )
        }
        <p>这是一段话</p>
      </div>
    );
  }
}

export default Notice;
