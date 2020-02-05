package com.rpm.web.company;

import com.rpm.web.contents.Cars;
import com.rpm.web.contents.CarsRepository;
import com.rpm.web.recommend.Recommend;
import com.rpm.web.recommend.RecommendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "http://localhost:8081")
public class CompanyController {
    @Autowired
    CarsRepository carsRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    RecommendRepository recommendRepository;
    @Autowired
    CompanyServiceImpl companyServiceImpl;

    @GetMapping("/carList/{centerCode}")
    public Map<String, List<Cars>> carList(@PathVariable String centerCode){
        Map<String,List<Cars>> map = new HashMap();
        map.put("result",carsRepository.findByCenterCode(centerCode));
        return map;
    }
    @GetMapping("/customerList")
    public Map<String, String> customerList(){
        Map<String,String> map = new HashMap();
        map.put("result","aa");
        return map;

    }
    @PostMapping("/bestCarList")
    public List<Cars> bestCarList(@RequestBody Recommend recommend){
        System.out.println(recommend.toString());

        return companyServiceImpl.getBestCarList(recommend);
    }


}
