<template>
    <div>
        <video controls></video>
    </div>
</template>

<script>
import StatisticSourceUrl from '@/api/staticSourceUrl'

export default {
    name: "VideoView2",
    data() {
        return {
             video: null,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.video = document.querySelector('video');

            // Need to be specific for Blink regarding codecs
            // ./mp4info frag_bunny.mp4 | grep Codec
            this.mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

            if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeCodec)) {
                this.mediaSource = new MediaSource;
                //console.log(mediaSource.readyState); // closed
                this.video.src = URL.createObjectURL(this.mediaSource);
                this.mediaSource.addEventListener('sourceopen',this.sourceOpen
                );
            } else {
                console.error('Unsupported MIME type or codec: ', this.mimeCodec);
            }

        },
        fetchAB (url, cb) {
            console.log(url);
            const xhr = new XMLHttpRequest;
            xhr.open('get', url);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                cb(xhr.response);
            };
            xhr.send();
        },
         sourceOpen (_) {
             // const assetURL = 'frag_bunny.mp4';
             // const assetURL = '/Users/molly/WebstormProjects/github/netfix/demo/frag_bunny.mp4';
             let docId = this.$route.query.docId;
             let assetURL = StatisticSourceUrl.docPreviewUrl(docId);
             //console.log(this.readyState); // open
             const sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
             this.fetchAB(assetURL, function (buf) {
                sourceBuffer.addEventListener('updateend', function (_) {
                    this.mediaSource.endOfStream();
                    this.video.play();
                    //console.log(mediaSource.readyState); // ended
                });
                sourceBuffer.appendBuffer(buf);
            });
        }
    }
}
</script>

<style scoped>

</style>