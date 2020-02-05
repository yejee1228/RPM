const state = {
    title : '' ,
    labels :[] ,
    lineGraphLabels :['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] ,
    barGraphLabels :['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
    rowData : [],
    lineGraphRowData : [10,10,10,10,10,10,10,10,10,10,10,10],
    barGraphRowData : [10,10,10,10,10,10,10,10,10,10,10,10],
    modelNM : [],
    Domestic : [],
    Export : [],
    GrandTotal : [],
    isLineGraph : false ,
    mainCategoryItem : { domestic : 'Domestic' , export : 'Export'},
    subCategoryItem : {PC: 'PC', RV: 'RV', CV: 'CV', total: 'Total' , Etotal : 'Total (excluding CKD)' , GrandTotal : 'Grand Total'},
    GraphItem : { Line : 'Line' , HorizontalBar : 'HorizontalBar'}
}
const getters = {
    title : state => state.title ,
    labels : state => state.labels ,
    lineGraphLabels : state => state.lineGraphLabels,
    barGraphLabels  : state => state.barGraphLabels ,
    rowData : state => state.rowData ,
    lineGraphRowData : state => state.lineGraphRowData ,
    barGraphRowData  : state => state.barGraphRowData  ,
    modelNM : state => state.modelNM ,
    Domestic : state => state.Domestic ,
    Export : state => state.Export ,
    GrandTotals : state => state.GrandTotals,
    mainCategoryItem : state => state.mainCategoryItem ,
    subCategoryItem : state => state.subCategoryItem,
    isLineGraph : state => state.isLineGraph,
    GraphItem : state => state.GraphItem,

}
const actions = {
    async setChartData({ state , commit } , data ){
        let Ddata = []
        let Edata = []
        let label = new Array()

        let GrandTotalData = []
        let rowData = []
        let mainCategory = ''
        let subCategory = ''
        let regExp = /[.,'"]/gi
        let mainCategoryItem = state.mainCategoryItem
        let subCategoryItem = state.subCategoryItem

        const content = data;
        const lines = content.split("\n");
        let title = lines[0].replace(regExp, "");

            label.push('CG')
            label.push('Model')
            lines[2].split(",\"").splice(3).forEach(item => label.push(item.replace("\"", "")))
            //loop all rows
            for (let count = 5; count < lines.length-1; count++) {

                if (lines[count].indexOf(subCategoryItem.GrandTotal) > -1) {
                    lines[count].split(",\"").splice(2)
                        .forEach(item => GrandTotalData.push(item.replace("\"", "")))

                }else if (lines[count].includes(mainCategoryItem.domestic) || lines[count].includes(mainCategoryItem.export)) {
                    mainCategory = lines[count].replace(regExp, "");

                } else if (!lines[count].includes("\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"")) {
                    let rowContent = lines[count].split(",\"", -1);
                    let modelName = ''
                    rowData = []
                    if (rowContent[1].indexOf(subCategoryItem.PC) > -1
                        || rowContent[1].indexOf(subCategoryItem.RV) > -1
                        || rowContent[1].indexOf(subCategoryItem.CV) > -1
                        || rowContent[1].indexOf(subCategoryItem.total) > -1
                        || rowContent[1].indexOf(subCategoryItem.GrandTotal) > -1) {

                        subCategory = rowContent[1].replace(regExp, "");
                    }
                    // loop all cell
                    for (let i = 1; i < rowContent.length; i++) {
                        if (i != 1) rowData.push(rowContent[i].replace(/[.,'"]/gi, ""))
                        if (i == 2) modelName = rowContent[i].replace(/[.,'"]/gi, "")
                    }

                    if (mainCategory == mainCategoryItem.domestic) {
                        Ddata.push({
                            mainCategory: mainCategory,
                            subCategory: subCategory,
                            modelName: modelName,
                            Jan: rowData[1],
                            Feb: rowData[2],
                            Mar: rowData[3],
                            Apr: rowData[4],
                            May: rowData[5],
                            Jun: rowData[6],
                            Jul: rowData[7],
                            Aug: rowData[8],
                            Sep: rowData[9],
                            Oct: rowData[10],
                            Nov: rowData[11],
                            Dec: rowData[12],
                            Total: rowData[13],
                        })
                    }

                    if (mainCategory == mainCategoryItem.export) {

                        Edata.push({
                            mainCategory: mainCategory,
                            subCategory: subCategory,
                            modelName: modelName,
                            Jan: rowData[1],
                            Feb: rowData[2],
                            Mar: rowData[3],
                            Apr: rowData[4],
                            May: rowData[5],
                            Jun: rowData[6],
                            Jul: rowData[7],
                            Aug: rowData[8],
                            Sep: rowData[9],
                            Oct: rowData[10],
                            Nov: rowData[11],
                            Dec: rowData[12],
                            Total: rowData[13]
                        })
                    }
                }
            }
            commit('SETCHARTDATA'
                , {
                    title: title,
                    labels: label,
                    mainCategory: mainCategoryItem.domestic,
                    data: Ddata,
                    GrandTotal : {
                        mainCategory: mainCategoryItem.domestic ,
                        subCategory: subCategoryItem.GrandTotal,
                        modelName: '',
                        Jan: GrandTotalData[1],
                        Feb: GrandTotalData[2],
                        Mar: GrandTotalData[3],
                        Apr: GrandTotalData[4],
                        May: GrandTotalData[5],
                        Jun: GrandTotalData[6],
                        Jul: GrandTotalData[7],
                        Aug: GrandTotalData[8],
                        Sep: GrandTotalData[9],
                        Oct: GrandTotalData[10],
                        Nov: GrandTotalData[11],
                        Dec: GrandTotalData[12],
                        Total: GrandTotalData[13]
                    }
                })

        commit('SETCHARTDATA'
                , {
                    title: title,
                    labels: label,
                    mainCategory: mainCategoryItem.export,
                    data: Edata,
                    GrandTotal : {
                        mainCategory: mainCategoryItem.export ,
                        subCategory: subCategoryItem.GrandTotal,
                        modelName: '',
                        Jan: GrandTotalData[1],
                        Feb: GrandTotalData[2],
                        Mar: GrandTotalData[3],
                        Apr: GrandTotalData[4],
                        May: GrandTotalData[5],
                        Jun: GrandTotalData[6],
                        Jul: GrandTotalData[7],
                        Aug: GrandTotalData[8],
                        Sep: GrandTotalData[9],
                        Oct: GrandTotalData[10],
                        Nov: GrandTotalData[11],
                        Dec: GrandTotalData[12],
                        Total: GrandTotalData[13]
                    }
                })
    },
    async UpdateChartData( { commit } , data ) {
        commit( 'UPDATECHARTDATA' , data )
    },
    async drawingChartByModel( { commit } , data ) {
        commit( 'DRAWINGCHARTBYMODEL' , data )
    },
    async changeGraph ( { commit } , data ) {
        commit( 'CHANGEGRAPH' , data )
    },
    async LineGraphDataSetup ( { commit } , data ) {
        commit ( 'LINEGRAPHDATASETUP' , data )
    }
}
const mutations = {
    SETCHARTDATA ( state , data ) {

        if (data.mainCategory === state.mainCategoryItem.domestic ) {
            state.Domestic = data.data
            state.title = data.title
            state.labels = data.labels
            state.GrandTotal = data.GrandTotal
        }

        if (data.mainCategory === state.mainCategoryItem.export ) state.Export = data.data
    },
    UPDATECHARTDATA ( state , data ) {
        //state.labels.push(label);
        state.Domestic[data.index].Jan = data.hasText
        state.Domestic[data.index].Total =  Number(state.Domestic[data.index].Jan)
                                            + Number(state.Domestic[data.index].Feb)
                                            + Number(state.Domestic[data.index].Mar)
                                            + Number(state.Domestic[data.index].Apr)
                                            + Number(state.Domestic[data.index].May)
                                            + Number(state.Domestic[data.index].Jun)
                                            + Number(state.Domestic[data.index].Jul)
                                            + Number(state.Domestic[data.index].Aug)
                                            + Number(state.Domestic[data.index].Sep)
                                            + Number(state.Domestic[data.index].Oct)
                                            + Number(state.Domestic[data.index].Nov)
                                            + Number(state.Domestic[data.index].Dec)

        let subTotalIndex = state.Domestic.filter( item => item.subCategory === state.Domestic[data.index].subCategory).length
        let subTotal = 0
        for (let i = 0; i < subTotalIndex-1 ; i++) {
            subTotal += Number(state.Domestic[i].Jan)
        }
        state.Domestic[subTotalIndex-1].Jan = subTotal
    },
    DRAWINGCHARTBYMODEL ( state , data ) {
        state.title = data.labels ;
        for (let i = 2; i < data.length ; i++) {
            state.barGraphRowData.push(data[i])
        }
    },
    CHANGEGRAPH ( state , data ) {
        switch ( data ) {
            case 'Line' : state.isLineGraph = true
                break
            case 'HorizontalBar' : state.isLineGraph = false
                break
        }
    },
    LINEGRAPHDATASETUP ( state , data ) {
        state.lineGraphLabels = data.labels
        state.data = data.data
    }
}
export default {
    name: 'decenter',
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}