<template>

    <div style ="margin : 0 auto"> <form action="#" class="contact-form">
        <input v-model="rdate" type="text" placeholder="날짜"/>
        <input v-model="servicecode" type="text" placeholder="주유/정비"/>
        <input v-model="detail" type="text" placeholder="상세"/>
        <input v-model="price" type="text" placeholder="금액"/>
        <button @click.prevent="callAddRecord" type="submit" class="site-btn">추가</button>
    </form></div>

</template>

<script>

    export default {
        name: "addModal",
       data(){
           return {
               mycar: JSON.parse(localStorage.getItem("mycar")),
               rdate: '',
               servicecode: '',
               detail: '',
               price : ''


           }
       },
        methods:{
            callAddRecord(){
                console.log('price ' + this.price)
               this.$store.dispatch('carbook/addRecord',  {
                   //mycarId : this.getcarId,
                   date: this.rdate,
                   serviceCode: this.servicecode,
                   detail : this.detail,
                   price: this.price
               })



            }

        },
        computed:{
            getcarId(){
                return this.mycar.mycarId

            }
        }

    }
</script>

<style scoped>

</style>