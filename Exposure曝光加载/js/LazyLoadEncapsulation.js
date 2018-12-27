let LazyLoad = function(){
    function Exposure(node, callback) {
        this.node = node;
        this.callback = callback;
        this.clock;
    };
    Exposure.prototype.bindEleEvent = function(node){
        let _LazyLoad = this;
        window.addEventListener('scroll', function(){
            if(_LazyLoad.isInViewPort(node)) {
                _LazyLoad.callback(node);
            };
        });
    };
    Exposure.prototype.bindImgEvent = function(node){
        let _LazyLoad = this;
        window.addEventListener('scroll', function(){
                if(_LazyLoad.clock) {
                    window.clearTimeout(_LazyLoad.clock);
                }
                _LazyLoad.clock = setTimeout(function(){
                    _LazyLoad.node.forEach(function(item, index){
                        if(_LazyLoad.isInViewPort(item) && !_LazyLoad.isImageExposed(item)) {
                            _LazyLoad.callback(item);
                        };
                    }) 
            }, 300);
        });
    }
    Exposure.prototype.loadEle = function(callback){
        callback(this.node);
    };
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
            let lazyLoad = new Exposure(node, callback);
            lazyLoad.bindEleEvent(node);
        },
        image: function(node, callback) {
            let lazyLoad = new Exposure(node, callback);
            lazyLoad.bindImgEvent(node);
        }
    };
}();

//使用方法
LazyLoad.create(document.querySelector('.helloworld'), function(node) {
    node.textContent += " helloworld";
});

LazyLoad.image(document.querySelectorAll('.pic-ct img'), function(node){
    let dataImgsrcAttr = node.getAttribute('data-imgsrc');
    node.setAttribute('src', dataImgsrcAttr);
}); 