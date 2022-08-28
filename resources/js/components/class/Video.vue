

<template>
    <div>


  <div class="col-12 border border-dark" >  
    <div class="row">
   
        <div class="col-12  p-0     ">
            
            
         <video id="videoid" autoplay ref="localref" :src="defaultvideosrc" loop   controls muted  style="width:100%;height:450px;object-fit:fill;">
             
             <source src="" type='application/ogg; codecs="bogus"'>
             <source src="" type='application/octet-stream; codecs="bogus"'>
             <source src="" type='video/ogg; codecs="dirac, vorbis"'>
             <source src="" type='video/webm; codecs="vp09"'>
             <source src="" type='video/mp4; codecs="hev1.1.6.L93.B0"'>
             <source src="" type='video/mp4; codecs="mp4v.20.8, mp4a.40.2"'>
    
       
        </video>

              <div class="caption ml-3 mt-1" style="height:75px">
             
                <button @click="userstream" type="button" class="btn btn-primary btn-sm">Refresh</button> 
                <button @click="closepeer" type="button" class="btn btn-primary btn-sm">Stop</button>
              </div>

        </div>
        
       
    </div>
  </div>   

    </div>
</template>



<script>
 
export default {
 // components: { Chat },
       data(){
         return{
             currentroom:this.$route.params.classroom,
             user:this.$store.getters.user,
             defaultvideosrc:'',
                     peer :'',
                currentPeer:'',
                streamroom:this.$store.getters.streams,
                call:''


         }
       },
       methods:{
               userstream(){
let currentPeer;
 let room_id = this.currentroom ;
       this.peer = new Peer()
         // const conn = this.peer.connect(this.currentroom);

      this.peer.on('open', (id) => {
        console.log("Peer Connected with ID: ", id)


           socket.emit('peerjoin',this.currentroom,this.user,id);

// var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

 
//         getUserMedia({ video: true, audio: true }, (stream) => {
//          local_stream = stream;
//         var video=this.$refs.localref;
//        video.srcObject = stream;
//        video.onloadedmetadata = (e) => {
//                 video.play();
//                 };    
//             }, (err) => {
//             console.log(err)
//         })


            this.answercall();

     });





    

 },
  defaultstream(){
             //this.defaultvideosrc='video/resetstream/video.mp4';
          

  },
  closepeer(){
        
        //this.peer.close();
      this.call.close();
      console.log('close peer ')
  },

  answercall(){

     this.peer.on('call', (call) => {
        call.answer(null);
        call.on('stream', (stream) => {
            var vid=this.$refs.localref;
          //   this.streamroom=stream;
          // this.$store.commit('setstream',this.currentroom,stream);
           vid.srcObject =stream ;
           vid.onloadedmetadata = (e) => {
                vid.play();
                };
        })
        
        this.call= call;
    })
  }
 
               

       },
       created(){
      this.defaultstream();
      this.userstream();

     socket.on('newstreamstart',()=>{
      this.userstream();
     })

      


      },
     beforeDestroy(){
        //this.closepeer();
       },

};
</script>

<style>
 audio::-webkit-media-controls-timeline,
 video::-webkit-media-controls-timeline{
  display: none;
 }
audio::-moz-media-controls-timeline,
 video::-moz-media-controls-timeline{
  display: none;
 }
</style>