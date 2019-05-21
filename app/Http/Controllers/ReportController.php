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


/***************************TABLA DE SERVICOS Y GRAFICO DE SERVICIOS MAS SOLICITADOS**************************/


        $services = DB::table('cw_service')
                     ->leftJoin('cliente', 'cw_service.client_id', '=', 'cliente.idcliente')
                     ->leftJoin('cw_type_vehicle', 'cw_service.type_vehicle', '=', 'cw_type_vehicle.id')
                     ->leftJoin('marca', 'cw_service.brand_id', '=', 'marca.idmarca')
                     ->whereBetween('date_service', [$request->fecha1, $request->fecha2])
                     ->where('site_id', $request->sucursal)
                     ->select('cw_service.*','cliente.full_name AS full_name','cw_type_vehicle.name AS vehicle_name','marca.nombre AS brand_name')
                     ->get();



/************INSERTAR EN UN ARRAY LOS ID CORRESPONDIENTES A LOS SERVICIOS***************************/

          $services_id = array();
            foreach($services as $service) {
                 $services_id[] = $service->id;
             }
/************INSERTAR EN UN ARRAY LOS ID CORRESPONDIENTES A LOS SERVICIOS***************************/




/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/

          if (count($services) >= 1) {
                 $services = $services;
             }else{
                $services = 'Sin Resultados';
             }



/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/


        $services_detail = DB::table('cw_service_detail')
                 ->select(DB::raw('count(*) as service_count,name,SUM(amount_service) as amount_service'))
                 ->whereIn('service_id', $services_id)
                 ->groupBy('name')
                 ->orderBy('service_count', 'desc')
                 ->limit(6)
                 ->get();



/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/

          if (count($services_detail) >= 1) {
                 $services_detail = $services_detail;
             }else{
                $services_detail = 'Sin Resultados';
             }         

/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/



/***************************TABLA DE SERVICOS Y GRAFICO DE SERVICIOS MAS SOLICITADOS**************************/


/***************************GRAFICO DE VEHICULOS MAS SOLICITADOS**************************/
        $type_vehicles = DB::table('cw_service')
                 ->leftJoin('cw_type_vehicle', 'cw_service.type_vehicle', '=', 'cw_type_vehicle.id')
                 ->leftJoin('marca', 'cw_service.brand_id', '=', 'marca.idmarca')
                 ->whereBetween('date_service', [$request->fecha1, $request->fecha2])
                 ->where('site_id', $request->sucursal)
                 ->select(DB::raw('count(*) as type_vehicle_count,cw_type_vehicle.name AS vehicle_name'))
                 ->groupBy('vehicle_name')
                 ->orderBy('type_vehicle_count', 'desc')
                 ->limit(6)
                 ->get(); 

 /************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/                


          if (count($type_vehicles) >= 1) {
                 $type_vehicles = $type_vehicles;
             }else{
                $type_vehicles = 'Sin Resultados';
             }                            
/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/
/***************************GRAFICO DE VEHICULOS MAS SOLICITADOS**************************/



/****************************GRAFICO DE GANANCIAS TOTALES**************************/



$total_amount = DB::table('cw_service_detail')
                 ->select(DB::raw('SUM(amount_service) as amount_service_total'))
                 ->whereIn('service_id', $services_id)
                 ->get();

/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/


        if (!empty($total_amount[0]->amount_service_total)) {
                 $total_amount = $total_amount;
             }else{
                $total_amount = 'Sin Resultados';
             }

/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/
 $total_services_detail = DB::table('cw_service_detail')
                 ->select(DB::raw('count(*) as service_count,name,SUM(amount_service) as amount_service'))
                 ->whereIn('service_id', $services_id)
                 ->groupBy('name')
                 ->orderBy('service_count', 'desc')
                 ->limit(6)
                 ->get();
/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/


         if (count($total_services_detail) >= 1) {
                 $total_services_detail = $total_services_detail;
             }else{
                $total_services_detail = 'Sin Resultados';
             }        
/************CONDICIONAL PARA VERIFICAR QUE EXISTEN RESULTADOS***************************/

/****************************GRAFICO DE GANANCIAS TOTALES**************************/


    	$data = [            
              'services'              => $services,
              'details'               => $services_detail,
              'type_vehicles'         => $type_vehicles,
              'total_amount'          => $total_amount,
              'total_amount_services' => $total_services_detail,
            ];

           return response()->json($data);

    }
}
