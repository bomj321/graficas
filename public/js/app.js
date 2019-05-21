
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
				tablaServicios(data.services);
				tablaGraficaServicios(data.details);
				graficaServicios();
				tablaGraficaVehiculos();
				graficaVehiculos();
				tablaTotal();
				graficaTotal(); 
            }
        });

   e.preventDefault();
   

});

/*******************************FUNCIONES*********************************/

function tablaServicios($services){


	var services = $services;


var plantilla_tabla = `

	<div class="table-responsive withscroll">
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
$("#container-tabla").html(plantilla_tabla);

/*********PLANTILLA PARA LA TABLA************/  
}


function tablaGraficaServicios($details){

	var details = $details;
		/*********PLANTILLA PARA LA TABLA************/
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
$("#container-tabla-ultimos-servicios").html(plantilla_tabla);

/*********PLANTILLA PARA LA TABLA************/  

}


function graficaServicios(){
	Highcharts.chart('container-ultimos-servicios', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Lavados y Ventas'
		    }/*,
		    subtitle: {
		        text: 'Costos de los lavados contra ventas'
		    }*/,
		    xAxis: {
		        categories: [
		            'Lavado',
		            'Brillado',
		            'Grafitado',
		            'Motor',
		            'Overhaul',
		            'Aceite',		            
		        ],
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
		        name: 'Grafico de los Lavados',


		        data: [
		        {y:  49.9, color: 'red'}, 
		        {y:  71.5, color: 'blue'}, 
		        {y:  106.4, color: 'green'}, 
		        {y:  129.2, color: 'black'}, 
		        {y:  144.0, color: 'orange'}, 
		        {y:  176.0, color: 'silver'},
		      
		        ]

		    }]
	});
}



function tablaGraficaVehiculos(){
		/*********PLANTILLA PARA LA TABLA************/
var plantilla_tabla = `

	<div class="table-responsive withscroll">
			<table class="table table-striped">					
					<tr>
						<th>Marca</th>
						<th>Cant.</th>
					</tr>


					<tr>
						<td>Lavado</td>
						<td>44</td>
					</tr>

					<tr>
						<td>Brillado</td>
						<td>45</td>
					</tr>

					<tr>
						<td>Grafitado</td>
						<td>47</td>
					</tr>

					<tr>
						<td>Motor</td>
						<td>46</td>
					</tr>

					<tr>
						<td>OverHaul</td>
						<td>89</td>
					</tr>

					<tr>
						<td>Aceite</td>
						<td>90</td>
					</tr>					
		</table>
	</div>	
`
$("#container-tabla-vehiculos-solicitados").html(plantilla_tabla);

/*********PLANTILLA PARA LA TABLA************/  

}


function graficaVehiculos(){
	Highcharts.chart('container-vehiculos-solicitados', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Vehiculos mas Solicitados'
		    }/*,
		    subtitle: {
		        text: 'Costos de los lavados contra ventas'
		    }*/,
		    xAxis: {
		        categories: [
		            'Motos',
		            'Autos',
		            'Minivan',
		            'Camion',
		            'Camiones',
		        ],
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


		        data: [
		        {y:  50, color: 'red'}, 
		        {y:  150, color: 'blue'}, 
		        {y:  180, color: 'green'}, 
		        {y:  135, color: 'black'}, 
		        {y:  137, color: 'orange'}, 
		      
		        ]

		    }]
	});
}




function tablaTotal(){
		/*********PLANTILLA PARA LA TABLA************/
var plantilla_tabla = `

	<div class="table-responsive withscroll">
			<table class="table table-striped">					
					<tr>
						<th></th>
						<th>Valor</th>
					</tr>


					<tr>
						<td>Venta</td>
						<td class="text-primary">500.045$</td>
					</tr>

					<tr>
						<td>Pago a Lavador</td>
						<td class="text-danger">788.546$</td>
					</tr>

					<tr>
						<td>Pago a Mecanico</td>
						<td class="text-danger">324.793$</td>
					</tr>

					<tr>
						<td></td>
						<td class="text-primary">7.785.875$</td>
					</tr>

									
		</table>
	</div>	
`
$("#container-tabla-total").html(plantilla_tabla);

/*********PLANTILLA PARA LA TABLA************/  

}


function graficaTotal(){
	Highcharts.chart('container-total', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Ganancias Totales'
		    }/*,
		    subtitle: {
		        text: 'Costos de los lavados contra ventas'
		    }*/,
		    xAxis: {
		        categories: [
		            'Lavado',
		            'Brillado',
		            'Grafitado',
		            'Motor',
		            'Overhaul',
		            'Aceite',	
		        ],
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
		        name: 'Vehiculos',


		        data: [
		        {y:  100000, color: 'red'}, 
		        {y:  150000, color: 'blue'}, 
		        {y:  50000, color: 'green'}, 
		        {y:  35000, color: 'black'}, 
		        {y:  200000, color: 'orange'}, 
		        {y:  200000, color: 'silver'}, 
		      
		        ]

		    }]
	});
}

/*******************************FUNCIONES*********************************/    