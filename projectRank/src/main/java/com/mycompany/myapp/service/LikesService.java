package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Likes;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Likes}.
 */
public interface LikesService {
    /**
     * Save a likes.
     *
     * @param likes the entity to save.
     * @return the persisted entity.
     */
    Likes save(Likes likes);

    /**
     * Updates a likes.
     *
     * @param likes the entity to update.
     * @return the persisted entity.
     */
    Likes update(Likes likes);

    /**
     * Partially updates a likes.
     *
     * @param likes the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Likes> partialUpdate(Likes likes);

    /**
     * Get all the likes.
     *
     * @return the list of entities.
     */
    List<Likes> findAll();

    /**
     * Get the "id" likes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Likes> findOne(Long id);

    /**
     * Delete the "id" likes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
