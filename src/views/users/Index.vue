<template>
    <div class="content">
        <user-table/>
    </div>
</template>

<script>
import UserTable from "@/views/users/UserTable";
export default {
    name: "Index.vue",
    components: {
        UserTable
    }
}
</script>

<style scoped>
.content {
    width: calc(100% - 16px);
    height: calc( 100% - 16px) ;
    background-color: #ffffff;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    text-align: left;
}
</style>