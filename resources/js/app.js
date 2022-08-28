/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
 require('./bootstrap');

 import $ from 'jquery'
 window.jQuery = window.$ = $;
 
window.Vue = require('vue')

 //window.emojioneArea=emojionearea

import VueRouter from 'vue-router'
import store from './store/store'
//import  Peer  from "peerjs";
Vue.use(VueRouter)




import mynavbar from './components/inc/Mynav.vue'
import myfooter from './components/inc/Footer.vue'


import routes from './router'
// import Vue from 'vue';



const router = new VueRouter({ 
    mode:'history',
    routes ,    
  })




const app = new Vue({

    el: '#app',
    store,
    router,
       components:{
        mynavbar,myfooter
    },
    
    data(){
        return{
            user:{
                id:'',
                device_name:'browser'
            },
            id:'',
            
        }
    },
    methods:{

            },

    

});
