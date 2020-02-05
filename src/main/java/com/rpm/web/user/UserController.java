package com.rpm.web.user;

import com.rpm.web.carbook.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {
    @Autowired User user;
    @Autowired UserRepository userRepository;
    @Autowired Carbook carbook;
    @Autowired CarbookRepository carbookRepository;
    @Autowired Record record;
    @Autowired CarbookService carbookService;
    @Autowired UserService userService;


    @GetMapping("/idCheck/{userid}")
    public Boolean idCheck(@PathVariable String userid){
        return userRepository.findByUserid(userid)==null;
    }

    @PostMapping("/join")
    public HashMap<String, Object> join(@RequestBody User param){
        HashMap<String, Object> map = new HashMap<>();
        userRepository.save(param);
        if (user != null) {
            map.put("msg", "SUCCESS");
            map.put("user", user);
        } else {
            map.put("msg", "FAIL");
        }
        return map;
    }
    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody User param) {
        HashMap<String, Object> map = new HashMap<>();
        user = userRepository.findByUseridAndPasswd(param.getUserid(), param.getPasswd());
        if (user != null) {
            map.put("user", user);
            map.put("token", user.getUserSeq());
            carbook = carbookRepository.findBySeq(user.getUserSeq());
            if(carbook!=null ){
                map.put("mycar", carbook);

                List<Record> records = carbookService.getRecords(carbook.getMycarId());
                if(records != null){
                    map.put("record", records);

                }
            }
            map.put("result", "success");
        } else {
            map.put("result", "fail");
        }

        return map;
    }
    @PostMapping("/getUserInfo/{token}")
    public HashMap<String, Object> getUserInfo(@PathVariable String token){
        HashMap<String, Object> map = new HashMap<>();
        user = userRepository.findByUserSeq(Integer.parseInt(token));
        if(user != null){
            map.put("result" , "success");
            map.put("user", user);

        }else{
            map.put("result", "fail");
        }
        return map;
    }
    @PostMapping("update")
    public HashMap<String, Object> update( @RequestBody User user){
        HashMap<String, Object> map = new HashMap<>();
        map.put("user", userService.update(user));
        map.put("msg", "success");
        return map;
    }
    @GetMapping("withDrawl/{userid}")
    public String withDrawl(@PathVariable String userid){
        userService.withDrawl(userid);
        return "success";
    }

}
