export default class Whiteboard {
    constructor(canvas, bufferHandler = null, options) {
        this.canvas = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
        this.bufferHandler = bufferHandler;
        this.options = Object.assign({
            strokeStyle: '#f00',
            globalAlpha: 1,
            lineWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
            globalCompositeOperation: 'source-over',
            timeout: 20000,
            width: null,
            height: null,
            offsetX: 0,
            offsetY: 0
        }, options);

        this.context = null;
        this.drawBuffer = [];
        this.cleanTimeout = null;
        this.canvasSnapShot = null;

        this.init();
    }

    init() {
        if (!this.canvas || this.canvas.nodeName !== 'CANVAS') throw new Error('Invalid canvas element.');

        this.context = this.canvas.getContext('2d');

        if (this.options.width && this.options.width != this.canvas.width) {
            this.canvas.width = this.options.width;
        }

        if (this.options.height && this.options.height != this.canvas.height) {
            this.canvas.height = this.options.height;
        }

        this.setCanvasOptions(this.options);
        //this.canvasCtx.save();

        if (typeof this.bufferHandler === 'function') {
            this.bindMouseHandlers();
            this.bindTouchHandlers();
        }
    }

    destroy() {
        if (typeof this.bufferHandler === 'function') {
            this.unbindMouseHandlers();
            this.unbindTouchHandlers();
        }
    }

    setCanvasOptions(options) {
        this.context.strokeStyle = options.strokeStyle;
        this.context.globalAlpha = options.globalAlpha;
        this.context.lineWidth = options.lineWidth;
        this.context.lineCap = options.lineCap;
        this.context.lineJoin = options.lineJoin;
        this.context.globalCompositeOperation = options.globalCompositeOperation;
    }

    draw(buffer, drawOptions) {
        const options = Object.assign({}, this.options, drawOptions);

        const offX = options.offsetX ? parseInt(options.offsetX, 10) : 0;
        const offY = options.offsetY ? parseInt(options.offsetY, 10) : 0;

        if (this.canvasSnapShot) {
            this.restoreCanvas();
        }

        this.setCanvasOptions(options);
        this.render(buffer, offX, offY);

        if (this.canvasSnapShot) {
            this.stashCanvas();
            this.setCanvasOptions(this.options);
            this.render(this.drawBuffer);
        }

        if (this.cleanTimeout) {
            clearTimeout(this.cleanTimeout);
        }

        if (options.timeout) {
            this.cleanTimeout = setTimeout(() => this.clean(), options.timeout);
        }
    }

    render(buffer, offsetX = 0, offsetY = 0) {
        if (buffer.length === 0) return;

        let starting = true;

        this.context.beginPath();

        for (let pos of buffer) {
            if (starting) {
                this.context.moveTo(pos[0] + offsetX, pos[1] + offsetY);
                starting = false;
            } else {
                this.context.lineTo(pos[0] + offsetX, pos[1] + offsetY);
            }
        }

        this.context.stroke();
        this.context.closePath();
    }

    clean() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.canvasSnapShot) {
            this.stashCanvas();
            this.setCanvasOptions(this.options);
            this.render(this.drawBuffer);
        }

        if (this.cleanTimeout) {
            clearTimeout(this.cleanTimeout);
        }

        this.cleanTimeout = null;
    }

    stashCanvas() {
        this.canvasSnapShot = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    restoreCanvas() {
        if (!this.canvasSnapShot) return;

        this.context.putImageData(this.canvasSnapShot, 0, 0);
    }

    bindMouseHandlers() {
        this.canvas.onmousedown = event => {
            event.preventDefault();

            this.canvas.isPointerDown = true;
            this.drawBuffer.length = 0;

            this.stashCanvas();

            const pos = this.getCursorPosition(event);
            this.drawBuffer.push(pos);
        };

        this.canvas.onmousemove = event => {
            event.preventDefault();

            if (this.canvas.isPointerDown === true) {
                const pos = this.getCursorPosition(event);
                this.drawBuffer.push(pos);

                this.restoreCanvas();
                this.setCanvasOptions(this.options);
                this.render(this.drawBuffer);
            }
        };

        this.canvas.onmouseup = event => {
            event.preventDefault();

            if (this.canvas.isPointerDown === true) {
                this.canvas.isPointerDown = false;
                this.canvasSnapShot = null;

                if (this.drawBuffer.length === 0) return;

                const { offsetX, offsetY } = event;
                const { width, height } = this.canvas;
                const buffer = this.drawBuffer.map(([x, y]) => [x / width, y / height]);

                if (this.bufferHandler) {
                    this.bufferHandler(buffer, {
                        strokeStyle: this.options.strokeStyle,
                        globalAlpha: this.options.globalAlpha,
                        lineWidth: this.options.lineWidth,
                        lineCap: this.options.lineCap,
                        lineJoin: this.options.lineJoin,
                        globalCompositeOperation: this.options.globalCompositeOperation,
                        timeout: this.options.timeout,
                        width: this.canvas.width,
                        height: this.canvas.height
                    });
                }

                this.drawBuffer.length = 0;

                if (this.cleanTimeout) {
                    clearTimeout(this.cleanTimeout);
                }

                if (this.options.timeout) {
                    this.cleanTimeout = setTimeout(() => this.clean(), this.options.timeout);
                }
            }
        };

        this.canvas.onmouseout = this.canvas.onmouseup;
    }

    unbindMouseHandlers() {
        this.drawBuffer.length = 0;
        this.canvas.isPointerDown = false;

        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
        this.canvas.onmouseup = null;
        this.canvas.onmouseout = null;
    }

    bindTouchHandlers() {
        this.canvas.addEventListener('touchstart', touchHandler, true);
        this.canvas.addEventListener('touchmove', touchHandler, true);
        this.canvas.addEventListener('touchend', touchHandler, true);
        this.canvas.addEventListener('touchcancel', touchHandler, true);
    }

    unbindTouchHandlers() {
        this.canvas.removeEventListener('touchstart', touchHandler, true);
        this.canvas.removeEventListener('touchmove', touchHandler, true);
        this.canvas.removeEventListener('touchend', touchHandler, true);
        this.canvas.removeEventListener('touchcancel', touchHandler, true);
    }

    getCursorPosition(mouseEvent) {
        const styling = getComputedStyle(this.canvas, null);

        const topBorder = parseInt(styling.getPropertyValue('border-top-width'), 10);
        const rightBorder = parseInt(styling.getPropertyValue('border-right-width'), 10);
        const bottomBorder = parseInt(styling.getPropertyValue('border-bottom-width'), 10);
        const leftBorder = parseInt(styling.getPropertyValue('border-left-width'), 10);

        const rect = this.canvas.getBoundingClientRect();

        //const topOff = window.pageYOffset || document.documentElement.scrollTop;
        //const leftOff = window.pageXOffset || document.documentElement.scrollLeft;
        //console.log('x:'+mouseEvent.pageX+' y:'+mouseEvent.pageY, 'leftOff:'+leftOff+' topOff:'+topOff+' offsetLeft:'+this.offsetLeft+' offsetTop:'+this.offsetTop, rect);
        //const canvasX = (mouseEvent.pageX - rect.left - leftOff) * (this.canvas.width / rect.width);
        //const canvasY = (mouseEvent.pageY - rect.top - topOff) * (this.canvas.height / rect.height);
        const canvasX = (mouseEvent.clientX - rect.left - leftBorder) * (this.canvas.width / (rect.width - rightBorder - leftBorder));
        const canvasY = (mouseEvent.clientY - rect.top - topBorder) * (this.canvas.height / (rect.height - topBorder - bottomBorder));

        return [canvasX, canvasY];
    }
}

const eventMap = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    touchcancel: 'mouseup'
};

let firstTouchId = 0;

function touchHandler(event) {
    event.preventDefault();

    if (!Object.prototype.hasOwnProperty.call(eventMap, event.type)) {
        return;
    }

    const touches = event.changedTouches;
    let first;

    if (firstTouchId) {
        first = touches.find(t => t.identifier === firstTouchId);
    } else {
        first = touches[0];
        firstTouchId = first.identifier;
    }

    if (first) {
        if (eventMap[event.type] === 'mouseup') {
            firstTouchId = 0;
        }

        const simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(eventMap[event.type], true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);

        first.target.dispatchEvent(simulatedEvent);
    }
}