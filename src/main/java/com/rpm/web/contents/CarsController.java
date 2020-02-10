package com.rpm.web.contents;

import com.rpm.web.batch.SearchRecommendBatch;
import com.rpm.web.proxy.Box;
import com.rpm.web.proxy.Proxy;
import com.rpm.web.proxy.Trunk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class CarsController {
    @Autowired
    Proxy proxy;
    @Autowired
    CarsRepository carsRepository;
    @Autowired
    Box box;
    @Autowired
    Trunk<Object> trunk;
    @Autowired
    CarsService carsService;
    @Autowired
    List<Cars> cars;
    @Autowired
    StringMatch stringMatch;
    @Autowired
    RecentSearchWordRepository recentSearchWordRepository;
    @Autowired
    RecentSeenCarRepository recentSeenCarRepository;
    @Autowired
    SearchRecommendBatch searchRecommendBatch;


    private List<Object> carModelList;
    private List<Object> carModelHangeulList;

    public CarsController() {
        this.carModelList = new ArrayList<>();
        this.carModelHangeulList = new ArrayList<>();
    }

    @GetMapping("/init")
    public Map<String, Object> init(){
        trunk.clear();
        carModelList.clear();
        carModelHangeulList.clear();
        cars = (List<Cars>) carsRepository.findAll();
        carModelList.addAll(cars.stream().collect(Collectors.groupingBy(Cars::getModelnmText
                , Collectors.counting())).keySet());
        carModelList.forEach(s-> carModelHangeulList.add(stringMatch.seperateHan(s.toString().replace(" ", ""))));
        cars.sort((a,b) -> a.getCid().compareTo(b.getCid()));
        trunk.put(Arrays.asList("allCount" ,"carInitList","makerList","fuelTypeList", "regionList","categoryList")
                ,Arrays.asList(proxy.string(carsRepository.count())
                        ,cars.subList(0,15)
                        ,carsService.findByMakecdWithCount(cars)
                        ,carsService.findCarWithFuleType(cars)
                        ,carsService.findCarWithCenterRegionCode(cars)
                        ,carsService.findAllCategory(cars)
                ));

        return trunk.get();
    }

    @GetMapping("/getcategory/{param}/{column}")
    public Map<String, Object> getCategory(@PathVariable String param, @PathVariable String column){
        trunk.clear();
        cars = carsService.findAllByDistinct((List<Cars>) carsRepository.findAll());
        switch (column){
            case "CAR_TYPE":
                trunk.put(Arrays.asList("category", "count"),
                        Arrays.asList(carsService.getCategory1(carsRepository.findAll()).get(param).keySet(),
                                carsService.getCategory1(carsRepository.findAll()).get(param).values()));
                break;
            case "MAKENM" :
                trunk.put(Arrays.asList("category", "count", "modelList"),
                        Arrays.asList(carsService.getCategory2(param).keySet(),
                                carsService.getCategory2(param).values(),
                                carsService.findByModelNMCategory((List<Cars>) cars , param )));
                break;
            case "MODEL_GRP_NM" :
                trunk.put(Arrays.asList("category", "count"),
                        Arrays.asList(carsService.getCategory3(param).keySet(),
                                carsService.getCategory3(param).values()));
                break;
        }

        return trunk.get();
    }


    @RequestMapping("/searchWithCondition")
    public Map<String,Object> searchWithCondition(@RequestBody  SearchCondition searchCondition){
        trunk.clear();
        cars = carsService.findAllByDistinct((List<Cars>) carsRepository.findAll());
        List<Cars> carsProcessingList = new ArrayList<>();
        List<SearchDetailCondition> categoryList = searchCondition.getCategoryList();
        List<SearchDetailCondition> modelList = searchCondition.getModelList();
        List<SearchDetailCondition> resultModelList = null;
        List<SearchDetailCondition> fuelTypeList = searchCondition.getFuelTypeList();
        List<SearchDetailCondition> regionList = searchCondition.getRegionList();



        if ( proxy.equals("minPrice",proxy.string(searchCondition.getMinPrice().getBigCategory()))) {
            carsProcessingList.addAll(
                    cars.stream().filter(car -> car.getPrice()
                            >= proxy.integer(searchCondition.getMinPrice().getCode()))
                            .collect(Collectors.toList()));
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
        }
        if ( proxy.equals("maxPrice",proxy.string(searchCondition.getMaxPrice().getBigCategory()))) {
            carsProcessingList.addAll(
                    cars.stream().filter( car ->  car.getPrice()
                            <= proxy.integer(searchCondition.getMaxPrice().getCode()))
                            .collect(Collectors.toList()));
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
        }
        if ( proxy.equals("minMilage",proxy.string(searchCondition.getMinMilage().getBigCategory())) ) {
            carsProcessingList.addAll(
                    cars.stream().filter( car ->  car.getMilage()
                            >= proxy.integer(searchCondition.getMinMilage().getCode()))
                            .collect(Collectors.toList()));
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
        }
        if ( proxy.equals("maxMilage",proxy.string(searchCondition.getMaxMilage().getBigCategory()))) {
            carsProcessingList.addAll(
                    cars.stream().filter( car ->  car.getMilage()
                            <= proxy.integer(searchCondition.getMaxMilage().getCode()))
                            .collect(Collectors.toList()));
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();

        }

        if ( !categoryList.isEmpty()) {
            for (SearchDetailCondition category : categoryList) {
                carsProcessingList.addAll(carsService.findCarBySelectedCategory(cars , category.getCode()));
            }
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
        }

        if ( !fuelTypeList.isEmpty() ) {
            for (SearchDetailCondition fuelType : fuelTypeList) {
                carsProcessingList.addAll(carsService.findCarBySelectedFuelType(cars , fuelType.getCode()));
            }
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
        }
        if ( !regionList.isEmpty() ) {
            for (SearchDetailCondition region : regionList) {
                carsProcessingList.addAll(carsService.findCarBySelectedRegion(cars , region.getCode()));
            }
            cars = carsProcessingList;
        }
        if ( searchCondition.getMaker() != null ) {
            carsProcessingList.addAll(carsService.findCarBySelectedMaker(cars , searchCondition.getMaker()));
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
            trunk.put(Arrays.asList("modelList"),Arrays.asList(carsService.findByModelWithCount(cars,searchCondition.getMaker())));
        }
        if ( !modelList.isEmpty() ) {
            for (SearchDetailCondition model : modelList) {
                carsProcessingList.addAll(carsService.findCarBySelectedModelNM(cars , model.getName()));
            }
            cars.clear();
            cars.addAll(carsProcessingList);
            carsProcessingList.clear();
        }
        if( searchCondition.getModelText() != null && searchCondition.getModelText() != ""){
            carsProcessingList.clear();
            carsProcessingList.addAll(cars.stream().filter(s -> proxy.equals(s.getModelnmText(),searchCondition.getModelText())).collect(Collectors.toList()));
            cars.clear();
            cars.addAll(carsProcessingList);
        }


        if(searchCondition.getOrderBySub()=="default"){
            cars.sort((a,b) -> a.getCid().compareTo(b.getCid()));
        } else {
            switch (searchCondition.getOrderBySub()) {
                case "priceASC":
                    cars.sort((a,b) -> (a.getPrice()).compareTo(b.getPrice()));
                    break;
                case "priceDESC":
                    cars.sort((a,b) -> b.getPrice().compareTo(a.getPrice()));
                    break;
                case "mileageASC":
                    cars.sort((a,b) -> a.getMilage().compareTo(b.getMilage()));
                    break;
                case "mileageDESC":
                    cars.sort((a,b) -> b.getMilage().compareTo(a.getMilage()));
                    break;
                case "beginyearASC":
                    cars.sort((a,b) -> a.getBeginYear().compareTo(b.getBeginYear()));
                    break;
                case "beginyearDESC":
                    cars.sort((a,b) -> b.getBeginYear().compareTo(a.getBeginYear()));
                    break;
            }
        }



        trunk.put(Arrays.asList("resultLength", "showCarList", "makerList") ,
                Arrays.asList(cars.size()
                        ,(cars.stream().limit(searchCondition.getPageLimit()).toArray().length>0&&cars.stream().limit(searchCondition.getPageLimit()).toArray().length<=searchCondition.getPageLimit())
                                ? cars.stream().limit(searchCondition.getPageLimit()).toArray()
                                : false
                        ,carsService.findByMakecdWithCount(cars)
                ));
        return trunk.get();
    }

    @GetMapping("/getshowcarlist/{startrow}/{endrow}")
    public Object getShowCarList(@PathVariable String startrow, @PathVariable String endrow){
        return cars.subList(proxy.integer(startrow),proxy.integer(endrow));
    }

    @GetMapping("/stringMatch/{searchWord}")
    public Map<String, Object> stringMatch(@PathVariable String searchWord){
        List<Object> result = new ArrayList<>();
        List<Integer> index = new ArrayList<>();
        Consumer<Object> c = new Consumer<Object>() {
            @Override
            public void accept(Object o) {
                if(o.toString().contains(stringMatch.seperateHan(searchWord.replace(" ", "")))){
                    index.add(carModelHangeulList.indexOf(o));
                }
            }
        };
        carModelHangeulList.forEach(s-> c.accept(s));
        if(index.size()!=0) {
            for (int i : index) {
                result.add(carModelList.get(i));
            }
        }
        trunk.put(Arrays.asList("result"), Arrays.asList((result.size()>0)?result:false));
        return trunk.get();
    }

    @GetMapping("/stringMatchClick/{modelText}/{date}/{userId}")
    public Map<String, Object> stringMatchClick(@PathVariable String modelText, @PathVariable String date, @PathVariable String userId){
        trunk.clear();
        trunk.put(Arrays.asList("maker", "model"), Arrays.asList(
                proxy.arrayToString(carsService.findMakerAndModelByModelText(modelText).keySet().toString()),
                proxy.arrayToString(carsService.findMakerAndModelByModelText(modelText).get(
                        proxy.arrayToString(carsService.findMakerAndModelByModelText(modelText).keySet().toString()))
                        .keySet().toString())));
        recentSearchWordRepository.save(new RecentSearchWord(modelText, Long.parseLong(date), userId));
        return trunk.get();
    }

    @GetMapping("/setProduct/{carcd}/{date}/{userid}")
    public void setProduct(@PathVariable String carcd, @PathVariable String date, @PathVariable String userid){
        recentSeenCarRepository.save(new RecentSeenCar(carcd, Long.parseLong(date), userid));
    }

    @GetMapping("/searchWordRank")
    public Set<String> getSearchWordRank(){
        return proxy.sortByValue(StreamSupport.stream(recentSearchWordRepository.findAll().spliterator(), false)
                .filter( s -> s.getSearchTime()<=proxy.longify(proxy.string(LocalDate.now().minusMonths(-6)).replace("-", "")+"000000000"))
                .collect(Collectors.groupingBy(RecentSearchWord::getSearchWord,Collectors.counting()))).keySet();
    }

    @GetMapping("/getRecommendBySearching/{searchWord}")
    public ArrayList<Object> getRecommendBySearching(@PathVariable String searchWord){
        box.clear();
        Map<String, Double> similarities = searchRecommendBatch.getSimilarities(searchWord);
        box.add(proxy.sortByValue(similarities).keySet().stream().limit(10));
        box.add(proxy.sortByValue(similarities).values().stream().limit(10));
        return box.getList();
    }
}