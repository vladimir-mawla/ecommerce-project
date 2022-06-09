<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    //Add item to favorites
    public function favorite(Request $request){

        $favorite = new Favorite;
        $favorite->user_id = $request->user_id;
        $favorite->item_id = $request->item_id;
        $favorite->save();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
