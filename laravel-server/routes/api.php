<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CategoryController;

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
Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});

Route::group(['prefix' => 'items'], function(){
    Route::get('/getitems', [ItemController::class, 'getItems']);
    Route::post('/additem', [ItemController::class, 'addItem']);
    Route::post('/searchitem', [ItemController::class, 'searchItem']);
    Route::post('/getitembyid', [ItemController::class, 'getItemById']);
});

Route::group(['prefix' => 'favorites'], function(){
    Route::post('/favorite', [FavoriteController::class, 'favorite']);
    Route::post('/getfavorites', [FavoriteController::class, 'getFavorites']);

});

Route::group(['prefix' => 'categories'], function(){
    Route::post('/addcat', [CategoryController::class, 'addCat']);
    Route::post('/getcatbyid', [CategoryController::class, 'getCatById']);
    Route::post('/searchcat', [CategoryController::class, 'searchCat']);
    Route::get('/getcats', [CategoryController::class, 'getcats']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});