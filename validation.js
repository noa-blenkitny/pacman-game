$(function () {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            if (element.prop('type') === 'checkbox') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod('strongPassword', function (value, element) {
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, 'Your password must be at least 6 characters long and contain at least one number and one char\'.')




    $.validator.addMethod('foodNumcons', function (value, element) {
        return this.optional(element)
            || value >= 50
            && value <= 90;
    }, 'Your food balls must be greater than 50 and smaller then 90.')

    $.validator.addMethod('monstersnumcons', function (value, element) {
        return this.optional(element)
            || value >= 1
            && value <= 4;
    }, 'Your monsters number must be between 1 and 4.')

    $.validator.addMethod('mingametime', function (value, element) {
        return this.optional(element)
            || value >= 60
            && value <= 120;
    }, 'Your timer must be between 60 and 120 seconds.')
    

    $("#registerForm").validate({
        onsubmit: false,
        onclick: false,
        onkeyup: false,
        onfocusout: false,
        rules: {
            userName:
            {
                required: true,

            },
            email: {
                required: true,
                email: true
                // remote: "http://localhost:3000/inputValidator"
            },
            password: {
                required: true,
                strongPassword: true,

            },

            firstName: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            lastName: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            birthday:
            {
                required: true  
            }

        },
        messages: {
            email: {
                required: 'Please enter an email address.',
                email: 'Please enter a <em>valid</em> email address.',
                // remote: $.validator.format("{0} is already associated with an account.")
            }
        }
    });
    $("#loginForm").validate({
        onsubmit: true,
        onclick: false,
        onkeyup: false,
        onfocusout: false,
        rules: {
            userName:
            {
                required: true
            },
            password: {
                required: true
            }
        }
    });
    $("#settingForm").validate({
        onsubmit: false,
        onclick: false,
        onkeyup: false,
        onfocusout: false,
        rules: {
            upkey:
            {
                required: true
                
            },
            downkey:
            {
                required: true
            },
            leftkey:
            {
                required: true
            },
            rightkey:
            {
                required: true
            },
            foodnum:
            {
                required: true,
                foodNumcons: true
            },
            monstersnum:
            {
                required: true,
                monstersnumcons: true

            },
            gametime:
            {
                required: true,
                mingametime: true

            }
        }
    });

});