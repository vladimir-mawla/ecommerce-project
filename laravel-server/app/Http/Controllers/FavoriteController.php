<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Item;
use App\Models\User;

class FavoriteController extends Controller
{
    //Add item to favorites
    public function favorite(Request $request){

        $favorite = new Favorite;
        $favorite->user_id = $request->user_id;
        $favorite->item_id = $request->item_id;
        $hello = Favorite::where('user_id', $request->user_id)->where('item_id', $request->item_id)->get();
        if(count($hello) == 0){
            $favorite->save();
            return response()->json([
                "status" => "Success",
            ], 200);

        } else{
            return response()->json([
                "status" => "Fail",
            ], 200);
        }
        


    }
    //Get user's favorites
    public function getFavorites(Request $request){
        $user_id = $request->user_id;
        
        //$favorites = User::with('favorite')->get();
        //return view('view_name', compact('favorites'));

        $favorite_items = User::find($user_id)->items()->get();
        
        //$favorites = Item::with('user_id');
        //$favorite_items= $favorites->favorites();
        return response()->json([
            "status" => "success",
            "favorites" => $favorite_items
        ], 200);
    }

    public function unfavorite(Request $request){
        
        Favorite::where('user_id',$request->user_id)->where('item_id',$request->item_id)->delete();
        return response()->json([
            "success" => "Deleted from favorites",
        ], 200);
    }

    public function checkFavorite(Request $request){
        $user_id = $request->user_id;
        $item_id = $request->item_id;
        $hello = Favorite::where('user_id', $user_id)->where('item_id', $item_id)->get();

        if(count($hello) == 0){
            echo "hi";
        } else{
            echo "bye";
        }
    }
}
