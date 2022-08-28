<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Roomcontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

});



//HOME ROOm
Route::post('authuser',[Roomcontroller::class,'authuser']);
Route::post('getuserinfo',[Roomcontroller::class,'getuserinfo']);
Route::get('getrooms',[Roomcontroller::class,'getrooms']);
    


