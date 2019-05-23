<table>
  <tr>
    <th>Fecha</th>
    <th>Tipo</th>
    <th>Marca</th>
    <th>Placa</th>
    <th>Propietario</th>
  </tr>

  @foreach($services as $service)
    <tr>
      <td>{{ $service->date_service }}</td>
      <td>{{ $service->vehicle_name }} </td>
      <td>{{ $service->brand_name ? $service->brand_name : 'Sin Marca' }}</td>
      <td>{{ $service->plate }}</td>
      <td>{{ $service->full_name }}</td>
    </tr>
  @endforeach
</table>