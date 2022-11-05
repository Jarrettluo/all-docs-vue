<template>
    <List item-layout="vertical">
        <ListItem v-for="item in data" :key="item.title">
            <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"/>
            {{ item.content }}
            <template #action>
                <li>
                    <Icon type="ios-star-outline"/>
                    123
                </li>
                <li>
                    <Icon type="ios-thumbs-up-outline"/>
                    234
                </li>
                <li>
                    <Icon type="ios-chatbubbles-outline"/>
                    345
                </li>
            </template>
            <!--            <template #extra>-->
            <!--                <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">-->
            <!--            </template>-->
        </ListItem>
    </List>
</template>
<script>
export default {
    name: "DocItem",
    data() {
        return {
            data: [
                {
                    title: 'This is title 1',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.'
                },
                {
                    title: 'This is title 2',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.'
                },
                {
                    title: 'This is title 3',
                    description: 'This is description, this is description, this is description.',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: 'This is the content, this is the content, this is the content, this is the content.'
                }
            ]
        }
    },
    methods: {
        getData() {
            let data = {
                id: 1
            }
            this.$axios.getListData(data)
                .then((res) => {
                    console.log(res);
                })
        }
    }
}
</script>
