<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
        //Get all items
        public function getItems(){
            $items = Item::all();
            return response()->json([
                "status" => "success",
                "items" => $items
            ], 200);
        }
        //Add item
        public function addItem(Request $request){

            $items = new Item;
            $items->name = $request->name;
            $items->price = $request->price;
            $items->category_id = $request->category_id;
            $items->img = $request->image;
            $items->save();

            return response()->json([
                "status" => "Success",
            ], 200);
        }
}
