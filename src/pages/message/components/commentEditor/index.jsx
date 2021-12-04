import React, { useState } from 'react';
import base from '@/utils/base';
import { TextArea, Input } from 'antd-mobile';
import './commentEditor.scss';

export default function CommentEditor() {
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const handleContent = (value) => {
    setContent(value);
  };
  const handleNickname = (value) => {
    setNickname(value);
  };
  const handleSubmit = () => {
    if (!content) {
      base.toast('内容不能为空');
      return false;
    }
  };
  return (
    <div className="edit-container">
      <div className="content-input">
        <TextArea
          value={content}
          autoSize={{ minRows: 2, maxRows: 5 }}
          showCount
          maxLength={150}
          placeholder="请在此输入内容..."
          onChange={(val) => handleContent(val)}
        />
      </div>
      <div className="edit-footer">
        <Input
          value={nickname}
          placeholder="你的昵称"
          type="text"
          maxlength="10"
          className="edit-name"
          onChange={(val) => handleNickname(val)}
        />
        <button onClick={() => handleSubmit()}>提交</button>
      </div>
    </div>
  );
}
