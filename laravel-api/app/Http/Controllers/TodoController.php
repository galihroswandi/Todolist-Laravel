<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelper;
use App\Models\TodosModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ResponseHelper::success('Ok', TodosModel::orderBy("id", "desc")->get(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'string|max:255',
            'completed' => 'boolean'
        ]);

        if ($validatedData->fails()) {
            return ResponseHelper::error("Error Bad Request", 400, $validatedData->errors());
        }

        $postTodo = TodosModel::create($validatedData->validated());

        if ($postTodo) {
            return ResponseHelper::success("Ok", $request->all(), 201);
        }

        return ResponseHelper::error("Internal Server Error", 500, []);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            'message' => 'Ok',
            'data' => TodosModel::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'string|max:255',
            'completed' => 'boolean',
        ]);

        if ($validatedData->fails()) {
            return ResponseHelper::error("Error Bad Request", 400, $validatedData->errors());
        }

        $updateTodo = TodosModel::find($id)->update($validatedData->validated());

        if ($updateTodo) {
            return ResponseHelper::success("Ok", $request->all(), 201);
        }

        return ResponseHelper::error("Internal Server Error", 500, []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleteTodo = TodosModel::find($id);

        if (!$deleteTodo) {
            return ResponseHelper::error("Not Found", 404, []);
        }

        $deleteTodo->delete();

        if ($deleteTodo) {
            return ResponseHelper::success("Ok", $id, 201);
        }
    }
}