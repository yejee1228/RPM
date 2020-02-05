<template>
<div id="kakaoWrap" style="margin:0 auto;">
<link href="//t1.daumcdn.net/localimg/localimages/07/common/kakaomap_favicon.ico" rel="shortcut icon">
<link rel="stylesheet" type="text/css" href="//t1.daumcdn.net/kakaomapweb/place/jscss/pc.7753f521.css">
	<div id="kakaoContent" role="main" class="cont_mapdetail" style="margin:0 auto;">
    <div class="dimmed_layer hide"></div>
    <div id="mArticle">
        <div data-viewid="basicInfo" class="cont_essential">
    <div data-viewid="basicInfoTop" data-root="">
    <div class="details_present">
        <a href="#none" class="link_present" data-logtarget="" data-logevent="info_pannel,main_pic">
            <span class="frame_g"></span>
        </a>
    </div>
    <div class="place_details">
        <div class="inner_place">
            <h2 class="tit_location">장안동충전소</h2>
           
            <strong class="screen_out">위치 정보 및 공유하기</strong>
           
            <a href="#none" class="link_bookmark " data-fid="" data-logtarget="" data-logevent="info_pannel,favorite">
                <span class="ico_comm ico_bookmark">즐겨찾기 추가</span>
                <span class="ico_num ico_num"><span class="screen_out">나의 즐겨찾기 폴더 개수</span></span>
            </a>

        </div>
    </div>
    
</div>
    <div data-viewid="basicInfo" data-root="" class="details_placeinfo">
    <h3 class="tit_subject">상세정보</h3>
    <div class="placeinfo_default">
        <h4 class="tit_detail"><span class="ico_comm ico_address">위치</span></h4>
        <div class="location_detail">
            <span class="txt_address">서울 동대문구
                천호대로 353
                 (우)02633</span>
            <span class="txt_addrnum">지번<span class="bg_bar"></span>장안1동 413-6</span>
        </div>
    </div>
        <div class="placeinfo_default placeinfo_contact">
            <h4 class="tit_detail"><span class="ico_comm ico_contact">연락처</span></h4>
            <div class="location_detail "><!-- btn_more 클릭 했을 때 open_on 추가 -->
                <div class="location_present">
                    <span class="num_contact"><span class="txt_contact">02-2214-5151</span><span class="color_g"> 대표번호</span></span>
                    
                </div>
            </div>
        </div>
        <div class="placeinfo_default placeinfo_facility">
            <h4 class="tit_facility"><span class="ico_comm ico_installation"></span>시설정보</h4>
            <ul class="list_facility">
                    <li>
                        <span class="ico_comm ico_nocarwash"></span>
                        <span class="color_g">세차장<span class="screen_out">없음</span></span>
                    </li>
                    <li>
                        <span class="ico_comm ico_noconvenient"></span>
                        <span class="color_g">편의점<span class="screen_out">없음</span></span>
                </li>
                    <li>
                        <span class="ico_comm ico_lpg"></span>
                        <span class="color_g"><span class="screen_out">LPG</span>충전소</span>
                    </li>
                    <li>
                        <span class="ico_comm ico_nogarage"></span>
                        <span class="color_g">경정비<span class="screen_out">없음</span></span>
                    </li>
                    <li>
                        <span class="ico_comm ico_noselfoil"></span>
                        <span class="color_g">셀프주유<span class="screen_out">없음</span></span>
                    </li>
            </ul>
        </div>
    <span class="info_revise">업데이트 <span class="date_revise">2018.02.23.</span> <span class="bg_bar">|</span> <a href="#" class="link_fiy" data-fiytype="detail" data-logtarget="" data-logevent="main_info,FIY">틀린정보 신고</a></span>
</div>
</div>
        
        
        
        <div data-viewid="oilStation" data-root="" class="cont_oil">
    <h3 class="tit_subject">주유가격</h3>
    <strong class="special_infooffer">제공
        <a href="http://www.knoc.co.kr/" class="link_offer" data-logtarget="" data-logevent="additional_info,gas,provider" target="_blank">
            <img src="//t1.daumcdn.net/localimg/localimages/07/2017/ci/pc/_img_ci_opinet.png" height="26" class="img_offer" alt="K NOC 한국석유 공사 Opinet">
        </a>
    </strong>
    <ul class="list_specific2">
            <li>
                <em class="screen_out">종류: </em><span class="specific_sort">LPG</span>
                <em class="specific_price">
                    <span class="screen_out">가격: </span>872원
                    <span class="avr_specific">(국내평균 821원)</span>
                </em>
            </li>
    </ul>
    <p class="specific_caution">위 가격정보는 특정시점에 조사되어 실제와 다를 수 있습니다. (2020.01.01. 기준 | 원/L)</p>
</div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
  
       
        
  
        <div id="photoList" class="map_layer hide"></div>
        <div id="roughMap" class="map_layer hide">
    <iframe data-id="frame" frameborder="0" border="0" class="frame" src="" style="width: 1017px; height: 693px;"></iframe>
</div>

        <div data-viewid="fiyLayer" data-root="" id="fiyModalLayer" style="display:none">
    <div class="fiy_wrap">
        <iframe frameborder="0" border="0" class="fiyFrame" src=""></iframe>
    </div>
    <div class="modal_bg"></div>
</div>
        <div data-viewid="fiyLoginLayer" data-root="" class="fiy_layer" style="display:none">
    <div class="inner_fiy_layer">
        <div class="layer_head"><strong class="tit_fiy">정보수정</strong></div>
        <div class="layer_body">
            <p class="desc_fiy">로그인을 하시면<br>요청 결과를 안내해드립니다</p>
            <div class="wrap_btn">
                <a href="#none" class="btn_fiy btn_kakao"><span class="inner_btn">카카오계정으로 로그인</span></a>
            </div>
            <button type="button" class="btn_fiy2">로그인 하지 않습니다</button>
        </div>s
    </div>
</div>
    </div>
</div>
</div>
</template>