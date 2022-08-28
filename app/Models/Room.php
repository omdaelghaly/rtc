<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;

use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Room extends Model
{    use Notifiable;


     //protected $table =""
     protected $fillable=[ 'id','room_id','user_id','image','name'];
     protected $hidden =[];


     public function getuser(){
        return $this->belongsTo(User::class,'user_id','_id');
    }
   


}
