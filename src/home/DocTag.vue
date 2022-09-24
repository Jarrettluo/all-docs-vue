<template>
    <div class="doc-tag"
    :style="{borderColor: tag.color, fill: tag.color, color: tag.color, fillOpacity: 0.1}">
        <span
            :style="{ fontSize: tag.size }">
            {{ tag.name }}
        </span>
    </div>
</template>

<script>
const docTypeMap= {
    word: {
        color: "#367CFA",
        name: "W"
    },
    excel: {
        color: "#00913F",
        name: "X"
    },
    ppt: {
        color: "#A34030",
        name: "P"
    },
    pdf: {
        color: "#E40000",
        name: "PDF",
        size: '12px'
    },
    pic: {
        color: "#71cd4a",
        name: "PIC",
        size: '12px'
    },
    others: {
        color: "#AAAAAA",
        name: "A"
    }

}
export default {
    name: "DocTag",
    data() {
        return {
        }
    },
    props: {
        type: String
    },
    computed: {
        tag() {
            if ( docTypeMap.hasOwnProperty(this.type) ) {
                return docTypeMap[this.type]
            } else {
                let result = docTypeMap.others
                if ( this.type != '') {
                    result.name = (this.type).toUpperCase()
                }
                return result
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .doc-tag {
        width: 24px;
        height: 24px;
        border: 1px solid ;
        border-radius: 2px;
        text-align: center;
        background-color: #ffffff;

        span {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            line-height: 22px;
        }
    }
</style>