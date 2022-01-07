function AddStar(e) {
    $('.star').removeClass('active');
    $(e).addClass("active");
    var rating = $(e).text();
    $("#hdnRating").val(rating);
}
function loadProductFeedBack() {
    $.ajax({
        url: "/Website/_ListProductFeedBackByID/" + $("#FeedBackProductId").val(),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = "";
            var rating = 0;
            $.each(result, function (key, item) {
                //html = '<li><div class="comment"><figure class="comment-media"><img src="~/WebsiteAssets/images/blog/comments/1.jpg" alt="avatar"></figure><div class="comment-body"><div class="comment-rating ratings-container mb-0"><div class="comment-rating ratings-container mb-0"><div class="ratings-full"><span class="ratings" style="width:80%"></span><span class="tooltiptext tooltip-top">4.00</span><span class="comment-date text-body">September 22, 2020 at 9: 42pm</span ><h4><a>John Doe</a></h4></div><div class="comment-content"><p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.Nullam mollis.Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.</p ></div></div></div></li>';
                rating = rating + item.feedBackRating;
                html += '<li>';
                html += '<div class="comment">';
                html += '<figure class="comment-media">';
                html += '<div id="profileImage">' + item.customerName.charAt(0) + '</div>'
                //html += '<img src="~/WebsiteAssets/images/blog/comments/1.jpg" alt="avatar">';
                html += '</figure>';
                html += '<div class="comment-body">';
                html += '<div class="comment-rating ratings-container mb-0">';
                html += '<div class="ratings-full">';
                html += '<span class="ratings" style="width:' + item.feedBackRating * 20 + '%"></span>';
                html += '<span class="tooltiptext tooltip-top">' + item.feedBackRating + '.00</span>';
                html += '</div>';
                html += '</div>';
                html += '<div class="comment-user">';
                //html += '<span class="comment-date text-body">September 22, 2020 at 9: 42pm</span >';
                html += '<span class="comment-date text-body">' + item.date + ' at ' + item.time + '</span >';

                html += '<h4>' + item.customerName + '</h4>';
                html += '</div>';
                html += '<div class="comment-content">';
                html += '<p>' + item.feedBack + '</p >';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</li>';
            });
            $('.ProductFeedBackList').html(html);
            $(".ProductFeedBackCount").html("Reviews (" + result.length + ")");
            $(".productfeedbackAverage").html("(" + result.length + " Reviews )");
            var data = (rating / result.length) * 20;

            $(".productfeedbackAverageStar").attr("style", "width:" + data + "%");
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}


function AddProductFeedBack() {
    var hdnRating = $('#hdnRating').val();
    var FeedBackProductId = $('#FeedBackProductId').val();
    //var rating = $('#rating').val();
    var reply_message = $('#reply_message').val();
    var reply_name = $('#reply_name').val();
    var reply_email = $('#reply_email').val();
    var AddProductFeed = new FormData();
    AddProductFeed.append("FeedBackProductId", FeedBackProductId);
    AddProductFeed.append("rating", hdnRating);
    AddProductFeed.append("reply_message", reply_message);
    AddProductFeed.append("reply_name", reply_name);
    AddProductFeed.append("reply_email", reply_email);


    $.ajax({
        type: "Post",
        url: "/Website/_AddProductFeedBack/",
        data: AddProductFeed,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            if (result.success) {
                loadProductFeedBack();
                displayBusyIndicator2();

            }
            else {

                displayBusyIndicator2();

            }
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}