<template>
    <Space direction="vertical">
        Name: {{ value }}
        <!--        <Button @click="handleRender">Custom content</Button>-->
    </Space>
</template>
<script>
// import { Input } from 'view-ui-plus';

export default {
    name: 'Modal',
    data() {
        return {
            value: ''
        }
    },
    methods: {
        // handleRender () {
        //     this.$Modal.confirm({
        //         render: (h) => {
        //             return h( Input, {
        //                 size: "large",
        //                 modelValue: this.value,
        //                 autofocus: true,
        //                 placeholder: 'Please enter your name...',
        //                 'onInput': (event) => {
        //                     this.value = event.target.value;
        //                 }
        //             })
        //         }
        //     })
        // }
    }
}
</script>
