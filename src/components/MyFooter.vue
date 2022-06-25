<template>
    <div style="height: 80px">
<!--        <GlobalFooter :links="links" :copyright="copyright" />-->
<!--        {{ links }}-->
    </div>
</template>
<script>
export default {
    name: "MyFooter",
    data () {
        return {
            links: [
                {
                    key: '帮助',
                    title: '帮助',
                    href: 'https://www.iviewui.com',
                    blankTarget: true
                },
                {
                    key: 'github',
                    icon: 'logo-github',
                    href: 'https://github.com/view-design/ViewUIPlus',
                    blankTarget: true
                },
                {
                    key: '条款',
                    title: '条款',
                    href: '',
                    blankTarget: true
                }
            ],
            copyright: 'Copyright © 2022 View Design All Rights Reserved'
        }
    }
}
</script>
