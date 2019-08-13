var Validator = function(form) {
    this.form = document.getElementById(form);
    
    this.formElements = {
        name: {
            reg: /^[a-zA-Z]{2,20}$/,
            msg: 'Please enter valid Name'
        },

        surname: {
            reg: /^[a-zA-Z]{2,20}$/,
            msg: 'Please Enter valid Surname.'
        },

        email: {
            reg: /^[a-z-0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,7}$/i,
            msg: 'Please Enter valid e-mail address.'
        },

        phone: {
            reg: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            msg: 'Please enter a valid phone number'
        },
        password: {
            reg:  /^(?=.*?[^\w\s]).{8,}$/,
            msg: 'Must contain at least one special character and at least 8 or more characters'
        }
    };
};

Validator.prototype.bindEvents = function() {
    if (this.form) {
        this.form.addEventListener('submit', function(evt){
            evt.preventDefault();

            for (var inputElem in this.formElements) {
                this.validate(inputElem);
            }
        }.bind(this));
    }
};

Validator.prototype.validate = function(inputElem) {
    var currentIpField = this.formElements[inputElem],
        inputVal = document.getElementById(inputElem).value;
    
    if (!currentIpField.reg.test(inputVal)) {
        this.handleError(inputElem, currentIpField.msg);
    }
};

Validator.prototype.handleError = function(element, message) {
    var inputField = document.getElementById(element),
        liErrorMsg = inputField.nextElementSibling;

    inputField.className = 'input-error';
    liErrorMsg.innerText = message;
    liErrorMsg.style.display = 'block';

    inputField.addEventListener('keyup', function(evt){
        inputField.className = '';
        liErrorMsg.style.display = 'none';
    });
};

var validator = new Validator('form');
validator.bindEvents();
