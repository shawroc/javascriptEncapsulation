let LazyLoad = function(){
    function Exposure(node, callback, dataAttr) {
        this.node = node;
        this.callback = callback;
        this.dataImgSrcAttr = this.node.getAttribute(dataAttr);
        this.bindEvent(this.node);
    };
    Exposure.prototype.bindEvent = function(node){
        if(node.tagName.toLowerCase() !== 'img') {
            if(this.isInViewPort(node)) {
                this.loadEle(this.callback);
            };
        } else {
            if(this.isInViewPort(node) && !this.isImageExposed(node)) {
                this.loadImg(node);
            };
        };
    };
    Exposure.prototype.loadEle = function(callback){
        callback(this.node);
    };
    Exposure.prototype.loadImg = function(node) {
        node.setAttribute('src', this.dataImgSrcAttr);
    }
    Exposure.prototype.isInViewPort = function(node) {
        let viewPortHeight = document.documentElement.clientHeight,
            scrollY = document.documentElement.scrollTop,
            nodeOffsetTop = node.offsetTop;
        if(nodeOffsetTop > scrollY && nodeOffsetTop < viewPortHeight + scrollY) {
            return true;
        } else {
            return false;
        };
    };
    Exposure.prototype.isImageExposed = function(node) {
        return node.getAttribute('src') === node.getAttribute(this.dataImgSrcAttr);
    };
    return {
        create: function(node, callback) {
            new Exposure(node, callback);
        },
        image: function(node, callback, dataAttr) {
            for(let i = 0; i < node.length; i++) {
                new Exposure(node[i], callback, dataAttr);
            };
        }
    };
}();


//使用方法

let clock;

LazyLoad.create(document.querySelector('.helloworld'), function(node) {
    console.log(node)
    node.textContent += " helloworld";
});

LazyLoad.image(document.querySelectorAll('.pic-ct img'), null, 'data-imgSrc');

window.addEventListener('scroll', function(mouseEvent){
    LazyLoad.create(document.querySelector('.helloworld'), function(node) {
        node.textContent += " helloworld";
    });
});

window.addEventListener('scroll', function(mouseEvent){
    if(clock) {
        window.clearTimeout(clock);
    };
    clock = setTimeout(function(){
        LazyLoad.image(document.querySelectorAll('.pic-ct img'), null, 'data-imgSrc');
    }, 300);
});