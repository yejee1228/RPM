package com.rpm.web.company;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.List;

@Order(value=1)
@Component
public class CompanyInit implements ApplicationRunner {
    private CompanyRepository companyRepository;

    public CompanyInit(CompanyRepository companyRepository) {
        this.companyRepository= companyRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

        SimpleDateFormat SystemTime = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
        String formattedTime1 = SystemTime.format (System.currentTimeMillis());

        System.out.println( formattedTime1 + "  INFO 18844 --- [           CompanyInit ]         : CompanyInit Start ");



        long count = companyRepository.count();
        List<String> code= companyRepository.findCenterCode();
        List<String> centerName =  companyRepository.findByCenterRegion("서울");
        code.forEach(el->{
            if (count == 0) {
                Company company= new Company();
                company.setCenterCode(el);
                company.setCenterName(companyRepository.findByCenterCode(el));
                company.setCenterRegion(companyRepository.findByCenterCode2(el));
                companyRepository.save(company);
            }
        });



        System.out.println( formattedTime1 + "  INFO 18844 --- [           CompanyInit ]         : CompanyInit End ");

    }

}