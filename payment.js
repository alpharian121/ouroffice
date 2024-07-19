paypal.Buttons({
    createOrder: function(data, actions) {
        // Collect client details from the form
        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const apartment = document.getElementById('apartment').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const country = document.getElementById('country').value;
        const phone = document.getElementById('phone').value;

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.01' // Replace with the amount to be paid
                },
                shipping: {
                    address: {
                        address_line_1: address,
                        address_line_2: apartment,
                        admin_area_2: city, // City
                        admin_area_1: state, // State
                        country_code: country, // Country
                    }
                },
                shipping: {
                    name: {
                        full_name: fullName
                    },
                    address: {
                        address_line_1: address,
                        address_line_2: apartment,
                        admin_area_2: city, // City
                        admin_area_1: state, // State
                        country_code: country // Country
                    }
                }
            }],
            payer: {
                name: {
                    given_name: fullName.split(' ')[0],
                    surname: fullName.split(' ').slice(1).join(' ')
                },
                phone: {
                    phone_number: {
                        national_number: phone
                    }
                },
                address: {
                    address_line_1: address,
                    address_line_2: apartment,
                    admin_area_2: city,
                    admin_area_1: state,
                    country_code: country
                }
            }
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Optionally, you can send the transaction details to your server
            // for further processing here.
        });
    },
    onError: function(err) {
        console.error(err);
        alert('An error occurred during the transaction.');
    }
}).render('#paypal-button-container');
