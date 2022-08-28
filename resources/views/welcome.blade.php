<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

    </head>
    <body>
    
    @foreach ($users as $user)
    <div> {{$user->id}}</div>
    <div> {{$user->name}}</div>
    <div> {{$user->email}}</div>
    <div> {{$user->id}}</div>
        
    @endforeach



  <div id="app">
  <rooms></rooms>
  </div>



    </body>
</html>


<script src="{{Mix('js/app.js')}}"></script>