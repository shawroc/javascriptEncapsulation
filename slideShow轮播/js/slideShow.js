var SlideShow = function(){
    function _SlideShow(slideShowCt, imgsCt, preBtn, nextBtn, imgIdxIconsCt, duration){
        this.slideShowCt = document.querySelector(slideShowCt);
        this.imgsCT = this.slideShowCt.querySelector(imgsCt);
        this.imgsNumber = this.imgsCT.childElementCount;
        this.preBtn = this.slideShowCt.querySelector(preBtn);
        this.nextBtn = this.slideShowCt.querySelector(nextBtn);
        this.imgIdxIconsCt = this.slideShowCt.querySelector(imgIdxIconsCt);
        this.imgIdxIcons = this.slideShowCt.querySelector(imgIdxIconsCt).children;
        this.imgIdx = 0;
        this.calculateOffset = 0;
        this.clock;
        this.duration = duration;
        this.bindEvent();
    };
    _SlideShow.prototype.bindEvent = function(){
        let self = this;
        self.nextBtn.addEventListener('click', function callback(mouseEvent){
            mouseEvent.preventDefault();
            self.slideToNext((self.imgIdx + 1) % self.imgsNumber)
        });
        self.preBtn.addEventListener('click', function(mouseEvent){
            mouseEvent.preventDefault();
            self.slideToPre(( self.imgIdx + 2 * self.imgsNumber - 1) % self.imgsNumber);
        });
        self.imgIdxIconsCt.addEventListener('click', function(mouseEvent){
            mouseEvent.preventDefault();
            let targetElement = mouseEvent.target;
            if(targetElement.tagName.toLowerCase() === "li") {
                let iconIdx = [].indexOf.call(self.imgIdxIcons, targetElement);
                self.slideImage(iconIdx);
                self.imgIdxIconActive(iconIdx);
            }
        });
        self.autoSlideToNext();
    };
    _SlideShow.prototype.slideToNext = function(idx) {
        this.slideImage(idx);
    };
    _SlideShow.prototype.slideToPre = function(idx) {
        this.slideImage(idx);
    };
    _SlideShow.prototype.slideImage = function(idx) {
        this.calculateOffset = -100 * idx;
        this.imgsCT.style.left = this.calculateOffset + '%'; 
        this.imgIdxIconActive(idx);
        this.imgIdx = idx ++; 
    };
    _SlideShow.prototype.imgIdxIconActive = function(imgIdx) {
        for(let i = 0; i < this.imgIdxIcons.length; i++) {
            this.imgIdxIcons[i].classList.remove('active');  
        };
        this.imgIdxIcons[imgIdx].classList.add('active');
    };
    _SlideShow.prototype.autoSlideToNext = function(idx) {
        let self = this;
        self.clock = setTimeout(function autoSlide(){
            self.slideImage((self.imgIdx + 1) % self.imgsNumber);
            setTimeout(autoSlide, self.duration);
        }, self.duration);
    };
    _SlideShow.prototype.clearAutoSlideToNext = function(){
        if(this.clock) {
            window.clearTimeout(this.clock);
        }
    };
    return {
        create: function(slideShowCt, imgsCt, preBtn, nextBtn, imgIdxIconsCt, duration){
            return new _SlideShow(slideShowCt, imgsCt, preBtn, nextBtn, imgIdxIconsCt, duration);
        }
    };
}();

SlideShow.create('.slide-show-ct', '.slide-show-img-ct', '.pre-btn', '.next-btn', '.img-idx-icon-ct', 3000);



