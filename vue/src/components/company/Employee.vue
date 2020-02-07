<template>
    <div>
        <div class="employee_head">
            <h4>직원안내</h4>
        </div>
        <!-- 전체사원 -->
        <div class="employee_list" id="empl_all" style="display: block;">
            <div id="employee_list" v-for="col of em_col" :key="col.emCode">
                <table>
                    <tr>
                        <td>
                            <span class="img"><img  src="@/assets/image/user_default.jpg" alt="이학성"></span>

                        </td>
                        <td><span class="employeeTxt">{{col.emPosition}}<br>{{col.emName}}</span></td>
                    </tr>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from'axios'
    export default {
        name: "employee",
        data(){
            return{
                context:'http://localhost:8080',
                em_row:[0,1,2,3,4],
                em_col:[],

            }
        },
        created(){
            axios
                .get(`${this.context}/employee/employeeList/`+localStorage.getItem("userId"))
                .then(res=>{

                    res.data.result.forEach(el=>{
                        this.em_col.push(el)

                    })
                })
                .catch(e=>{
                    alert(`axios fail${e}`)
                })
        }
    }
</script>

<style scoped>
    #employee_list{
        position: relative;
        float: left;
        width: 216px;
        height: 120px;
        padding-left: 20px;
        border-bottom: none;
    }
    .img img{
        width: 67px;
        height: 90px;
    }
    .employeeTxt{
        display: block;
        padding: 0px 0 0 50px;
        font-size: 13px;
        color: #555555;

    }

    .employee_head{
        border-bottom: black;
    }
</style>