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
        </ListItem>
    </List>
</template>
<script>
export default {
    name: "DocItem",
    data() {
        return {
            data: []
        }
    },
    methods: {
    }
}
</script>
