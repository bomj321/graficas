<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', 'ReportController@index')
->name('welcome.index');



/******ROUTE FOR AJAX CALLS******/
Route::post('reports', 'ReportController@grafics')
	->name('reports.grafics');

Route::get('reports/exportar/{fecha1}/{fecha2}/{sucursal}', 'ReportController@export')
	->name('reports.export');	

/******ROUTE FOR AJAX CALLS******/
