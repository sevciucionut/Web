$(document).on("click", ".ala", function() {
	var sortingMethod = $(this).data("name");
	if(sortingMethod == 'l2h') {
		sortAscendent();
	}
	else if(sortingMethod == 'h2l') {
		sortDescendent();
	}
	else if(sortingMethod == 'name-a-z') {
		sortName();
	}
	else if(sortingMethod == 'name-z-a') {
		sortNameZ();
	}
});

function sortAscendent() {
	var products = $('.produs');
	products.sort(function(a, b) {
		return $(a).data("price")-$(b).data("price")
	});
	$(".products-grid").html(products);
}

function sortDescendent() {
	var products = $('.produs');
	products.sort(function(a, b) {
		return $(b).data("price")-$(a).data("price")
	});
	$(".products-grid").html(products);
}

function sortName() {
	var products = $('.produs');
	products.sort(function(a, b) {
		var an = a.getAttribute('data-name');
		var bn = b.getAttribute('data-name');
		if (an > bn) {
			return 1;
		}
		if (an < bn) {
			return -1;
		}
		return 0;
	});
	$(".products-grid").html(products);
}

function sortNameZ() {
	var products = $('.produs');
	products.sort(function(a, b) {
		var an = a.getAttribute('data-name');
		var bn = b.getAttribute('data-name');
		if (an > bn) {
			return -1;
		}
		if (an < bn) {
			return 1;
		}
		return 0;
	});
	$(".products-grid").html(products);
}

$(document).on('click', '.adauga', function() {
	var img = $(".img1").val();
	var nume = $(".nume1").val();
	var spf1 = $(".spf1").val();
	var spf2 = $(".spf2").val();
	var spf3 = $(".spf3").val();
	var spf4 = $(".spf4").val();
	var prt = $(".prt1").val();
	
	$("div#savedem2 div div div img").attr("src", img);
	$("div#savedem2 div div div div h3").text(nume);
	$("div#savedem2 div div div div li.1").text(spf1);
	$("div#savedem2 div div div div li.2").text(spf2);
	$("div#savedem2 div div div div li.3").text(spf3);
	$("div#savedem2 div div div div li.4").text(spf4);
	$("div#savedem2 div div div div a#pret").text(prt + " Lei");
	$("div#savedem2 div").attr("data-price", prt);
	$("div#savedem2 div").attr("data-name", nume);
	
});

//$(document).on("click", ".adaugaa", function() {
	//$("div#savedem2 div").attr("id", "doar4");
	//var prd = $("div#savedem2 div").clone();
	//afisare(prd);
	//$.post('/admin', function(req, res) {
		//$(".products-grid").append(prd);
		//var prd = $('div#savedem2 div.produs');
		res.render('produse.ejs', {prd: req.prd});
	//});
	
	
	//$(".products-grid").prepend(prd);
	//$("div#savedem2 div").attr("id", "doar1");
	

//});




//function afisare(prd) {
	//$(".products-grid").prepend(prd);
	//$("div#savedem2 div").attr("id", "doar1");}





























