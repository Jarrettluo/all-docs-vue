<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
#app {
    font-family: PingFangSC-Medium, PingFang SC,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f8f6f9;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
