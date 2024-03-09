package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Likes;
import com.mycompany.myapp.repository.LikesRepository;
import com.mycompany.myapp.service.LikesService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Likes}.
 */
@RestController
@RequestMapping("/api/likes")
public class LikesResource {

    private final Logger log = LoggerFactory.getLogger(LikesResource.class);

    private static final String ENTITY_NAME = "likes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LikesService likesService;

    private final LikesRepository likesRepository;

    public LikesResource(LikesService likesService, LikesRepository likesRepository) {
        this.likesService = likesService;
        this.likesRepository = likesRepository;
    }

    /**
     * {@code POST  /likes} : Create a new likes.
     *
     * @param likes the likes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new likes, or with status {@code 400 (Bad Request)} if the likes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Likes> createLikes(@RequestBody Likes likes) throws URISyntaxException {
        log.debug("REST request to save Likes : {}", likes);
        if (likes.getId() != null) {
            throw new BadRequestAlertException("A new likes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Likes result = likesService.save(likes);
        return ResponseEntity
            .created(new URI("/api/likes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /likes/:id} : Updates an existing likes.
     *
     * @param id the id of the likes to save.
     * @param likes the likes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated likes,
     * or with status {@code 400 (Bad Request)} if the likes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the likes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Likes> updateLikes(@PathVariable(value = "id", required = false) final Long id, @RequestBody Likes likes)
        throws URISyntaxException {
        log.debug("REST request to update Likes : {}, {}", id, likes);
        if (likes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, likes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!likesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Likes result = likesService.update(likes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, likes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /likes/:id} : Partial updates given fields of an existing likes, field will ignore if it is null
     *
     * @param id the id of the likes to save.
     * @param likes the likes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated likes,
     * or with status {@code 400 (Bad Request)} if the likes is not valid,
     * or with status {@code 404 (Not Found)} if the likes is not found,
     * or with status {@code 500 (Internal Server Error)} if the likes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Likes> partialUpdateLikes(@PathVariable(value = "id", required = false) final Long id, @RequestBody Likes likes)
        throws URISyntaxException {
        log.debug("REST request to partial update Likes partially : {}, {}", id, likes);
        if (likes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, likes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!likesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Likes> result = likesService.partialUpdate(likes);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, likes.getId().toString())
        );
    }

    /**
     * {@code GET  /likes} : get all the likes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of likes in body.
     */
    @GetMapping("")
    public List<Likes> getAllLikes() {
        log.debug("REST request to get all Likes");
        return likesService.findAll();
    }

    /**
     * {@code GET  /likes/:id} : get the "id" likes.
     *
     * @param id the id of the likes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the likes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Likes> getLikes(@PathVariable("id") Long id) {
        log.debug("REST request to get Likes : {}", id);
        Optional<Likes> likes = likesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(likes);
    }

    /**
     * {@code DELETE  /likes/:id} : delete the "id" likes.
     *
     * @param id the id of the likes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLikes(@PathVariable("id") Long id) {
        log.debug("REST request to delete Likes : {}", id);
        likesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
