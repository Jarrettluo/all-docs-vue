<template>
    <div style="padding: 0 0 10px 0;margin-top: 40px;">
        <div class="upload-button" @click="submit">
            <div class="button-img">
                <img :src="src" width="20px" height="22px" alt="img"/>
            </div>
            <span class="button-label">{{label}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubmitButton",
    props: ["src", "label"],
    methods: {
        submit() {
            this.$emit("click", true)
        }
    }
}
</script>

<style scoped lang="scss">

.upload-button {
    width: 180px;
    height: 45px;
    border: 2px solid #000;
    box-shadow: 0 0 10px 0 rgba(129,100,0,0.3);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: #FBD642;
    &:hover {
        background: #FFF7D6;
    }
    .button-img {
        padding: 5px 10px; line-height: 45px;
    }
    .button-label {
        line-height: 45px; color: #000; font-size: 16px; font-weight: 600;
    }
}
</style>