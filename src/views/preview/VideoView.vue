<template>
    <div>
        <video-player ref="videoPlayer" :options="videoOptions" @ended="videoEnded" />
    </div>
</template>

<script>
// https://github.com/surmon-china/videojs-player/tree/vue-video-player
// vue-video-player 只支持vue2
// 参考地址：https://blog.csdn.net/qq_31455841/article/details/112497239
// import { VueVideoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import StatisticSource from '@/api/staticSourceUrl'

export default {
    name: "VideoView",
    components: {
        videoPlayer
    },
    data() {
        return {
            videoOptions: {
                autoplay: false,
                controls: true,
                height: 616,
                sources: [
                    {
                        src: '', // 视频文件的 URL
                        type: 'video/mp4',
                    },
                ],
            },
            src: ""
        };
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let docId = this.$route.query.docId;
            let wordURL = StatisticSource.docPreviewUrl(docId);
            this.src = wordURL
            this.videoOptions.sources[0].src = wordURL
        },
        videoEnded() {
            console.log('视频播放结束');
        },
    },
};
</script>
