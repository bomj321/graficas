@extends('layouts.app')

@section('content')
<div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col xs-12">
                    <div class="panel panel-info">
                          <div class="panel-heading">
                            <div class="row">
                                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
                                    <strong>Reportes</strong>
                                </div>

                                <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12">
                                    <form class="form-inline" id="form-graficas">
                                          <div class="form-group">
                                            <label for="fecha-1">Desde</label>
                                            <input type="date" class="form-control" id="fecha-1" required>
                                          </div>

                                          <div class="form-group">
                                            <label for="fecha-2">Hasta</label>
                                            <input type="date" class="form-control" id="fecha-2" required>
                                          </div>

                                          <div class="form-group select-sucursales">
                                            <label for="sucursal">Sucursal</label>
                                            <select name="sucursal" class="form-control" id="sucursal" required>
                                                <option value="">Seleccione la Sucursal</option>
                                            @foreach($sites as $site)
                                                <option value="{{$site->id}}">{{$site->name}}</option>
                                            @endforeach    


                                            </select>
                                          </div>
                                          <button type="submit" class="btn btn-success">Buscar por Fecha</button>
                                    </form>                                    
                                </div>                                
                           </div>

                          

                          </div>
                          <div class="panel-body">
                            <div id="mensaje-bienvenida">
                                <h3 class="text-center">Buenas, escoja el rango de fecha para buscar la información requerida.</h3>
                                
                            </div>


                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-12 col xs 12" id="container-tabla">                                            
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-12 col xs 12">

                                    <div class="row">

                                            <div class="col-lg-5 col-md-5 col-sm-12 col xs 12" id="container-tabla-ultimos-servicios">

                                               

                                            </div>  


                                             <div class="col-lg-7 col-md-7 col-sm-12 col xs 12" id="container-ultimos-servicios">

                                            </div>   
                                        
                                    </div>

                                </div>
                            </div>


                             <div class="row seccion-bottom">

                                <div class="col-lg-6 col-md-6 col-sm-12 col xs 12">

                                    <div class="row">

                                             <div class="col-lg-4 col-md-4 col-sm-12 col xs 12" id="container-tabla-vehiculos-solicitados">

                                               

                                            </div>  


                                            
                                             <div class="col-lg-8 col-md-8 col-sm-12 col xs 12" id="container-vehiculos-solicitados">

                                            </div>  
                                        
                                    </div>

                                </div>  

                                <div class="col-lg-6 col-md-6 col-sm-12 col xs 12">

                                    <div class="row">

                                             <div class="col-lg-5 col-md-5 col-sm-12 col xs 12" id="container-tabla-total">

                                               

                                            </div>  


                                            
                                             <div class="col-lg-7 col-md-7 col-sm-12 col xs 12" id="container-total">

                                            </div>  
                                        
                                    </div>

                                </div>                                     

   
                            </div>


                          </div>
                    </div>
                </div>
            </div>
</div>

@endsection
