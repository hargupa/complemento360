
function getData(){

	$.ajax({
		url:"https://www.balldontlie.io/api/v1/players/",
		type:"GET",
		dataType:"json",
		async:true,

		success:function(data,status){
			if (localStorage.length <= 0){
				localStorage.setItem('ArrayPlayer', JSON.stringify(data));
			}

			LoadTable(localStorage.getItem('ArrayPlayer'));
			localStorage.idmodify ='';	

		},
		error: function(xhr,textStatus,errorThrow){
			alert('Respuesta a Json fallo!');
		}

	});
}



function LoadTable(data){
		var i;
		var strRows ='';
		var dataplayer = data;
		dataplayer = JSON.parse(dataplayer);

		for (i=0; i< dataplayer.data.length;i++){
			strRows = strRows + '<tr><td>'+ dataplayer.data[i].id+'</td>';
			strRows = strRows + '<td>'+ dataplayer.data[i].first_name+'</td>';
			strRows = strRows + '<td>'+ dataplayer.data[i].last_name+'</td>';
			strRows = strRows + '<td>'+ dataplayer.data[i].height_inches+'</td>';
			strRows = strRows + '<td>'+ dataplayer.data[i].height_feet+'</td>';
			strRows = strRows + '<td><div class="input-group-append">';
			strRows = strRows + '<button type="button" class="btn btn-primary px-3" title="Modificar" onclick="Modify('+dataplayer.data[i].id+');"><i class="far fa-edit"></i>';
			strRows = strRows + '</button>&nbsp&nbsp';
			strRows = strRows + '<button type="button" class="btn btn-primary px-3" title="Eliminar" onclick="Delete('+dataplayer.data[i].id+');"><i class="fas fa-trash"></i>';
			strRows = strRows + '</button>&nbsp&nbsp';
			strRows = strRows + '<button type="button" class="btn btn-primary px-3" title="Detalle Jugador" onclick="Details('+dataplayer.data[i].id+');"><i class="fas fa-align-justify"></i>';
			strRows = strRows + '</button></div></td></tr>';
		}
	
		document.getElementById("listplayer").innerHTML=strRows;

}


function Search(){

	var first_name = document.getElementById("first_name").value;
	var last_name = document.getElementById("last_name").value;
	var height_inches = document.getElementById("height_inches").value;
	var height_feet= document.getElementById("height_feet").value; 
	var countcontrol = 0 ;
	var ArrayControl = ["first_name","last_name","height_inches","height_feet"];
	var i,namecontrol,searchOk,valuefield;
	var ArrayJson = [];
	
	for (i = 0; i<=3;i++){
		valuefield = document.getElementById(ArrayControl[i]).value;
		if (valuefield.length>0){
			countcontrol = countcontrol + 1;
		}
	}
	if (countcontrol>1 || countcontrol==0 ){
		alert('Ingrese solo un campo como criterio de busqueda');
		for (i = 0; i<=3;i++){
			document.getElementById(ArrayControl[i]).value=''
		}		
	}else{
		for (i = 0; i<=3;i++){
			if (document.getElementById(ArrayControl[i]).value!=''){
				namecontrol = ArrayControl[i];
			}
		}

		var dataplayer = localStorage.getItem('ArrayPlayer');

		dataplayer = JSON.parse(dataplayer);
		for (i=0; i< dataplayer.data.length;i++){
			searchOk=false;
			switch(namecontrol)	{
				case 'first_name':
						if (dataplayer.data[i].first_name==first_name){
							searchOk=true;
						}
						break;
				case 'last_name':
						if (dataplayer.data[i].last_name==last_name){
							searchOk=true;
						}
						break;
				case 'height_inches':
						if (dataplayer.data[i].height_inches==height_inches){
							searchOk=true;
						}
						break;
				case 'height_feet':
						if (dataplayer.data[i].height_feet==height_feet){
							searchOk=true;
						}																		
						break;
			}
			if (searchOk){
				ArrayJson[ArrayJson.length] = '"id": "' + dataplayer.data[i].id +'","first_name":"'+ dataplayer.data[i].first_name +'","last_name":"'+ dataplayer.data[i].last_name +'","height_inches":"'+ dataplayer.data[i].height_inches +'","height_feet":"'+ dataplayer.data[i].height_feet + '"';
			}
		}
		var dataJson = CreateJson(ArrayJson);
		LoadTable(dataJson);

	}

}

function CreateJson(ArrayJson){
	var StrJson = '{"data":[';
	var i,arraycount;
	arraycount=0;
	for(i=0;i<=ArrayJson.length-1;i++) {
		if (i==ArrayJson.length-1){
			StrJson = StrJson + '{' + ArrayJson[i] + '}]}';
		}else{
			StrJson = StrJson + '{' +  ArrayJson[i] + '},';
		}
	}
	return StrJson;


}

function Add(){
	if (localStorage.idmodify.length> 0){
		saveModify();
	}else{
		var first_name = document.getElementById("first_name").value;
		var last_name = document.getElementById("last_name").value;
		var height_inches = document.getElementById("height_inches").value;
		var height_feet= document.getElementById("height_feet").value; 
		var countcontrol = 0 ;
		var ArrayControl = ["first_name","last_name","height_inches","height_feet"];
		var i,namecontrol,idnew;
		var ArrayJson = [];
		
		for (i = 0; i<=3;i++){
			valuefield = document.getElementById(ArrayControl[i]).value;
			if (valuefield.length>0){
				countcontrol = countcontrol + 1;
			}
		}
		if (countcontrol>4 || countcontrol==0 ){
			alert('Los campos no pueden estar vacios');
		}else{
			var dataplayer = localStorage.getItem('ArrayPlayer');

			dataplayer = JSON.parse(dataplayer);
			idnew=1;
			for (i=0; i< dataplayer.data.length;i++){
					ArrayJson[ArrayJson.length] = '"id": "' + dataplayer.data[i].id +'","first_name":"'+ dataplayer.data[i].first_name +'","last_name":"'+ dataplayer.data[i].last_name +'","height_inches":"'+ dataplayer.data[i].height_inches +'","height_feet":"'+ dataplayer.data[i].height_feet + '"';
					if (idnew<dataplayer.data[i].id){
						idnew=dataplayer.data[i].id;
					}
			}
			idnew=parseInt(idnew)+1;
			ArrayJson[ArrayJson.length] = '"id": "' + idnew +'","first_name":"'+ first_name +'","last_name":"'+ last_name +'","height_inches":"'+ height_inches +'","height_feet":"'+ height_feet + '"';		
			var dataJson = CreateJson(ArrayJson);
			localStorage.clear();
			localStorage.setItem('ArrayPlayer', dataJson);
			LoadTable(dataJson);
			alert('Registro Guardado!');
			for (i = 0; i<=3;i++){
				document.getElementById(ArrayControl[i]).value=''
			}
		}

	}

}

function Delete(id){
	var ArrayJson = [];
	var i;
	if(confirm('Esta seguro de Eliminar el registro?')){

		var dataplayer = localStorage.getItem('ArrayPlayer');

		dataplayer = JSON.parse(dataplayer);

		for (i=0; i< dataplayer.data.length;i++){
				
				if (id!=dataplayer.data[i].id){
					ArrayJson[ArrayJson.length] = '"id": "' + dataplayer.data[i].id +'","first_name":"'+ dataplayer.data[i].first_name +'","last_name":"'+ dataplayer.data[i].last_name +'","height_inches":"'+ dataplayer.data[i].height_inches +'","height_feet":"'+ dataplayer.data[i].height_feet + '"';
				}
		}
		var dataJson = CreateJson(ArrayJson);
		localStorage.clear();
		localStorage.setItem('ArrayPlayer', dataJson);
		LoadTable(localStorage.getItem('ArrayPlayer'));
	}
}

function Details(id){
	var ArrayJson = [];
	$.ajax({
		url:"https://www.balldontlie.io/api/v1/players/"+id,
		type:"GET",
		dataType:"json",
		async:true,

		success:function(data,status){

			ArrayJson[ArrayJson.length] = '"id": "' + data.id +'","first_name":"'+ data.first_name +'","last_name":"'+ data.last_name +'","height_inches":"'+ data.height_inches +'","height_feet":"'+data.height_feet + '"';
			var detailJson =  CreateJson(ArrayJson);
			LoadTable(detailJson);
			let list = data;
			var html_data ='<div class="card"><div class="card-header text-center">Detalle Jugador</div><div class="card-body"><table class="table table-striped"><thead><tr>';

			for (let key in list) {
		        if (key!='team'){
		        	html_data = html_data + '<th>'+key+'</th>';
		        }
		        

		    }
		    
		    html_data = html_data + '</tr></thead><tbody><tr>';
			
			for (let key in list) {
				if (key!='team'){
		        	html_data = html_data + '<td>'+list[key]+'</td>';
		        }	
		    }
		    html_data = html_data + '<tr></tbody></table>';



			var html_data2 ='<br><div class="card-header text-center">Equipo</div><table class="table table-striped"><thead><tr>';

			for (let key in list.team) {
		        	html_data2 = html_data2 + '<th>'+key+'</th>';
		    }
		    
		    html_data2 = html_data2 + '</tr></thead><tbody><tr>';
			
			for (let key in list.team) {

		        	html_data2 = html_data2 + '<td>'+list.team[key]+'</td>';
		    }
		    html_data2 = html_data2 + '<tr></tbody></table></div></div>';




			document.getElementById("detailplayer").innerHTML=html_data+html_data2;


		},
		error: function(xhr,textStatus,errorThrow){
			alert('No existen Detalles del Jugador!');
		}

	});


}


function Modify(id){
	var dataplayer = localStorage.getItem('ArrayPlayer');
	var i;
	dataplayer = JSON.parse(dataplayer);
		for (i=0; i< dataplayer.data.length;i++){
			if (id==dataplayer.data[i].id){
				document.getElementById("first_name").value=dataplayer.data[i].first_name;
				document.getElementById("last_name").value=dataplayer.data[i].last_name;
				document.getElementById("height_inches").value=dataplayer.data[i].height_inches;
				document.getElementById("height_feet").value=dataplayer.data[i].height_feet;
				for (i=1; i<=4;i++){
					document.getElementById(i).style.display = "none";
				}
				
				localStorage.idmodify = id;			
			}
			
		}



}

function saveModify(){
		var ArrayJson = [];
		var ArrayControl = ["first_name","last_name","height_inches","height_feet"];
		var first_name = document.getElementById("first_name").value;
		var last_name = document.getElementById("last_name").value;
		var height_inches = document.getElementById("height_inches").value;
		var height_feet= document.getElementById("height_feet").value; 
		var i;
		var dataplayer = localStorage.getItem('ArrayPlayer');

		dataplayer = JSON.parse(dataplayer);

		for (i=0; i< dataplayer.data.length;i++){
				
				if (localStorage.idmodify!=dataplayer.data[i].id){
					ArrayJson[ArrayJson.length] = '"id": "' + dataplayer.data[i].id +'","first_name":"'+ dataplayer.data[i].first_name +'","last_name":"'+ dataplayer.data[i].last_name +'","height_inches":"'+ dataplayer.data[i].height_inches +'","height_feet":"'+ dataplayer.data[i].height_feet + '"';
				}
		}
		ArrayJson[ArrayJson.length] = '"id": "' + localStorage.idmodify +'","first_name":"'+ first_name +'","last_name":"'+ last_name +'","height_inches":"'+ height_inches +'","height_feet":"'+ height_feet + '"';		
		var dataJson = CreateJson(ArrayJson);
		localStorage.clear();
		localStorage.setItem('ArrayPlayer', dataJson);
		LoadTable(localStorage.getItem('ArrayPlayer'));	
		localStorage.idmodify='';
		alert('Se actualizaron los cambios realizados!');
		for (i = 0; i<=3;i++){
			document.getElementById(ArrayControl[i]).value=''
		}		
		for (i=1; i<=4;i++){
			document.getElementById(i).style.display = "block";
		}		
}