<template>
    <div style="text-align: center">
        <AvatarUploader
            :avatar="avatar"
            :region="options_OSS.region"
            :accessKeyId="options_OSS.accessKeyId"
            :accessKeySecret="options_OSS.accessKeySecret"
            :bucket="options_OSS.bucket"
            @avatarUrl="getAvatarUrl"
            @deleteAvatar="deleteAvatar"
        ></AvatarUploader>
    </div>
</template>
<script>
import AvatarUploader from "@/components/AvatarUploader/Index.vue";
export default {
    components: {AvatarUploader},
    data() {
        return {
            options_OSS: {
                region: "oss-cn-chengdu",
                accessKeyId: "xxx",
                accessKeySecret: "xxx",
                bucket: "yimiao-manage",
            },
            // avatar: 'http://sflsdlfj'
            avatar: ''
        };
    },
    methods: {
        getAvatarUrl(avatarUrl) {
            console.log("头像url:", avatarUrl);
        },
        deleteAvatar() {
        }
    }
}
</script>