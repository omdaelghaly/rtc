

import Vue from 'vue'




import rooms from './components/home/Rooms'
import myroom from './components/broadcast/broadcast'
import classroom from './components/class/room'

import notfound from './components/nopage/Notfound'

const routes =[
  
  {path:'/', component:rooms ,name:'rooms'},
  {path:'/myroom', component:myroom ,name:'myroom'},

  {path:'/:classroom', component:classroom ,name:'classroom'},

 
  {path:'/:any', component:notfound ,name:'notfound'},


];









  export default routes;