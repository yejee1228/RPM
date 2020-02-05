package com.rpm.web.social;

import com.rpm.web.proxy.PageProxy;
import com.rpm.web.user.User;
import com.rpm.web.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class SocialController {
    @Autowired SocialRepository socialRepository;
    @Autowired UserRepository userRepository;
    @Autowired SocialService socialService;
    @Autowired PageProxy pager;
    @Autowired ThumbRepository thumbRepository;

    @GetMapping("/viewList/{pageNo}/{userid}")
    public Map<String, Object> viewList(@PathVariable String pageNo, @PathVariable String userid){
        Map<String, Object> map = new HashMap<>();
        pager.setPageNum(Integer.parseInt(pageNo));
        pager.setPageSize(12);
        pager.paging(socialService.allList());
        int thisPageSize = (pager.getEndRow()+1)-((pager.getPageNum()-1)*pager.getPageSize());
        SocialListDTO[] list = new SocialListDTO[thisPageSize];
        for(int i=0; i<thisPageSize; i++){
            list[i]=socialService.allList().get(pager.getStartRow()+i);
        }
        map.put("boardList", list);
        if(!userid.equals("undefined")){
            map.put("thumbedboard", socialService.thumbed(userid));
        }
        return map;
    }

    @PostMapping("/uploadImg")
    public String uploadImg(MultipartHttpServletRequest uploadFile) {
        Iterator<String> itr =uploadFile.getFileNames();
        String filename = itr.next();
        MultipartFile mfile = uploadFile.getFile(filename);
        String origName=mfile.getOriginalFilename();
        String path = "C:\\Users\\KwonHR\\Downloads";
        File serverFile = new File(path +origName);
        try {
            mfile.transferTo(serverFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "uploadImg";
    }

    @PostMapping("/writeContent")
    public String writeContent (@RequestBody SocialWriteDTO param){
        socialService.writeContent(param);
        return "success";
    }

    @GetMapping("/loadBoard/{boardSeq}")
    public SocialDetailDTO loadBoard(@PathVariable String boardSeq){
        return socialService.loadBoard(boardSeq);
    }

    @PostMapping("/updateContent/{boardSeq}")
    public String updateContent (@PathVariable String boardSeq, @RequestBody SocialWriteDTO socialWriteDto){
        socialService.updateContent(boardSeq, socialWriteDto);
        return "success";
    }
    @GetMapping("/deleteContent/{boardSeq}")
    public String deleteContent(@PathVariable String boardSeq){
        socialService.deleteContent(boardSeq);
        return "success";
    }

    @GetMapping("/thumbUp/{boardSeq}/{userid}")
    public String thumbUp(@PathVariable String boardSeq, @PathVariable String userid){
        socialService.thumbUp(boardSeq, userid);
        return "success";
    }
    @GetMapping("/thumbDown/{boardSeq}/{userid}")
    public String thumbDown(@PathVariable String boardSeq, @PathVariable String userid){
        socialService.thumbDown(boardSeq, userid);
        return "success";
    }

    @GetMapping("/thumbed/{boardSeq}/{userid}")
    public String thumbed(@PathVariable String boardSeq, @PathVariable String userid){
        String result = "";
        Social social = socialRepository.findById(Long.parseLong(boardSeq)).get();
        User user = userRepository.findByUserid(userid);
        Thumb thumb = thumbRepository.findByBoardSeqAndUserSeq(social, user);
        if(thumb != null){result = "true";}
        else{result = "false";}
        return result;
    }

}
