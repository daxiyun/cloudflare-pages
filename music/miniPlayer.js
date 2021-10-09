/*
音频可视化展示模块
https://github.com/margox/vudio.js
*/
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=t():"function"==typeof define&&define.amd?define(t):window.Vudio=t()}(function(){function t(t,o,n){if(-1===["[object HTMLAudioSource]","[object HTMLAudioElement]","[object MediaStream]"].indexOf(Object.prototype.toString.call(t)))throw new TypeError("Invaild Audio Source");if("[object HTMLCanvasElement]"!==Object.prototype.toString.call(o))throw new TypeError("Invaild Canvas Element");this.audioSrc=t,this.canvasEle=o,this.option=e(i,n),this.meta={},this.stat=0,this.freqByteData=null,this.__init()}function e(){var t={};return Array.prototype.forEach.call(arguments,function(i){var o;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&("[object Object]"===Object.prototype.toString.call(i[o])?t[o]=e(t[o],i[o]):t[o]=i[o])}),t}var i={effect:"waveform",accuracy:128,width:256,height:100,waveform:{maxHeight:80,minHeight:1,spacing:1,color:"#f00",shadowBlur:0,shadowColor:"#f00",fadeSide:!0,horizontalAlign:"center",verticalAlign:"middle",prettify:!0},lighting:{maxHeight:80,lineWidth:0,color:"#f00",shadowBlur:0,shadowColor:"#f00",fadeSide:!0,horizontalAlign:"center",verticalAlign:"middle"}};return t.prototype={__init:function(){var t=new(window.AudioContext||window.webkitAudioContext||window.mozAudioContext),e="[object MediaStream]"!==Object.prototype.toString.call(this.audioSrc)?t.createMediaElementSource(this.audioSrc):t.createMediaStreamSource(this.audioSrc),i=window.devicePixelRatio||1;this.analyser=t.createAnalyser(),this.meta.spr=t.sampleRate,e.connect(this.analyser),this.analyser.fftSize=2*this.option.accuracy,this.analyser.connect(t.destination),this.freqByteData=new Uint8Array(this.analyser.frequencyBinCount),this.context2d=this.canvasEle.getContext("2d"),this.width=this.option.width,this.height=this.option.height,this.context2d.canvas.width=this.width*i,this.context2d.canvas.height=this.height*i,this.context2d.scale(i,i)},__rebuildData:function(t,e){return"center"===e?[].concat(Array.from(t).reverse().splice(this.option.accuracy/2,this.option.accuracy/2),Array.from(t).splice(0,this.option.accuracy/2)):"left"===e?t:"right"===e?Array.from(t).reverse():[].concat(Array.from(t).reverse().splice(this.option.accuracy/2,this.option.accuracy/2),Array.from(t).splice(0,this.option.accuracy/2))},__animate:function(){1===this.stat&&(this.analyser.getByteFrequencyData(this.freqByteData),"function"==typeof this.__effects()[this.option.effect]&&this.__effects()[this.option.effect](this.freqByteData),requestAnimationFrame(this.__animate.bind(this)))},__testFrame:function(){this.analyser.getByteFrequencyData(this.freqByteData),"function"==typeof this.__effects()[this.option.effect]&&this.__effects()[this.option.effect](this.freqByteData)},__effects:function(){var t=this;return{lighting:function(e){var i,o,n=t.option.lighting,a=t.__rebuildData(e,n.horizontalAlign),c=n.maxHeight/2,r=!0;n.horizontalAlign,t.context2d.clearRect(0,0,t.width,t.height),t.context2d.lineWidth=n.lineWidth,t.context2d.strokeStyle=n.color,t.context2d.beginPath(),a.forEach(function(e,a){i=t.width/t.option.accuracy*a,o=e/256*c,o="middle"===n.verticalAlign?(t.height-e)/2-c/2:"bottom"===n.verticalAlign?t.height-e:"top"===n.verticalAlign?e:(t.height-e)/2-c/2,r?(t.context2d.moveTo(i,o),r=!1):t.context2d.lineTo(i,o)}),t.context2d.stroke()},waveform:function(e){var i,o,n,a,c,r,h,s,l=t.option.waveform,f=l.fadeSide,d=l.prettify,u=t.__rebuildData(e,l.horizontalAlign);"center"!==l.horizontalAlign&&(f=!1,d=!1),t.context2d.clearRect(0,0,t.width,t.height),u.forEach(function(e,u){o=(t.width-t.option.accuracy*l.spacing)/t.option.accuracy,a=u*(o+l.spacing),1!==l.spacing&&(a+=l.spacing/2),i=d?u<=t.option.accuracy/2?(1-(t.option.accuracy/2-1-u)/(t.option.accuracy/2))*l.maxHeight:(1-(u-t.option.accuracy/2)/(t.option.accuracy/2))*l.maxHeight:l.maxHeight,n=e/256*i,n=n<l.minHeight?l.minHeight:n,c="middle"===l.verticalAlign?(t.height-n)/2:"top"===l.verticalAlign?0:"bottom"===l.verticalAlign?t.height-n:(t.height-n)/2,r=l.color,r instanceof Array?(h=t.context2d.createLinearGradient(a,c,a,c+n),r.forEach(function(t,e){t instanceof Array?(s=t[0],t=t[1]):s=0===e||e===r.length-1?e/(r.length-1):e/r.length+.5/r.length,h.addColorStop(s,t)}),t.context2d.fillStyle=h):t.context2d.fillStyle=r,l.shadowBlur>0&&(t.context2d.shadowBlur=l.shadowBlur,t.context2d.shadowColor=l.shadowColor),f?u<=t.option.accuracy/2?t.context2d.globalAlpha=1-(t.option.accuracy/2-1-u)/(t.option.accuracy/2):t.context2d.globalAlpha=1-(u-t.option.accuracy/2)/(t.option.accuracy/2):t.context2d.globalAlpha=1,t.context2d.fillRect(a,c,o,n)})}}},dance:function(){return 0===this.stat&&(this.stat=1,this.__animate()),this},pause:function(){return this.stat=0,this},setOption:function(t){this.option=e(this.option,t)}},t});

/*
播放器样式
*/
document.head.innerHTML+='<style>.miniplayer-container{position:relative;float:left;cursor:pointer;color:#999;width:150px;height:30px;line-height:30px;font-size:14px;background-color:#f8f8f8;background-image:linear-gradient(-180deg,#f8f8f8 0%,#efefef 100%);border:1px solid #aaa;border-radius:4px;}.miniplayer-status{position:absolute;z-index:2;}.miniplayer-status img{border-top-left-radius:3px;border-bottom-left-radius:3px;}.miniplayer-status.play{z-index:-1;}.miniplayer-spectrum{z-index:1;margin-left:1px;width:calc(100% - 2px);height:100%;border-radius:1x;}.miniplayer-time{position:absolute;z-index:2;right:5px;}</style>';

function MiniPlayer(context) {
    if (context instanceof Element) {
        this.context = context;
    } else {
        var contextArray = document.querySelectorAll(context);
        if (contextArray.length > 0) {
            for (var i = 0; i < contextArray.length; i++) {
                new MiniPlayer(contextArray[i]);
            }
        }
        return;
    }
    if (this.context && !this.context.isMiniPlayer) {
        this.player = this.context.querySelector('audio');
        this.audioList.push(this);
        //初始化
        this.init();
        this.context.isMiniPlayer = true;
    }

}

MiniPlayer.prototype = {
    audioList: [],
    init: function() {
        var self = this;
        self.events();

    },
    play: function() {
        var self = this;
        self.player.volume = 0.5;
        if (self.currentStatus === "error") {
            return;
        }
        if (self.currentStatus === "play") {
            self.pause();
            return;
        }
        //暂停所有其他的音频
        for (var i = 0; i < self.audioList.length; i++) {
            if (self.audioList[i] !== self) {
                self.audioList[i].pause();
            }
        }
        self.player.play().then(function() {
            // 播放成功
        }, function(error) {
            console && console.error(error);
            self.changeStatus("error");
        });
    },
    pause: function() {
        var self = this;
        if (self.currentStatus === "play") {
            self.player.pause();
        }
    },
    events: function() {
        var self = this;
        self.player.addEventListener('loadedmetadata', function() {
            self.updateTotalTime();
        });
        self.player.addEventListener('canplay', function() {
            // 设置自动播放
            if (self.settings && self.settings.autoplay) {
                self.play();
            }
        });
        self.player.addEventListener('timeupdate', function() {
            self.updateTotalTime(self.player.currentTime);
        });
        self.player.addEventListener('playing', function() {
            self.changeStatus("play");
            self.spectrum(); // 音频可视化
        });
        self.player.addEventListener('ended', function() {
            self.player.currentTime = 0;
            self.changeStatus("ended");
        });
        self.player.addEventListener('pause', function() {
            //self.player.currentTime = 0;
            self.changeStatus("pause");
        });
        self.player.addEventListener('error', function(e) {
            console && console.error(e);
            self.changeStatus("error");
        });

        self.context.addEventListener('click', function() {
            self.play();
        });
    },
    changeStatus: function(status) {
        this.currentStatus = status;
        this.onChangeStatus && this.onChangeStatus(this.currentStatus);
    },
    //更新总时间
    updateTotalTime: function(playTime) { 
        var totalLabel = this.context.querySelector('.miniplayer-time');
        var time = parseInt(this.player.duration) - parseInt(playTime);
        if (playTime) {
            totalLabel.innerText=formatSecond(time);
        } else {
            totalLabel.innerText=formatSecond(parseInt(this.player.duration));
        }
    },
    //音频可视化
    spectrum: function() {
        var vudio = new Vudio(this.player, this.context.querySelector('.miniplayer-spectrum'), {
            accuracy : 128, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
            waveform : {
                color : '#cccccc', // 波形颜色，可以传入数组以生成渐变色
                horizontalAlign : 'left', // 水平对齐方式，left/center/right
                verticalAlign: 'bottom' // 垂直对齐方式 top/middle/bottom
            }
        });
        vudio.dance();
    },
    onChangeStatus: function(status) {
        var statusElement = this.context.querySelector('.miniplayer-status');
        var timeElement = this.context.querySelector('.miniplayer-time');
        if (status === 'play') {
            statusElement.classList.add('play');
        } else if (status === 'error') {
            timeElement.innerText = "连接错误";
        } else {
            statusElement.classList.remove('play');
        }
        
    }
};

if (!window.MiniPlayer) {
    window.MiniPlayer = MiniPlayer;
}

//格式化时间
function formatSecond(time) {
    const h = Math.floor((time / 3600) % 24);
    const m = Math.floor((time / 60) % 60);
    const s = Math.floor(time % 60);
    time = s + "''";
    if (m > 0) {
        time = m + "'" + time;
    }
    if (h > 0) {
        time = h + ":" + time;
    }
    return time;
}

function autoPlayer(id, url, autoplay = false, pic, title, artist, album) {
    if (autoplay) {
        autoplay = 'autoplay="true"';
    } else {
        autoplay = '';
    }
    if (pic) {
        var img = '<img src="'+pic+'" style="max-width:30px;max-height:30px;"/>';
    } else {
        var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAGeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMzAiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzMCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIzMCIKICAgdGlmZjpJbWFnZVdpZHRoPSIzMCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIuMCIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIuMCIKICAgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAxLTI5VDIxOjMwOjU4KzA4OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMS0yOVQyMTozMDo1OCswODowMCIKICAgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowODRGRjI3QTRFOEExMUU3OEM4OTlBNkU1M0M3M0NFMCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowODRGRjI3OTRFOEExMUU3OEM4OTlBNkU1M0M3M0NFMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICB4bXBNTTphY3Rpb249InByb2R1Y2VkIgogICAgICB4bXBNTTpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBQaG90byAxLjcuMyIKICAgICAgeG1wTU06d2hlbj0iMjAyMC0wMS0yOVQyMToyNDo1OSswODowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMS43LjMiCiAgICAgIHhtcE1NOndoZW49IjIwMjAtMDEtMjlUMjE6MjU6NTgrMDg6MDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0icHJvZHVjZWQiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFmZmluaXR5IFBob3RvIDEuNy4zIgogICAgICBzdEV2dDp3aGVuPSIyMDIwLTAxLTI5VDIxOjMwOjU4KzA4OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz5gEZbwAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz/GiPyIYmEx6iWshvyoiY3FTH4VFjOjDDYzz5sZNT9e771Jk62yVZTY+LXgL2CrrJUiUrKysCY26DnPUyOZc7vnfu73nnO691zwRDNq1vT2QjZnGeGxoDIbm1OqH6mgjQZ8eOOqqU9FRqOUtbcbiRa76nZqlY/71+oWNVOFihrhYVU3LOFx4cllS3d4U7hFTccXhY+F/YZcUPja0RMuPzmccvnDYSMaDoGnSVhJ/eLEL1bTRlZYXk5HNlNQf+7jvKRey81EZG2X6cMkzBhBFCYYIUSAPobEB+imnx7ZUSa/9zt/mrzkquJ1ihgskSKNhV/UglTXZE2KrsnIUHT6/7evZnKg361eH4SqB9t+6YTqDfhct+33fdv+PIDKezjLlfLzezD4Kvp6SevYhcZVODkvaYktOF2D1js9bsS/pUqZnmQSno+gIQbNl1A77/bs55zDW4iuyFddwPYOdEl848IXNOJnz++XuQ0AAAAJcEhZcwAACxMAAAsTAQCanBgAAAIISURBVEiJ7ZS/a1NhGIWfc2MKorVgoaJgLVit3iuIokOlHcymiDha6ObQzd3Z/0DwL3CwsxQKDnWIg2JBI95rKlGwIgUHdYg2mPY7DjdCXRLS2zHP9g3vObw/vgMDBgzYI1SkuF6vH9va2roHxMCipCfAtyRJ3Kt2XxHjEMIUcAm4CAzbbklaAn70qu274yzLSpKGAIcQDtleAO4AR4AqcF/SiyRJ2t10+u7Y9uUQwrykX+TjXbQ9CtwGpoFrwGdgvZtO1I9po9Eo2Z4FbtpesD0HIGkFWAPKkirA+TRNS920enacZVlke0RSud1uNyW9tv0emAHmbL+VlAEfgHO2J4AK8Axo7toYGLc9b3sMqEpaBZaAceAUcBX4RD7aJjAqaRbYX8jY9gxwFxiWFANfgRT4AkxIOgMcAL4Dm8AQcBIod9Pta8d7Sc+OJT23/QAYs12VtAHcAI4DZdv1zoUfJh/vH+AjUPg7rUt6KKksqRlCuNIxHgc2yI+o1XkflNQEqrY3CxnHcRzoJFGj0Si1Wq0LwNlOR48lvey8T5Pv+g2wIqmY8U4mJye30zSt2j7xL0AAbFeAKaBte0VSLUmS7T0zBpD0KoqiGv9H5i1ghDwyl8lX0JW+jeM43ib/NmRZNm37OnAUqAGPJL3rldO7Mt5JFEVrIYRV4Dd5bj8FfhbRHDBgQN/8BaCV0lORUot1AAAAAElFTkSuQmCC"/>'; // &nbsp;
    }
    document.getElementById(id).innerHTML='<span class="miniplayer-'+id+' miniplayer-container"><audio width="1" height="1" crossOrigin="anonymous" preload="metadata" '+autoplay+' src="'+url+'">你的老牛已经拉不动车了，赶紧换了吧。</audio><span class="miniplayer-status">'+img+'</span><canvas class="miniplayer-spectrum"></canvas><span class="miniplayer-time"></span></span>';
    //document.getElementById(id).style.display='inline-table';
    new MiniPlayer(".miniplayer-" + id);
    // Chrome 全局媒体控件
    navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: album,
        artwork: [{ src: pic, sizes: '256x256' }]
    })
}