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
        var cam = $(e.currentTarget).data("cam");
        $(".hero").data("cam", cam);
    });

    var showImages = function()
    {
        var tempImages = hiki_cam_1;

        var showImage = function()
        {
            if (tempImages.length)
            {
                var image = tempImages.shift();
                $("[data-cam='cam-1'] img").attr("src", "cam-1/" + image );
            }
            _.delay(showImage, 5000);
        }
        showImage();

        setTimeout( showImages, 15000);
    }


    var getImages = function()
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
                showImages();
            }
        })
        setTimeout( getImages, 15000);
    }

    getImages();

})
