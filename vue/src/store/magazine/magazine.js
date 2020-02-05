import axios from "axios";

const state = {
    wordList : [],
    originWordList : '',
    carsList : '',
    articleList : ''
}
const getters = {
    wordList : state => state.wordList,
    carsList : state => state.carsList,
    articleList : state => state.articleList
}
const actions = {
    async getExtractWord({ commit } ){
        axios
            .get(`http://localhost:8080/magazine/init`)
            .then(({data})=>{
                commit('GETEXTRACTEDWORD', data )})
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async aiEditor({ commit } , keyWord ){
        axios
            .get(`http://localhost:8080/magazine/AIEditer/`+keyWord)
            .then(({data})=>{
                commit('AIEDITOR', data )})
            .catch(()=>{
                alert('잘못된 요청입니다.')
            })
    },
    async getSelectedWord({ commit } , targetitem ){
        commit('GETSELECTEDWORD', targetitem )
    }
}
const mutations = {
    GETEXTRACTEDWORD ( state , data ) {
        state.wordList = []
        data.extractedWordList.forEach( item => {
            state.wordList.push([item.word , item.count]);
        })
    },
    GETSELECTEDWORD ( state , targetitem ) {
        state.originWordList = state.wordList
        state.wordList = []
        state.wordList.push(targetitem)
    },
    AIEDITOR ( state , data ) {
        state.carsList = []
        state.articleList = []
        state.carsList = data.carsList
        state.articleList = data.articles
    }
}
export default {
    name: 'magazine',
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}