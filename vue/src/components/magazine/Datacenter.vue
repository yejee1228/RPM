<template>
    <div id="app">
        <div class="container">
        <div class="mc_search1">
            <ul>
                <li>
                    <line-graph  ref="monthRevenue"
                                 v-if="isLineGraph"
                                 :data="LineGraphDataSetup"/>
                    <horizontal-bar-graph  ref="modelRevenue"
                                           v-if="!isLineGraph"
                                           :data="BarGraphDataSetup"/>
                </li>
            </ul>
        </div>
        <div>
            <div class="fileuploadSection">
                <div class="filetitle">{{title}}</div>
                <div class="fileBox">
                    <input type="text" class="fileName" readonly="readonly" :value="fileName">
                    <label for="uploadBtn" class="btn_file">찾아보기</label>
                    <input type="file" id="uploadBtn" class="uploadBtn" accept=".csv" @change="processFile" required/>
                </div>
            </div>
        </div>

        <div class="tab">
            <button class="tablinks" @click="openCity('onClick', 'Domestic')" id="defaultOpen">Domestic</button>
            <button class="tablinks" @click="openCity('onClick','Export')">Export</button>
            <button class="tablinks" @click="openCity('onClick', 'Model')">Model</button>
        </div>

        <!-- Tab content -->
        <div id="Domestic" class="tabcontent">
            <table id='DomesticTable'>
                <th v-for=" ( month , index )  of labels " :key=" index ">
                    <td class="labelHead" >
                        {{ month }}
                    </td>
                </th>
                <tr v-for=" ( d , index ) of Domestic" :key=" d.Total ">
                    <td class="subCate"
                        :colspan="DcolspanNum( d.subCategory )"
                        :rowspan=" DrowspanNum( d.subCategory ) "
                        v-if=" DrowspanSetting( d.subCategory , index ) ">
                            {{ d.subCategory }}
                    </td>
                    <td class="model"
                        @click="drawingChartByModel( d )"
                        v-if="TotcolspanSetting( d.subCategory )">
                            {{ d.modelName }}
                    </td>
                    <td class="month"
                        @dblclick="ctf( index , i + 3 )"
                        @focusout="ctfsave( index , i + 3 , d) "
                        v-for=" ( month , i ) of d.monthRevenue "
                        :key="i">
                            {{ month |thousandFormatter }}
                    </td>
                    <td class="month"> {{ d.Total | thousandFormatter }} </td>
                </tr>
                <tr>
                    <td class="subCate" colspan="2"> <h1>{{ GrandTotal.subCategory }} </h1></td>
                    <td class="month" v-for=" ( month , i ) of GrandTotal.monthRevenue " :key="i"> {{ month | thousandFormatter }}</td>
                    <td class="month"> {{ GrandTotal.Total | thousandFormatter }}</td>
                </tr>
            </table>
            <div class="exportCSV">
            <button @click="csvExport(Domestic)"  class="btn_file" > Export to CSV</button>
            </div>
        </div>

        <div id="Export" class="tabcontent">
            <table id='ExportTable'>
                <th v-for="month of labels"
                    :key="month">
                    <td class="labelHead" >
                        {{ month }}
                    </td>
                </th>
                <tr v-for=" ( e , index ) of Export" :key="e.Total">
                    <td class="subCate"
                        :colspan="EcolspanNum( e.subCategory )"
                        :rowspan=" ErowspanNum( e.subCategory )"
                        v-if="ErowspanSetting( e.subCategory , index )">
                            {{ e.subCategory }}
                    </td>
                    <td class="model" v-if="TotcolspanSetting( e.subCategory )"> {{ e.modelName }}</td>
                    <td class="month" v-for=" ( month , i ) of e.monthRevenue " :key="i"
                        @dblclick="ctf( index , i + 3 )"
                        @focusout="ctfsave( index , i + 3 , e) ">
                            {{ month |thousandFormatter }}
                    </td>
                    <td class="month"> {{ e.Total | thousandFormatter }}</td>
                </tr>
                <tr>
                    <td class="subCate" colspan="2"><h1>{{ GrandTotal.subCategory }}</h1></td>
                    <td class="month" v-for=" ( month , i ) of GrandTotal.monthRevenue " :key="i"> {{ month | thousandFormatter }}</td>
                    <td class="month"> {{ GrandTotal.Total | thousandFormatter }}</td>
                </tr>
            </table>
            <div class="exportCSV">
                <button @click="csvExport(Export)" class="btn_file" > Export to CSV</button>
            </div>
        </div>
        <div id="Model" class="tabcontent">
            <div class="beforeOpen"> 서비스 준비중 입니다. </div>
        </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import LineGraph from './chartjs/lineExample'
    import HorizontalBarGraph from './chartjs/horizontalBarExample'

    export default {
        name: "datacenterChart",
        components: {
            'line-graph' : LineGraph,
            'horizontal-bar-graph': HorizontalBarGraph
        },
        data: function () {
            return {
                fileName: '',
                flag: false ,
                LineGraphDataSetup :  {labels : ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]  , title: 'CSV 파일을 올려주세요 ' , lineGraphRowData: [10,10,10,10,10,10,10,10,10,10,10,10] },
                BarGraphDataSetup : ''
            }
        },
        computed: {
            ...mapState({
                labels: state => state.decenter.labels,
                title: state => state.decenter.title,
                lineGraphTitle: state => state.decenter.lineGraphTitle,
                Domestic: state => state.decenter.Domestic,
                Export: state => state.decenter.Export,
                mainCategoryItem: state => state.decenter.mainCategoryItem,
                subCategoryItem: state => state.decenter.subCategoryItem,
                GrandTotal: state => state.decenter.GrandTotal,
                GraphItem: state => state.decenter.GraphItem,
                isLineGraph : state => state.decenter.isLineGraph,
                lineGraphLabels : state => state.decenter.lineGraphLabels,
                barGraphLabels  : state => state.decenter.barGraphLabels ,
                lineGraphRowData : state => state.decenter.lineGraphRowData ,
                barGraphRowData  : state => state.decenter.barGraphRowData
            }),
            TF() {
                return this.flag
            }
        },
        methods: {
            drawingChartByMonth( monthIndex ) {
                this.$store.dispatch('decenter/drawingChartByMonth', { monthIndex : monthIndex -2 })
                this.BarGraphDataSetup =  {labels : this.barGraphLabels , title: 'title' , barGraphRowData: this.barGraphRowData  }
                this.$store.dispatch('decenter/changeGraph',  this.GraphItem.HorizontalBar )
                this.$refs.modelRevenue.dataInit(this.BarGraphDataSetup)
            },
            drawingChartByModel( targetItem ) {
                this.$store.dispatch('decenter/drawingChartByModel', { targetItem : targetItem })
                this.LineGraphDataSetup = {labels : this.lineGraphLabels , title: this.lineGraphTitle , lineGraphRowData: this.lineGraphRowData }
                this.$store.dispatch('decenter/changeGraph', this.GraphItem.Line )
                this.$refs.monthRevenue.dataInit(this.LineGraphDataSetup)

            },
            thousandFormatter(value) {
                return (value === undefined || value === '') ? 0
                    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            ctf(tr, td ) {
                if (this.flag) return alert('작업 중인 셀을 완료해주세요');
                this.flag = !this.flag
                let calcTd = this.DrowspanSetting(this.Domestic[0].subCategory, tr) ? 0 : -1
                calcTd += td
                let calcTr = tr + 16
                var baseElement = document.querySelector("#DomesticTable > tr:nth-child(" + calcTr + ") > td:nth-child(" + calcTd + ")");
                if (this.flag) {
                    baseElement.innerHTML = "<input style=\"text-align: right\" placeholder=\"" + this.thousandFormatter(this.Domestic[tr].monthRevenue[calcTd]) + "\" id = \"innerinput\" >"
                }

            },
            ctfsave(tr, td , targetItem ) {
                //this.flag = false
                let calcTd = this.DrowspanSetting(this.Domestic[0].subCategory, tr) ? 0 : -1
                    calcTd += td
                let calcTr = tr + 16
                var baseElement = document.querySelector("#DomesticTable > tr:nth-child(" + calcTr + ") > td:nth-child(" + calcTd + ")");
                let hasText = baseElement.querySelector("input").value
                baseElement.innerHTML = ''
                this.$store.dispatch('decenter/UpdateChartData', {index: tr, monthIndex : td - 3  , inputIndex : calcTd ,  hasText: hasText})
                this.flag = false
                if (this.isLineGraph) this.drawingChartByModel(targetItem)
                else this.drawingChartByMonth(td - 1)
            },
            csvExport(arrData) {
                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += this.title + "\n";
                csvContent += "\"" + [
                    Object.keys(arrData[0]).join("\",\""),
                    ...arrData.map(item => Object.values(item).join("\",\""))
                ]
                    .join("\"\n\"")
                    .replace(/(^\[)|(\]$)/gm, "");

                const data = encodeURI(csvContent);
                const link = document.createElement("a");

                let createdTime = new Date();
                link.setAttribute("href", data);
                link.setAttribute("download", this.title+' ('+this.getFormatDate(createdTime)+").csv");
                link.click();
            },
            getFormatDate(date){
                var year = date.getFullYear();              //yyyy
                var month = (1 + date.getMonth());          //M
                month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
                var day = date.getDate();                   //d
                day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
                return  year + '' + month + '' + day;
            },
            /**
             * @return {boolean}
             */
            DrowspanSetting: function (subCategoty, index) {

                switch (subCategoty) {
                    case this.subCategoryItem.PC :
                        return (index === 0)
                    case this.subCategoryItem.RV :
                        return (index - this.Domestic.filter(item => item.subCategory === this.subCategoryItem.PC).length === 0)
                    case this.subCategoryItem.CV :
                        return ((this.Domestic.length - 1) - (index + this.Domestic.filter(item => item.subCategory === this.subCategoryItem.CV).length) === 0)
                    case this.subCategoryItem.total :
                        return true
                }
            },
            /**
             * @return {boolean}
             */
            ErowspanSetting: function (subCategory, index) {

                switch (subCategory) {
                    case this.subCategoryItem.PC :
                        return (index === 0)
                    case this.subCategoryItem.RV :
                        return (index - this.Export.filter(item => item.subCategory === this.subCategoryItem.PC).length === 0)
                    case this.subCategoryItem.CV :
                        return ((this.Export.length - 1) - (index + this.Export.filter(item => item.subCategory === this.subCategoryItem.CV).length) === 0)
                    case this.subCategoryItem.Etotal :
                        return true
                }
            },
            TotcolspanSetting: function (subCategory) {
                return (!(this.subCategoryItem.Etotal === subCategory || this.subCategoryItem.total === subCategory))
            },
            DrowspanNum: function (subCategory) {
                return (subCategory !== this.subCategoryItem.total) ?
                    this.Domestic.filter(item => item.subCategory === subCategory).length
                    : 1
            },
            DcolspanNum: function (subCategory) {
                return (subCategory === this.subCategoryItem.total) ? 2 : 1
            },
            ErowspanNum: function (subCategory) {
                return (subCategory != this.subCategoryItem.Etotal) ?
                    this.Export.filter(item => item.subCategory === subCategory).length
                    : 1
            },
            EcolspanNum: function (subCategory) {
                return subCategory === this.subCategoryItem.Etotal ? 2 : 1
            },
            processFile: function () {


                var theFile = document.getElementById("uploadBtn");
                var regExp = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

                if (regExp.test(theFile.value.toLowerCase())) {
                    if (typeof (FileReader) != "undefined") {
                        const myReader = new window.FileReader();
                        this.fileName = theFile.value.replace(/^([a-zA-Z0-9\s_\\.\-:])/, "").replace(":\\fakepath\\", "")
                        myReader.onload = (e) => {

                            const content = e.target.result;
                            this.$store.dispatch('decenter/setChartData', content)

                        }
                        myReader.readAsText(theFile.files[0]);
                        document.getElementById('defaultOpen').click()

                        this.LineGraphDataSetup = { title : this.title, labels : this.lineGraphLabels, lineGraphRowData : this.lineGraphRowData}

                    } else {
                        alert("This browser does not support HTML5.");
                    }
                } else {
                    alert("Please upload a valid CSV file.");
                }
                return false;
            },
            openCity: function (evt, mainCategory) {

                var i, tabcontent, tablinks;

                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }

                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    if (tablinks[i] != undefined)
                        tablinks[i].className = tablinks[i].className.replace(" active", "");
                }

                document.getElementById(mainCategory).style.display = "block";
                if (evt.currentTarget != undefined)
                    evt.currentTarget.className += " active";
            }
        },
        filters: {
            thousandFormatter: function (value) {
                return (value === undefined || value === '') ? 0
                    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
</script>

<style scoped>
    #app {
        padding-bottom: 100px;
    }

    /* Style the tab */
    .tab {
        overflow: hidden;
        border: 1px solid #b9d0d6;
        background-color: #ffffff;

    }

    /* Style the buttons that are used to open the tab content */
    .tab button {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
        width: 33.3333%;
        font-weight: bold;
    }

    .tab button:hover {
        background-color: #0a6ea9;
        color: white;
    }

    /* Create an active/current tablink class */
    .tab button.active {
        background-color: #0a6ea9;
    }

    .tablinks {

    }

    /* Style the tab content */
    .tabcontent {
        display: none;
        padding: 6px 0px;
        border: 1px solid #b9d0d6;
        border-top: none;
        font-family: 'Helvetica', Arial;
        color: #464646;
        text-transform: uppercase;
        border-bottom: 1px solid #f1f1f1;
        margin-top: 0;
    }

    .tabcontent {
        animation: fadeEffect 1s; /* Fading effect takes 1 second */
    }

    @keyframes fadeEffect {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    #DomesticTable, #ExportTable {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
    }

    td {
        text-align: left;
        padding: 10px;
    }

    th {
        border: 1px solid #f5f5f5;
    }

    td:hover {
        background-color: #f5f5f5;
    }

    tr:nth-child(even) .month {
        background-color: #ebf6ff;
    }

    .month {
        text-align: right;
    }
    .container{
        width: 1200px;
    }
    .labelHead, .subCate {
        padding-left: 10px;
    }

    .subCate, .model {
        border: 1px solid #f5f5f5;
    }

    .subCate {
        width: 60px;
    }

    .fileuploadSection {
        width: 100%;
        margin: 30px 0 30px 0;
        background: #ffffff;
        border: 1px solid #b9d0d6;
        height: 53px;
        position: relative;
        display: inline-flex;
        text-align: right;
        padding: 20px 0 0;
        font-family: 'Helvetica', Arial;
    }

    input#innerinput {
        max-width: 60px;
        text-align: right;
    }

    .filetitle {
        text-align: left;
        padding-left: 30px;
        width: 40%;
        line-height: 30px;
        font-size: 15px;
    }

    .fileBox {
        width: 50%;
        float: right
    }

    .fileBox .fileName {
        display: inline-block;
        width: 400px;
        height: 30px;
        padding-left: 10px;
        margin-right: 5px;
        line-height: 30px;
        border: 1px solid #aaa;
        background-color: #fff;
        vertical-align: middle;
        font-family: 'Helvetica', Arial;
    }

    .fileBox .btn_file {
        display: inline-block;
        border: 1px solid #000;
        width: 100px;
        height: 30px;
        font-size: 0.8em;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        margin-right: 0px
    }

    .fileBox input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        bord: 0
    }
    .beforeOpen{
        width: 100%;
        height: 300px;
        text-align: center;
        padding-top: 140px;
        font-size: 30px;
    }
    .exportCSV{
        margin: 10px 10px 0px 10px;
    }
    .exportCSV .btn_file{
        display: inline-block;
        border: 1px solid #000;
        width: 100px;
        height: 30px;
        font-size: 0.8em;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        margin-right: 0px
    }

</style>