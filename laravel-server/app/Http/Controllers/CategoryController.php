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
}
