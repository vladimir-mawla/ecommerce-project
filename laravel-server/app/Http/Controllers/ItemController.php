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
}
