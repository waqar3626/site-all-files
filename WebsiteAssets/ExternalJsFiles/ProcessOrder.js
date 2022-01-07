function btnProcessOrderClick() {
    if ($('#hdnSessionUserCheck').val() == "0") {

        swal("Info!", "Kindly Login to Your Account First", "info");
        return false;
    }
    var form = $("#formProcessOrder")[0];
    var isValid = form.checkValidity();


    if (!isValid) {
        InvalidTxtCheck();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    else {

        if ($('#hdnSessionUserCheck').val() == "0") {

            swal("Info!", "Kindly Login to Your Account First", "info");
            return false;
        }
        processOrderClickFunc();

    }
    form.classList.add('was-validated');
    return false; // For testing only to stay on 
}
function processOrderClickFunc() {
    var ProductData = "";
    var UserId = $("#hdnSessionUserCheck").val();
    var UserName = $("#txtUserName").val();
    var UserAddress = $("#txtUserAddress").val();
    var CountryName = $("#txtCountryName").val();
    var CountyName = $("#txtCountyName").val();
    var TownName = $("#txtTownName").val();
    var StateName = $("#txtStateName").val();
    var ZipCode = $("#txtZipCode").val();
    var PhoneNo = $("#txtPhoneNo").val();
    var EmailAddress = $("#txtEmailAddress").val();
    var AdditionalInfo = $("#txtAdditionalInfo").val();
    var SubTotal = $("#tdSubTotal").text();
    var DeliveryCharges = $("#tdDeliveryCharges").text();
    var TotalPrice = $("#tdTotalAmount").text();
    $("#tblCheckOutBody > tr").each(function () {
        var productId = $(this).find('#tdProductName').val();
        var quantity = $(this).find('#tdquantity').text();

        var data = productId + '||' + quantity;
        ProductData += data + "^^";
    });
    var PlaceOrder = new FormData();
    PlaceOrder.append("UserId", UserId);
    PlaceOrder.append("UserName", UserName);
    PlaceOrder.append("UserAddress", UserAddress);
    PlaceOrder.append("TownName", TownName);
    PlaceOrder.append("StateName", StateName);
    PlaceOrder.append("ZipCode", ZipCode);
    PlaceOrder.append("PhoneNo", PhoneNo);
    PlaceOrder.append("EmailAddress", EmailAddress);
    PlaceOrder.append("AdditionalInfo", AdditionalInfo);
    PlaceOrder.append("SubTotal", SubTotal);
    PlaceOrder.append("DeliveryCharges", DeliveryCharges);
    PlaceOrder.append("TotalPrice", TotalPrice);
    PlaceOrder.append("ProductData", ProductData);
    PlaceOrder.append("CountryName", CountryName);
    PlaceOrder.append("CountyName", CountyName);

    $.ajax({
        type: "Post",
        url: "/OrderProcess/",
        data: PlaceOrder,
        processData: false,
        contentType: false,

        success: function (result) {
            if (result.code === -1) {
                window.location.href = "/";
            }
            if (result.success) {
              
                window.location.href = "/PaymentMethod/";


            }
            else {


            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}
