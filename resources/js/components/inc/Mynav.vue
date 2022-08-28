


<template>
    <div>

<nav class="navbar navbar-expand-lg navbar-light bg-primary shadow-sm col-12 p-0 m-o" >
  <a class="navbar-brand" href="#"> chatAPP </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContentC" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  

  <div class="collapse navbar-collapse " id="navbarSupportedContentC">
    <ul class="navbar-nav mr-auto my-auto">
      
      <li class="nav-item dropdown">
        <router-link  class="nav-link btn btn-primary btn-sm" to="/"><h5 style="color:white"> home  </h5></router-link> 
      </li>

            
      <li class="nav-item dropdown">
        <router-link  class="nav-link btn btn-primary btn-sm" to="/myroom"><h5 style="color:white"> my room   </h5></router-link> 
      </li>

            
      <li class="nav-item dropdown">
        <router-link  class="nav-link btn btn-primary btn-sm" to="/"><h5 style="color:white"> my profile   </h5></router-link> 
      </li>
     
     <!-- {{this.$store.getters.user}} -->
      </ul>

 
  
          


             
  </div>
</nav>
 

    </div>
</template>




<script>

export default {
props:['uname','uid'],
     data(){
        return{
              user:'',
            
         }
    },
     methods:{
    
    //    // make api auth like login
    authuser(){
       window.axios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
            axios.post('api/authuser', {'id':this.uid,'device_name':'browser'}).then((res)=>{
                      //console.log(res.data)
           if(res.data.data=='errors'){
             this.$router.push('/notfound')
           }else{
               localStorage.removeItem('token');
               localStorage.setItem('token',res.data);
               this.getuserinfo();
             // console.log(res.data.data);
           }
         })
       },
       getuserinfo(){
            window.axios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
            axios.post('api/getuserinfo',{'id':this.uid}).then((res)=>{
               if(res.data.data==''){this.authuser()}
               else{this.user=res.data.data;
                this.$store.commit('setauth',res.data.data)
              // console.log(res.data.data)
              }                                                             
            });
       },
      

      },//end methods
      created(){
             this.authuser();
           
  
           
       },//end created

  


}
</script>


<style>
#profileimage{
  widows: 30px;
  height: 30px;
  border-radius: 50%;
}
*a {
color: white
}
.nav-link{
  color:white
}
</style>