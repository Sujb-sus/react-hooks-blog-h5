import { useState, useMemo, useCallback, useRef } from "react";
import base from "@/utils/base";
/**
 * 封装点赞逻辑
 * @requestApi api请求的path
 * @description 点赞文章、留言
 */
const useClickLike = (requestApi) => {
  let [isLikeSuccess, setLikeSuccess] = useState(false); // 点赞操作是否成功
  let likeCount = useRef(0); // 点赞次数

  // 获取点赞数
  const getLikesNumber = useCallback(
    (likes) => (isLikeSuccess ? likes + 1 : likes),
    [isLikeSuccess]
  );
  // 点赞高亮
  const getLikesColor = useMemo(() => isLikeSuccess, [isLikeSuccess]);

  // 点赞事件
  const handleLikes = (e, id) => {
    e.stopPropagation();
    likeCount.current++;
    // 奇数点赞+1，偶数取消点赞
    requestApi({ _id: id, isLike: !!!(likeCount.current % 2) })
      .then(() => {
        setLikeSuccess(!!(likeCount.current % 2));
      })
      .catch(() => {
        setLikeSuccess(false);
        base.toast("点赞失败");
      });
  };

  return {
    getLikesNumber,
    getLikesColor,
    handleLikes,
  };
};
export default useClickLike;
