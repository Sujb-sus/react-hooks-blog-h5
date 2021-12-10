import { useState, useCallback } from "react";
import base from "@/utils/base";
/**
 * 封装点赞逻辑
 * @requestApi api请求的path
 * @description 点赞文章、留言
 */
const useClickLike = (requestApi) => {
  let [likeList, setLikeList] = useState([]); // 已点过赞的文章列表

  // 获取点赞数
  const getLikesNumber = useCallback(
    (id, likes) => (likeList.includes(id) ? likes + 1 : likes),
    [likeList]
  );

  // 点赞高亮
  const getLikeColor = useCallback((id) => likeList.includes(id), [likeList]);

  // 点赞事件
  const handleLikes = (e, id) => {
    e.stopPropagation();
    likeList.includes(id)
      ? likeList.splice(likeList.indexOf(id), 1)
      : likeList.push(id);

    requestApi({ _id: id, isLike: !likeList.includes(id) })
      .then(() => {
        setLikeList([...likeList]);
      })
      .catch(() => {
        base.toast("点赞失败");
      });
  };

  return {
    getLikesNumber,
    getLikeColor,
    handleLikes,
    setLikeList,
  };
};
export default useClickLike;
