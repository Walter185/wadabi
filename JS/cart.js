function crearDescriptionProduct(){
	tabla = JSON.parse(localStorage.getItem('listaProducto'));
	total = 0;
	$('#myCart').empty();
	for (var i = tabla.length - 1; i >= 0; i--) {
		tabla[i].partialViewDescription = `<tr>
							<td class="premier" data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs">
										<img src="${tabla[i].image}" alt="..." class="img-fluid"/>
									</div>
									<div class="col-sm-10 avantNom">
										<h4 class="nomargin leNom">${tabla[i].name}</h4>
										<p>${tabla[i].description}</p>
									</div>
								</div>
							</td>
							<td data-th="Price">${tabla[i].basicPrice.toFixed(2)}$</td>
							<td data-th="Quantity">
								<p class="text-center mt-3">${tabla[i].qty}</p>
							</td>
							<td data-th="Subtotal" class="text-center">${(tabla[i].qty * tabla[i].basicPrice).toFixed(2)}</td>
							<td><button class="btn bg-danger text-white w-100 mesRetrait">Retirer</button></td>
						</tr>`
		if (tabla[i].qty > 0) {
			
			$('#myCart').append(tabla[i].partialViewDescription);
			total += tabla[i].qty * tabla[i].basicPrice.toFixed(2);
		}
	}
	$('#myTotal').text('Total: '+ total.toFixed(2) + '$');
	if(total > 0){
		$('.payer').attr("disabled",false);
	}else {
		$('.payer').attr("disabled",true);
	}
	EventListeners();
}

function EventListeners(){
	$('.mesRetrait').each(function(){
		$(this).click(function(){
		console.log($(this).parent().parent().children('.premier').children('.row').children('.avantNom').children('.leNom').text())
			deleteProduct($(this).parent().parent().children('.premier').children('.row').children('.avantNom').children('.leNom').text())
		});
	});
}

function deleteProduct(name){
	for (var i = tabla.length - 1; i >= 0; i--) {
			if(tabla[i].name == name){
				tabla[i].qty = 0;
				saveStorage();
				crearDescriptionProduct();
				break;
			}
	}
}

function saveStorage(){
	if (typeof(Storage) !== 'undefined'){

		localStorage.clear();
		localStorage.setItem('listaProducto',JSON.stringify(tabla));
	}
	else {
		console.log('Lo lamento, su navegador no es compatible con la pagina...');
	}
}

function functioncart(){
	if (localStorage.getItem('listaProducto') != null){
		var tabla = JSON.parse(localStorage.getItem('listaProducto'));
		crearDescriptionProduct();
		console.log('hey')
	}else {
		$('.pagar').attr("disabled",true);
	}
}
window.onload = functioncart();