
export function getRemoteImageSize(imgSrc) {

    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            resolve({
                width: this.width || 0,
                height: this.height || 0
            });
        };
        img.onerror = function (e) {
            reject(new Error('get image fail'));
        };
        img.src = imgSrc;
    })

}