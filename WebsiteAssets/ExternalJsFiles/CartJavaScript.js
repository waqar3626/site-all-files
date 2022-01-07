$(document).ready(
    function () {

        ListCartDataMain();
        $('.cartQuantityData').val(1);
        $('.quantity').val("1");

    }
);

function CartSubTotal() {

    var rowCount = $('.cartTableBody tr').length;
    TotalSubPrice = 0.0;
    for (var i = 0; i < rowCount; i++) {
        var SubPrice = $('#subTotalPrice-' + i + '').html();
        SubPrice = SubPrice.replace("$", "");

        TotalSubPrice = parseFloat(parseFloat(TotalSubPrice) + parseFloat(SubPrice)).toFixed(2);

    }
    $('#hdnSubTotalPrice').val(TotalSubPrice);
    $('.cartTotalsPrice').text('$' + TotalSubPrice);

}

function DescreaseQuantityProduct(id) {



    var quantity = $('#btnplusQuantity-' + id + '').val();
    var minQuantity = $('#btnplusQuantity-' + id + '').attr('min');

    
  




    var salePriceKey = $('#salePriceTotal-' + id + '').text();
    salePriceKey = salePriceKey.replace("$", "");


    var salePrice = parseFloat(parseFloat(salePriceKey) * parseFloat(quantity)).toFixed(2);

    $('#subTotalPrice-' + id + '').html('$ ' + salePrice);


    CartSubTotal();



}
function IncreaseQuantityProduct(id) {



    var quantity = $('#btnplusQuantity-' + id + '').val();
    var maxQuantity = $('#btnplusQuantity-' + id + '').attr('max');

    




    var salePriceKey = $('#salePriceTotal-' + id + '').text();
    salePriceKey = salePriceKey.replace("$", "");


    var salePrice = parseFloat(parseFloat(salePriceKey) * parseFloat(quantity)).toFixed(2);

    $('#subTotalPrice-' + id + '').html('$ ' + salePrice);


    CartSubTotal();



}
function ListCartDataMain() {

    $.ajax({
        url: "/Website/ListCartDataJson",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            const obj = JSON.parse(result)
            console.log(obj);
            htmldata = "";
            var TotalPrice = 0.0;
            $.each(obj, function (key, item) {
                var Price = "";
                var Discount = "";

                if (parseFloat(item.Discount) > 0.0) {

                    Price = (parseFloat(item.SalePrice) - parseFloat(item.Discount)).toString();
                    TotalPrice = parseFloat(TotalPrice) + parseFloat(Price);
                    Discount = item.Discount;
                } else {
                    Price = item.SalePrice;
                    TotalPrice = parseFloat(TotalPrice) + parseFloat(Price);
                }


                htmldata += '   <tr><td class="product-thumbnail"><figure><input type="hidden" id="hdnProductID" value="' + item.ProductId + '" />';
                htmldata += '<a href="product-simple.html"><img src="../' + item.ImageThumbnail + '" width="100" height="100" alt="product">';
                htmldata += '      <td class="product-name"><div class="product-name-section"><a href="#" >' + item.ProductName + '</a></div></td>';
                htmldata += ' </a></figure></td><td class="product-subtotal">';
                htmldata += '<span class="amount" id="salePriceTotal-' + key + '">$' + (parseFloat(item.SalePrice - item.Discount)) + '</span></td><td class="product-quantity"><div class="input-group">';
                htmldata += '<input id="btnplusQuantity-' + key + '" readonly class="quantity form-control cartQuantityData" type="number"  value="' + item.ProductQuantity+'" />';
                htmldata += '    </div></td><td class="product-price"><span class="amount" id="subTotalPrice-' + key + '">$' + (parseFloat(item.SalePrice - item.Discount)) + '</span></td>';
                htmldata += '<td class="product-close"><a onclick="RemoveCartItem(' + item.ProductId + ')" class="product-remove" title="Remove this product">';
                htmldata += '<i class="fas fa-times"></i></a></td></tr>';
                
               
               
            });

            $(".cartTableBody").html(htmldata);

            CartSubTotal();

        },
        error: function (errormessage) {
            swal("Error!", result.responseText, "error");
        }
    });
}

function DoPostBackCourier() {


    var CourierId = document.getElementById('CourierId').value;


    $.ajax({
        url: "/Generic/CountryDLLWebsite",
        type: "GET",
        data: { CourierId: CourierId },
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            var s = '<option value="" disabled selected>--Select Country--</option>';
            $.each(result, function (key, item) {

                s += '<option value="' + item.countryId + '">' + item.countryName + '</option>'
            });
            $("#CountryId").html(s);
            $("#CountryId").removeAttr("disabled");
            DoPostBackCountry();
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}
function DoPostBackCountry() {
    var CountryId = document.getElementById('CountryId').value;


    $.ajax({
        url: "/Generic/StateDLLWebsite",
        type: "GET",
        data: { CountryId: CountryId },
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            var s = '<option value="" disabled selected>--Select State--</option>';
            $.each(result, function (key, item) {

                s += '<option value="' + item.stateId + '">' + item.stateName + '</option>'
            });
            $("#StateId").html(s);
            $("#StateId").removeAttr("disabled");
            DoPostBackState();
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });

}

function DoPostBackState() {
    var StateId = document.getElementById('StateId').value;


    $.ajax({
        url: "/Generic/CityDLLWebsite",
        type: "GET",
        data: { StateId: StateId },
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            var s = '<option value="" disabled selected>--Select City--</option>';
            $.each(result, function (key, item) {

                s += '<option value="' + item.cityId + '">' + item.cityName + '</option>'
            });
            $("#CityId").html(s);
            $("#CityId").removeAttr("disabled");
            DoPostBackCity();
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}
function DoPostBackCity() {
    var CityId = document.getElementById('CityId').value;
    var CourierId = document.getElementById('CourierId').value;


    $.ajax({
        url: "/Generic/GetChargesData",
        type: "GET",
        data: { CourierId: CourierId, CityId: CityId },
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            var charges = (parseFloat(result.normalCharges).toFixed(2) - parseFloat(result.discountCharges).toFixed(2));
            if (result.chargesId > 0) {
                $("#hdnChargesId").val(result.chargesId);
                $(".cartShippingPrice").html('$ ' + charges);
                $(".cartGrandPrice").html('$ ' + (charges + parseFloat($("#hdnSubTotalPrice").val())).toFixed(2));
                $(".btncheckoutdata").attr("id", "btnProcessClickButton");
                $(".btncheckoutdata").removeClass("btn-disabled");
         
                
            }
            else {
                $(".cartShippingPrice").html('$ ' + 0);
                $(".cartGrandPrice").html('$ ' + 0)
                $(".btncheckoutdata").removeAttr("id");
                $(".btncheckoutdata").addClass("btn-disabled");
               
            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}