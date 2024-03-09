package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Post;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select post from Post post where post.createdby.login = ?#{authentication.name}")
    List<Post> findByCreatedbyIsCurrentUser();
}
