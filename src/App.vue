<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/Gerb01.jpg">
        <div class="container pt-2">

            <my-table :usersData = tablGet />

        </div>
    </div>
</template>

<script>
    import myTable from './components/m-table'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        components: {
            myTable,

        },
        methods: {
            ...mapActions(['asyncChangeData']),
        },
        mounted() {
           this.asyncChangeData()
        },
        computed: {
            ...mapGetters(['tablGet']),
            // title() {
            //     return this.$store.state.data
            // },

        },
        data() {
            return {
                cars: [],
                snus: 'CONDOM 2019'
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
