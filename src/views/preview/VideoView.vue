<template>
    <div>
        <video-player ref="videoPlayer" :options="videoOptions" @ended="videoEnded" />
    </div>
</template>

<script>
import 'video.js/dist/video-js.css'; // 引入样式
import VideoPlayer from 'vue-video-player';

export default {
    components: {
        VideoPlayer,
    },
    data() {
        return {
            videoOptions: {
                autoplay: false,
                controls: true,
                sources: [
                    {
                        src: 'https://example.com/your-video.mp4', // 视频文件的 URL
                        type: 'video/mp4',
                    },
                ],
            },
        };
    },
    methods: {
        videoEnded() {
            console.log('视频播放结束');
        },
    },
};
</script>
