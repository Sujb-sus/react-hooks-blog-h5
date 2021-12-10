import React, { useState, forwardRef, useImperativeHandle } from 'react';
import base from '@/utils/base';
import { TextArea, Input } from 'antd-mobile';
import './commentEditor.scss';

const CommentEditor = forwardRef((props, ref) => {
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const { submitSuccess } = props;
  const colorList = [
    '#EB6841',
    '#3FB8AF',
    '#464646',
    '#FC9D9A',
    '#ED8901',
    '#C8C8A9',
    '#83AF9B',
    '#036564',
  ];

  // 添加留言内容
  const handleSubmit = () => {
    if (!content) {
      base.toast('内容不能为空');
      return false;
    }
    const params = {
      content,
      nickname,
      createTime: new Date().getTime() + '',
      headerColor: colorList[Math.floor(Math.random() * 7)],
    };
    submitSuccess(params);
  };
  // 重置表单数据
  const resetData = () => {
    setContent('');
    setNickname('');
  };
  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    resetData,
  }));

  return (
    <div className="edit-container">
      <div className="content-input">
        <TextArea
          value={content}
          autoSize={{ minRows: 2, maxRows: 5 }}
          showCount
          maxLength={150}
          placeholder="请在此输入内容..."
          onChange={(val) => setContent(val)}
        />
      </div>
      <div className="edit-footer">
        <Input
          value={nickname}
          placeholder="你的昵称"
          type="text"
          maxlength="10"
          className="edit-name"
          onChange={(val) => setNickname(val)}
        />
        <button onClick={handleSubmit}>提交</button>
      </div>
    </div>
  );
});
export default CommentEditor;
