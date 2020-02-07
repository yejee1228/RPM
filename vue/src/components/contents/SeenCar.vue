<template>
<div id="wrap">
<link rel="shortcut icon" href="https://www.kcar.com/resources/images/common/favicon.ico" type="image/x-icon">
<link rel="icon" href="https://www.kcar.com/resources/images/common/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon-precomposed" href="https://www.kcar.com/resources/images/mobile/common/apple-touch-icon.png">
<link rel="stylesheet" type="text/css"  href="css/re_import.css">
<link rel="stylesheet" type="text/css"  href="css/plugin/selectric.css">
<link rel="stylesheet" type="text/css" href="css/plugin/ion.rangeSlider.css">
<link rel="stylesheet" type="text/css"  href="css/plugin/ion.rangeSlider.skinHTML5.css">
<link rel="stylesheet" type="text/css"  href="css/plugin/uniform.css">
<link rel="stylesheet" type="text/css"  href="css/plugin/jquery.scrollbar.css">
	
		<div id="content" class="content_1180"> 



<div class="sub_content">
	<div class="mypage_CarList lastView">
		<div class="tit_area">
			<h3>최근 본 차량</h3>
			<p>최근 일주일 동안 고객님이 보신 차량입니다. 최근 본 차량을 계속 보관하려면 로그인 후 관심차량에 담아 주세요.</p>
		</div>
		<div class="align_field">
			<div class="align" >
				<span></span>
				<span class="basic" > </span>
			</div>
		<div class="result_list">
			<table>
				<caption>관심차량</caption>
				<colgroup>
					<col style="width: 55px;">
					<col style="width: 190px;">
					<col style="width: 485px;">
					<col style="width: 290px;">
					<col>
				</colgroup>

				<tbody>
				<td class="empty_result" colspan="4" v-show="isAnyCar"><p><span style="font-size: 27px">찾아 보신 조건의 차량이 없습니다!</span><br/>다른 검색어를 입력해주세요.</p>
					<img src="https://www.kcar.com//resources/images/common/ico_empty.jpg" alt="차량없음 이미지">
				</td>
				<tr v-for="seenHistory of seenHistoryList" :key="seenHistory.carcd">
					<td class="check">
						<div class="checker" ><span :class="{checked:seenHistory.checked}"  @click="check(category)"><input type="checkbox" class="uniform" name="v_makecd" value=""></span></div>
					</td>
					<td class="thumb">
						<a href="#" >
							<div class="mark_area"></div>
							<img :src="seenHistory.middleImg" alt="자동차 썸네일">
						</a>
					</td>
					<td class="car_info">
						<ul>
							<li>
								<router-link to="/product" target="_blank"  >
									<a class="name" @click="addHistory(seenHistory)">
										{{seenHistory.truckName}}
									</a>
								</router-link>
							</li>
							<li>
								<span class="price">{{ seenHistory.price | thousandFormatter }}만원 <em></em></span>
							</li>
							<li>
								<span class="md_year">{{ seenHistory.mfrDate | mfrDateFormatter }} &nbsp; ({{ seenHistory.beginYear | beginYearFormatter }}년형)&nbsp;{{ seenHistory.milage | thousandFormatter }}km &nbsp;&nbsp;{{seenHistory.fuelTypecdName}}</span>
							</li>
							<li>
								<b>열람 시간 : </b><span class="seenTime"> {{ seenHistory.seenTime }} </span>
							</li>
						</ul>
					</td>
					<td class="car_opt">
						<div class="mark">
							<span class="tip_list tip_09"><button type="button" class="tip_btn">특옵션</button> </span>
							<span class="tip_list tip_10"><button type="button" class="tip_btn">1인소유</button> <span
									class="tip_hot none"></span></span>
							<span class="tip_list tip_26"><button type="button" class="tip_btn">제조사AS</button> <span
									class="tip_hot none"></span></span>
						</div>
						<ul class="opt_list">
							<li>
								<span>{{seenHistory.categorynm}}</span><span>&nbsp;</span>
							</li>
							<li>
								<span>{{seenHistory.centerRegion}}</span><span>&nbsp;</span>
							</li>
							<li>
								<span>{{seenHistory.passCnt}}  인승</span><span>&nbsp;</span>
							</li>
						</ul>
						<span class="online_buy">{{seenHistory.simpleComment}}</span>
					</td>
					<td class="btn_area">
						<a id="toastid0" href="" class="oline_btn">온라인 구매</a>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="btn_cont">
			<a href="javascript:;" class="delete" onclick="">선택삭제</a>
		</div>
		</div>
	</div>
</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		name: 'seenCar',
		data() {
			return {}
		},
		computed: {
			...mapState({
			seenHistoryList : state => state.contents.seenHistoryList
		}),
		isAnyCar : function(){
			return ( this.$store.state.contents.seenHistoryList.length === 0 )
		}
	},
		methods : {
			check(checkedItem){
				this.$store.dispatch('contents/CHECKER', checkedItem , { root: true })
				this.searchWithCondition()
			}
		},
		filters: {
			mfrDateFormatter: function (value) {
				if (!value) return ''
				value = value.toString()
				return value.slice(2,4)+`년` + value.slice(4,6)+`월식`
			},
			beginYearFormatter: function (value) {
				if (!value) return ''
				value = value.toString()
				return value.slice(2,4)+``
			},
			thousandFormatter: function (value) {
				if (!value) return ''
				if(value.toString().length === 3) return value
				value = value.toString()
				return value.slice( 0 , value.length-3)+`,`+ value.slice(-3,value.length)
			},
		}
	}
</script>
<style scoped>
	.mark {padding-top: 0px; padding-bottom: 20px;}
	.empty_result {
		margin-top: 20px;
	}
	.align_field {
		margin-bottom: 50px;
	}
</style>