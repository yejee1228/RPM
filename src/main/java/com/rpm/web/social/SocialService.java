package com.rpm.web.social;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SocialService {
    List<SocialListDTO> allList();
    String[] thumbed(String userid);
    SocialDetailDTO loadBoard(String boardSeq);
    void writeContent(SocialWriteDTO param);
    void updateContent(String boardSeq, SocialWriteDTO socialWriteDto);
    void deleteContent(String boardSeq);
    void thumbUp(String boardSeq, String userid);
    void thumbDown(String boardSeq, String userid);
}
