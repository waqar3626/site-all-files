$("#txtUserName").on("change", function () {
    if ($("#txtUserName").val() == "") {
        $("#txtUserName").addClass("textboxstyle");
    }
    else {
        $("#txtUserName").removeClass("textboxstyle");
    }
});
$("#txtUserAddress").on("change", function () {
    if ($("#txtUserAddress").val() == "") {
        $("#txtUserAddress").addClass("textboxstyle");
    }
    else {
        $("#txtUserAddress").removeClass("textboxstyle");
    }
});
$("#txtTownName").on("change", function () {
    if ($("#txtTownName").val() == "") {
        $("#txtTownName").addClass("textboxstyle");
    }
    else {
        $("#txtTownName").removeClass("textboxstyle");
    }
});
$("#txtStateName").on("change", function () {
    if ($("#txtStateName").val() == "") {
        $("#txtStateName").addClass("textboxstyle");
    }
    else {
        $("#txtStateName").removeClass("textboxstyle");
    }
});
$("#txtZipCode").on("change", function () {
    if ($("#txtZipCode").val() == "") {
        $("#txtZipCode").addClass("textboxstyle");
    }
    else {
        $("#txtZipCode").removeClass("textboxstyle");
    }
});
$("#txtPhoneNo").on("change", function () {
    if ($("#txtPhoneNo").val() == "") {
        $("#txtPhoneNo").addClass("textboxstyle");
    }
    else {
        $("#txtPhoneNo").removeClass("textboxstyle");
    }
});
$("#txtEmailAddress").on("change", function () {
    if ($("#txtEmailAddress").val() == "") {
        $("#txtEmailAddress").addClass("textboxstyle");
    }
    else {
        $("#txtEmailAddress").removeClass("textboxstyle");
    }
});

$("#txtCountryName").on("change", function () {
    if ($("#txtCountryName").val() == "") {
        $("#txtCountryName").addClass("textboxstyle");
    }
    else {
        $("#txtCountryName").removeClass("textboxstyle");
    }
});
$("#txtCountyName").on("change", function () {
    if ($("#txtCountyName").val() == "") {
        $("#txtCountyName").addClass("textboxstyle");
    }
    else {
        $("#txtCountyName").removeClass("textboxstyle");
    }
});


function InvalidTxtCheck() {
    if ($("#txtUserName").val() == "") {
        $("#txtUserName").addClass("textboxstyle");
        $("#txtUserName").focus();
    }
    else if ($("#txtUserAddress").val() == "") {
        $("#txtUserAddress").addClass("textboxstyle");
        $("#txtUserAddress").focus();
    }
    else if ($("#txtTownName").val() == "") {
        $("#txtTownName").addClass("textboxstyle");
        $("#txtTownName").focus();
    }
    else if ($("#txtStateName").val() == "") {
        $("#txtStateName").addClass("textboxstyle");
        $("#txtStateName").focus();
    }
    else if ($("#txtZipCode").val() == "") {
        $("#txtZipCode").addClass("textboxstyle");
        $("#txtZipCode").focus();
    }
    else if ($("#txtPhoneNo").val() == "") {
        $("#txtPhoneNo").addClass("textboxstyle");
        $("#txtPhoneNo").focus();
    }
    else if ($("#txtEmailAddress").val() == "") {
        $("#txtEmailAddress").addClass("textboxstyle");
        $("#txtEmailAddress").focus();
    }
    else if ($("#txtCountryName").val() == "") {
        $("#txtCountryName").addClass("textboxstyle");
        $("#txtCountryName").focus();
    } else if ($("#txtCountryName").val() == "") {
        $("#txtCountyName").addClass("textboxstyle");
        $("#txtCountyName").focus();
    } 
}