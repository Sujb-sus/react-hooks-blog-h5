import React, { useState, useEffect } from 'react';
import { apiGetBlogDetail, apiUpdatePV } from '@/api/blog';
import SvgIcon from '@/components/svgIcon';
import { formatTime, formatNumber } from '@/utils/filter';
import base from '@/utils/base';
import './article.scss';
import '@/styles/markdown/index.scss';
import { useParams } from 'react-router-dom';
import useGetLabelColor from '@/useHooks/useGetLabelColor';
import useGetLabelList from '@/useHooks/useGetLabelList';

const Article = () => {
  let { getLabelColor } = useGetLabelColor();
  let params = useParams();
  let id = params.id;
  let [detail, setDetail] = useState(null);
  useGetLabelList();

  useEffect(async () => {
    base.showLoading();
    await updatePV();
    await getBlogDetail();
    base.hideLoading();
  }, []);

  // 获取文章详情
  const getBlogDetail = () => {
    return apiGetBlogDetail({ _id: id })
      .then((res) => {
        res?.data && setDetail(res.data);
      })
      .catch((err) => console.log('err', err))
      .finally(() => {});
  };
  // 更新浏览量
  const updatePV = () => {
    return apiUpdatePV({ _id: id })
      .then(() => {})
      .catch((err) => console.log(err));
  };
  return (
    detail && (
      <div className="detail-content">
        <div className="detail-body">
          <div className="detail-title">{detail.title}</div>
          <div className="detail-func">
            <div className="func-icon">
              <SvgIcon name="icon-date02"></SvgIcon>
              <div className="box-text">
                {formatTime(detail.releaseTime, 'yyyy-MM-dd')}
              </div>
            </div>
            <div className="func-icon">
              <SvgIcon name="icon-browse02"></SvgIcon>
              <div className="box-text">{formatNumber(detail.pv)}</div>
            </div>
            {detail.auth && (
              <div className="func-icon">
                <SvgIcon name="icon-laborer"></SvgIcon>
                <div className="box-text">{detail.auth}</div>
              </div>
            )}
          </div>
          <div
            className="detail-main fmt"
            dangerouslySetInnerHTML={{
              __html: detail.html.replace(/<a /gi, `<a target='_blank'`),
            }}></div>
          <div className="detail-label">
            标签：
            {detail.type.map((label) => (
              <div
                className="box-text label-text"
                style={{ backgroundColor: getLabelColor(label) }}
                key={label}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
export default Article;
