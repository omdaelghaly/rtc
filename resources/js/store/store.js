


import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
       state:{
           user:'',
           rooms:'',
           oldroom:'',
           streams:''
         },
       mutations: {
        setauth(state, user) {
            state.user = user;
        },
        setrooms(state,rooms){
            state.rooms=rooms;
        },
        setoldroom(state,room){
            state.oldroom= room;
        },
       setstream(state,room,stream){
            state.streams= stream;
        }
    },
       getters:{
        user:function(state){
            return state.user;
        },
        oldroom:function(state){
            return state.oldroom;
        },
        rooms:function(state){
            return state.rooms;
        },
        myroom:function(state){
            return state.user.getroom.name;
        },
         stream:function(state){
            return state.streams;
        }

       }

});


export default store;