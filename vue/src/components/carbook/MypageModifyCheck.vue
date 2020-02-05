<template>
<div class="wrap">
<div id="Rnewcontents">
	<div class="layer_edit" id="layer_edit">
		<div class="editnew">
			<div class="login_user">
				<h3><img src="https://www.kcar.com/resources/images/common/pass_input.gif" alt="비밀번호입력"></h3>
				<div class="id_pass_bx">
					<div class="id_pass">
						<strong><label for="input_id"><img src="https://www.kcar.com/resources/images/common/login_id.gif" alt="아이디"></label></strong>
						<p id="input_id">{{this.$store.state.user.user.userid}}</p>
					</div>
					<div class="id_pass">
						<strong><label for="loginPass"><img src="https://www.kcar.com/resources/images/common/login_pass.gif" alt="패스워드"></label></strong>
						<p><input type="password" id="loginPass" class="input_pass" v-model="password" maxlength="20" @keyup.enter="check"></p>
					</div>
				</div>
				<div class="login_bt">
					<a class="btn_form_r" @click="check"><b>확인</b></a>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</template>
<script>
	export default {
		data(){
			return{
				password:''
			}
		},
		methods:{
			check(){
				if(this.password=== this.$store.state.user.user.passwd){
					this.$router.push("/mypagemodify")
				}
			}
		}
	}

</script>
<style scoped>

</style>