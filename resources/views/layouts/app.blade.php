<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Reportes Graficos</title>

	<!-- Scripts -->
    <script src="{{ asset('js/jQuery-2.1.4.min.js') }}" defer></script>
    <script src="{{ asset('js/highcharts.js') }}" defer></script>  


    <script src="{{ asset('js/app.js') }}" defer></script>

	 <!-- Styles -->
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    
</head>
<body>

<!--------------Navbar------------------------->
		<nav class="navbar navbar-default">
			  <div class="container-fluid">
			    <!-- Brand and toggle get grouped for better mobile display -->
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </button>
			      <a class="navbar-brand" href="{{ route('welcome.index') }}">Reportes Graficos</a>
			    </div>

			    <!-- Collect the nav links, forms, and other content for toggling -->
			    <!--<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul class="nav navbar-nav">
			        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
			        <li><a href="#">Link</a></li>			       
			      </ul> -->
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->
		</nav>
<!--------------Navbar------------------------->



<!-----Content Section------->
	@yield('content')
<!-----Content Section------->	
</body>
</html>