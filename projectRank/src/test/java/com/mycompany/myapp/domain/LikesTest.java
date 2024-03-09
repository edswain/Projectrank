package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.LikesTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LikesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Likes.class);
        Likes likes1 = getLikesSample1();
        Likes likes2 = new Likes();
        assertThat(likes1).isNotEqualTo(likes2);

        likes2.setId(likes1.getId());
        assertThat(likes1).isEqualTo(likes2);

        likes2 = getLikesSample2();
        assertThat(likes1).isNotEqualTo(likes2);
    }

    @Test
    void postlikedTest() throws Exception {
        Likes likes = getLikesRandomSampleGenerator();
        Post postBack = getPostRandomSampleGenerator();

        likes.setPostliked(postBack);
        assertThat(likes.getPostliked()).isEqualTo(postBack);

        likes.postliked(null);
        assertThat(likes.getPostliked()).isNull();
    }
}
