<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\User;

class ItemController extends Controller
{

        public function hi(){
            echo "You are not Admin";
        }
        //Get all items
        public function getItems(Request $request){
            $items = Item::all();
            $liked = User::find($request->user_id)->items()->get();
            if(count($liked) != 0){
                return response()->json([
                    "status" => "success",
                    "items" => $items,
                    "liked" => "yes"
                ], 200);
            }else{
                return response()->json([
                    "status" => "success",
                    "items" => $items,
                    "liked" => "no"
                ], 200);
            }
 
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
        //Get item by name
        public function searchItem(Request $request){
            $name = $request->name;
            $item = Item::where("name", "LIKE", "%$name%")->get();
            
            return response()->json([
                "status" => "Success",
                "result" => $item
            ], 200);
        }
        //Get item by id
        public function getItemById(Request $request){
            $item_id = $request->item_id;
            $item = Item::find($item_id);
            return response()->json([
                "status" => "Success",
                "item" => $item,
            ], 200);
        }
}