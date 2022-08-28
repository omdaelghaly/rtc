

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
              <div class="caption ml-3 mt-1" style="height:80px">
                <button @click="adminstream" type="button" class="btn btn-primary btn-sm">Start Stream</button>
                <button @click="sharescreen" type="button" class="btn btn-primary btn-sm">Share</button>
                <button  type="button" @click="closepeer" class="btn btn-primary btn-sm">Stop </button>
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
             currentroom:this.$store.getters.myroom,
             user:this.$store.getters.user,
             defaultvideosrc:'',
             peer:'',
             stream:'',
             call:'',
             screenSharing:false,
             
         }
       },
       methods:{
         adminstream(){
let currentPeer;
 let room_id = this.currentroom ;
  socket.emit('newstream',this.currentroom);

 this.peerconnect(room_id);

 },
 peerconnect(peerid){
       this.peer = new Peer()
      this.peer.on('open', (id) => {
        console.log("Connected with Id: " + id)
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


        getUserMedia({ video: true, audio: true }, (stream) => {
          this.stream=stream;
       var video=this.$refs.localref;
       video.srcObject = stream;
       video.onloadedmetadata = (e) => {
                video.play();
                };

               this.makecall(this.peer,peerid,this.stream)

     
        }, (err) => {
            console.log(err)
        })
        
    });
    
 },
 makecall(peer,room_id,stream){
           
            let call = peer.call(room_id, stream)
       //      call.on('stream', (stream) => {
       //    var video=this.$refs.localref;
       // video.srcObject = stream;
       // video.onloadedmetadata = (e) => {
       //          video.play();
       //          };
       //      })

                   this.call = call;

 },
 sharescreen(){
/////////////////


    if (this.screenSharing) {
       this.stopScreenSharing();
    }
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
             this.stream = stream;
        let videoTrack = this.stream.getVideoTracks()[0];
        videoTrack.onended = () => {
            this.stopScreenSharing()
        }
        if (this.peer) {
            let sender = this.call.peerConnection.getSenders().find(function (s) {
                return s.track.kind == videoTrack.kind;
            })
            sender.replaceTrack(videoTrack)
            this.screenSharing = true
        }
        console.log(screenStream)
    })
},

 stopScreenSharing() {

    if (!this.screenSharing) return;
    let videoTrack = this.stream.getVideoTracks()[0];
    if (this.peer) {
        let sender = this.call.peerConnection.getSenders().find(function (s) {
            return s.track.kind == videoTrack.kind;
        })
        sender.replaceTrack(videoTrack)
    }
    this.stream.getTracks().forEach(function (track) {
        track.stop();
    });
   this.screenSharing = false

/////////////////////////
 },
  defaultstream(){
            // this.defaultvideosrc='video/resetstream/video.mp4';
  },
  closepeer(){
    this.call.close();
  },
  streamtousers(){

  }
 
               

       },
       created(){
      this.defaultstream();
                      socket.on('peerjoins',(data)=>{
                        //this.vusers.push(data.peerid);
                        if(this.stream){
                  this.peerconnect(data.peerid)
                   console.log('makecall.......')
                                     }
                         })
 
 

      },
       beforeDestory(){
        this.closepeer();
       },

};
</script>

<style>

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
</style>