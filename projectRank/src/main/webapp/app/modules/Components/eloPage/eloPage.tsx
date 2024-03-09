import React, {useEffect} from 'react';
import  './eloPage.css'
import {useAppDispatch, useAppSelector} from "app/config/store";
import {isRouteErrorResponse, useLocation, useNavigate} from "react-router-dom";
import {getEntities as getPostEntities, updateEntity} from "app/entities/post/post.reducer";
import post from "app/entities/post";
import setEloRating from "app/entities/post/post-update"
import {useState} from "react";




export const eloPage = () =>{
  const account = useAppSelector(state => state.authentication.account);
  const dispatch = useAppDispatch();
  const [randomPosts, setRandomPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

  const postlist = useAppSelector(state => state.post.entities);
  const handleCheckboxChange = (post3) => {
    setSelectedPost(post3);
  };
  useEffect(() => {

    dispatch(getPostEntities({}));

   // setRandomPosts(get2Posts(postlist)); //

  }, [dispatch]);

  useEffect(() => {
    // if (postlist.length > 0 && randomPosts.length === 0) {
      const currentComparison = get2Posts(postlist);
      setRandomPosts(currentComparison);
   // }
  }, [postlist]);
  const currentComparison = get2Posts(postlist);
  //   console.log(currentComparison);
  //  console.log("this shoul appear after the posts debugging");
  //  console.log(postlist);
 /// console.log(randomPosts);



  function clickedLeft(winner,loser){
   /// console.log("these are the differences in rating, w then l " +ReturnNewElo(winner.eloRating,loser.eloRating));
    const NewElo = ReturnNewElo(winner.eloRating,loser.eloRating);
    updatePost(winner,NewElo[0]);
    updatePost(loser,NewElo[1]);
  }

  const updatePost = (postToUpdate,eloChange) => {
    const updatedPost = {
      ...postToUpdate,
      eloRating: eloChange,


    };
    dispatch(updateEntity(updatedPost));
  }

  const submitVote = () => {
    if (selectedPost) {
      const otherPost = randomPosts.find(post1 => post1 !== selectedPost);
     // console.log(`Submitting vote for ${selectedPost.postTitle}`);

      // Update the Elo values with the selected post as the winner and the other post as the loser
      const NewElo = ReturnNewElo(selectedPost.eloRating, otherPost.eloRating);
      updatePost(selectedPost, NewElo[0]);
      updatePost(otherPost, NewElo[1]);

      // Reset selected post after submitting vote
      setSelectedPost(null);
    } else {
  //    console.log('Please select a post before submitting.');
    }
  };

function clickedRight(winner,loser){
//   console.log("these are the differences in rating, w then l " +ReturnNewElo(winner.eloRating,loser.eloRating));
  const NewElo = ReturnNewElo(winner.eloRating,loser.eloRating);
  updatePost(winner,NewElo[0]);
  updatePost(loser,NewElo[1]);
}

function  get2Posts(thePostList){
  const random1= Math.floor(Math.random() * postlist.length);
  let random2 = Math.floor(Math.random() * postlist.length);
  if(postlist.length <2){
    return;
  }
  while (random1 === random2){
    random2 = Math.floor(Math.random() * postlist.length);
  }
  const randomPost1 = postlist[random1];
  const randomPost2 = postlist[random2];
  const randompostList = [];
  randompostList.push( randomPost1,randomPost2);

  return randompostList;
}




function  ComputeProbability( Winner, Loser){
  const P1 = (1.0 / (1.0 + Math.pow(10,1.0* ((Loser-Winner) / 400))));
  const P2 = (1.0 / (1.0 + Math.pow(10,1.0* ((Winner-Loser) / 400))));


  return [P1,P2];
}


function   ReturnNewElo( Winner, Loser){
  const expectedOutcomes = ComputeProbability(Winner,Loser);
  Winner= Math.ceil(Winner+30*(1-expectedOutcomes[0]));
  Loser = Math.ceil(  Loser+30*(0-expectedOutcomes[1]));




  return [Winner,Loser];

}


  return (

    <div className="app-container">
      {randomPosts?.length >= 2 && (
      <>

      <div className="left-section">



        <div className={"cardWrapper"} onClick={()=>handleCheckboxChange(randomPosts[0])}>
          {randomPosts[0]?.image1 && (
            <img className={"cardimg1"}
              src={`data:${randomPosts[0].imageContentType};base64,${randomPosts[0].image1}`}
              alt="Image"

            />
          )}
          <h1>{randomPosts?.length > 1 ? randomPosts[0]?.postTitle : 'error'} </h1>
          <p>{randomPosts?.length > 1 ? randomPosts[0]?.postDesc : 'error'}</p>
          <input className = {"checkboxForCard"}
                 type="checkbox"
                 checked={selectedPost === randomPosts[0]}
                 onChange={() => handleCheckboxChange(randomPosts[0])}
          />
        </div>



      </div>
      <div className="right-section">
        <div  className="cardWrapper" onClick={() => handleCheckboxChange(randomPosts[1])}>

          {randomPosts[1]?.image1 && (
            <img className={"cardimg1"}
              src={`data:${randomPosts[1].imageContentType};base64,${randomPosts[1].image1}`}
              alt="Image"

            />
          )}
          <h1 style={{textAlign:"left"}}>{randomPosts?.length > 1 ? randomPosts[1]?.postTitle : 'error'} </h1>
          <p>{randomPosts?.length > 1 ? randomPosts[1]?.postDesc : 'error'}</p>
          <input className = {"checkboxForCard"}
                 type="checkbox"
                 checked={selectedPost === randomPosts[1]}
                 onChange={() => handleCheckboxChange(randomPosts[1])}
          />
        </div>

      </div>
      </>
      )}
      <div className={"submit-container"}>
        <button className={"submit-Button"} onClick={() =>submitVote()}>
          Submit
        </button>
      </div>
    </div>


  );
}
export default eloPage;
