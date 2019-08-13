describe('The client app ', function () {
    var validator;
    
    beforeEach(function () {
      var body = document.getElementsByTagName("body")[0];

      var element = document.createElement("input");
      body.appendChild(element);

      validator = new Validator();
    });

    it("is a constructable object", function () {
        expect(typeof validator).not.toBeUndefined();
    });
    
    describe('when `validate` loads', function () {
        var mockInputElem;

        beforeEach(function() {
            spyOn(validator, 'handleError');
        });


        describe('when correct field is entered', function () {
            var allFields;

            beforeEach(function() {
                allFields = [{
                    "key": "name",
                    "value": "Suvi"

                },{
                    "key": "surname",
                    "value": "Monda"

                },{
                    "key": "phone",
                    "value": "+447584639133"

                },{
                    "key": "email",
                    "value": "suvu@example.com"

                },{
                    "key": "password",
                    "value": "Wert@123"

                }];
            });

            it("`handleError` method not called", function () {
                for (var i = 0; i < allFields.length; i++) {
                    (function() { 
                        document.body.innerHTML = '<input id=' + allFields[i].key +' type="text" />';
                        document.getElementById(allFields[i].key).value = allFields[i].value;
                        validator.validate(allFields[i].key);
                        expect(validator.handleError).not.toHaveBeenCalled();
                    }(i));
                };
            });
        });

         describe('when incorrect field is entered', function () {
            beforeEach(function() {
                allFields = [{
                    "key": "name",
                    "value": "n"

                },{
                    "key": "surname",
                    "value": " "

                },{
                    "key": "phone",
                    "value": "f6"

                },{
                    "key": "email",
                    "value": "suvue.com"

                },{
                    "key": "password",
                    "value": "pass"

                }];
            });

            it("`handleError` method called", function () {
                for (var i = 0; i < allFields.length; i++) {
                    (function() { 
                        document.body.innerHTML = '<input id=' + allFields[i].key +' type="text" />';
                        document.getElementById(allFields[i].key).value = allFields[i].value;
                        validator.validate(allFields[i].key);
                        expect(validator.handleError).toHaveBeenCalled();
                    }(i));
                };
            });
        });
    });

    describe(' when `handleError` loads', function () {
        var mockMsg = "Please enter valid field",
            mockInput = "name",
            mockElement,
            mockErrorElem;

        beforeEach(function() {
            document.body.innerHTML =
            '<div>' +
            '  <input name=' + mockInput + ' id="name" />' +
            '  <div id="error" />' +
            '</div>';

            mockElement = document.getElementById(mockInput);
            mockErrorElem = document.getElementById('error');

            validator.handleError(mockInput, mockMsg);
        });

        it("`input-error` class is added to input field", function () {
            expect(mockElement.className).toBe('input-error');
        });

        it("appends given message text to error field", function () {
            expect(mockErrorElem.innerText).toBe(mockMsg);
        });
    });
});