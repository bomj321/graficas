
/*********TOKEN DE SEGURIDAD PARA LARAVEL*******************/

var currentToken = $('meta[name="csrf-token"]').attr('content');

/*********TOKEN DE SEGURIDAD PARA LARAVEL*******************/

$( "#form-graficas" ).submit(function(e) {

	var fecha_1             = $('#fecha-1').val();
    var fecha_2             = $('#fecha-2').val();
    var sucursal_form       = $('#sucursal').val();

  

   $.ajax({
            type: "POST",
            dataType:'json',
            url: "/reports",
            data: {_token:currentToken, fecha1 : fecha_1, fecha2 : fecha_2, sucursal : sucursal_form},
           // data: {"id_inventory": value},
            success:function(data){
            	$( "#mensaje-bienvenida" ).hide();

            	Highcharts.setOptions({ // Apply to all charts
    chart: {
        events: {
            beforePrint: function () {
                
            }
        }
    }
});
       	
				tablaServicios(data.services,data.fecha1,data.fecha2,data.sucursal);
				tablaGraficaServicios(data.details);
				graficaServicios(data.details);
				tablaGraficaVehiculos(data.type_vehicles);
				graficaVehiculos(data.type_vehicles);
				tablaTotal(data.total_amount);
				graficaTotal(data.total_amount_services); 				    
            }
        });

   e.preventDefault();
   

});

/*******************************FUNCIONES*********************************/

function tablaServicios($services,$fecha1,$fecha2,$sucursal){


	var services = $services;

	var fecha1   = $fecha1;
	var fecha2   = $fecha2;
	var sucursal = $sucursal;

	if (services === 'Sin Resultados') {

		var plantilla_tabla = `
			
			<center class="text-danger" style="margin-top:25%"><h5><strong>No Hay resultados</strong</h5></center>	
		`
	}else{


		var plantilla_tabla = `

	<div class="table-responsive withscroll">
			<a href="reports/exportar/${fecha1}/${fecha2}/${sucursal}" target="_blank" class="btn btn-success" id='button-exportar' style="margin-bottom:10px;">Exportar a EXCEL</a>

			<table class="table table-striped" id="report_table">					
					<tr>
						<th>Fecha</th>
						<th>Tipo</th>
						<th>Marca</th>
						<th>Placa</th>
						<th>Propietario</th>
					</tr>

 					${services.map(service => `
 						    <tr>
		 						<td>${service.date_service}</td>
							    <td>${service.vehicle_name}</td> 							   
							    <td>${service.brand_name ? `${service.brand_name}` : 'Sin Marca'}</td>
							    <td>${service.plate}</td>
							    <td>${service.full_name}</td>
	 			            </tr>

	 				`).join('')}

		     </table>
	</div>	
`
	}

$("#container-tabla").html(plantilla_tabla);

}


function tablaGraficaServicios($details){

	var details = $details;


if (details === 'Sin Resultados') {

		var plantilla_tabla = `<center class="text-danger" style="margin-top:25%"><h5><strong>No Hay resultados</strong</h5></center>`
	}else{


		var plantilla_tabla = `

	<div class="table-responsive withscroll">
			<table class="table table-striped">					
					<tr>
						<th>Servicio</th>
						<th>Cant.</th>
						<th>Venta</th>						
					</tr>

				${details.map(detail => `
 						    <tr>
		 						<td>${detail.name}</td>
							    <td>${detail.service_count}</td> 							   
							    <td>${detail.amount_service}$</td>							    
	 			            </tr>

	 				`).join('')}
							
		</table>
	</div>	
`
	}



$("#container-tabla-ultimos-servicios").html(plantilla_tabla);


}


function graficaServicios($details){

var details = $details;


if (details === 'Sin Resultados') {


if (typeof Highcharts.chart('container-ultimos-servicios', {}) !== 'undefined') {
		Highcharts.chart('container-ultimos-servicios', {}).destroy();

	}

 }else{

 	 var categorias = new Array();
	            var montos     = new Array();

	            $.each(details,function(key, value){
	                categorias.push(value.name);
	                valor = Number(value.amount_service);
	                montos.push(valor);
	            });



		Highcharts.chart('container-ultimos-servicios', {
			    chart: {
			        type: 'column'
			    },
			    title: {
			        text: 'Cantidad de Ventas'
			    }/*,
			    subtitle: {
			        text: 'Costos de los lavados contra ventas'
			    }*/,
			    xAxis: {
			        categories: categorias,
			        crosshair: true
			    },
			    yAxis: {
			        min: 0,
			        title: {
			            text: 'Costos'
			        }
			    },
			    tooltip: {
			        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			            '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
			        footerFormat: '</table>',
			        shared: true,
			        useHTML: true
			    },
			    plotOptions: {
			        column: {
			            pointPadding: 0.2,
			            borderWidth: 0
			        }
			    },
			    series: [{
			        name: 'Costos',
			        data: montos

			    }]
		});

 }
			   
	    
}



function tablaGraficaVehiculos($type_vehicles){

	var type_vehicles = $type_vehicles;


	if (type_vehicles === 'Sin Resultados') {

		var plantilla_tabla = `<center class="text-danger" style="margin-top:25%"><h5><strong>No Hay resultados</strong</h5></center>`
	}else{

		var plantilla_tabla = `

			<div class="table-responsive withscroll">
					<table class="table table-striped">					
							<tr>
								<th>Marca</th>
								<th>Cant.</th>
							</tr>


						${type_vehicles.map(type_vehicle => `
							<tr>
			 						<td>${type_vehicle.vehicle_name}</td>
								    <td>${type_vehicle.type_vehicle_count}</td> 							   
		 			            </tr>

		 				`).join('')}		
				</table>
			</div>	
		 `
	}


$("#container-tabla-vehiculos-solicitados").html(plantilla_tabla);


}


function graficaVehiculos($type_vehicles){


	var type_vehicles = $type_vehicles;


if (type_vehicles === 'Sin Resultados') {


if (typeof Highcharts.chart('container-vehiculos-solicitados', {}) !== 'undefined') {
		Highcharts.chart('container-vehiculos-solicitados', {}).destroy();

	}


 }else{
 		var categorias   = new Array();
			            var cantidades     = new Array();

			            $.each(type_vehicles,function(key, value){
			                categorias.push(value.vehicle_name);
			                valor = Number(value.type_vehicle_count);
			                cantidades.push(valor);
			            });



				Highcharts.chart('container-vehiculos-solicitados', {
					    chart: {
					        type: 'column'
					    },
					    title: {
					        text: 'Vehiculos mas Solicitados por Sucursal'
					    }/*,
					    subtitle: {
					        text: 'Costos de los lavados contra ventas'
					    }*/,
					    xAxis: {
					        categories: categorias,
					        crosshair: true
					    },
					    yAxis: {
					        min: 0,
					        title: {
					            text: 'Tipos de Vehiculos'
					        }
					    },
					    tooltip: {
					        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
					        footerFormat: '</table>',
					        shared: true,
					        useHTML: true
					    },
					    plotOptions: {
					        column: {
					            pointPadding: 0.2,
					            borderWidth: 0
					        }
					    },
					    series: [{
					        name: 'Vehiculos',
					        data: cantidades

					    }]
				});


 }

	       
}




function tablaTotal($total_amount){

	var total_amount = $total_amount;
		/*********PLANTILLA PARA LA TABLA************/
if (total_amount === 'Sin Resultados') {

		var plantilla_tabla = `<center class="text-danger" style="margin-top:25%"><h5><strong>No Hay resultados</strong</h5></center>`
	}else{
		var plantilla_tabla = `

	<div class="table-responsive withscroll">
			<table class="table table-striped">					
					<tr>
						<th></th>
						<th>Valor</th>
					</tr>

					<tr>
						<td>Venta</td>
						<td class="text-primary">${total_amount[0].amount_service_total} $</td>
					</tr>
									
		</table>
	</div>	
`
}


$("#container-tabla-total").html(plantilla_tabla);

/*********PLANTILLA PARA LA TABLA************/  

}


function graficaTotal($total_amount_services){

	var total_amount_services = $total_amount_services;

if (total_amount_services === 'Sin Resultados') {

	if (typeof Highcharts.chart('container-total', {}) !== 'undefined') {
		Highcharts.chart('container-total', {}).destroy();

	}


 }else{ 

		 	   var categorias   = new Array();
				            var cantidades     = new Array();

				            $.each(total_amount_services,function(key, value){
				                categorias.push(value.name);
				                valor = Number(value.amount_service);
				                cantidades.push(valor);
				            });

					Highcharts.chart('container-total', {
						    chart: {
						        type: 'column'
						    },
						    title: {
						        text: 'Ganancias Totales por Sucursal'
						    }/*,
						    subtitle: {
						        text: 'Costos de los lavados contra ventas'
						    }*/,
						    xAxis: {
						        categories: categorias,
						        crosshair: true
						    },
						    yAxis: {
						        min: 0,
						        title: {
						            text: 'Costos'
						        }
						    },
						    tooltip: {
						        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						            '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
						        footerFormat: '</table>',
						        shared: true,
						        useHTML: true
						    },
						    plotOptions: {
						        column: {
						            pointPadding: 0.2,
						            borderWidth: 0
						        }
						    },
						    series: [{
						        name: 'Servicio',
						        data: cantidades

						    }]
					});


 	}

		
}

/*******************************FUNCIONES*********************************/    