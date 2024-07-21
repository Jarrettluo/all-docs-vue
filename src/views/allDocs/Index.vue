<template xmlns="http://www.w3.org/1999/html">
    <div class="container">

        <datatable
            title="是的方式来记录"
            :columns="tableColumns1"
            :rows="tableRows1"
            locale="chn"
        >
            <th slot="thead-tr">
                Actions
            </th>
            <template slot="tbody-tr" scope="props">
                <td>
                    <button class="btn red darken-2 waves-effect waves-light compact-btn"
                            @click="e => deleteItem(props.row, e)">
                        <i class="material-icons white-text">delete</i>
                    </button>
                </td>
            </template>
        </datatable>
    </div>
</template>

<script>
import DataTable from "vue-materialize-datatable";

export default {
    name: "Index",
    data() {
        return {
            tableColumns1: [
                {
                    label: "文档序号",
                    field: "charName",
                    numeric: false,
                    html: false
                },
                {
                    label: "文档名称",
                    field: "firstAppearance",
                    numeric: false,
                    html: false
                },
                {
                    label: "详情",
                    field: "createdBy",
                    numeric: false,
                    html: false
                },
                {
                    label: "操作",
                    field: "voicedBy",
                    numeric: false,
                    html: false
                }
            ],
            tableRows1: [
                {
                    charName: "Abu",
                    firstAppearance: "Alladin (1992)",
                    createdBy: "Joe Grant",
                    voicedBy: "Frank Welker"
                },
                {
                    charName: "Magic Carpet",
                    firstAppearance: "Alladin (1992)",
                    createdBy: "Randy Cartwright",
                    voicedBy: "N/A"
                },
                {
                    charName: "The Sultan",
                    firstAppearance: "Alladin (1992)",
                    createdBy: "Navid Negahban",
                    voicedBy: "Douglas Seale"
                }
            ],
        }
    },
    components: {
        "datatable": DataTable
    }
}
</script>

<style scoped lang="scss">
@import "~material-design-icons-iconfont/dist/material-design-icons.css";

.container{
    width: 100%;
    height: 100vh;
}

</style>