<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;
use Illuminate\Http\Request;
use Jenssegers\Mongodb\Eloquent\Model;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
         
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

   



    public function index()
    {
        return view('home');
    }


     public function home()
    {
        return view('home');
    }

    

   
   
}
