// ... (imports and other code)
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "app/config/store";
import {useAppSelector} from "app/config/store";
import React from "react";
import { Button, Row, Col } from 'reactstrap';
import {createEntity} from "app/entities/post/post.reducer";
import {toast} from "react-toastify";
import {ValidatedBlobField, ValidatedField, ValidatedForm} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export const PostUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.authentication.account);

  // ... (other existing code)

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.postLikes !== undefined && typeof values.postLikes !== 'number') {
      values.postLikes = Number(values.postLikes);
    }
    if (values.eloRating !== undefined && typeof values.eloRating !== 'number') {
      values.eloRating = Number(values.eloRating);
    }


    const postEntity = {


      id: null,
      eloRating: 1000, // Setting elorating to 1000
      createdby: currentUser,
      postDesc: values.postDesc,
      postTitle: values.postTitle,
      image1: values.image1,
      image1ContentType: values.image1ContentType,
      image2ContentType:values.image2ContentType,
      image2: values.image2,
      postLikes: 0,

      // Setting current user as createdby
    };

    dispatch(createEntity(postEntity));
  };

  const defaultValues = () => ({


  });

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="projectRankApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            Create a New Project
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">


            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {/* ... (other existing fields) */}

              {/* ... (other existing fields) */}
              <ValidatedField label="Post Title" id="post-postTitle" name="postTitle" data-cy="postTitle" type="text" />
              <ValidatedBlobField label="Image 1" id="post-image1" name="image1" data-cy="image1" isImage accept="image/*" />
              <ValidatedBlobField label="Image 2" id="post-image2" name="image2" data-cy="image2" isImage accept="image/*" />

              <ValidatedField label="Post Desc" id="post-postDesc" name="postDesc" data-cy="postDesc" type="textarea" />
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" >
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>

        </Col>
      </Row>
    </div>
  );
};

export default PostUpdate;
