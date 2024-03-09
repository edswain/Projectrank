package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "post_title")
    private String postTitle;

    @Column(name = "post_likes")
    private Integer postLikes;

    @Column(name = "elo_rating")
    private Double eloRating;

    @Lob
    @Column(name = "image_1")
    private byte[] image1;

    @Column(name = "image_1_content_type")
    private String image1ContentType;

    @Lob
    @Column(name = "image_2")
    private byte[] image2;

    @Column(name = "image_2_content_type")
    private String image2ContentType;

    @Lob
    @Column(name = "post_desc")
    private String postDesc;

    @ManyToOne(fetch = FetchType.LAZY)
    private User createdby;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postliked")
    @JsonIgnoreProperties(value = { "postliked", "likedby" }, allowSetters = true)
    private Set<Likes> likes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Post id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostTitle() {
        return this.postTitle;
    }

    public Post postTitle(String postTitle) {
        this.setPostTitle(postTitle);
        return this;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public Integer getPostLikes() {
        return this.postLikes;
    }

    public Post postLikes(Integer postLikes) {
        this.setPostLikes(postLikes);
        return this;
    }

    public void setPostLikes(Integer postLikes) {
        this.postLikes = postLikes;
    }

    public Double getEloRating() {
        return this.eloRating;
    }

    public Post eloRating(Double eloRating) {
        this.setEloRating(eloRating);
        return this;
    }

    public void setEloRating(Double eloRating) {
        this.eloRating = eloRating;
    }

    public byte[] getImage1() {
        return this.image1;
    }

    public Post image1(byte[] image1) {
        this.setImage1(image1);
        return this;
    }

    public void setImage1(byte[] image1) {
        this.image1 = image1;
    }

    public String getImage1ContentType() {
        return this.image1ContentType;
    }

    public Post image1ContentType(String image1ContentType) {
        this.image1ContentType = image1ContentType;
        return this;
    }

    public void setImage1ContentType(String image1ContentType) {
        this.image1ContentType = image1ContentType;
    }

    public byte[] getImage2() {
        return this.image2;
    }

    public Post image2(byte[] image2) {
        this.setImage2(image2);
        return this;
    }

    public void setImage2(byte[] image2) {
        this.image2 = image2;
    }

    public String getImage2ContentType() {
        return this.image2ContentType;
    }

    public Post image2ContentType(String image2ContentType) {
        this.image2ContentType = image2ContentType;
        return this;
    }

    public void setImage2ContentType(String image2ContentType) {
        this.image2ContentType = image2ContentType;
    }

    public String getPostDesc() {
        return this.postDesc;
    }

    public Post postDesc(String postDesc) {
        this.setPostDesc(postDesc);
        return this;
    }

    public void setPostDesc(String postDesc) {
        this.postDesc = postDesc;
    }

    public User getCreatedby() {
        return this.createdby;
    }

    public void setCreatedby(User user) {
        this.createdby = user;
    }

    public Post createdby(User user) {
        this.setCreatedby(user);
        return this;
    }

    public Set<Likes> getLikes() {
        return this.likes;
    }

    public void setLikes(Set<Likes> likes) {
        if (this.likes != null) {
            this.likes.forEach(i -> i.setPostliked(null));
        }
        if (likes != null) {
            likes.forEach(i -> i.setPostliked(this));
        }
        this.likes = likes;
    }

    public Post likes(Set<Likes> likes) {
        this.setLikes(likes);
        return this;
    }

    public Post addLikes(Likes likes) {
        this.likes.add(likes);
        likes.setPostliked(this);
        return this;
    }

    public Post removeLikes(Likes likes) {
        this.likes.remove(likes);
        likes.setPostliked(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return getId() != null && getId().equals(((Post) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", postTitle='" + getPostTitle() + "'" +
            ", postLikes=" + getPostLikes() +
            ", eloRating=" + getEloRating() +
            ", image1='" + getImage1() + "'" +
            ", image1ContentType='" + getImage1ContentType() + "'" +
            ", image2='" + getImage2() + "'" +
            ", image2ContentType='" + getImage2ContentType() + "'" +
            ", postDesc='" + getPostDesc() + "'" +
            "}";
    }
}
