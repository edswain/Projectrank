package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.repository.PostRepository;
import com.mycompany.myapp.service.PostService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Post}.
 */
@Service
@Transactional
public class PostServiceImpl implements PostService {

    private final Logger log = LoggerFactory.getLogger(PostServiceImpl.class);

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Post save(Post post) {
        log.debug("Request to save Post : {}", post);
        return postRepository.save(post);
    }

    @Override
    public Post update(Post post) {
        log.debug("Request to update Post : {}", post);
        return postRepository.save(post);
    }

    @Override
    public Optional<Post> partialUpdate(Post post) {
        log.debug("Request to partially update Post : {}", post);

        return postRepository
            .findById(post.getId())
            .map(existingPost -> {
                if (post.getPostTitle() != null) {
                    existingPost.setPostTitle(post.getPostTitle());
                }
                if (post.getPostLikes() != null) {
                    existingPost.setPostLikes(post.getPostLikes());
                }
                if (post.getEloRating() != null) {
                    existingPost.setEloRating(post.getEloRating());
                }
                if (post.getImage1() != null) {
                    existingPost.setImage1(post.getImage1());
                }
                if (post.getImage1ContentType() != null) {
                    existingPost.setImage1ContentType(post.getImage1ContentType());
                }
                if (post.getImage2() != null) {
                    existingPost.setImage2(post.getImage2());
                }
                if (post.getImage2ContentType() != null) {
                    existingPost.setImage2ContentType(post.getImage2ContentType());
                }
                if (post.getPostDesc() != null) {
                    existingPost.setPostDesc(post.getPostDesc());
                }

                return existingPost;
            })
            .map(postRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> findAll() {
        log.debug("Request to get all Posts");
        return postRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Post> findOne(Long id) {
        log.debug("Request to get Post : {}", id);
        return postRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Post : {}", id);
        postRepository.deleteById(id);
    }
}
