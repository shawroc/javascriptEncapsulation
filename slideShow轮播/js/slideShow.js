var SlideShow = function(){
    function _SlideShow(slideShowCt, imgsCt, preBtn, nextBtn, imgIdxIconsCt, duration){
        this.slideShowCt = slideShowCt;
        this.imgsCT = this.slideShowCt.querySelector(imgsCt) || this.slideShowCt.querySelector('.slide-show-img-ct');
        this.imgsNumber = this.imgsCT.childElementCount;
        this.preBtn = this.slideShowCt.querySelector(preBtn) || this.slideShowCt.querySelector('.pre-btn');
        this.nextBtn =  this.slideShowCt.querySelector(nextBtn) || this.slideShowCt.querySelector('.next-btn' );
        this.imgIdxIconsCt =  this.slideShowCt.querySelector(imgIdxIconsCt) || this.slideShowCt.querySelector('.img-idx-icon-ct');
        this.imgIdxIcons = this.imgIdxIconsCt.children;
        this.imgIdx = 0;
        this.calculateOffset = 0;
        this.clock;
        this.imgsCT.style.left = 0 + "%";
        this.duration = duration || 2500;
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
            };
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
        let self = this;
        self.animate(idx);
        /* self.calculateOffset = -100 * idx;
        self.imgsCT.style.left = self.calculateOffset + '%'; */
        self.imgIdxIconActive(idx);
        self.imgIdx = idx ++; 
    };
    _SlideShow.prototype.animate = function(idx){
        let self = this;
        let initialOffset = self.calculateOffset; 
        let calculateOffset = self.calculateOffset = -100 * idx;
        let keyframeTotalOffset = self.calculateOffset - initialOffset;
        let interval = 20;
        let intervalKeyFrameOffset = keyframeTotalOffset/interval; 
        let imgsCTinitialOffset = parseInt(self.imgsCT.style.left);
        function animateGo() {
            if( imgsCTinitialOffset >= calculateOffset) {
                self.imgsCT.style.left = imgsCTinitialOffset + '%';
                imgsCTinitialOffset += intervalKeyFrameOffset;
                setTimeout(animateGo, interval);
            } else {
                //-400 >= 0 不成立，重置为0
                self.imgsCT.style.left = -100* idx + '%';
            }
        };
        animateGo();
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
            let slideShowContainer = document.querySelectorAll(slideShowCt),
                i = 0, 
                len = slideShowContainer.length;
            for(i = 0; i < len; i ++) {
                new _SlideShow(slideShowContainer[i], imgsCt, preBtn, nextBtn, imgIdxIconsCt, duration);
            };
        }
    };
}();

SlideShow.create('.slide-show-ct');