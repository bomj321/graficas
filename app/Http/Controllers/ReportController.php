<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        $sites = DB::table('inv_sites')
        ->get();

    	return view('reports.index',compact('sites'));

    }


    public function grafics(Request $request){


        $services = DB::table('cw_service')
                     ->leftJoin('cliente', 'cw_service.client_id', '=', 'cliente.idcliente')
                     ->leftJoin('cw_type_vehicle', 'cw_service.type_vehicle', '=', 'cw_type_vehicle.id')
                     ->leftJoin('marca', 'cw_service.brand_id', '=', 'marca.idmarca')
                     ->whereBetween('date_service', [$request->fecha1, $request->fecha2])
                     ->where('site_id', $request->sucursal)
                     ->select('cw_service.*','cliente.full_name AS full_name','cw_type_vehicle.name AS vehicle_name','marca.nombre AS brand_name')
                     ->get();


          $services_id = array();
            foreach($services as $service) {
                 $services_id[] = $service->id;
             }


        $services_detail = DB::table('cw_service_detail')
                 ->select(DB::raw('count(*) as service_count,name,SUM(amount_service) as amount_service'))
                 ->whereIn('service_id', $services_id)
                 ->groupBy('name')
                 ->orderBy('service_count', 'desc')
                 ->limit(6)
                 ->get();           



    	$data = [            
              'services'         => $services,
              'services_id'      => $services_id,
              'details'          => $services_detail
            ];

           return response()->json($data);

    }
}
