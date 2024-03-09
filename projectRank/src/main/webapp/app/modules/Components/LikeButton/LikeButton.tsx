
import React, {useEffect, useState} from "react";
import './LikeButton.scss';
import likesReducer from "app/entities/likes/likes.reducer";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {getEntities} from "app/entities/post/post.reducer";
import {useLocation, useNavigate} from "react-router-dom";
import {getUser} from "app/modules/administration/user-management/user-management.reducer";
import {getAccount} from "app/shared/reducers/authentication";
import likesUpdate from "app/entities/likes/likes-update";
import { createEntity as CreateLike} from "app/entities/likes/likes.reducer";
import {deleteEntity as DeleteLike} from "app/entities/likes/likes.reducer";

function LikeButton({likesOnPostprop,post}) {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const updateSuccess = useAppSelector(state => state.likes.updateSuccess)
 // const location = useLocation();
 // const navigate = useNavigate();

  const likesOnPost  = likesOnPostprop  || [];

  useEffect(() => {
    if (updateSuccess) {
      // Shows if the like has been successful
 //     console.log('Like creation successful!');
    }
  }, [updateSuccess]);

  function addOrRemoveLikes() {
    let usersLike = null;
 //   console.log(likesOnPost);
    /// creates like entity to send on post request
    const likeData = {
      //   id : "",
      likedby: account,
      postliked: post,
    };
    let hasLiked = false;
    if (likesOnPost.length === 0){
      hasLiked = false;

    }
    else {
      for (let i = 0; i < (likesOnPost.length ); i++) {
//// checking if they have already liked the post
   //     console.log(likesOnPost[i].likedby.id.toString());
     //   console.log("this is the account " + account.id.toString());
        if (likesOnPost[i].likedby.toString === account.id.toString) {
          hasLiked = true;
          usersLike = likesOnPost[i]
          break;
        }
      }
    }
  //  console.log(hasLiked);
    if (!hasLiked) {

      /// dispatches to api to create a new like entity
      dispatch(CreateLike(likeData));
    }
    else{
  ///    console.log("remove like");
      try{
        dispatch(DeleteLike(usersLike.id));
      }
      catch (err){
     ///   console.log("Could not remove like");
      }

    }
  }

  return(
    <button onClick={addOrRemoveLikes}>
      <img className={'likeImage'} src={'/content/images/LikeButton.svg'}/>




    </button>
  )
}
export default LikeButton;
