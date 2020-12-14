const states = ['Alabama','Alaska', 'Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
                'Washington, D.C.','Florida','Georgia', 'Hawaii','Idaho','Illinois','Indiana','Iowa',
                'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
                'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
                'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
                'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];


$(document).ready(function(){

    for(var i = 0; i < states.length; i++){
        $("select.state").append('<option value="' + states[i] + '">' + states[i] + '</option>');
    }
    
    //event handler for "Place Order" button - also joining the
    //user First+Last name and Address 1 + Address 2
    $(".submit-order-btn").click(function(){

        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var user_name = firstName + " " + lastName;

        var address1 = $("#user_address1").val();

        if($("#user_address2").val().length != 0){
            var address2 = $("#user_address2").val();
            var user_address = address1 + ", " + address2;
        }
        
        else{
            var user_address = address1;
        }
        
        var currentDateTime = new Date();
        var date = currentDateTime.toLocaleDateString();
        var time = currentDateTime.toLocaleTimeString();

        $("#user_name").val(user_name.trim());
        $("#user_address").val(user_address.trim());
        $("#date").val(date);
        $("#time").val(time);

        $(".submit-order-form").submit();

    });

    //event handler for promo "Redeem" button
    $(".redeem-btn").click(function(){
        alert("Sorry, the promo code cannot be redeemed at this moment.");
        
    });

});