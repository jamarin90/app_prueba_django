
function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}

function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function() {

    /*
        Fullscreen background
    */
    //$.backstretch("assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });

    /*
        Form
    */
    $('.f1 fieldset:first').fadeIn('slow');

    $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });

    // next step
    $('.f1 .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');

    	parent_fieldset.find('input[required], select[required]').each(function(){
    	    if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}

    	});



    	// fields validation
//    	parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
//    		if( $(this).val() == "" ) {
//    			$(this).addClass('input-error');
//    			next_step = false;
//    		}
//    		else {
//    			$(this).removeClass('input-error');
//    		}
//    	});
    	// fields validation

    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
    			// change icons
    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
    			// progress bar
    			bar_progress(progress_line, 'right');
    			// show next step
	    		$(this).next().fadeIn();
	    		// scroll window to beginning of the form
    			scroll_to_class( $('.f1'), 20 );
	    	});
    	}

    });

    // previous step
    $('.f1 .btn-previous').on('click', function() {
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');

    	$(this).parents('fieldset').fadeOut(400, function() {
    		// change icons
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		// progress bar
    		bar_progress(progress_line, 'left');
    		// show previous step
    		$(this).prev().fadeIn();
    		// scroll window to beginning of the form
			scroll_to_class( $('.f1'), 20 );
    	});
    });

    // submit
    $('.f1').on('submit', function(e) {

    	// fields validation
    	$(this).find('input[required], select[required]').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	// fields validation

    });

});

//Duplicar las piezas

$(document).ready(function() {

    var iCnt = 1;
    //Oculto los botone
    $('#f2_btSiguiente').hide();
    $('#f3_btCalcularTotal').hide();
    $('#f3_btCrear').hide();
    //Se ocultan los botones para adicionar piezas
    $('#btAdd').hide();
    $('#btRemove').hide();
    var unidadPeso = $("#id_Unidad_peso option:selected").text();
    var unidadLongitud = $('#id_Unidad_longitud option:selected').text();
    var tipoMoneda = $('#id_Tipo_moneda option:selected').text();

    //Se eliminan los elementos que no esten seleccionados de las unidades para que no se puedan cambiar
    var valorUnidadPeso = $("#id_Unidad_peso option:selected").val();
    $('#id_Unidad_peso option').each(function() {
        if($(this).val()!=valorUnidadPeso)
            $("#id_Unidad_peso").find("option[value='"+$(this).val()+"']").remove();
    });
    var valorUnidadLongitud = $("#id_Unidad_longitud option:selected").val();
    $('#id_Unidad_longitud option').each(function() {
        if($(this).val()!=valorUnidadLongitud)
            $("#id_Unidad_longitud").find("option[value='"+$(this).val()+"']").remove();
    });
    var valorTipoMoneda = $("#id_Tipo_moneda option:selected").val();
    $('#id_Tipo_moneda option').each(function() {
        if($(this).val()!=valorTipoMoneda)
            $("#id_Tipo_moneda").find("option[value='"+$(this).val()+"']").remove();
    });



    //Al presionar el boton para añadir una nueva pieza
    $('#btAdd').click(function() {
        if (iCnt <= 19) {
            peso = parseFloat($('#id_Peso').val()) + parseFloat($('#peso'+iCnt).val());
            $('#pesoTotal').val(null);
            $('#costoDeclaradoTotal').val(null);
            $('#totalPiezas').val(null);
            $('#btSiguiente').hide();
            //Se capturan las unidades
            unidadPeso = $("#id_Unidad_peso option:selected").text();
            unidadLongitud = $('#id_Unidad_longitud option:selected').text();
            tipoMoneda = $('#id_Tipo_moneda option:selected').text();
            $('#id_Tipo_empaque').clone()

            iCnt = iCnt + 1;

            // Añadir formulario de piezas
            //Primera fila
            var divrow0 = $(document.createElement('div'));
            $(divrow0).attr('class', "row");
            $(divrow0).attr('id', 'row0'+iCnt);
            $(divrow0).append('<h4> Pieza '+ iCnt +'</h4>');
            $(otraspiezas).append(divrow0);
            var divcol6= $(document.createElement('div'));
            $(divcol6).attr('class', "col-md-6 col-sm-6");
            var divcol4= $(document.createElement('div'));
            $(divcol4).attr('class', "col-md-4 col-sm-4");
            var divformTipoempaque = $(document.createElement('div'));
            var selectTipoEmpaque = $('#id_Tipo_empaque').clone();
            $(divrow0).append(divcol6);
            $(divcol6).append(divcol4);
            $(divcol4).append(divformTipoempaque);
            $(divformTipoempaque).append('<label>Tipo de empaque : </label>');
            $(divformTipoempaque).append(selectTipoEmpaque);
            $(selectTipoEmpaque).attr('name', "tipoEmpaque"+iCnt);

            //$(divformTipoempaque).append('<select name="tipoEmpaque'+ iCnt + '" class="form-control">'+
            //'<option value="" selected="">---------</option>');

            var divrow= $(document.createElement('div'));
            var divcol4= $(document.createElement('div'));
            var divcol6= $(document.createElement('div'));
            var divformPeso = $(document.createElement('div'));
            var divcol6_2= $(document.createElement('div'));
            var divformUnidadPeso = $(document.createElement('div'));
            var divcol4_2= $(document.createElement('div'));
            var divcol12= $(document.createElement('div'));
            var divcol4_2_1= $(document.createElement('div'));
            var divformLargo = $(document.createElement('div'));
            var divcol4_2_2= $(document.createElement('div'));
            var divformAlto = $(document.createElement('div'));
            var divcol4_2_3= $(document.createElement('div'));
            var divformAncho = $(document.createElement('div'));
            var divcol4_3= $(document.createElement('div'));
            var divcol6_3= $(document.createElement('div'));
            var divformLongitud = $(document.createElement('div'));

            //fila
            $(otraspiezas).append(divrow);
            $(divrow).attr('class', "row");
            $(divrow).attr('id', 'row'+iCnt);
            $(divrow).append(divcol4);
            $(divcol4).attr('class', "col-md-4 col-sm-4");
            $(divcol4).append(divcol6);
            $(divcol6).attr('class', "col-md-6 col-sm-6");
            $(divcol6).append(divformPeso);
            $(divformPeso).attr('class', "form-group");
            $(divformPeso).append('<label> Peso * : </label>');
            $(divformPeso).append('<input type="number" name="peso'+ iCnt + '" id="peso'+iCnt+'" class="form-control">');
            $(divcol4).append(divcol6_2);
            $(divcol6_2).attr('class', "col-md-6 col-sm-6");
            $(divcol6_2).append(divformUnidadPeso);
            $(divformUnidadPeso).attr('class', "form-group");
            $(divformUnidadPeso).append('<label>Unidad de peso * : </label>');
            $(divformUnidadPeso).append('<input name="unidadPeso" value="'+unidadPeso+'" disabled class="form-control">');
            $(divrow).append(divcol4_2);
            $(divcol4_2).attr('class', "col-md-4 col-sm-4");
            $(divcol4_2).append(divcol12);
            $(divcol12).attr('class', "col-md-12 col-sm-12");
            $(divcol12).append(divcol4_2_1);
            $(divcol4_2_1).attr('class', "col-md-4 col-sm-4");
            $(divcol4_2_1).append(divformLargo);
            $(divformLargo).attr('class', "form-group");
            $(divformLargo).append('<label>Largo : </label>');
            $(divformLargo).append('<input type="number" name="Largo'+ iCnt +'" id="Largo'+ iCnt +'"class="form-control">');
            $(divcol12).append(divcol4_2_2);
            $(divcol4_2_2).attr('class', "col-md-4 col-sm-4");
            $(divcol4_2_2).append(divformAlto);
            $(divformAlto).attr('class', "form-group");
            $(divformAlto).append('<label>Alto : </label>');
            $(divformAlto).append('<input type="number" name="Alto'+ iCnt +'" id="Alto'+ iCnt +'"class="form-control">');
            $(divcol12).append(divcol4_2_3);
            $(divcol4_2_3).attr('class', "col-md-4 col-sm-4");
            $(divcol4_2_3).append(divformAncho);
            $(divformAncho).attr('class', "form-group");
            $(divformAncho).append('<label>Ancho : </label>');
            $(divformAncho).append('<input type="number" name="Ancho'+ iCnt +'" id="Ancho'+ iCnt +'"class="form-control">');
            $(divcol4_3).attr('class', "col-md-4 col-sm-4");
            $(divrow).append(divcol4_3);
            $(divcol4_3).append(divcol6_3);
            $(divcol6_3).attr('class', "col-md-6 col-sm-6");
            $(divcol6_3).append(divformLongitud);
            $(divformLongitud).attr('class', "form-group");
            $(divformLongitud).append('<label>Unidad de longitud : </label>');
            $(divformLongitud).append('<input name="unidadPeso" value="'+unidadLongitud+'" disabled class="form-control">');

            var divrow1= $(document.createElement('div'));
            var divcol4= $(document.createElement('div'));
            var divcol6_1= $(document.createElement('div'));
            var divcol6_2= $(document.createElement('div'));
            var divcol8= $(document.createElement('div'));
            var divformvalordeclarado = $(document.createElement('div'));
            var divformtipomoneda = $(document.createElement('div'));
            var divformdescripcion = $(document.createElement('div'));

            $(otraspiezas).append(divrow1);
            $(divrow1).attr('class', "row");
            $(divrow1).attr('id', 'row1'+iCnt);
            $(divrow1).append(divcol4);
            $(divcol4).attr('class', "col-md-4 col-sm-4");
            $(divcol4).append(divcol6_1);
            $(divcol6_1).attr('class', "col-md-6 col-sm-6");
            $(divcol6_2).attr('class', "col-md-6 col-sm-6");
            $(divcol4).append(divcol6_2);
            //Anexo el valor declarado a la primer columna
            $(divcol6_1).append(divformvalordeclarado);
            $(divcol6_2).append(divformtipomoneda);
            $(divformvalordeclarado).attr('class', "form-group");
            $(divformvalordeclarado).append('<label>Valor declarado : </label>');
            $(divformvalordeclarado).append('<input type="number" name="valor_declarado'+ iCnt +'" id="valor_declarado'+ iCnt +'"class="form-control">');

            $(divformtipomoneda).attr('class', "form-group");
            $(divformtipomoneda).append('<label>Tipo de moneda : </label>');
            $(divformtipomoneda).append('<input name="unidadPeso" value="'+tipoMoneda+'" disabled class="form-control">');
            //Fila 3 columna descripcion
            $(divrow1).append(divcol8);
            $(divcol8).attr('class', "col-md-8 col-sm-8");
            $(divcol8).append(divformdescripcion);
            $(divformdescripcion).attr('class', "form-group");
            $(divformdescripcion).append('<label>Descripción : </label>');
            $(divformdescripcion).append('<input type="text" name="descripcion'+ iCnt +'" id="descripcion'+ iCnt +'"class="form-control">');

            $(resumenpiezas).empty();
            $('#pieza1').after(otraspiezas);
        }
        else { //se establece un limite para añadir elementos, 20 es el limite

            $(otraspiezas).append('<label>Limite Alcanzado</label>');
            $('#btAdd').attr('class', 'bt-disable');
            $('#btAdd').attr('disabled', 'disabled');

            }
    });

    $('#btRemove').click(function() { // Elimina un elemento por click
        $('#pesoTotal').val(null);
        $('#costoDeclaradoTotal').val(null);
        $('#totalPiezas').val(null);
        $('#btSiguiente').hide();
        if (iCnt != 1) {
            $('#row0' + iCnt).remove();
            $('#row' + iCnt).remove();
            $('#row1' + iCnt).remove();
            iCnt = iCnt - 1;

        }

        if (iCnt == 1) {
            $(otraspiezas).empty();
            $('#pesoTotal').empty();
            $('#costoDeclaradoTotal').empty();
            $('#totalPiezas').empty();

            //$(otraspiezas).remove();
            $('#btSubmit').remove();
            $('#btAdd').removeAttr('disabled');
            $(resumenpiezas).empty();
        }
    });

    //Si hay un cambio en los valores se debe poner el boton siguiente de f2 invisible
    $('#id_Descripcion').on('blur',function(){
        $('#f2_btSiguiente').hide();
    });
    $('#id_Largo').on('blur',function(){
        $('#f2_btSiguiente').hide();
    });
    $('#id_Alto').on('blur',function(){
        $('#f2_btSiguiente').hide();
    });
    $('#id_Ancho').on('blur',function(){
        $('#f2_btSiguiente').hide();
    });




    //Al presionar el boton de resumen de piezas
    $('#f2_btRes').click(function() { // resumen de las piezas
        $(resumenpiezas).empty();
        var peso = $('#id_Peso').val();
        var largo = $('#id_Largo').val();
        var alto = $('#id_Alto').val();
        var ancho = $('#id_Ancho').val();
        var unidadLongitud = $('#id_Unidad_longitud').val();
        var valorDeclarado = $('#id_Valor_declarado').val();
        var descripcion = $('#id_Descripcion').val();
        //Variable para indicar el total del precio
        var pesoTotal = peso;
        var costoDeclarado = valorDeclarado;
        if(ancho=="" || alto=="" || ancho=="" ) {
            var pesoVol=0;
            var unidadPesoVol = " "
        }
        else {
            if (unidadLongitud==3){
                pesoVol = ((parseFloat(largo)*parseFloat(alto)*parseFloat(ancho))/5000).toFixed(2);
                unidadPesoVol = "Kg"
            }
            else if (unidadLongitud==4){
                pesoVol = ((parseFloat(largo)*parseFloat(alto)*parseFloat(ancho))/166).toFixed(2);
                unidadPesoVol = "Lb"
            }

        }

        //Primera fila
        var divrow= $(document.createElement('div'));
        $(divrow).append('<h4> Resumen </h4>');
        var tabla = $(document.createElement('table'));
        $(divrow).append(tabla);
        $(tabla).attr('id',"example");
        $(tabla).attr('class',"table table-hover table-striped table-bordered dataTable no-footer");
        var thead = $(document.createElement('thead'));
        $(tabla).append(thead);
        var tr = $(document.createElement('tr'));
        $(thead).append(tr);
        $(tr).append('<td  aria-controls="example"> Numero de pieza </td>');
        $(tr).append('<td  aria-controls="example"> Peso '+"("+unidadPeso+")"+'</td>');
        $(tr).append('<td  aria-controls="example"> Peso volumetrico '+"("+unidadPesoVol+")"+'</td>');
        $(tr).append('<td  aria-controls="example"> Valor declarado '+"("+tipoMoneda+")"+'</td>');
        $(tr).append('<td  aria-controls="example"> descripcion </td>');
        var tr = $(document.createElement('tr'));
        var tbody = $(document.createElement('tbody'));
        $(tabla).append(tbody);
        $(tbody).append(tr);
        $(tr).append('<td  aria-controls="example"> Pieza 1 </td>');
        $(tr).append('<td  aria-controls="example">'+peso+'</td>');
        $(tr).append('<td  aria-controls="example">'+pesoVol+'</td>');
        $(tr).append('<td  aria-controls="example">'+valorDeclarado+'</td>');
        $(tr).append('<td  aria-controls="example">'+descripcion+'</td>');
        $(resumenpiezas).append(divrow);

        for (var i=2; i<=iCnt; i++) {
            var peso = $('#peso'+i).val();
            var largo = $('#Largo'+i).val();
            var alto = $('#Alto'+i).val();
            var ancho = $('#Ancho'+i).val();
            var valorDeclarado = $('#valor_declarado'+i).val();
            var descripcion = $('#descripcion'+i).val();
            if(ancho=="" || alto=="" || ancho=="" ) {
            var pesoVol=0;
            }
            else
                {
                    if (unidadLongitud==3){
                        var pesoVol = ((parseFloat(largo)*parseFloat(alto)*parseFloat(ancho))/5000).toFixed(2);
                    }
                    else if (unidadLongitud==4){
                        var pesoVol = ((parseFloat(largo)*parseFloat(alto)*parseFloat(ancho))/166).toFixed(2);
                    }

                }

            var tr = $(document.createElement('tr'));
            $(tbody).append(tr);
            $(tr).append('<td  aria-controls="example"> Pieza '+i+' </td>');
            $(tr).append('<td  aria-controls="example">'+peso+'</td>');
            $(tr).append('<td  aria-controls="example">'+pesoVol+'</td>');
            $(tr).append('<td  aria-controls="example">'+valorDeclarado+'</td>');
            $(tr).append('<td  aria-controls="example">'+descripcion+'</td>');

            pesoTotal = parseFloat(pesoTotal)+ parseFloat(peso);
            costoDeclarado = parseFloat(costoDeclarado)+ parseFloat(valorDeclarado);
        }
        //Para mostrar el peso total y el valor declarado total

        //var inputPesoTotal = $(document.createElement('Input'));
        $('#pesoTotal').val(pesoTotal);
        $('#costoDeclaradoTotal').val(costoDeclarado);
        $('#totalPiezas').val(iCnt);
        $('#unidadPesoTotal').text($('#id_Unidad_peso option:selected').text());
        $('#unidadcostoDeclaradoTotal').text($('#id_Tipo_moneda option:selected').text());
        //$(divPesoTotal).append(inputPesoTotal);
        if (isNaN(pesoTotal) || isNaN(costoDeclarado) || pesoTotal=="" || costoDeclarado==""){
            alert("Verifique los valores");
        }
        else if (restriccion_peso(pesoTotal) &&  restriccion_costo(costoDeclarado)) {
                  $('#f2_btSiguiente').show();
        }
        //$('#f3_divCostoTotalDeclarado').empty();
        $('#f3_divUnidadCostoTotalDeclarado').empty();
        $('#f3_costoDeclaradoTotal').val($('#costoDeclaradoTotal').val());
        //var input = $(document.createElement('Input'));
        //input = $('#costoDeclaradoTotal').clone();
        //$('#f3_divCostoTotalDeclarado').append('<label> Costo total declarado: </label>');
        //$('#f3_divCostoTotalDeclarado').append(input);
        $('#f3_divUnidadCostoTotalDeclarado').append('<label>  </label>');
        $('#f3_divUnidadCostoTotalDeclarado').append('<p >'+$('#id_Tipo_moneda option:selected').text()+'</p>');


    });

    $('#btRemoveAll').click(function() { // Elimina todos los elementos del contenedor

        $(otraspiezas).empty();
        $(otraspiezas).remove();
        $('#btSubmit').remove(); iCnt = 1;
        $('#btAdd').removeAttr('disabled');
        $('#btAdd').attr('class', 'bt');

    });

    //Funcion para cuando se diligencia el campo peso, realizar la restricción de peso
    $('#id_Peso').on('blur',function(){
        pesoTotal = $(this).val();
        $('#f2_btSiguiente').hide();
        if (pesoTotal>0){
            //Se llama a la funcion para verificar las restricciones de peso
            restriccion_peso(pesoTotal);
        }

    });

    //Funcion para cuando se diligencia el campo Valor_declarado, realizar la restricción de maximo valor
    $('#id_Valor_declarado').on('blur',function(){
        costoDeclarado = $(this).val();
        $('#f2_btSiguiente').hide();
        if (costoDeclarado>0){
            //Se llama a la funcion para verificar las restricciones de costo declarado
            restriccion_costo(costoDeclarado);
        }

    });


    //Select seguro
    $('#id_Seguro').change(function() { //Al seleccionar el seguro
        $('#f3_divUnidadValorSeguro').empty();
        $('#f3_divUnidadValorSeguro').append('<label> </label>');
        $('#f3_divUnidadValorSeguro').append('<p >'+$('#id_Tipo_moneda option:selected').text()+'</p>');
        var valorSeleccionado = $(this).val();
        if(valorSeleccionado==1)
        { //seguro minimo
            $('#seguro').attr('disabled',true);
            $('#seguro').val("");
            //$('#f3_divValorSeguro').empty();
            //$('#f3_divUnidadValorSeguro').empty();
            cotizarSeguro(0);
        }
        else if(valorSeleccionado==2)
        { //otro valor de seguro
            /* var input = $(document.createElement('Input'));
            $(input).attr('name','seguro');
            $(input).attr('id','seguro');
            $(input).attr('class','form-control');
            $(input).attr('type','number');
            $('#f3_divValorSeguro').append('<label> Valor de seguro: </label>');
            $('#f3_divValorSeguro').append(input);
            */
            $('#seguro').val("");
            $('#f3_divCostoSeguro').empty();
            $('#f3_divUnidadCostoSeguro').empty();
            $('#seguro').attr('disabled',false);

            //Se pone el valor del valor a asegurar


        }

    });

    //Si realizan un cambio en el valor declarado
    $('#f3_costoDeclaradoTotal').on('blur',function(){
    $('#costoDeclaradoTotal').val($(this).val());
    $('#id_Valor_declarado').val($(this).val());
    $('#id_Partida_arancelaria').val(null);
    $('#f3_divCostoImpuesto').empty();
    $('#f3_divUnidadCostoImpuesto').empty();
    ocultar_crear();
    restriccion_costo($(this).val());
    });

    //Funcion al diligenciar el valor a asegurar
    $('#seguro').on('blur',function(){
        cotizarSeguro($('#seguro').val());
    });

    //Al seleccionar el flete
    $('#id_Flete').on('change',function() {
        $('#f3_divCostoFlete').empty();
        $('#f3_divUnidadCostoFlete').empty();
        $('#f3_divUnidadPesoTotal').empty();
        $('#f3_divPesoTotal').empty();
        //Se adiciona el valor de flete
        var input = $(document.createElement('Input'));
        input = $('#pesoTotal').clone();
        $('#f3_divPesoTotal').append('<label> Peso total: </label>');
        $('#f3_divPesoTotal').append(input);
        $('#f3_divUnidadPesoTotal').append('<label>  </label>');
        $('#f3_divUnidadPesoTotal').append('<p >'+$('#id_Unidad_peso option:selected').text()+'</p>');
        if($('#id_Flete').val()>0){

            //Se realiza el calculo del costo del flete
            $.ajax({
            url: '/envios/ajax_cotizar',
            type: "POST",
            data: {
              'opc':'flete',
              'pesoTotal': $('#pesoTotal').val(),
              'flete': $('#id_Flete').val(),
              'unidad_peso': $('#id_Unidad_peso').val(),
              'tipo_moneda': $('#id_Tipo_moneda').val(),
              'pais_rem': $('#id_Pais_rem option:selected').val(),
              'pais_des': $('#id_Pais_dest option:selected').val()
            },
            dataType: 'json',
            success: function (data) {
                if(data.costo_flete){
                    var input = $(document.createElement('Input'));
                    $(input).attr('name','costoFlete');
                    $(input).attr('id','costoFlete');
                    $(input).attr('class','form-control');
                    $(input).attr('readonly','readonly');
                    $(input).val(data.costo_flete);
                    $('#f3_divCostoFlete').append('<label> Total flete: </label>');
                    $('#f3_divCostoFlete').append(input);
                    $('#f3_divUnidadCostoFlete').append('<label>  </label>');
                    $('#f3_divUnidadCostoFlete').append('<p style="bottom:0;">'+$('#id_Tipo_moneda option:selected').text()+'</p>');
                    //Si me retorna el valor minimo de seguro

                }
                if(data.mensaje){
                    alert(data.mensaje);
                }

            }
            });
        }
    });

    //Funcion para cuando se selecciona un servicio (Partida arancelaria)
    $('#id_Partida_arancelaria').on('change',function() {
        $('#f3_divCostoImpuesto').empty();
        $('#f3_divUnidadCostoImpuesto').empty();
        idPartida = $(this).val();
        costoFlete = $('#costoFlete').val();
        costoSeguro = $('#costoSeguro').val();
        costoDeclarado = $('#costoDeclaradoTotal').val();
        pesoTotal = $('#pesoTotal').val();
        //Se verifica que los valores sean mayores que 0
        if(idPartida>0 && costoFlete>0 && costoSeguro>0) {
            //Se realiza el calculo de los impuestos
            $.ajax({
            url: '/envios/ajax_cotizar',
            type: 'POST',
            data: {
              'opc':'impuesto',
              'idPartida': idPartida,
              'costoFlete': costoFlete,
              'costoSeguro': costoSeguro,
              'costoDeclarado': costoDeclarado,
              'unidad_peso': $('#id_Unidad_peso').val(),
              'tipo_moneda': $('#id_Tipo_moneda').val(),
              'pais_rem': $('#id_Pais_rem option:selected').val(),
              'pais_des': $('#id_Pais_dest option:selected').val()
            },
            dataType: 'json',
            success: function (data) {
                if(data.costo_impuesto){
                    var input = $(document.createElement('Input'));
                    $(input).attr('name','costoImpuesto');
                    $(input).attr('id','costoImpuesto');
                    $(input).attr('class','form-control');
                    $(input).attr('readonly','readonly');
                    $(input).val(data.costo_impuesto);
                    $('#f3_divCostoImpuesto').append('<label> Total impuesto: </label>');
                    $('#f3_divCostoImpuesto').append(input);
                    $('#f3_divUnidadCostoImpuesto').append('<label>  </label>');
                    $('#f3_divUnidadCostoImpuesto').append('<p ">'+$('#id_Tipo_moneda option:selected').text()+'</p>');
                    //Se crea boton para que permita calcular el valor total
                    $('#f3_btCalcularTotal').show();

                }

                if(data.mensaje){
                    alert(data.mensaje);
                }

            }
            });
        }
        else{
            //alert("Calcule primero valor de flete y seguro");
        }


    });

    //Funcion para calcular el servicio adicional
    $('#id_Servicios_adicionales').on('change',function(){
        $('#f3_divCostoServicioAdicional').empty();
        $('#f3_divUnidadCostoServicioAdicional').empty();
        idServicioAdicional = $(this).val();
        if(idServicioAdicional>0)
            {
            //Ajax para enviar los datos y hacer el calculo
            $.ajax({
                url: '/envios/ajax_cotizar',
                type:'POST',
                data: {
                  'opc':'servicioAdicional',
                  'idServicioAdicional': idServicioAdicional,
                  'tipo_moneda': $('#id_Tipo_moneda').val()
                },
                dataType: 'json',
                success: function (data) {
                    if(data.costo_servicio_adicional){
                        var input = $(document.createElement('Input'));
                        $(input).attr('name','costoServicioAdicional');
                        $(input).attr('id','costoServicioAdicional');
                        $(input).attr('class','form-control');
                        $(input).attr('readonly','readonly');
                        $(input).val(data.costo_servicio_adicional);
                        $('#f3_divCostoServicioAdicional').append('<label> Total servicios adicionales: </label>');
                        $('#f3_divCostoServicioAdicional').append(input);
                        $('#f3_divUnidadCostoServicioAdicional').append('<label>  </label>');
                        $('#f3_divUnidadCostoServicioAdicional').append('<p ">'+$('#id_Tipo_moneda option:selected').text()+'</p>');

                    }

                    if(data.mensaje){
                        alert(data.mensaje);
                    }

                }
                });
            }


    });

    //Funcion para calcular el otros servicios adicionales
    $('#id_Otros_servicios').on('change',function(){
        $('#f3_divCostoOtrosServicios').empty();
        $('#f3_divUnidadCostoOtrosServicios').empty();
        idOtroServicio = $(this).val();
        if(idOtroServicio>0)
            {
            //Ajax para enviar los datos y hacer el calculo
            $.ajax({
                url: '/envios/ajax_cotizar',
                type: 'POST',
                data: {
                  'opc':'otroServicio',
                  'idOtroServicio': idOtroServicio,
                  'tipo_moneda': $('#id_Tipo_moneda').val()
                },
                dataType: 'json',
                success: function (data) {
                    if(data.costo_otros_servicios){
                        var input = $(document.createElement('Input'));
                        $(input).attr('name','costoOtroServicio');
                        $(input).attr('id','costoOtroServicio');
                        $(input).attr('class','form-control');
                        $(input).attr('readonly','readonly');
                        $(input).val(data.costo_otros_servicios);
                        $('#f3_divCostoOtrosServicios').append('<label> Total otros servicios: </label>');
                        $('#f3_divCostoOtrosServicios').append(input);
                        $('#f3_divUnidadCostoOtrosServicios').append('<label>  </label>');
                        $('#f3_divUnidadCostoOtrosServicios').append('<p ">'+$('#id_Tipo_moneda option:selected').text()+'</p>');

                    }

                    if(data.mensaje){
                        alert(data.mensaje);
                    }

                }
                });
            }


    });

    //Si hay un cambio en los valores de flete,seguro y servicio se debe nuevamente calcular el total
    $('#id_Flete').on('change',function(){
            ocultar_crear(); //Llamar a la funcion para ocultar el boton de crear y limpiar el divtotal
    });
    $('#id_Seguro').on('change',function(){
            ocultar_crear();
    });
    $('#id_Partida_arancelaria').on('change',function(){
            ocultar_crear();
    });
    $('#id_Servicios_adicionales').on('change',function(){
            ocultar_crear();
    });
    $('#id_Otros_servicios').on('change',function(){
            ocultar_crear();
    });

    //Funcion cuando se presiona el boton calcular
    $('#f3_btCalcularTotal').on('click',function(){
        var costoFlete = $('#costoFlete').val();
        var costoSeguro = $('#costoSeguro').val();
        var costoImpuesto = $('#costoImpuesto').val();
        var costoServicioAdicional = $('#costoServicioAdicional').val();
        var costoOtroServicio = $('#costoOtroServicio').val();
        if(isNaN(costoFlete) || isNaN(costoSeguro) || isNaN(costoImpuesto))
        {
            alert("Se requieren los valores de flete, seguro y servicio");
        }
        else if(isNaN(costoServicioAdicional) && isNaN(costoOtroServicio))
        {
            costoTotal = parseFloat(costoFlete)+parseFloat(costoSeguro)+parseFloat(costoImpuesto);
            //Llamar a la funcion para crear input y poner el valor del costo Total
            crearCostoTotal(costoTotal);
        }
        else if(isNaN(costoServicioAdicional))
        {
            costoTotal = parseFloat(costoFlete)+parseFloat(costoSeguro)+parseFloat(costoImpuesto)+
                            parseFloat(costoOtroServicio);
            //Llamar a la funcion para crear input y poner el valor del costo Total
            crearCostoTotal(costoTotal);
        }
        else if(isNaN(costoOtroServicio))
        {
            costoTotal = parseFloat(costoFlete)+parseFloat(costoSeguro)+parseFloat(costoImpuesto)+
                            parseFloat(costoServicioAdicional);
            //Llamar a la funcion para crear input y poner el valor del costo Total
            crearCostoTotal(costoTotal);
        }
        //Si ninguno es null
        else
        {
            costoTotal = parseFloat(costoFlete)+parseFloat(costoSeguro)+parseFloat(costoImpuesto)+
                            parseFloat(costoServicioAdicional)+parseFloat(costoOtroServicio);
            crearCostoTotal(costoTotal);
        }

    });






    //Funcion para detectar que los campos de flete y seguro se llenaron
    $('#costoSeguro').change(function(){
    alert('este es el valor:',$('#costoSeguro').val());
    });

    //Funcion para cuando se presiona el boton anterior del tercer formulario
    $('#f3_btnAnterior').click(function(){

    });

});

// Obtiene los valores de los textbox al dar click en el boton "Enviar"
var divValue, values = '';

function GetTextValue() {

$(divValue).empty();
$(divValue).remove(); values = '';

$('.input').each(function() {
divValue = $(document.createElement('div')).css({
padding:'5px', width:'200px'
});
values += this.value + '<br />'
});

$(divValue).append('<p><b>Tus valores añadidos</b></p>' + values);
$('body').append(divValue);

}

//Funcion par cotizarSeguro
function cotizarSeguro(valorSeguro){
    $('#f3_divCostoSeguro').empty();
    $('#f3_divUnidadCostoSeguro').empty();

    $.ajax({
    url: '/envios/ajax_cotizar',
    type: "POST",
    data: {
      'opc':'seguro',
      'valorSeguro':valorSeguro,
      'pesoTotal': $('#pesoTotal').val(),
      'costoDeclaradoTotal': $('#costoDeclaradoTotal').val(),
      'unidad_peso': $('#id_Unidad_peso').val(),
      'tipo_moneda': $('#id_Tipo_moneda').val(),
      'pais_rem': $('#id_Pais_rem option:selected').val(),
      'pais_des': $('#id_Pais_dest option:selected').val()
    },
    dataType: 'json',
    success: function (data) {
        if(data.costo_seguro){
            var input = $(document.createElement('Input'));
            $(input).attr('name','costoSeguro');
            $(input).attr('id','costoSeguro');
            $(input).attr('class','form-control');
            $(input).attr('readonly','readonly');
            $(input).val(data.costo_seguro);
            $('#f3_divCostoSeguro').append('<label> Total seguro: </label>');
            $('#f3_divCostoSeguro').append(input);
            $('#f3_divUnidadCostoSeguro').append('<label>  </label>');
            $('#f3_divUnidadCostoSeguro').append('<p>'+$('#id_Tipo_moneda option:selected').text()+'</p>');
            if(data.seguro_minimo){
                       $('#seguro').val(data.seguro_minimo);
                       }

        }
        if(data.mensaje){
            alert(data.mensaje);
        }

    }
    });



}

//Funcion para crear input con valor total y habilitar boton crear
function crearCostoTotal(costoTotal){
    $('#f3_divTotalCostoEnvio').empty();
    $('#f3_divUnidadTotalCostoEnvio').empty();
    var input = $(document.createElement('Input'));
    $(input).attr('name','costoTotal');
    $(input).attr('id','costoTotal');
    $(input).attr('class','form-control');
    $(input).attr('readonly','readonly');
    $(input).val(costoTotal);
    $('#f3_divTotalCostoEnvio').append('<label> Total a pagar: </label>');
    $('#f3_divTotalCostoEnvio').append(input);
    $('#f3_divUnidadTotalCostoEnvio').append('<label>  </label>');
    $('#f3_divUnidadTotalCostoEnvio').append('<p ">'+$('#id_Tipo_moneda option:selected').text()+'</p>');
    $('#f3_btCrear').show();


}

//Funcion para verificar la restricciones en peso
function restriccion_peso(pesoTotal){
        var respuesta = false;
        $.ajax({
            url: '/envios/ajax_restriccion_envio',
            type: "POST",
            data: {
              'opc':'peso',
              'pesoTotal': pesoTotal,
              'unidad_peso': $('#id_Unidad_peso').val()
            },
            dataType: 'json',
            async : false,
            success: function (data) {
                if(data.validado){ // si es una respuesta positiva se continua
                    respuesta = true;
                }
                if(data.mensaje){
                    //si el valor no esta en la restriccion muestra un mensaje
                    alert(data.mensaje);
                    respuesta = false;
                }

            }
        });
        return respuesta;
}

//Funcion para verificar la restricciones en valor declarado
function restriccion_costo(costoDeclarado){
        var respuesta = false;
        $.ajax({
            url: '/envios/ajax_restriccion_envio',
            type: "POST",
            data: {
              'opc':'costo',
              'costoDeclarado': costoDeclarado,
              'tipo_moneda': $('#id_Tipo_moneda').val()
            },
            dataType: 'json',
            async : false,
            success: function (data) {

                if(data.validado){ // si es una respuesta positiva se continua
                    respuesta = true;
                    //console.log(respuesta);
                }
                if(data.mensaje){
                    //si el valor no esta en la restriccion muestra un mensaje
                    alert(data.mensaje);
                    respuesta = false;
                    //console.log(respuesta);
                }

            }
        });
        return respuesta;
}

function ocultar_crear(){
$('#f3_divTotalCostoEnvio').empty();
$('#f3_divUnidadTotalCostoEnvio').empty();
$('#f3_btCrear').hide();

}
