$(function(){
    var thumbnailTemplate = _.template( $("#cam-image-thumbnail-template").html() );

    hiki_cam = [];

    var showImages = function()
    {
        var tempImages = hiki_cam;

        var showImage = function()
        {
            if (tempImages.length)
            {
                var image = tempImages.shift();
                $(".cam-thumbnails").html( thumbnailTemplate({
                    fileName: image
                }));
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
