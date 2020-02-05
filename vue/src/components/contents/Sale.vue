<template >

<div id="content">	
<dl class="user_info gulim f12px">
<dt>이름</dt>
<dd class="item1 style1">강성조</dd>
<dt>연락처</dt>
<dd class="item2 style1">010-3075-1222 / </dd>
<dt>판매지역</dt>
<dd class="item1 style2">
<select id="area_sido" name="area_sido" class="border_all f12px black" style="width:80px; height:20px; background-color:#f7f7f7;" onchange="javascript:put_options('http://register.passo.co.kr/register/common/region_gugun.php?sido=' + encodeURIComponent(this.value), 'area_gugun', '', '시,구(군)선택');">

<option value="Default">시(도)선택</option><option value="서울">서울</option><option value="강원">강원</option><option value="대전">대전</option><option value="충남">충남</option><option value="세종">세종</option><option selected="selected" value="충북">충북</option><option value="인천">인천</option><option value="경기">경기</option><option value="광주">광주</option><option value="전남">전남</option><option value="전북">전북</option><option value="부산">부산</option><option value="경남">경남</option><option value="울산">울산</option><option value="제주">제주</option><option value="대구">대구</option><option value="경북">경북</option></select>
<select id="area_gugun" name="area_gugun" class="border_all f12px black" style="width:100px; height:20px; background-color:#f7f7f7;">

<option value="Default">시,구(군)선택</option><option value="괴산군">괴산군</option><option value="단양군">단양군</option><option value="보은군">보은군</option><option value="영동군">영동군</option><option value="옥천군">옥천군</option><option value="음성군">음성군</option><option value="제천시">제천시</option><option value="증평군">증평군</option><option value="진천군">진천군</option><option value="청원군">청원군</option><option value="청주시 상당구">청주시 상당구</option><option value="청주시 흥덕구">청주시 흥덕구</option><option value="충주시">충주시</option></select>
</dd>
<dt>통화가능시간</dt>
<dd class="item2 style2">
<select id="contact_time1" name="contact_time1" class="border_all f12px black" style="width:80px; height:20px; background-color:#f7f7f7;">
<option value="00:00">오전 00시</option>
<option value="01:00">오전 01시</option>
<option value="02:00">오전 02시</option>
<option value="03:00">오전 03시</option>
<option value="04:00">오전 04시</option>
<option value="05:00">오전 05시</option>
<option value="06:00">오전 06시</option>
<option value="07:00">오전 07시</option>
<option value="08:00">오전 08시</option>
<option value="09:00">오전 09시</option>
<option value="10:00">오전 10시</option>
<option value="11:00">오전 11시</option>
<option value="12:00">오후 12시</option>
<option value="13:00">오후 01시</option>
<option value="14:00">오후 02시</option>
<option value="15:00">오후 03시</option>
<option value="16:00">오후 04시</option>
<option value="17:00">오후 05시</option>
<option value="18:00">오후 06시</option>
<option value="19:00">오후 07시</option>
<option value="20:00">오후 08시</option>
<option value="21:00">오후 09시</option>
<option value="22:00">오후 10시</option>
<option value="23:00">오후 11시</option>
</select>
~
<select id="contact_time2" name="contact_time2" class="border_all f12px black" style="width:80px; height:20px; background-color:#f7f7f7;">
<option value="00:00">오전 00시</option>
<option value="01:00">오전 01시</option>
<option value="02:00">오전 02시</option>
<option value="03:00">오전 03시</option>
<option value="04:00">오전 04시</option>
<option value="05:00">오전 05시</option>
<option value="06:00">오전 06시</option>
<option value="07:00">오전 07시</option>
<option value="08:00">오전 08시</option>
<option value="09:00">오전 09시</option>
<option value="10:00">오전 10시</option>
<option value="11:00">오전 11시</option>
<option value="12:00">오후 12시</option>
<option value="13:00">오후 01시</option>
<option value="14:00">오후 02시</option>
<option value="15:00">오후 03시</option>
<option value="16:00">오후 04시</option>
<option value="17:00">오후 05시</option>
<option value="18:00">오후 06시</option>
<option value="19:00">오후 07시</option>
<option value="20:00">오후 08시</option>
<option value="21:00">오후 09시</option>
<option value="22:00">오후 10시</option>
<option value="23:00">오후 11시</option>
</select>
</dd>
</dl>









<!-- 팝업 화면 사용시 사용 -->
<form name="popFrm" method="post" action="">
<input type="hidden" name="i_arrCarCd" value="EC60306284">
<input type="hidden" name="i_sCarCd" value="EC60306284">
<input type="hidden" name="i_sFlag" id="i_sFlag" value="">
</form>

<!-- 지점 동급 리스트 더보기 -->
<form name="moreFrm" method="post" action="">
</form>

<form name="frm" method="post" action="">
<input type="hidden" name="i_sReturnPars" value="">
<input type="hidden" name="i_sReturnUrl" value="/car/search/car_search_list.do">
<input type="hidden" name="i_sCarCd" value="EC60306284">
<input type="hidden" name="i_sFlagSame" value="">
<input type="hidden" name="i_sEmail" value="namdohyen@kcar.com">
<input type="hidden" name="carInfoUrl" id="carInfoUrl" value="/car/info/car_info_detail.do?i_sCarCd=EC60306284">
<input type="hidden" name="i_sStatus" value="">
<input type="hidden" name="s_MEMBER_MOBILE" value="">
<input type="hidden" name="i_sCarNumber" value="278노2605">
<input type="hidden" name="i_sEncarCd" value="60306284">
<input type="hidden" name="i_sMakeName" value="르노삼성">
<input type="hidden" name="i_sModelName" value="QM3">
<input type="hidden" name="i_sClassName" value="RE ">
<input type="hidden" name="i_sUserCenterName" value="김포직영점">
<input type="hidden" name="i_sUserName" value="남도현">
<input type="hidden" name="i_sUserMobile" value="010-4512-5794">
<input type="hidden" name="i_iMonth" id="i_iMonth" value="36">
<input type="hidden" name="i_iPayMonth" id="i_iPayMonth">
<input type="hidden" name="i_sPayMain" id="i_sPayMain">
<input type="hidden" name="v_vin_num" value="VF12RGJ1DGW141892">

<!--  content 컨텐츠에 따라 변경 필요 -->
<div id="content" class="sub_content">
<div class="border_all" style="width:998px; height:835px;">
<div style="width:974px; margin:0 10px;">
<div class="blank10">&nbsp;</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview1" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_1.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">앞면</span> [필수항목]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image1" name="goods_image1" onchange="javascript:preview_image('1');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview2" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_2.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">측면</span> [필수항목]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image2" name="goods_image2" onchange="javascript:preview_image('2');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview3" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_3.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">후면</span> [필수항목]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image3" name="goods_image3" onchange="javascript:preview_image('3');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview4" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_4.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">실내</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image4" name="goods_image4" onchange="javascript:preview_image('4');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview5" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_5.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">엔진</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image5" name="goods_image5" onchange="javascript:preview_image('5');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview6" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_6.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">계기판</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image6" name="goods_image6" onchange="javascript:preview_image('6');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview7" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_7.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">기어</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image7" name="goods_image7" onchange="javascript:preview_image('7');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview8" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_8.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">시트</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image8" name="goods_image8" onchange="javascript:preview_image('8');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview9" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_9.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">타이어/휠</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image9" name="goods_image9" onchange="javascript:preview_image('9');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview10" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_10.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">트렁크</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image10" name="goods_image10" onchange="javascript:preview_image('10');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview11" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_11.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진1</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image11" name="goods_image11" onchange="javascript:preview_image('11');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview12" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_12.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진2</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image12" name="goods_image12" onchange="javascript:preview_image('12');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview13" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_13.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진3</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image13" name="goods_image13" onchange="javascript:preview_image('13');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview14" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_14.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진4</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image14" name="goods_image14" onchange="javascript:preview_image('14');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview15" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_15.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진5</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image15" name="goods_image15" onchange="javascript:preview_image('15');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview16" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_16.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진6</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image16" name="goods_image16" onchange="javascript:preview_image('16');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview17" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_17.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진7</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image17" name="goods_image17" onchange="javascript:preview_image('17');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview18" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_18.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진8</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image18" name="goods_image18" onchange="javascript:preview_image('18');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview19" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_19.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진9</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image19" name="goods_image19" onchange="javascript:preview_image('19');">
<br>

</div>
</div>
<div class="space20">&nbsp;</div>    			<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:102px;"><img id="img_preview20" src="http://register.passo.co.kr/register/images/passo10/goods/incar/image_input/goods_image_20.gif" style="background-image:;" class="border_all" width="90" height="70"></div>
<div class="fleft gulim f12px black" style="width:358px;">
<div style="width:358px; height:20px; padding-top:10px;"><span class="dark bold">옵션사진10</span> [옵션]</div>
<input type="file" style="width:355px;" class="f12px gulim border_all" id="goods_image20" name="goods_image20" onchange="javascript:preview_image('20');">
<br>

</div>
</div>
<div class="fleft" style="width:477px; height:75px;">
<div class="fleft" style="width:435px; height:41px; padding:10px; background-color:#F7F7F7; border:1px solid #48a30a;">
<div class="fleft" style="width:313px; height:41px; ">
<div class="gulim f12px black bold" style="width:183px; height:17px; padding-top:3px;">외부 동영상 URL 직접입력</div>
<div class="fleft verdana f10px" style="width:183px; height:21px;">
<input id="movie_url_temp" name="movie_url_temp" type="text" style="width:300px; height:14px; padding:2px 0 0 2px; background-color:#f7f7f7; border:1px solid #c4c4c4; " value="">
</div>
</div>
<div class="fleft" style="width:119px; height:41px;">
<a style="cursor:hand" onclick="putMovieUrl();"><img src="http://register.passo.co.kr/register/images/passo10/common/url_btn_none.gif" width="119" height="41" onmouseover="javascript:overImage('none.', 'over.', '', this);" onmouseout="javascript:overImage('over.', 'none.', '', this);" alt=""></a>
<input type="hidden" id="movie_url" name="movie_url" value="">
</div>
</div>
</div>

</div>
</div>

</div>
<div class="detail_float_ban none">
</div>
</form>








<div id="quickLeft" class="quickLeft" style="top: 335px;">
<div class="quickLeftbanner" id="quick_left"></div>
</div>
<div id="quickMenu" class="quickMenu" style="top: 335px;">
<div style="">
</div>	
</div>
<p class="conTop"><a href="#content" class="topBt" style="display: none;"></a></p>
</div>
</template>
<script></script>
<style scoped  ></style>