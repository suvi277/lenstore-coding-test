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
;var Events = {
	list: function () {
		return {
			aw: {
				name: 'Google AdWords'
			},
			ga: {
				name: 'Google Analytics'
			},
			gtm: {
				name: 'Google Tag Manager'
			},
			gts: {
				name: 'Google Certified Shops'
			}
		}
	},

	/*
	 * @param {string} eventType - The name of the event type
	 */
	track: function (eventType) {
        var _trackEvent;

        if (!eventType) {
            return;
        }

        if (Object.keys(this.list()).includes(eventType.toLowerCase())) {
            _trackEvent = "_track" + toCamelCase(eventType);
            this[_trackEvent].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    },

	_trackAw: function (eventName, options) {
		console.log('AdWords: ', eventName, options)

		// Expected output: AdWords: Search, undefined

		// Expected output: AdWords: SignIn, undefined
	},
    
	_trackGa: function (eventName, options) {
		console.log('Analytics: ', eventName, options)

		// Expected output: Analytics: Purchase, {
		// 	products: [123, 75, 402],
		// 	discount: 18.98,
		// 	total: 48.5
		// }
    },
    
	_trackGtm: function (eventName, options) {
		console.log('Analytics: ', eventName, options)
	}
}

function toCamelCase(str) {
    return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
        return match.charAt(match.length-1).toUpperCase();
    });
}


// Use cases
Events.track()

Events.track('aw', 'Search')

Events.track('AW', 'SignIn')

Events.track('gA', 'Purchase', {
	products: [123, 75, 402],
	discount: 18.98,
	total: 48.5
})


// New use case
Events.track('gtm', 'Conversion', {
	id: 36,
	discount: 5.49,
	total: 12.79,
	currency: 'GBP',
	reference: 'c57f6ac1b7'
})
