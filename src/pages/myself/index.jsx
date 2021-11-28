import React from 'react';
import avatar from '@/assets/avatar.png';
import avatarBg from '@/assets/bg4.jpg';
import './myself.scss';

export default function Myself() {
  return (
    <div className="app-container">
      <div className="my-bg">
        <img className="img-avatar" src={avatar} />
        <img className="img-bg" src={avatarBg} />
      </div>
      <div className="my-body">
        <div className="my-name">wall | 苏s哈</div>
        <div className="my-job">Web前端工程师</div>
        <div className="my-desc">
          一个热爱篮球与前端技术的95后！20年入行，
          一直潜心研究web前端技术，一边工作一边积累经验，分享一些自己整理的笔记和优选文章。
        </div>
      </div>
      <div className="my-footer">
        + 本博客是采用 Vue3.2 + Node14.15 + Vite2.5 + TS4.3
        前后端完全分离模式来搭建，具体的技术栈可在 GitHub 上了解。后续可能会用
        React 来重构一版，敬请期待！！！🌟🌟🌟
        <br />
        + 本博客已开源，源码已上传到
        GitHub。如果觉得该博客对你学习有帮助的，请能给博主点个 Star。
        如果有不清楚的地方，欢迎邮箱来信交流。感谢各位国家栋梁的支持！！！🙏🙏🙏
        <br />+ Github地址：
        <a
          href="https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5"
          target="_blank"
          rel="noopener noreferrer">
          https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5
        </a>
      </div>
    </div>
  );
}
