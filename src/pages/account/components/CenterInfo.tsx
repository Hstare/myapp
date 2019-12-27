import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Icon, Avatar, Divider, Tag, Input } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { Dispatch } from 'redux';
import style from './index.less';

interface ICenterInfoProps {
  currentUser: CurrentUser,
  dispatch: Dispatch,
}

const CenterInfo: React.FC<ICenterInfoProps> = props => {
  const { currentUser, dispatch } = props;
  const [tags, setTags] = useState(currentUser.tags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      })
    }
  }, []);

  const handleInputConfirm = () => {
    // @ts-ignore
    setTags([...tags, {
      key: '6',
      label: inputValue,
    }]);
    setInputValue('');
    setInputVisible(false);
  };

  return (<GridContent style={{ padding: '0 12px' }}>
    <Card>
      <div>
        <div style={{ textAlign: 'center' }}><Avatar size={104} icon="user" src={currentUser.avatar}/></div>
        <div style={{
          textAlign: 'center',
          fontSize: 20,
          lineHeight: '28px',
          color: 'rgba(0,0,0,.85)',
          marginBottom: 4,
        }}>{currentUser.name}</div>
        <div style={{ textAlign: 'center' }}>{currentUser.signature}</div>
        <div>
          <p className={style.p}><Icon type="gold"/>{currentUser.title}</p>
        </div>
        <div>
          <p className={style.p}><Icon type="cluster"/>{currentUser.group}</p>
        </div>
        <div>
          <p className={style.p}><Icon type="environment"/>
            {currentUser.geographic && currentUser.geographic.province.label}
            {currentUser.geographic && currentUser.geographic.city.label}</p>
        </div>
      </div>
      <Divider dashed/>
      <div>
        <div style={{ marginBottom: 12, color: 'rgba(0,0,0,.85)' }}>标签</div>
        <div>
          {tags && tags.map(item => <Tag style={{ marginBottom: 8 }}>{item.label}</Tag>)}
          {inputVisible && <Input
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={(e: BaseSyntheticEvent) => setInputValue(e.target.value)}
            onPressEnter={handleInputConfirm}
          />}
          {!inputVisible && <Tag onClick={() => setInputVisible(true)} style={{ background: '#fff', borderStyle: 'dashed', marginBottom: 8 }}>
            <Icon type="plus"/>
          </Tag>}
        </div>
      </div>
      <Divider dashed/>
      <div>
        <div style={{ marginBottom: 12, color: 'rgba(0,0,0,.85)' }}>团队</div>
        <div>
          全组都是吴彦祖
        </div>
      </div>
    </Card>
  </GridContent>)
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(CenterInfo);
