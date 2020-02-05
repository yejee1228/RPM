<template>
<div>
    <link rel="stylesheet" type="text/css" href="css/danawaCommon.css">
    <link rel="stylesheet" type="text/css" href="css/danawaCompare.css">
    <link rel="stylesheet" type="text/css" href="css/danawaHome.css">
    <link rel="stylesheet" type="text/css" href="css/danawaTheme.css">
    <link rel="stylesheet" type="text/css" href="css/dnawaAuto.css">
<Tab></Tab>
<router-view />

</div>
</template>
<script>

import Tab from "@/components/recommend/RecommendTab.vue"

export default{
	components:{Tab}
}
</script>
<style scoped></style>