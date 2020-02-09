package com.rpm.web.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired UserRepository userRepository;
    @Autowired User user;

    @Override
    public void withDrawl(String userid) {
        try{userRepository.delete(userRepository.findByUserid(userid));}
        catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public User update(User param) {
        user= userRepository.findByUserid(param.getUserid());
        user.setPasswd(param.getPasswd());
        user.setEmail(param.getEmail());
        user.setBirthMonth((param.getBirthMonth()=="")?user.getBirthMonth():param.getBirthMonth());
        user.setRegion((param.getRegion()=="")?user.getRegion():param.getRegion());
        user.setGender((param.getGender()=="")?user.getGender():param.getGender());
        userRepository.save(user);
        return user;
    }
}
