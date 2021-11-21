import React from 'react';
import SvgIcon from '@/components/svgIcon';
import NoData from '@/components/noData';
import './list.scss';

export default function List() {
  return (
    <>
      <div className="list-container">
        <div className="list-title">
          <SvgIcon name="icon-label01"></SvgIcon>
          <span>最新文章</span>
        </div>
        <div className="list-item">
          <div className="item-content">
            <img src="" alt="" />
            <div className="content-box">
              <div className="content-top">
                <div className="content-title">{'wall'}</div>
                <div className="content-desc">{'descdescdescdescdescdesc'}</div>
              </div>
              <div className="content-label">
                <div className="label-text">{'label'}</div>
              </div>
            </div>
          </div>
          <div className="item-footer">
            <div className="footer-item">
              <SvgIcon name="icon-date02"></SvgIcon>
              <div className="footer-text">{'2020 - 11 - 01'}</div>
            </div>
            <div className="footer-item">
              <SvgIcon name="icon-browse02"></SvgIcon>
              <div className="footer-text">{100}</div>
            </div>
            <div className="footer-item">
              <SvgIcon name="icon-like02"></SvgIcon>
              <div className="footer-text">{99}</div>
            </div>
          </div>
        </div>

        <NoData></NoData>
      </div>
    </>
  );
}
