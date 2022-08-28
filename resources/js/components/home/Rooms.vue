




<template>
    <div>


<div class="text-center mb-2">
  All available rooms
</div>


  <div class="container">  
    <div class="row">


        <div v-for="(room,index) in rooms" :key="index"  class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mb-3 ">
          <div class="thumbnail">
            <router-link :to='"/"+room.name' >
              <img :src="getroomimage(room.image)" alt="Lights" class="img-rounded " style="width:100%;height:250px">
              <div class="caption">

               <p>ROOM: {{room.name}}</p>

                <p>
                  <img :src="userimg(room.getuser.image)" alt="user" 
                       style="width:30px;height:30px;border-radius:30px" >
                      {{room.getuser.name}}
                </p>
              </div>
            </router-link>
          </div>
        </div>


        
        

   
   
    </div>
  </div>   
    </div>

</template>


<script>


export default {
    
        data(){
            return{
                  rooms:this.$store.getters.rooms,
                  

              
            }  
      },
    
      
     methods:{ 
         getrooms(){
           window.axios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
           axios.get('api/getrooms').then((res)=>{
             this.rooms=res.data.data;
             this.$store.commit('setrooms',res.data.data);
            // socket.emit('rooms',res.data.data);
           })
         }, 
        getroomimage(img){
            return '/images/rooms/'+img;
         },
         userimg(img){
           return 'images/profiles/'+img;
         }
        

      },      
       created(){
               $(document).ready(()=>{
                 this.getrooms();   
               })
                 
         },
            

 
}
</script>
