<template>
    <div style="padding: 0px;background: #f8f8f9; text-align: left; position: absolute; left: 0px; top: 0px; height: calc( 100vh - 180px); width: 100%;">
        <Card :title = name icon="ios-options" :padding="0" style="width: 100%;">
            <CellGroup>
                <Cell title="Only show titles" />
                <Cell title="Only show titles" />
                <Cell title="Only show titles" >
                    <template #extra>
                        <div class="more-info" @click="clickGo($event)">
                            <Icon type="ios-more" />
                        </div>
                    </template>
                </Cell>
                <Cell title="这是一个分类的信息"/>

            </CellGroup>
        </Card>

        <Dropdown ref="contentMenu" trigger="click" v-show="showMsgDropdown">
            <a href="javascript:void(0)">
                click 触发
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem>北京烤鸭</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import xxx from "@/api/index"
export default {
    data () {
        return {
            showMsgDropdown: false,
            name: this.titleName,
        }
    },
    props: { titleName: { type: String, requires: true } },
    created() {
        this.getAllItems()
    },
    methods: {
        clickGo(e) {
            this.showMsgDropdown = true;
            this.Msgcontextmenu(e);
        },
        Msgcontextmenu(event) {
            console.log(event)
            // event.preventDefault();
            // this.$refs.contentMenu.$refs.reference = event.target;//在此dom附件弹出
            // console.log(this.$refs.contentMenu.$refs.reference);
            // this.$refs.contentMenu.currentVisible = !this.$refs.contentMenu.currentVisible;//仿click弹出界面
        },
        getAllItems() {
            console.log("======")
            const params = {
                type: "TAG"
            };
            console.log(params)
            xxx.getListData(params).then(response => {
                var list = response.data
                // this.listLoading = false
                console.log(list)
            })
        }
    }
}
</script>


<style scoped>

    /*/deep/ .ivu-cell-extra {*/
    /*    padding-right: 8px;*/
    /*}*/

    /deep/ .ivu-cell-footer {
        right: 8px;
    }
  .more-info {
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 21px;
      font-weight: bold;
  }

  .more-info:hover {
      color: #f1db77;
  }
</style>