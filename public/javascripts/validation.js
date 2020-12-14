$(document).ready(function(){

   
    $("#email").keyup(()=>{

            var email=$("#email").val();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(email) == false) 
            {
                $("#email_message").text("Please Enter a Valid email");
                $("#email_message").css("color","red");
            }
            else{

                $("#email_message").text("")
                return true;

            }
         
    });

    $("#password").keyup(()=>{

        var password=$("#password").val();
        var password_confirm = $("#password-confirm").val();
        var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/i;

        var validLength = /.{8}/.test(password);
        var hasCaps = /[A-Z]/.test(password);
        var hasNums = /\d/.test(password);
        var hasSpecials = /[~!,@#%&_\$\^\*\?\-]/.test(password);


        if(password_confirm.localeCompare(password) == 0){
            $("#user-signup-btn").prop('disabled', false);  //enable submit button
        }

        else{
            $("#user-signup-btn").prop('disabled', true);  //disable submit button
        }
		
        if (!(validLength && hasCaps && hasNums && hasSpecials))
        {
            $("#password_message").text("(Password must be more than 8 character and must include atleast 1 of each Special Char, Uppercase, Lowercase , Number)");
            $("#password_message").css("color","red");
        }

        else{
            $("#password_message").text("")
            return true;

        }
     
    });

    $("#password-confirm").keyup(function(){
        var password = $("#password").val();
        var password_confirm = $("#password-confirm").val();

        if(password_confirm.localeCompare(password) == 0){
            $("#password_message_confirm").text("");
            $("#user-signup-btn").prop('disabled', false);  //enable submit button
        }

        else{
            $("#password_message_confirm").text("(Password must match your previously typed password)");
            $("#password_message_confirm").css("color","red");

            $("#user-signup-btn").prop('disabled', true);  //disable submit button
        }

    });

});