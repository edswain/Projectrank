package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.LikesTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PostTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Post.class);
        Post post1 = getPostSample1();
        Post post2 = new Post();
        assertThat(post1).isNotEqualTo(post2);

        post2.setId(post1.getId());
        assertThat(post1).isEqualTo(post2);

        post2 = getPostSample2();
        assertThat(post1).isNotEqualTo(post2);
    }

    @Test
    void likesTest() throws Exception {
        Post post = getPostRandomSampleGenerator();
        Likes likesBack = getLikesRandomSampleGenerator();

        post.addLikes(likesBack);
        assertThat(post.getLikes()).containsOnly(likesBack);
        assertThat(likesBack.getPostliked()).isEqualTo(post);

        post.removeLikes(likesBack);
        assertThat(post.getLikes()).doesNotContain(likesBack);
        assertThat(likesBack.getPostliked()).isNull();

        post.likes(new HashSet<>(Set.of(likesBack)));
        assertThat(post.getLikes()).containsOnly(likesBack);
        assertThat(likesBack.getPostliked()).isEqualTo(post);

        post.setLikes(new HashSet<>());
        assertThat(post.getLikes()).doesNotContain(likesBack);
        assertThat(likesBack.getPostliked()).isNull();
    }
}
