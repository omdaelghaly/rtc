
const fs = require('fs');

const port = process.env.PORT || 5000;

const express = require('express');
const { SocketAddress } = require('net');
const app = express();

const server = require('http').createServer(app);

 
 const io =require('socket.io')(server,{
     cors:{ 
        origin: '*', // I copied the origin in the error message and pasted here
        methods: ["GET", "POST"],
        credentials: true
      }
 })

 


 io.use((socket,next)=>{
  socket['id'] = socket.handshake.query.id
  socket['name'] = socket.handshake.query.name
  socket['email'] = socket.handshake.query.email
  socket['level'] = socket.handshake.query.level
  socket['room'] = socket.handshake.query.room

   next()
 });
 
let admins={} 
let rooms={}
io.on('connection',(socket)=>{

//join room add to userlist 
let xroom; let xuser;
 socket.on('join-room',(room,user)=>{
  xroom=room; xuser=user;
  socket.join(room);
  // user join config
  if(user){
     if(user.getroom && room==user.getroom.name){// if admin
            if(admins[room]){admins[room][socket.id] = user;
               }else{
                   admins[room]={};  admins[room][socket.id] = user;
               }
            io.sockets.in(room).emit('updateusers',{'admins':admins[room],'users':rooms[room]});
            socket.broadcast.to(room).emit('user_connected',{'msg':' Admin has joined the room','user':user});
    }else{  // if user
             if(rooms[room]){rooms[room][socket.id] = user;
                 }else{
                   rooms[room]={};  rooms[room][socket.id] = user;
                  }
               io.sockets.in(room).emit('updateusers',{'admins':admins[room],'users':rooms[room]});
               socket.broadcast.to(room).emit('user_connected',{'msg':' has joined the room','user':user});
     }

    } 
})

//leave room remove from user/admin list 
socket.on('leave-room',(room,user)=>{
    if(user){
   if(user.getroom && room==user.getroom.name ){ //if admin
           if(admins[room]){
                 delete admins[room][socket.id]
               }
              io.sockets.in(room).emit('updateusers',{'admins':admins[room],'users':rooms[room]});
              socket.broadcast.to(room).emit('user_disconnected',{'msg':' has left the room','user':user})
              socket.leave(room)
    }else{ //if user
              if(rooms[room]){
                   delete rooms[room][socket.id]
                 }
                 io.sockets.in(room).emit('updateusers',{'admins':admins[room],'users':rooms[room]});
                 socket.broadcast.to(room).emit('user_disconnected',{'msg':' has left the room','user':user})
                 socket.leave(room)
            //console.log('leave'+room)
       } 
       
      }
 })


 // send message 
socket.on('msg',(msg,room,user)=>{
  io.sockets.in(room).emit('nmsg',{'msg':msg,'user':user});
 // console.log(msg+'room-='+room)

})

socket.on('peerjoin',(room ,user,id)=>{
  io.sockets.in(room).emit('peerjoins',{'room':room,'user':user,peerid:id});
 // console.log(room + id + user.name)

})
socket.on('newstream',(room )=>{
socket.broadcast.to(room).emit('newstreamstart')
})

socket.on('iamwriting',()=>{
//socket.broadcast.to(data.room).emit('iamwritings',data.user);
socket.broadcast.to(xroom).emit('iamwritings',xuser);
})
   
 


  





/// when discoonected- close page 
  socket.on('disconnect',()=>{
    console.log('user disconnected - '+ socket.id)
   
if(xuser){

    if(xuser.getroom && xroom==xuser.getroom.name){ //if admin
      if(admins[xroom]){
            delete admins[xroom][socket.id]
          }
         io.sockets.in(xroom).emit('updateusers',{'admins':admins[xroom],'users':rooms[xroom]});
         socket.broadcast.to(xroom).emit('user_disconnected',{'msg':' has left the room','user':xuser})
         socket.leave(xroom)
}else{ //if user
         if(rooms[xroom]){
              delete rooms[xroom][socket.id]
            }
            io.sockets.in(xroom).emit('updateusers',{'admins':admins[xroom],'users':rooms[xroom]});
            socket.broadcast.to(xroom).emit('user_disconnected',{'msg':' has left the room','user':xuser})
            socket.leave(xroom)
       //console.log('leave'+room)
  }   

}
  
  })








})

    


  
    
 




server.listen(port,()=>{
    console.log('server is okk'+port)
})