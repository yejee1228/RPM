package com.rpm.web.util;
import com.rpm.web.contents.Cars;
import com.rpm.web.contents.CarsRepository;
import com.rpm.web.social.Social;
import com.rpm.web.user.User;
import com.rpm.web.user.UserRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
import java.util.*;

public class SocialDummy {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CarsRepository  carsRepository;
    public Map<String, List<String>> crawlingUrl() {
        Map<String, List<String>> map = new HashMap<>();
        List<String> list = new ArrayList<>();
        list.clear();
        List<String> dates = new ArrayList<>();
        dates.clear();
        try {
            Document rawData = Jsoup.connect("http://www.ppomppu.co.kr/zboard/zboard.php?id=car&category=6").get();
            Elements aTag = rawData.select("a[href^=view.php?id=car&page=1]");
            Elements date = rawData.select("td[class=eng list_vspace]");
            for (Element e : aTag) {
                list.add("http://www.ppomppu.co.kr/zboard/" + e.attr("href"));
            }
            for (Element e : date) {
                if (e.attr("title") != "") {
                    dates.add(e.attr("title"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("url", list);
        map.put("dates", dates);
        return map;
    }
    public ArrayList<Social> crawlingBoard(List<User> user, List<Cars> car) {
        ArrayList<Social> list = new ArrayList<>();
        list.clear();
        List<String> urls = crawlingUrl().get("url");
        List<String> dates = crawlingUrl().get("dates");
        for (int i = 0; i < urls.size(); i++) {
            try {
                Collections.shuffle(user);
                Collections.shuffle(car);
                Social social = new Social();
                social.setUserSeq(user.get(0));
                social.setCarCode(car.get(0).getCarcd());
                social.setCarName(car.get(0).getTruckName());
                social.setBoardDate(dates.get(i));
                Document rawData = Jsoup.connect(urls.get(i)).get();
                Elements boardContent = rawData.select(".pic_bg")
                        .select("tbody").select("tr").select("td")
                        .select("table").select("tbody").select("tr").select("td")
                        .select("table").select("tbody").select("tr").select("td").select("p");
                Elements boardImg = rawData.select("img[src^=//cdn.ppomppu.co.kr/zboard/]");
                social.setBoardImg(boardImg.get(0).attr("src"));
                social.setBoardContent(StringReplace(boardContent.text()));
                list.add(social);
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return list;
    }
    public static String StringReplace(String str){
        String match = "[^\uAC00-\uD7A3xfe0-9a-zA-Z\\s]";
        str =str.replaceAll(match, "");
        return str;
    }

}


