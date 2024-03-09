package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Likes;
import com.mycompany.myapp.repository.LikesRepository;
import com.mycompany.myapp.service.LikesService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Likes}.
 */
@Service
@Transactional
public class LikesServiceImpl implements LikesService {

    private final Logger log = LoggerFactory.getLogger(LikesServiceImpl.class);

    private final LikesRepository likesRepository;

    public LikesServiceImpl(LikesRepository likesRepository) {
        this.likesRepository = likesRepository;
    }

    @Override
    public Likes save(Likes likes) {
        log.debug("Request to save Likes : {}", likes);
        return likesRepository.save(likes);
    }

    @Override
    public Likes update(Likes likes) {
        log.debug("Request to update Likes : {}", likes);
        return likesRepository.save(likes);
    }

    @Override
    public Optional<Likes> partialUpdate(Likes likes) {
        log.debug("Request to partially update Likes : {}", likes);

        return likesRepository.findById(likes.getId()).map(likesRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Likes> findAll() {
        log.debug("Request to get all Likes");
        return likesRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Likes> findOne(Long id) {
        log.debug("Request to get Likes : {}", id);
        return likesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Likes : {}", id);
        likesRepository.deleteById(id);
    }
}
