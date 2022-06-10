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

        //search categories
        public function searchCat(Request $request){
            $name = $request->name;
            $category = Category::where("name", "LIKE", "%$name%")->get();
            
            return response()->json([
                "status" => "Success",
                "result" => $category
            ], 200);
        }
        //Get all categories
        public function getCats(Request $request){
            $user_type = $request->user_type;
            $category = Category::all();
            return response()->json([
                "status" => "success",
                "items" => $category
            ], 200);
        }
}
