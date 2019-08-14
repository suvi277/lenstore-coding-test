var Events = {
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
