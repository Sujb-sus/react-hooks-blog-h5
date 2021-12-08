import React from 'react';
import avatar from '@/assets/avatar.png';
import avatarBg from '@/assets/bg4.jpg';
import './myself.scss';

const Myself = () => {
  return (
    <div className="common-pb">
      <div className="my-bg">
        <img className="img-avatar" src={avatar} />
        <img className="img-bg" src={avatarBg} />
      </div>
      <div className="my-body">
        <div className="my-name">wall | 苏s哈</div>
        <div className="my-job">Web前端工程师</div>
        <div className="my-desc">
          一个热爱篮球与前端技术的95后！20年入行，
          热衷于研究web前端技术，一边工作一边积累经验，分享一些自己整理的笔记和优选文章。
        </div>
      </div>
      <div className="my-footer">
        + 本博客是采用 React17.0 + Redux4.1 + antd-mobile5.0 + Webpack4.0
        前后端完全分离模式来搭建，具体的技术栈可在 GitHub 上了解。
        <br />
        + 本博客已开源，源码已上传到
        GitHub。如果觉得该博客对你学习有帮助的，请能给博主点个 Star。
        如果有不清楚的地方，欢迎邮箱来信交流。感谢各位国家栋梁的支持！！！🙏🙏🙏
        <br />+ React Hooks H5版本：
        <a
          href="https://github.com/Sujb-sus/react-hooks-blog-h5"
          target="_blank"
          rel="noopener noreferrer">
          https://github.com/Sujb-sus/react-hooks-blog-h5
        </a>
        <br />+ Vue3 Vite H5版本：
        <a
          href="https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5"
          target="_blank"
          rel="noopener noreferrer">
          https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5
        </a>
        <br />+ Vue2 Node PC版本：
        <a
          href="https://github.com/Sujb-sus/vue-node-mongodb-blog"
          target="_blank"
          rel="noopener noreferrer">
          https://github.com/Sujb-sus/vue-node-mongodb-blog
        </a>
      </div>
    </div>
  );
};
export default Myself;
