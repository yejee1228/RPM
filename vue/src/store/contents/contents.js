import axios from 'axios'

const state = {
    context : 'http://localhost:8081',
    guestid : '',
    carAllCount : '',
    searchResultEmpty : false,
    category1 : [],
    category2 : [],
    category3 : [],
    categoryList:[],
    showCarList : [],
    makerList: [],
    originMakerList: [],
    modelGroupList : [],
    fuelTypeList: [],
    regionList: [],
    checkedItems : [],
    seenHistoryList : [],
    pageLimit : 15,
    pageNum : 1,
    resultLength : 0,
    modelList : [],
    initFlag : false,
    modelListIsOpen : false,
    orderBySub : 'default',
    modelFromMain : '',
    modelTextFromMain : '',
    minPriceFromMain : '',
    maxPriceFromMain : '',
    mainConditionSettingFlag : false,
    carItem : {},
    selectedCondition : {},
    stringMatchList : [],
    minPrice : '' ,
    maxPrice : '' ,
    minMilage : '' ,
    maxMilage : '',
    recentSearchWord : [],
    searchWordRank : [],
    recommendBySearchWordList : []
};
const getters = {
    makerList : state => state.makerList,
    modelList : state => state.modelList,
    regionList : state => state.regionList,
    searchResultEmpty : state => state.searchResultEmpty,
    showCarList : state => state.showCarList,
    fuelTypeList: state => state.contents.fuelTypeList,
    checkedItems : state => state.checkedItems,
    seenHistoryList : state => state.seenHistoryList,
    initFlag : state => state.initFlag,
    modelListIsOpen : state => state.modelListIsOpen,
    resultLength : state => state.resultLength
};
const actions = {
    async init({commit}){
        if(!state.initFlag) {
            axios
                .get(`http://localhost:8080/init`)
                .then(({data}) => {
                    commit('INIT', data)
                })
                .catch(() => {
                    alert('잘못된 요청입니다!')
                })
        }
    },
    async resetCheckedItem ({commit}) {
        commit('RESETCHECKEDITEM')
    },
    async treeConditionControl({commit}, param){
        commit('TREECONDITIONCONTROL', param)
    },
    async getCategory1({commit}, param){
        axios
            .get(`http://localhost:8080/getcategory/`+param.param+'/'+param.column)
            .then(({data})=>{
                commit('CATEGORY1', data)})
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async getCategory2({commit}, param){
        axios
            .get(`http://localhost:8080/getcategory/`+param.param+'/'+param.column)
            .then(({data})=>{
                commit('CATEGORY2', data)})
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async getCategory3({commit}, param){
        axios
            .get(`http://localhost:8080/getcategory/`+param.param+'/'+param.column)
            .then(({data})=>{
                commit('CATEGORY3', data)})
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },

    async searchWithCondition({commit}, param){

        let url = `http://localhost:8080/searchWithCondition`;
        let headers = {
            'authorization': 'JWT fefege..',
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        };
        axios
            .post(url, param ,headers)
            .then(({data})=>
            {
                commit('SEARCHWITHCONDITION',data)
            })
            .catch(()=>
                console.log("들어옴 실패")
            )
    },

    async conditionSelector ({ commit }, targetItem ) {
        commit( 'CONDITIONSELECTOR' , targetItem );
    },
    async addSeenHistory ({ commit }, param ) {
        commit('ADDSEENHISTORY', param );
    },
    async setPageLimit({ commit }, limit){
        commit('PAGELIMIT', limit)
    },
    async pageClick({ commit }, data){
        axios
            .get(`http://localhost:8080/getshowcarlist/`+data.start+'/'+data.end)
            .then(({data})=>{
                commit('SHOWCARLIST', data )})
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async pageNumSetting( { commit } , data ){
        commit( 'PAGENUMSETTING' , data )
    },
    async pageLimitSetting( { commit } , data ){
        commit( 'PAGELIMITSETTING' , data )
    },
    async orderBySubSetting( { commit } , data ){
        commit( 'ORDERBYSUBSETTING' , data )
    },
    async mainSearch( { commit }, conditionList ){
        commit( 'MAINSEARCH' , conditionList )
    },
    async stringMatch({commit}, searchKeyWord){
        axios
            .get(`http://localhost:8080/stringMatch/`+searchKeyWord)
            .then(({data})=>{
                commit('STRINGMATCH', data)
            })
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },

    async setProduct( { commit } , data ){
        commit( 'SETPRODUCT', data )
    },
    async conditionSelectorBySelectBox ( { commit } , data ) {
        commit( 'CONDITIONSELECTORBYSELECTBOX', data )
    },
    async stringMatchModelCHecker ( { commit }) {
        commit( 'stringMatchModelCHecker' )
    },
    async getSearchWordRank({commit}){
        axios
            .get(`http://localhost:8080/searchWordRank`)
            .then(({data})=>{
                commit('GETSEARCHWORDRANK', data)
            })
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async handleRecentSearchWord({commit}, data){
        commit('HANDLERECENTSEARCHWORD',data)
    },
    async getRecommendBySearchWord({commit}, searchWord){
        axios
            .get(`http://localhost:8080/getRecommendBySearching/`+searchWord)
            .then(({data})=>{
                commit('GETRECOMMENDBYSEARCHWORD', data)
            })
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async mainConditionSettingFlagResetter ( { commit } ) {
        commit( 'CHANGEGRAPH' )
    }
};
const mutations = {
    INIT( state , data ) {
        state.guestid = new Date().toISOString()+(Math.floor(Math.random() * 99999) + 1).toString()
        state.carAllCount = data.allCount
        state.resultLength = data.allCount
        state.categoryList = []
        state.fuelTypeList = []
        state.makerList = []
        state.regionList = []
        state.showCarList = []
        state.recommendBySearchWordList = {}

        data.categoryList.forEach( el => {
            state.categoryList.push({
                checked: false,
                bigCategory: 'categoryList',
                code: el.categorycd,
                name: el.categorynm
            })
        })
        data.makerList.forEach( el => {
            state.makerList.push({
                checked: false,
                bigCategory: 'makerList',
                code: el.code,
                name: el.name,
                count: el.count
            })
        })
        state.originMakerList = state.makerList
        data.fuelTypeList.forEach( el => {
            state.fuelTypeList.push({
                checked: false,
                bigCategory: 'fuelTypeList',
                code: el.fuelTyped,
                name: el.fuleTypedName
            })
        })
        data.regionList.forEach( el => {
            state.regionList.push({
                checked: false,
                bigCategory: 'regionList',
                code: el.centerRegionCode,
                name: el.centerRegion
            })
        })
        state.originMakerList = state.makerList
        state.originRegionList = state.regionList
        state.initFlag = true
        for (let list of data.carInitList) {
            state.showCarList.push( list )
        }
    },
    RESETCHECKEDITEM( state ) {
            state.searchResultEmpty = false,
            state.categoryList = [],
            state.showCarList = [],
            state.makerList = [],
            state.originMakerList = [],
            state.modelGroupList = [],
            state.fuelTypeList = [],
            state.regionList = [],
            state.checkedItems = [],
            state.pageLimit = 15,
            state.pageNum = 1,
            state.resultLength = 0,
            state.modelList = [],
            state.modelListIsOpen = false,
            state.initFlag = false,
            state.mainConditionSettingFlag = false
    },
    TREECONDITIONCONTROL ( state, param ) {
        state.modelListIsOpen = !state.modelListIsOpen
        if ( state.modelListIsOpen ) {
            state.makerList = []
            state.makerList.push( param )
        }
    },
    CATEGORY1( state , data ) {
        state.category1 = []
        state.category2 = []
        state.category3 = []
        for ( let i = 0 ; i < data.category.length ; i++ ) {
            state.category1.push({ name : data.category[i] , count : data.count[i] })

        }
    },
    CATEGORY2( state, data ) {
        state.category2 = []
        state.category3 = []
        for ( let i = 0 ; i < data.category.length ; i++ ) {
            state.category2.push({
                checked: false,
                bigCategory: 'modelGroupList',
                name: data.category[i],
                count: data.count[i]
            })

        }

        data.modelList.forEach( item => {
            state.modelList.push({
                checked: false,
                bigCategory: 'modelList',
                name: item.name,
                count: item.count,
                code : item.code
            })
        })

    },
    CATEGORY3( state , data ) {
        state.category3 = []
        for ( let i = 0 ; i < data.category.length ; i++ ) {
            state.category3.push({ name : data.category[i] , count : data.count[i] })
        }
    },

    SEARCHWITHCONDITION( state, data ) {
        state.showCarList = []
        state.resultLength = data.resultLength
        state.pageNum = 1
        if ( data.showCarList )
            for ( let list of data.showCarList ) {
                state.showCarList.push( list )
            }

        state.searchResultEmpty = ( state.resultLength === 0 )

        state.makerList = []

        if ( !state.modelListIsOpen ) {
            data.makerList.forEach( item => {
                state.makerList.push({
                    checked: false,
                    bigCategory: 'makerList',
                    code: item.code,
                    name: item.name,
                    count: item.count
                })
            })
        } else {
            state.makerList.push({
                checked: true,
                bigCategory: 'makerList',
                code: data.makerList[0].code,
                name: data.makerList[0].name,
                count: data.makerList[0].count
            })
        }

        if ( state.modelListIsOpen ) {
            state.modelList = []
            data.modelList.forEach( el => {
                state.modelList.push({
                    checked: ( state.checkedItems.find( checkedItem => el.name === checkedItem.name )) ? true : false,
                    bigCategory: 'modelList',
                    code: el.code,
                    name: el.name,
                    count: el.count
                })
            })
        }
    },
    CONDITIONSELECTOR( state, foundItem ) {
        if ( foundItem.bigCategory.indexOf( 'Range' ) > 0 ) {
            let processingList  = state.checkedItems.filter( item => !(item.bigCategory === foundItem.bigCategory) )
            state.checkedItems = []
            state.checkedItems = processingList
            if ( foundItem.bigCategory === 'PriceRange' ) {
                state.minPrice = ''
                state.maxPrice = ''
            }else {
                state.minMilag = ''
                state.minMilag = ''
            }
        } else {
            foundItem.checked = !foundItem.checked

            if ( foundItem.bigCategory === 'makerList' && !state.modelListIsOpen ) {
                let processingList = state.checkedItems.filter( item => !( item.name === foundItem.name))
                state.checkedItems = []
                state.modelList = []
                processingList.forEach(item => {
                    if ( item.bigCategory != 'modelList' ) state.checkedItems.push( item )
                })

            } else {
                if ( foundItem.checked ) state.checkedItems.push( foundItem )
                else {
                    let processingList = state.checkedItems.filter( item => !( item.name === foundItem.name && item.bigCategory === foundItem.bigCategory ))
                    state.checkedItems = []
                    state.checkedItems = processingList
                }
            }
        }
    },
    CONDITIONSELECTORBYSELECTBOX ( state, targetItem ) {
        let category = targetItem.bigCategory.slice( 3 , targetItem.bigCategory.length )
        let range = targetItem.bigCategory.slice( 0 , 3)
        let processingList = state.checkedItems.filter( item => item.bigCategory != `${category}Range` )
        state.checkedItems = []
        state.checkedItems = processingList
        switch ( category ) {
            case 'Price' :
                if ( range === 'min' ) state.minPrice = targetItem.name
                else state.maxPrice =  targetItem.name
                break
            case 'Milage' :
                if ( range === 'min' ) state.minMilage = targetItem.name
                else state.maxMilage =  targetItem.name
                break
        }
        state.checkedItems.push({
            checked: false,
            bigCategory: `${category}Range`,
            code: (category === 'Price') ? `${state.minPrice} ~ ${state.maxPrice}` : `${state.minMilage} ~ ${state.maxMilage}`  ,
            name: (category === 'Price') ? `${state.minPrice} ~ ${state.maxPrice}` : `${state.minMilage} ~ ${state.maxMilage}`
        })
    },
    ADDSEENHISTORY( state , param ) {

        if ( state.seenHistoryList.length === 0 ) {
            state.seenHistoryList.push(makeSeenCar( param ))
        } else {
            let existFlag = state.seenHistoryList.find( item => item.carcd === param.carcd )
            switch ( existFlag != undefined ) {
                case true :
                    existFlag.count++
                    break
                case false :
                    state.seenHistoryList.push( makeSeenCar( param ) )
                    break
            }
        }

        function makeSeenCar( param ) {
            const date = new Date();
            param.count = 1;
            param.seenTime = date
            return param
        }
    },
    PAGELIMIT( state , data ) {
        state.pageLimit = data
    },
    SHOWCARLIST( state , data ) {
        state.showCarList = []
        for ( let list of data ) {
            state.showCarList.push( list )
        }
    },
    PAGENUMSETTING( state, data ) {
        state.pageNum = data
    },
    PAGELIMITSETTING( state, data ) {
        state.pageLimit = data
    },
    ORDERBYSUBSETTING(state, data){
        state.orderBySub = data
    },
    MAINSEARCH( state, data ){

        state.mainConditionSettingFlag = data.condition;
        const foundMaker = state.makerList.find( item => item.name === data.selectedCondition.maker)

         if ( foundMaker !== undefined ){
                state.checkedItems.push(foundMaker)
                state.modelListIsOpen = true
         }
        if ( data.condition !== 'stringMatch' ) {
            if ( data.condition === 'withModel' ) {
                const model = state.modelList.find( item => item.name === data.selectedCondition.model)
                state.modelFromMain = model
                state.modelList = []
                if ( model !== undefined ) state.checkedItems.push( model )
                state.modelTextFromMain = ( data.selectedCondition.modelText  === false ) ? '' : data.selectedCondition.modelText
            } else {
                state.minPriceFromMain = ( data.selectedCondition.minPrice  === false )
                    ? { checked : false , code : 'minDefault' , name : ` 최 소 ` , bigCategory : 'minDefault' }
                    : data.selectedCondition.minPrice
                state.maxPriceFromMain = ( data.selectedCondition.maxPrice  === false )
                    ? { checked: false , code : 'maxDefault' , name : ` 최 대 `, bigCategory : 'maxDefault'  }
                    :  data.selectedCondition.maxPrice
            }
        } else if (  data.condition === 'stringMatch' ) {
           // state.selectedCondition = data.selectedCondition
            const model = {
                checked: false ,
                bigCategory: 'modelList',
                code: 'stringMatch',
                name:  data.selectedCondition.model,
                count: 0
            }
            state.modelFromMain = model
            state.modelList.push(model)
            state.modelTextFromMain = ( data.selectedCondition.modelText  === false ) ? '' : data.selectedCondition.modelText
        }
    },
    SETPRODUCT( state, data ){
        state.carItem = data
    },
    STRINGMATCH(state, data){
        state.stringMatchList = []
        if(!data.result){
            state.stringMatchList = []
        }else{
            state.stringMatchList = data.result
        }
    },
    stringMatchModelCHecker ( state ) {
        let targetItem = state.modelList.find( item => item.name === state.modelFromMain.name )
        targetItem.checked = true
        state.checkedItems.push( targetItem )
    },
    GETSEARCHWORDRANK(state, data){
        for (let i = 1; i<=10; i++){
            if(data[i-1]!=undefined)
            state.searchWordRank.push({name : `${i}위 ${data[i-1]}`, value : data[i-1]})
        }
    },
    HANDLERECENTSEARCHWORD(state, data){
        switch (data.key) {
            case '+' :
                if(!state.recentSearchWord.includes(data.modelText))
                    state.recentSearchWord.push(data.modelText)
                break
            case '-' :
                state.recentSearchWord.splice(state.recentSearchWord.indexOf(data.modelText)
                    ,state.recentSearchWord.indexOf(data.modelText)+1)
                break
            case '#' :
                state.recentSearchWord = []
                break
        }
    },
    GETRECOMMENDBYSEARCHWORD(state,data){
        state.recommendBySearchWordList = data
    }
}


export default {
    name: 'contents',
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}