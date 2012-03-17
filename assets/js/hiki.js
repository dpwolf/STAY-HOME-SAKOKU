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
    if (snapr.info.supports_local_storage)
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


$(function(){
    hiki_cam = [];

    var showImages = function()
    {
        var tempImages = hiki_cam;

        var showImage = function()
        {
            if (tempImages.length)
            {
                var image = tempImages.shift();
                $(".cam-1 img").attr("src", "cam-1/" + image );
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

                hiki_cam = images;
                showImages();
            }
        })
        setTimeout( getImages, 15000);
    }

    getImages();

})
