



$(function () {
    $("#btnRegistrationClick").on("click", function (e) {
        var form = $("#AddRegistrationForm")[0];
        var isValid = form.checkValidity();
        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
          
            addRegistraionForm();
        }
        form.classList.add('was-validated');
        return false; // For testing only to stay on this page
    });
});

$(function () {
   
    $("#btnSignInSubmit").on("click", function (e) {
        var form = $("#signInForm")[0];
        var isValid = form.checkValidity();
        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            var UserName = $("#singinEmail").val();
            var Password = $("#singinPassword").val();
            addSigninForm(UserName, Password);
        }
        form.classList.add('was-validated');
        return false; // For testing only to stay on this page
    });
});

function OpenMyAccount() {
    
    window.location.href = "/MyAccount";
}

function LogOut() {
    window.location.href = "/Logout/";
}
function addRegistraionForm() {
   
    var UserName = $("#registerName").val();
    var registerEmail = $("#registerEmail").val();
    var registerPassword = $("#registerPassword").val();
    var customers = new FormData();
    customers.append("CustomerName", UserName);
    customers.append("CustomerEmailAddress", registerEmail);
    customers.append("CustomerPassword", registerPassword);

    $.ajax({
        type: "Post",
        url: "/Customer/Registration/",
        data: customers,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
            if (response.success) {

             
                

                window.location.reload();

            }
            else {
              

                $('#errorRegistrationMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#errorRegistrationText').html(response.responseText);
                $('#errorRegistrationMessage').fadeIn();

                $('#errorRegistrationMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#errorRegistrationMessage").slideUp(500);


                    });
                $('#errorRegistrationMessage').attr('hidden');
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function addSigninForm(UserName,Password) {

    

    var formData = new FormData();
    formData.append("UserName", UserName);
    formData.append("Password", Password);
    
    $.ajax({
        type: "Post",
        url: "/login/",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
            if (response.success) {
                window.location.reload();
            }
            else {

              
                $('#errorSignInMessage').removeAttr('hidden');
                $(".alertmsg").attr("style", "display block !important");
                $('#errorSignInText').html(response.responseText);
                $('#errorSignInMessage').fadeIn();

                $('#errorSignInMessage').fadeTo(5000, 500).slideUp(500,
                    function () {
                        $("#errorSignInMessage").slideUp(500);


                    });
                $('#errorSignInMessage').attr('hidden');
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function OpenLoginPopUp(id) {

    
        $(".register").addClass("active");
        $(".signin").removeClass("active");
        $("#register").addClass("active in");
        $("#signin").removeClass("active in");

   
    $("#exampleModalCenter").modal("show");
}

function WishListAdd(id) {

    var text = $('#wishlist-' + id).attr('title');

    if (text == 'Add to wishlist') {
        $('#wishlist-' + id).attr("title", "Remove From WishList");
        $('#wishlist-' + id).html("<i class='d-icon-heart-full'></i>");
        var formData = new FormData();
        formData.append("id", id);

        $.ajax({
            type: "POST",
            url: "/Website/AddWishList/",

            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    swal("Success!", "Item added to your Favourite list", "success");
                }
                else {
                    swal("Error!", result.responseText, "error");
                }


            },
            error: function (errormessage) {
                //alert(errormessage.responseText);
            }
        });
    }
    else {
        $('#wishlist-' + id).attr("title", "Add to wishlist");
        $('#wishlist-' + id).html("<i class='d-icon-heart'></i>");
        var formData = new FormData();
        formData.append("id", id);
        $.ajax({
            type: "POST",
            url: "/Website/RemoveWishList/",

            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    swal("Success!", "Item Successfully Removed from your Favourite list", "success");
                }
                else {
                    swal("Error!", result.responseText, "error");
                }


            },
            error: function (errormessage) {
                //alert(errormessage.responseText);
            }
        });
    }



}

function CartAddIndexPage(productId) {
   var quantity = 1;
    var formData = new FormData();
    formData.append("id", productId);
    formData.append("quantity", quantity);

    $.ajax({
        type: "POST",
        url: "/Website/AddToCartItem/",

        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            if (result.success) {
                ListCartData();
                var Price = "";
                var Discount = "";
                var data = result.responseText.split('^');

             
                if (parseFloat(data[3]) > 0.0) {

                    Price = (parseFloat(data[2]) - parseFloat(data[3])).toString();
                    Discount = data[3];
                } else {
                    Price = data[2];
                }

                var html = '';
                html += '<p class="minipopup-title">Successfully Added</p>';
                html += '<div class="product product-purchased  product-cart mb-0">';
                html += '<figure class="product-media">';
                html += '<a href="#"><img src="../' + data[1] + '" alt="product" width="90" height="90"></a>';
                html += '</figure><div class="product-detail">';
                html += '<a  class="product-name">' + data[0] + '</a >';
                html += '<div class="price-box"><span class="product-quantity">' + quantity + '</span><span class="product-price"><ins class="new-price">$' + Price + '</ins><del class="old-price">$' + Discount + '</del></span></div>';
                html += '</div></div><div class="action-group d-flex mt-3">';
                html += '<a href="/cart/" class="btn btn-sm btn-outline btn-primary btn-block w-100 btn-rounded mr-2">View Cart</a>';
               html +='</div>';

                $(".addtocartPopup").html(html);

                $(".addtocartPopup").addClass("show");

                setTimeout(function () {

                    $(".addtocartPopup").removeClass("show");
                }, 5000);

            }
            else {

                swal("Error!", result.responseText, "error");
            }


        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });


}



