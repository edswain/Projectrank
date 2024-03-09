import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './postpage.scss'

import { Row, Col, Alert } from 'reactstrap';
/// import  LikeButton from 'app/modules/Components/LikeButton/LikeButton'
import likesReducer from "app/entities/likes/likes.reducer";
import {useEffect} from "react";
import post from "app/entities/post";
import { getEntities as getPostEntities } from 'app/entities/post/post.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {
  createEntity as CreateLike,
  deleteEntity as DeleteLike,
  getEntities as getLikeEntities
} from 'app/entities/likes/likes.reducer';
import {ILikes} from "app/shared/model/likes.model";

export const postpage = () => {
  const account = useAppSelector(state => state.authentication.account);
  const dispatch = useAppDispatch();
  const updateSuccess = useAppSelector(state => state.likes.updateSuccess)
  const location = useLocation();
  const navigate = useNavigate();

  const postlist = useAppSelector(state => state.post.entities);
  useEffect(() => {
    dispatch(getPostEntities({}));
  }, []);
  const likeList = useAppSelector(state => state.likes.entities);
  useEffect(() => {
    dispatch(getLikeEntities({}));
  }, []);



  useEffect(() => {
    if (updateSuccess) {
      // Shows if the like has been successful
     /// console.log('Like creation successful!');
    }
  }, [updateSuccess]);

  function addOrRemoveLikes(likesOnPost,post1) {
    let usersLike = null;
    let hasLiked = false ;
    // console.log(likesOnPost);
    // creates like entity to send on post request
    const likeData :ILikes= {
      // id : "",
      likedby: account,
      postliked: post1,
    };

    if (likesOnPost.length === 0){
      hasLiked = false;

    }
    else {
      for (let i = 0; i < (likesOnPost.length ); i++) {
// checking if they have already liked the post
  //      console.log(likesOnPost[i].likedby.id.toString());
    //    console.log(typeof (likesOnPost[i].likedby.id.toString()) );
      //  console.log("this is the account " + account.id.toString());
       // console.log(typeof (account.id.toString()));
       // console.log("answeer to the comparison "+ (likesOnPost[i].likedby.id.toString()) === (account.id.toString()));
        if ((likesOnPost[i].likedby.id.toString()) === (account.id.toString())) {
          hasLiked = true;
          usersLike = likesOnPost[i];
        //  console.log("found Like");
          break;
        }
        else  {
          hasLiked = false;
        }
      }
    }
    // console.log(hasLiked);
    if (!hasLiked) {

      // dispatches to api to create a new like entity
      dispatch(CreateLike(likeData));
    }
    else{
      // console.log("remove like");
      try{
        dispatch(DeleteLike(usersLike.id));
      }
      catch (err){
        // console.log("Could not remove like");
      }

    }
  }




  return (
    <div>
      <div className={"otherContent"}>
      <h1 className={"page-title"}>Post-Page</h1>
      <h2>Show support for projects by liking </h2>
      </div>
      {<div className="create-button">
        <Link to ="/createpost">
          <button className={"link-to-Post"}>
            Create a project
          </button>
        </Link>
      </div> }
    <div className="grid-container">

      {postlist.map((eachPost) => (
        <div key={eachPost.id} className="grid-item">

          {/** }  <img src={`data:${post.imageContentType};base64,${post.image}`} style={{ maxHeight: '400px' }} />
          &nbsp;**/}


            {/** <img className={'grid-item img'} id={post.image1} alt={"no image to display"}/>**/}
            <img className={"cardimg"} src={`data:${eachPost.imageContentType};base64,${eachPost.image1}`}  />
            &nbsp;

          <div className={"card_content"}>
            <h1 className={"cardtitle"}>{eachPost.postTitle }</h1>
            <div className={"description"}>
              <p className = {"description"} >{eachPost.postDesc}</p>
            </div>
          </div>


          <div className={'like-button'}>
            <button  onClick = {()=> addOrRemoveLikes((likeList.filter((Likes) => Likes.postliked.id === eachPost.id)),eachPost)}>
              <img className={'likeImage'} src={'/content/images/heart-svgrepo-com.svg'}/>
            </button>
            <div className={"like-Content"}>

              {likeList.filter((Likes) => Likes.postliked.id === eachPost.id).length}

            </div>
          </div>




        </div>
      ))}
    </div>
    </div>
  );
};

export default postpage;
