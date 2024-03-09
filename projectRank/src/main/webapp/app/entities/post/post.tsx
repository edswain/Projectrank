import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './post.reducer';

export const Post = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="post-heading" data-cy="PostHeading">
        Posts
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Post
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {postList && postList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('postTitle')}>
                  Post Title <FontAwesomeIcon icon={getSortIconByFieldName('postTitle')} />
                </th>
                <th className="hand" onClick={sort('postLikes')}>
                  Post Likes <FontAwesomeIcon icon={getSortIconByFieldName('postLikes')} />
                </th>
                <th className="hand" onClick={sort('eloRating')}>
                  Elo Rating <FontAwesomeIcon icon={getSortIconByFieldName('eloRating')} />
                </th>
                <th className="hand" onClick={sort('image1')}>
                  Image 1 <FontAwesomeIcon icon={getSortIconByFieldName('image1')} />
                </th>
                <th className="hand" onClick={sort('image2')}>
                  Image 2 <FontAwesomeIcon icon={getSortIconByFieldName('image2')} />
                </th>
                <th className="hand" onClick={sort('postDesc')}>
                  Post Desc <FontAwesomeIcon icon={getSortIconByFieldName('postDesc')} />
                </th>
                <th>
                  Createdby <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {postList.map((post, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/post/${post.id}`} color="link" size="sm">
                      {post.id}
                    </Button>
                  </td>
                  <td>{post.postTitle}</td>
                  <td>{post.postLikes}</td>
                  <td>{post.eloRating}</td>
                  <td>
                    {post.image1 ? (
                      <div>
                        {post.image1ContentType ? (
                          <a onClick={openFile(post.image1ContentType, post.image1)}>
                            <img src={`data:${post.image1ContentType};base64,${post.image1}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {post.image1ContentType}, {byteSize(post.image1)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {post.image2 ? (
                      <div>
                        {post.image2ContentType ? (
                          <a onClick={openFile(post.image2ContentType, post.image2)}>
                            <img src={`data:${post.image2ContentType};base64,${post.image2}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {post.image2ContentType}, {byteSize(post.image2)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{post.postDesc}</td>
                  <td>{post.createdby ? post.createdby.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/post/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/post/${post.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/post/${post.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Posts found</div>
        )}
      </div>
    </div>
  );
};

export default Post;
