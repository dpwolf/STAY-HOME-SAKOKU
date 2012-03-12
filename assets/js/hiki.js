$(function(){
    var thumbnailTemplate = _.template( $("#cam-image-thumbnail-template").html() );
    var getImages = function()
    {
        $.ajax({
            url: "cam-images/list_images.php",
            dataType: "json",
            success: function( images )
            {
                $(".cam-thumbnails").empty();

                // reverse the list of images
                images = _.sortBy( images, function( image, index )
                {
                    return - index;
                });

                _.each( images, function( image, index )
                {
                    if (index < 3)
                    {
                        $(".cam-thumbnails").append( thumbnailTemplate({
                            fileName: image
                        }));
                        // console.log( "image: ", image, index );
                    }
                })
            }
        })
        setTimeout( getImages, 15000);
    }

    getImages();

})
