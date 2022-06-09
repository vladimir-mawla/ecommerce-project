<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
        //Add category
        public function addCat(Request $request){

            $category = new Category;
            $category->name = $request->name;
            $category->save();
    
            return response()->json([
                "status" => "Success",
            ], 200);
        }

        //Get category by id
        public function getCatById(Request $request){
            $cat_id = $request->cat_id;
            $category = Category::find($cat_id);
            return response()->json([
                "status" => "Success",
                "item" => $category,
            ], 200);
        }
}
