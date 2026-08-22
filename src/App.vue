<script setup lang="ts">
import TreeStoreTable from './components/TreeComponent/TreeStoreTable.vue';

</script>

<template>
    <main>
        <h1>MStroy</h1>

        <TreeStoreTable />
    </main>
</template>

<style>
* {
    box-sizing: border-box;
}

html,
body,
#app {
    width: 100%;
    min-height: 100%;
    margin: 0;
}

body {
    font-family: Arial, sans-serif;
}

main {
    width: 100%;
    padding: 20px;
}
</style>