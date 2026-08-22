import { defineComponent } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

interface RowData {
  label: string;
  category: string;
  '№ п/п': string;
  children?: RowData[];
}

export default defineComponent({
  name: 'TreeComponent',
  components: { AgGridVue },
  props: {
    treeData: {
      type: Array as () => RowData[],
      required: true
    }
  },
  data() {
    return {
      columnDefs: [
        { field: 'label', rowGroup: true, enableRowGroup: true },
        { field: 'category' },
        { field: '№ п/п' },
      ],
      autoGroupColumnDef: {
        cellRenderer: 'agGroupCellRenderer',
        checkbox: true,
        marryChildren: true,
      },
      rowClass: {
        groupRow: 'group-row-style',
        leafRow: 'leaf-row-style'
      }
    };
  },
  methods: {
    getRowClass({ data }: { data: RowData }) {
      return data.children ? this.rowClass.groupRow : this.rowClass.leafRow;
    },
    getRowStyle({ data }: { data: RowData }) {
      return data.children ? { 'background-color': '#f0f0f0' } : null;
    }
  }
});