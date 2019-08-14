var AutoComplete = function(form) {
    this.form = document.getElementById(form);
    this.input = document.querySelector('input');
    this.resultContainer = document.getElementById("autocomplete-results");
};

AutoComplete.prototype.bindEvents = function() {
    if (this.input) {
        this.input.addEventListener('keyup', function(evt) {
            input_val = evt.target.value;

        if (input_val.length > 2) {
            this.resultContainer.innerHTML = '';
            this.populateResult(input_val);
        } else {
            this.resultContainer.innerHTML = '';
            this.resultContainer.style.display = 'none';
        }
        
        }.bind(this));

        document.addEventListener("click", function (e) {
            if (!e.target.closest('form')) {
                this.closeAutoCompleteList();
            }
        }.bind(this));
    }
};

AutoComplete.prototype.populateResult = function(val) {
    var filteredData= [];

    window.requestXHR = new XMLHttpRequest();

    window.requestXHR.abort();
    window.requestXHR.onreadystatechange = function(evt) {
        if (evt.currentTarget.readyState == 4 && evt.currentTarget.status == 200) {
            var response = JSON.parse(evt.currentTarget.responseText);

            filteredData = response.filter(function(data) {
                return data.label.toUpperCase().includes(val.toUpperCase());
            });

            for (var i = 0; i < filteredData.length; i++) {
                this.createList(filteredData[i], val);
            }
        }
    }.bind(this);

    window.requestXHR.open("GET", "data/search-results.json");
    window.requestXHR.send();
};

AutoComplete.prototype.createList = function(currentData, val) {
    var regex = new RegExp(val, 'gi'),
        list,
        link,
        pName;

    pName = currentData.label.replace(regex, '<strong>' + val + '</strong>');

    list = document.createElement('li');
    link = document.createElement("a");
    link.setAttribute('href', currentData.href);
    link.innerHTML = pName;
    link.innerHTML += '<span class="product-count">'+ currentData.duration + '</span>';
    list.appendChild(link);

    this.resultContainer.appendChild(list);
    this.resultContainer.style.display = 'block';

    list.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(currentData);
    }.bind(this));
};

AutoComplete.prototype.closeAutoCompleteList = function() {
    this.resultContainer.style.display = 'none';
}

var autocomplete = new AutoComplete('form');
autocomplete.bindEvents();
