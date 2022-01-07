
function AddUserAddressform() {
    var usrId = $('#hdnUserId').val();
    var UserAddress = new FormData();
    UserAddress.append("UsrId", usrId);
    UserAddress.append("CountryNam", $('#Country').val());
    UserAddress.append("CountyNam", $('#County').val());
    UserAddress.append("PostalCod", $('#UserPostalCode').val());
    UserAddress.append("Contact", $('#Contact').val());
    //UserAddress.append("StsId", $('#Town').val());
    UserAddress.append("twn", $('#Town').val()); Town
    UserAddress.append("Statee", $('#State').val());
    UserAddress.append("Addres", $('#Detail').val());
    UserAddress.append("AddrId", $('#BrandName12').val());


    $.ajax({
        type: "Post",
        url: "/UserLogin/UpdateCustomerAddress/",
        data: UserAddress,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            if (result.success) {
                $(window).scrollTop(0);

                $('#successAccountMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#successAccountText').html("success : Address Updated Successfully");
                $('#successAccountMessage').fadeIn();

                $('#successAccountMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#successAccountMessage").slideUp(500);


                    });
                $('#successAccountMessage').attr('hidden');


            }
            else {

                $(window).scrollTop(0);
                $('#errorAccountMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#errorAccountText').html('Danger :'+result.responseText);
                $('#errorAccountMessage').fadeIn();

                $('#errorAccountMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#errorAccountMessage").slideUp(500);


                    });
                $('#errorAccountMessage').attr('hidden');

            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}

$(function () {
    $("#ChangePassUser").on("click", function (e) {

        var form = $("#ChangeAdminUserForm")[0];
        var isValid = form.checkValidity();
        var passwordCheck = CheckValidation();
        var ConfirmPassword = Checkconfirm_password();

        if (!isValid) {

            e.preventDefault();
            e.stopPropagation();
        }
        else if (!passwordCheck) {

            e.preventDefault();
            e.stopPropagation();
        }
        else if (!ConfirmPassword) {

            e.preventDefault();
            e.stopPropagation();
        }
        else {
            ChangeUserPasswordMain();
        }
        form.classList.add('was-validated');
        return false; // For testing only to stay on this page
    });
});

function ChangeUserPasswordMain() {

    var Password = $("#new_password").val();
    var ConfirmPassword = $("#confirm_password").val();
    var currentpassword = $("#current_password").val();
    var UserId = $('#hdnUserId').val();;
    var formData = new FormData();
    formData.append("Password", Password);
    formData.append("ConfirmPassword", ConfirmPassword);
    formData.append("currentPassword", currentpassword);
    formData.append("UserId", UserId);
    $.ajax({
        type: "Post",
        url: "/UserLogin/ChangeUserPassword/",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            if (result.success) {
                $(window).scrollTop(0);

                $('#successAccountMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#successAccountText').html("success : User Password Updated Successfully");
                $('#successAccountMessage').fadeIn();

                $('#successAccountMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#successAccountMessage").slideUp(500);


                    });
                $('#successAccountMessage').attr('hidden');
                setTimeout(function () {
                    window.location.href = "/logout/";
                }, 3000);



            }
            else {

                $(window).scrollTop(0);
                $('#errorAccountMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#errorAccountText').html('Danger :' +result.responseText);
                $('#errorAccountMessage').fadeIn();

                $('#errorAccountMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#errorAccountMessage").slideUp(500);


                    });
                $('#errorAccountMessage').attr('hidden');

            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}
function UpdateUserName() {
    var UserName = $("#first_name").val();
    var UserId = $('#hdnUserId').val();;
    var formData = new FormData();
    formData.append("UserName", UserName);
    formData.append("UserId", UserId);
    $.ajax({
        type: "Post",
        url: "/UserLogin/ChangeUserName/",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            if (result.success) {
                $(window).scrollTop(0);

                $('#successAccountMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#successAccountText').html("success : UserName Updated Successfully");
                $('#successAccountMessage').fadeIn();

                $('#successAccountMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#successAccountMessage").slideUp(500);


                    });
                $('#successAccountMessage').attr('hidden');
                window.location.reload();


            }
            else {

                $(window).scrollTop(0);
                $('#errorAccountMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#errorAccountText').html('Danger :' +result.responseText);
                $('#errorAccountMessage').fadeIn();

                $('#errorAccountMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#errorAccountMessage").slideUp(500);


                    });
                $('#errorAccountMessage').attr('hidden');

            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}


$('#new_password').keyup(function () {
    var Check = CheckValidation();
    if (check) {

        $('#PasswordAlertLabel').attr('class', 'invalid-feedback');
        $('#new_password').attr('class', 'form-control');
    }
});

function CheckValidation() {
    var check = true;

    var Passwordcheck = document.getElementById('new_password').value;

    if ($("#new_password").val().length < 8) {


        check = false;
    }
    else if (!/\d/.test($("#new_password").val())) {

        check = false;
    }
    else if
        (!/[a-z]/.test($("#new_password").val())) {


        check = false;
    }
    else if (!/[A-Z]/.test($("#new_password").val())) {


        check = false;
    } else if (!/([~,!,@@,#,$,%,^,&,*,-,_,+,=,?,>,<])/.test($("#new_password").val())) {


        check = false;
    }



    if (check == false) {

        $('#PasswordAlertLabel').attr('class', 'invalid-feedback2');
        $('#new_password').attr('class', 'form-control textboxstyle');

        return false;
        $('#AddUserPopUp').modal('show');
    }
    else {

        $('#PasswordAlertLabel').attr('class', 'invalid-feedback');
        $('#new_password').attr('class', 'form-control');
        return true;
    }

}
function Checkconfirm_password() {

    var Password = document.getElementById('new_password').value;
    var confirm_password = document.getElementById('confirm_password').value;

    if (!(Password === confirm_password)) {

        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback2');
        $('#confirm_password').attr('class', 'form-control  textboxstyle');

        return false;


    }
    if ($("#confirm_password").val().length < 8) {


        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback2');
        $('#confirm_password').attr('class', 'form-control  textboxstyle');
        return false;
    }
    else if (!/\d/.test($("#confirm_password").val())) {

        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback2');
        $('#confirm_password').attr('class', 'form-control  textboxstyle');
        return false;
    }
    else if
        (!/[a-z]/.test($("#confirm_password").val())) {


        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback2');
        $('#confirm_password').attr('class', 'form-control  textboxstyle');
        return false;
    }
    else if (!/[A-Z]/.test($("#confirm_password").val())) {


        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback2');
        $('#confirm_password').attr('class', 'form-control  textboxstyle');
        return false;
    } else if (!/([~,!,@@,#,$,%,^,&,*,-,_,+,=,?,>,<])/.test($("#confirm_password").val())) {


        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback2');
        $('#confirm_password').attr('class', 'form-control  textboxstyle');
        return false;
    }
    else {

        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback');
        $('#confirm_password').attr('class', 'form-control');
        return true;
    }
}
$('#confirm_password').keyup(function () {
    var Check = Checkconfirm_password();
    if (check) {

        $('#confirm_passwordAlertLabel').attr('class', 'invalid-feedback');
        $('#confirm_password').attr('class', 'form-control');
        return true;
    }
    else {
        return false;
    }
});