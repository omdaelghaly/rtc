<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Roomcontroller extends Controller
{
    


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
         
    // }
    

  
    public function authuser(Request $request)
    {  
         $user = User::where("_id", $request->id)->first();
       if ($user)
       {
        $user->tokens()->delete();
           return $user->createToken($request->device_name)->plainTextToken;
        }else{
                 return response()->json(['data'=>'errors']);
        }
    
    }
                                                                                 
    //getuser data
    public function getuserinfo()
    {    
      $id=auth('sanctum')->user()->id;
      $user=User::select('_id','name','email','image' ,'room_id')
      ->with('getroom')
      ->find($id) ;
      if($user){
        return response()->json(['data'=>$user]);
      }
    }
///get all rooms
    public function getrooms()
    {

      $rooms=Room::with('getuser')->get() ;
        return response()->json(['data'=>$rooms]);
    
    }


}
