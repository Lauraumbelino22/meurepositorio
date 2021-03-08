$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var arrLocaisTrabalho = sessionStorage.getItem("arrLocaisTrabalho");// Recupera os dados armazenados

	arrLocaisTrabalho = JSON.parse(arrLocaisTrabalho); // Converte string para objeto

	if(arrLocaisTrabalho == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		arrLocaisTrabalho = [];

// FUNCÃO ADICIONAR REGISTRO
	function Adicionar(){
		var cli = GetCliente("Predio", $("#txtPredio").val());

		if(cli != null){
			alert("Prédio já cadastrado.");
			return;
		}

		var cliente = JSON.stringify({
			Predio   : $("#txtPredio").val(),
			Local    : $("#txtLocal").val(),
			
		});

		arrLocaisTrabalho.push(cliente);

		sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho));

		alert("Registro adicionado.");//CAIXA DE MENSAGEM AVISANDO QUE O REGISTRO FOI ADICIONALDO
		return true;
	}

	function Editar(){
		arrLocaisTrabalho[indice_selecionado] = JSON.stringify({
				Predio   : $("#txtPredio").val(),
				Local     : $("#txtLocal").val(),
				
			});
		sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+ //CRIAÇÃO DA TABELA POSICIONAMENTO DO DADOS PREDIO E LOCAIS.
			"<th></th>"+
			"	<th>Prédio</th>"+
			"	<th>Local</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in arrLocaisTrabalho){
			var cli = JSON.parse(arrLocaisTrabalho[i]);//POSICIONAMENTO DAS FIGURAS EDITAR, EXCLUIR NA TABELA
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+cli.Predio+"</td>" + 
										 "	<td>"+cli.Local+"</td>" + 
										 "</tr>");
		 }
	}

	function Excluir(){
		arrLocaisTrabalho.splice(indice_selecionado, 1);
		sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho));
		alert("Registro excluído.");
	}

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in arrLocaisTrabalho) {
            var i = JSON.parse(arrLocaisTrabalho[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(arrLocaisTrabalho[indice_selecionado]);
		$("#txtPredio").val(cli.Predio);
		$("#txtLocal").val(cli.Local);
		$("#txtPredio").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});