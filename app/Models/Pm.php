<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Pm extends Model
{


    
    public function getuser(){
        return $this->belongsTo(User::class);
    }
 

}   