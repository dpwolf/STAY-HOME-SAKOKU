// global namespace
hiki = {}

// store some info about the browser
hiki.info = {};
hiki.info.supports_local_storage = (function () {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
        return false;
    }
})();

hiki.utils = {};
hiki.utils.save_local_param = function( key, value )
{
    if(hiki.info.supports_local_storage)
    {
        localStorage.setItem( key, value );
    }
    else
    {
        $.cookie(key, value);
    }
};
hiki.utils.get_local_param = function( key )
{
    if (hiki.info.supports_local_storage)
    {
        return localStorage.getItem( key );
    }
    else
    {
        return $.cookie( key );
    }
}
hiki.utils.delete_local_param = function( key )
{
    if (hiki.info.supports_local_storage)
    {
        localStorage.removeItem( key );
    } else {
        $.cookie( key, null );
    }
};

// placeholder
hiki.sendFirstMessage = function()
{

}
$(function(){
    hiki_cam_1 = [];
    hiki_cam_2 = [];

    $("input.agree").live("click", function(e)
    {
        if ($(e.target).attr("checked"))
        {
            $(".hiki-accept").attr("disabled", false);
        }
        else
        {
            $(".hiki-accept").attr("disabled", true);
        }
    });

    $(".hiki-accept").live("click", function(e)
    {
        if (!$(e.target).attr("disabled"))
        {
            hiki.utils.save_local_param( "hiki-agree", "true" );
            hiki.sendFirstMessage();
            $("#community-guidelines-modal").modal( "hide" );
        }
    });

    $("a.refuse").live("click", function()
    {
        hiki.utils.delete_local_param( "hiki-agree" );
    });


    $(".select-cam").live("click", function( e )
    {
        $(".select-cam.active").removeClass("active");
        $(e.currentTarget).addClass("active");
        var img = $(e.currentTarget).find("img").attr("src");
        var cam = $(e.currentTarget).data("cam");
        $(".hero").attr("data-cam", cam);
        $(".hero img").attr("src", img);
    });

    var showImages1 = function()
    {
        var tempImages = hiki_cam_1;

        var showImage1 = function()
        {
            if (tempImages.length)
            {
                var image = tempImages.shift();
                $("[data-cam='cam-1'] img").attr("src", "cam-1/" + image );
            }
            _.delay(showImage1, 5000);
        }
        showImage1();

        setTimeout( showImages1, 15000);
    }


    var getImages1 = function()
    {
        $.ajax({
            url: "cam-1/list_images.php",
            dataType: "json",
            success: function( images )
            {
                // $(".cam-thumbnails").empty();

                // reverse the list of images
                images = _.sortBy( images, function( image, index )
                {
                    return - index;
                });

                hiki_cam_1 = images;
                showImages1();
            }
        })
        setTimeout( getImages1, 15000);
    }

    getImages1();


    var showImages2 = function()
    {
        var tempImages = hiki_cam_2;

        var showImage2 = function()
        {
            if (tempImages.length)
            {
                var image = tempImages.shift();
                $("[data-cam='cam-2'] img").attr("src", "cam-2/" + image );
            }
            _.delay(showImage2, 5000);
        }
        showImage2();

        setTimeout( showImages2, 15000);
    }


    var getImages2 = function()
    {
        $.ajax({
            url: "cam-2/list_images.php",
            dataType: "json",
            success: function( images )
            {
                // $(".cam-thumbnails").empty();

                // reverse the list of images
                images = _.sortBy( images, function( image, index )
                {
                    return - index;
                });

                hiki_cam_2 = images;
                showImages2();
            }
        })
        setTimeout( getImages2, 15000);
    }

    getImages2();
})
