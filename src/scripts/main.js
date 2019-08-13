'use strict';

(function () {
	var PLP_APP = {
    	"init": function () {
    		this.allProducts = [];
	    	this.loadProductsData();
	    	this.bindEvents();
	    },

	    "loadProductsData": function function_name(argument) {
			$.getJSON("data/products.json", function( data ) {
				this.allProducts = data;
				this.filteredData = data;
				this.sortProducts('asc-name', data);
			}.bind(this));
	    },

	    "getAllProducts": function() {
	    	return this.allProducts;
	    },

	    "setFilteredProducts": function(filteredData) {
	    	this.filteredData = filteredData;
	    },

	    "renderProducts": function(data) {
	    	var list = $('.all-products'),
	    		hbsTemplate = $("#products-template").html(),
	    		compiledTpl;
			
			compiledTpl = Handlebars.compile(hbsTemplate);
			list.html(compiledTpl(data));

			this.renderTotalProductsText(data.length);
	    },

	    "renderTotalProductsText": function(total) {
	    	$('.total-products').text(total);
	    },

	    "bindEvents": function() {
	    	$('.filter-data select').on('change', function(event){
	    		var value = $(event.currentTarget).val(),
	    			type = $(event.currentTarget).data('type');

	    		this.filterProducts(value, type);
	    	}.bind(this));

	    	$('.sort-data select').on('change', function(event){
	    		var value = $(event.currentTarget).val();

	    		this.sortProducts(value, this.filteredData);
	    	}.bind(this));

	    	$('.view-type').on('click', function(event) {
	    		this.toggleView(event);
	    	}.bind(this));
	    },

	    "filterProducts": function(value, type) {
	    	var products;

	    	products = this.getAllProducts().filter(function (item) {
		        return item[type].includes(value) || value === '/';
	        });

	    	this.setFilteredProducts(products);
	    	this.renderProducts(products);
	    },

	    "sortProducts": function(value, data) {
	    	var products = data;

	    	switch(value) {
			  	case 'desc-name':
				    products = products.sort(function (p1, p2) {
						if (p1.name > p2.name) return -1;
						if (p1.name < p2.name) return 1;
					});

			    break;
			  	case 'asc-name':
				   	products = products.sort(function (p1, p2) {
						if (p1.name > p2.name) return 1;
						if (p1.name < p2.name) return -1;
					});

			    break;
			   	case 'desc-price':
				    products = products.sort(function (p1, p2) {
						if (p1.price > p2.price) return -1;
						if (p1.price < p2.price) return 1;
					});

			    break;
			  	case 'asc-price':
				   	products = products.sort(function (p1, p2) {
						if (p1.price > p2.price) return 1;
						if (p1.price < p2.price) return -1;
					});

			    break;
			  	default:
			}

    		this.renderProducts(products);
	    },

	    "toggleView": function() {
	    	$(event.currentTarget).toggleClass('fa-list-alt fa-th');
	    	$('.all-products').toggleClass('list-view grid-view');
	    }

    }


    $(document).ready(function() {
    	PLP_APP.init();
    });
}());