<script setup lang="ts">
import { computed } from "vue"
import { AgGridVue } from "ag-grid-vue3"
import type {
    ColDef,
    GetRowIdParams,
    ValueGetterParams,
} from "ag-grid-community"

import TreeStore from "../../treeStore/TreeStore"
import { items } from "../../data/fakeData"

const store = new TreeStore(items)

const getTreeId = (
    id: number | string,
): string => {
    return `${typeof id}:${String(id)}`
}

const rowData = computed(() => {
    console.log(store.getAll());
    
    return store.getAll().map(item => ({
        ...item,
        
        treeId: getTreeId(item.id),

        treeParentId:
            item.parent === null
                ? null
                : getTreeId(item.parent),

        category:
            store.getChildren(item.id).length > 0
                ? "Группа"
                : "Элемент",
    }))
})

const columnDefs: ColDef[] = [
    {
        headerName: "№ п/п",
        width: 90,
        sortable: false,
        filter: false,

        valueGetter: (
            params: ValueGetterParams,
        ) => {
            const rowIndex = params.node?.rowIndex

            if (
                rowIndex === null ||
                rowIndex === undefined
            ) {
                return ""
            }

            return rowIndex + 1
        },
    },

    {
        field: "label",
        headerName: "Имя",
        flex: 1,
    },

    {
        field: "id",
        headerName: "ID",
        width: 180,
    },

    {
        field: "category",
        headerName: "категория",
        width: 130,
    },
]

const autoGroupColumnDef: ColDef = {
    headerName: "Дерево",
    minWidth: 300,
    flex: 1,
}

const getGridRowId = (
    params: GetRowIdParams,
): string => {
    return params.data.treeId
}
</script>

<template>
    <div class="tree-store-table">
        <ag-grid-vue
            :row-data="rowData"
            :column-defs="columnDefs"
            :auto-group-column-def="autoGroupColumnDef"
            :tree-data="true"
            tree-data-parent-id-field="treeParentId"
            :get-row-id="getGridRowId"
            :animate-rows="true"
            style="width: 100%; height: 60vh"
        />
    </div>
</template>
