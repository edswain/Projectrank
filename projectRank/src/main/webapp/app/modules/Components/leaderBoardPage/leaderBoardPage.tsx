import React from 'react';
import { getEntities as getPostEntities } from 'app/entities/post/post.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './leaderBoardPage.css'
export const LeaderBoardPage = () =>{
  const account = useAppSelector(state => state.authentication.account);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const postlist = useAppSelector(state => state.post.entities);
  useEffect(() => {
    dispatch(getPostEntities({}));
  }, []);
  const sortedPostlist = [...postlist].sort((a, b) => b.eloRating - a.eloRating);




  return (

    <div >
      <div className={"leaderBoard"}>
        <h1 >LeaderBoard</h1>
      </div>

    <ol className={"board"}>
      {sortedPostlist.map((post,index)=>(
        <li className={"item"} key = {post.id} style ={{
          backgroundColor:
          index === 0
          ?  'gold'
            : index === 1
          ? 'silver'
            : index === 2
          ? '#cd7f32'
              : '',
        }}>

          <h3>{post.postTitle}</h3>

          <h3> &nbsp;  {post.eloRating}     </h3>
        </li>




      ))}

    </ol>
    </div>
  )
}
export default LeaderBoardPage;
