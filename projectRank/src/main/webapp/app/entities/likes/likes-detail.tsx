import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './likes.reducer';

export const LikesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const likesEntity = useAppSelector(state => state.likes.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="likesDetailsHeading">Likes</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{likesEntity.id}</dd>
          <dt>Postliked</dt>
          <dd>{likesEntity.postliked ? likesEntity.postliked.id : ''}</dd>
          <dt>Likedby</dt>
          <dd>{likesEntity.likedby ? likesEntity.likedby.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/likes" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/likes/${likesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LikesDetail;
