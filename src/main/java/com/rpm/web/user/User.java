package com.rpm.web.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.rpm.web.social.Social;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Component @Lazy @Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="USER")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userSeq")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USERSEQ") @NotNull private Long userSeq;
    @Column(name = "USERID", unique = true, length = 25) @NotNull private String userid;
    @Column(name = "PASSWD", length=40) @NotNull private String passwd;
    @Column(name = "NAME", length = 30) @NotNull private String name;
    @Column(name = "EMAIL", length=100) @NotNull private String email;
    @Column(name = "AUTH") @NotNull private int auth;
    @Column(name = "GENDER", length=10)  private String gender;
    @Column(name = "BIRTHMONTH", length=10)  private String birthMonth;
    @Column(name = "REGION", length=10)  private String region;





    @Builder
    private User(String userid, String passwd, String name, String email,
                 String gender, String birthMonth, String region) {
        Assert.hasText(userid, "userid must not be empty");
        Assert.hasText(passwd, "passwd must not be empty");
        Assert.hasText(name, "name must not be empty");
        Assert.hasText(email, "email must not be empty");
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.birthMonth = birthMonth;
        this.region = region;
    }

}
