
$(document).ready(function() {
    $('#btn_ver_reporte').click(function(e)
        {
          var fecha_inicio = $('#id_fecha_inicio').val();
          var fecha_fin = $('#id_fecha_fin').val();
          var curso = $('#id_curso').val();
          var trs=$("#datatable tr").length;
            for (var i=1; i<trs; i++)
            {
                $("#datatable tr:last").remove();
            }

          $.ajax({
            url: '/services/ajax/reporte/estudiantes',
            type: "POST",
            data: {
              'opc':'reporte',
              'fecha_inicio': fecha_inicio,
              'fecha_fin' : fecha_fin,
              'curso' : curso,
            },
            dataType: 'json',
            success: function (data) {
                if(data.reporte){
                    $.each(reporte, function(index, mhObj) {
                    $('#datatable > tbody').append('<tr><td>'+mhObj.identificacion+'</td><td>'+mhObj.nombre+'</td><td>'+mhObj.direccion+'</td><td>'+mhObj.sexo+'</td><td>'+mhObj.curso+'</td></tr>');
                    });
                }
                });
            });
        });
});