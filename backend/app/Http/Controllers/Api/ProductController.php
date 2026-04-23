<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if($request->search){
            $query->where('name','like','%'.$request->search.'%');
        }

        if($request->category){
            $query->where('category',$request->category);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required',
            'category'=>'required',
            'price'=>'required|numeric',
            'quantity'=>'required|integer',
            'description'=>'nullable'
        ]);

        return Product::create($data);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->all());

        return $product;
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message'=>'Deleted']);
    }
}
