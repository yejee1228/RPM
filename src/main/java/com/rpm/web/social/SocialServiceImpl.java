package com.rpm.web.social;

import com.rpm.web.contents.Cars;
import com.rpm.web.contents.CarsRepository;

import com.rpm.web.user.User;
import com.rpm.web.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SocialServiceImpl implements SocialService{
    @Autowired SocialRepository socialRepository;
    @Autowired CarsRepository carsRepository;
    @Autowired UserRepository userRepository;
    @Autowired Social social;
    @Autowired SocialDetailDTO socialDetailDTO;
    @Autowired User user;
    @Autowired ThumbRepository thumbRepository;
    @Autowired Thumb thumb;


    @Transactional(readOnly = true)
    @Override
    public List<SocialListDTO> allList() {
        Iterable<Social> socials = socialRepository.findAll();
        List<Social> list = new ArrayList<>();
        for(Social s : socials){
            list.add(s);
        }

        Iterable<Cars> cars = carsRepository.findAll();
        List<Cars> carList = new ArrayList<>();

        for (Cars c : cars) {
            carList.add(c);

        }
        List<SocialListDTO> lists =  list.stream()
                .map(social -> new SocialListDTO(social.getBoardSeq(), social.getBoardDate(),
                        social.getCarCode(), social.getCarName(), social.getBoardContent(), social.getBoardImg(),
                        social.getUserSeq().getName(), social.getThumbs().size()))
                .sorted(Comparator.comparing(SocialListDTO::getBoardSeq).reversed())
                .collect(Collectors.toList());
        return lists;
    }

    @Override
    public String[] thumbed(String userid) {
        Iterable<Thumb> thumbs = thumbRepository.findAll();
        List<Thumb> thumbList = new ArrayList<>();
        for(Thumb t : thumbs){
            thumbList.add(t);
        }
        List<Thumb> thumbsByUserid =thumbList.stream().filter(t->t.getUserSeq().getUserid().equals(userid))
                .collect(Collectors.toList());
        String[] thumbArray = new String[thumbsByUserid.size()];
        for(int i = 0; i<thumbsByUserid.size(); i++){
            thumbArray[i]= String.valueOf(thumbsByUserid.get(i).getBoardSeq().getBoardSeq());
        }
        return thumbArray;
    }


    @Override
    public SocialDetailDTO loadBoard(String boardSeq){
        social = (socialRepository.findById(Long.parseLong(boardSeq))).get();
        socialDetailDTO.setCarName(social.getCarName());
        socialDetailDTO.setBoardContent(social.getBoardContent());
        socialDetailDTO.setBoardDate(social.getBoardDate());
        socialDetailDTO.setBoardImg(social.getBoardImg());
        socialDetailDTO.setUserid(social.getUserSeq().getUserid());
        socialDetailDTO.setUserName(social.getUserSeq().getName());
        socialDetailDTO.setThumbCount(social.getThumbs().size());
        return socialDetailDTO;
    }

    @Override
    public void writeContent(SocialWriteDTO param){
        user = userRepository.findByUserid(param.getUserid());
        social.setUserSeq(user);
        social.setCarName(param.getCarName());
        social.setBoardDate(new SimpleDateFormat ( "yy.MM.dd HH:mm:ss").format( new Date()));
        social.setCarCode("board"+social.getBoardDate());
        social.setBoardImg("img/"+param.getBoardImgName());
        social.setBoardContent(param.getBoardContent());
        socialRepository.save(social);
    }

    @Override
    public void updateContent(String boardSeq, SocialWriteDTO socialWriteDto){
        social = socialRepository.findById(Long.parseLong(boardSeq)).get();
        if(socialWriteDto.getBoardImgName().contains("img\\")||
                socialWriteDto.getBoardImgName().contains("//cdn")){
            social.setBoardImg(socialWriteDto.getBoardImgName());
        }else{
            social.setBoardImg("img\\"+socialWriteDto.getBoardImgName());
        }
        social.setCarName(socialWriteDto.getCarName());
        social.setBoardContent(socialWriteDto.getBoardContent());
        socialRepository.save(social);
    }

    @Override
    public void deleteContent(String boardSeq) {
        socialRepository.delete(socialRepository.findById(Long.parseLong(boardSeq)).get());
    }

    @Override
    public void thumbUp(String boardSeq, String userid) {
        thumb.setBoardSeq(socialRepository.findById(Long.parseLong(boardSeq)).get());
        thumb.setUserSeq(userRepository.findByUserid(userid));
        thumbRepository.save(thumb);
    }

    @Override
    public void thumbDown(String boardSeq, String userid) {
        thumbRepository.delete(thumbRepository.findByBoardSeqAndUserSeq(
                socialRepository.findById(
                        Long.parseLong(boardSeq)).get(), userRepository.findByUserid(userid)));
    }
}
