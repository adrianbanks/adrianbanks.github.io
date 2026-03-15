export class CroppedImageHandler { 
    markCroppedImages() {
        $(".sketchnote-image-holder").each(function() {
            const container = $(this);
            const threshold = container.width() / container.height();

            container.find(".sketchnote-image").each(function() {
                const img = $(this);

                if (this.complete) {
                    img.attr("data-cropped", (this.naturalWidth / this.naturalHeight) < threshold);
                } else {
                    img.on("load", function() {
                        img.attr("data-cropped", (this.naturalWidth / this.naturalHeight) < threshold);
                    });
                }
            });
        });
    }
}
