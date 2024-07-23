<template>
    <Modal
        v-model="modal"
        title="Title"
        :loading="loading"
        @on-ok="asyncOK">
        <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>
</template>

<script>
export default {
    name: "EditUserInfo",
    data () {
        return {
            modal: false,
            loading: true
        }
    },
    props: {
        modal: Boolean,
    },
    methods: {
        asyncOK () {
            setTimeout(() => {
                this.modal = false;
            }, 2000);
        }
    }
}
</script>

<style scoped>

</style>