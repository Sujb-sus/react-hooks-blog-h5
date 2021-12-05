import { useState, useEffect, useCallback } from 'react';
import base from '@/utils/base';

const useClickLike = (requestApi) => {
  let [currentId, setCurrentId] = useState(''); // 当前id
  let [isLike, setIsLike] = useState(false); // 是否点赞
  let [isLikeSuccess, setIsLikeSuccess] = useState(true); // 是否点赞
  let [likeList, setLikeList] = useState([]); // 当前点赞列表

  // 获取点赞数
  const getLikesNumber = useCallback(
    (id, likes) => (isLikeSuccess && likeList.includes(id) ? likes + 1 : likes),
    [likeList, isLikeSuccess]
  );
  // 点赞高亮
  const getLikesColor = useCallback(
    (id) => isLikeSuccess && likeList.includes(id),
    [likeList, isLikeSuccess]
  );

  useEffect(() => {
    if (currentId) {
      requestApi({ _id: currentId, isLike }).catch(() => {
        base.toast('点赞失败');
        setIsLikeSuccess(false);
      });
    }
  }, [currentId, isLike]);
  // 点赞事件
  const handleLikes = (id) => {
    if (likeList.includes(id)) {
      setIsLike(true);
      likeList.splice(likeList.indexOf(id), 1);
      setLikeList(likeList);
    } else {
      setIsLike(false);
      likeList.push(id);
      setLikeList(likeList);
    }
    setCurrentId(id);
  };

  return {
    getLikesNumber,
    getLikesColor,
    handleLikes,
  };
};
export default useClickLike;
