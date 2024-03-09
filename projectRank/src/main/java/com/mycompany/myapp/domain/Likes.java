package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A Likes.
 */
@Entity
@Table(name = "likes")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Likes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "createdby", "likes" }, allowSetters = true)
    private Post postliked;

    @ManyToOne(fetch = FetchType.LAZY)
    private User likedby;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Likes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getPostliked() {
        return this.postliked;
    }

    public void setPostliked(Post post) {
        this.postliked = post;
    }

    public Likes postliked(Post post) {
        this.setPostliked(post);
        return this;
    }

    public User getLikedby() {
        return this.likedby;
    }

    public void setLikedby(User user) {
        this.likedby = user;
    }

    public Likes likedby(User user) {
        this.setLikedby(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Likes)) {
            return false;
        }
        return getId() != null && getId().equals(((Likes) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Likes{" +
            "id=" + getId() +
            "}";
    }
}
