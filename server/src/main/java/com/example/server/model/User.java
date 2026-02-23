package com.example.server.model;

import com.example.server.converter.UserTypeConverter;
import com.example.server.enums.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue
    private int id;

    @Column(unique = true, nullable = false)
    @Size(min = 1, max = 15)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Convert(converter = UserTypeConverter.class)
    @Column(nullable = false)
    private UserType userType;

    @Column(nullable = false)
    private String avatar;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    private List<Offer> offers;
}
