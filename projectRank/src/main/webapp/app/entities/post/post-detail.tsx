import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './post.reducer';

export const PostDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const postEntity = useAppSelector(state => state.post.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="postDetailsHeading">Post</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{postEntity.id}</dd>
          <dt>
            <span id="postTitle">Post Title</span>
          </dt>
          <dd>{postEntity.postTitle}</dd>
          <dt>
            <span id="postLikes">Post Likes</span>
          </dt>
          <dd>{postEntity.postLikes}</dd>
          <dt>
            <span id="eloRating">Elo Rating</span>
          </dt>
          <dd>{postEntity.eloRating}</dd>
          <dt>
            <span id="image1">Image 1</span>
          </dt>
          <dd>
            {postEntity.image1 ? (
              <div>
                {postEntity.image1ContentType ? (
                  <a onClick={openFile(postEntity.image1ContentType, postEntity.image1)}>
                    <img src={`data:${postEntity.image1ContentType};base64,${postEntity.image1}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {postEntity.image1ContentType}, {byteSize(postEntity.image1)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="image2">Image 2</span>
          </dt>
          <dd>
            {postEntity.image2 ? (
              <div>
                {postEntity.image2ContentType ? (
                  <a onClick={openFile(postEntity.image2ContentType, postEntity.image2)}>
                    <img src={`data:${postEntity.image2ContentType};base64,${postEntity.image2}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {postEntity.image2ContentType}, {byteSize(postEntity.image2)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="postDesc">Post Desc</span>
          </dt>
          <dd>{postEntity.postDesc}</dd>
          <dt>Createdby</dt>
          <dd>{postEntity.createdby ? postEntity.createdby.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PostDetail;
