;(function(win, doc){

    var config = {

        title: '时间段',

        availItem: '<span class="t-avail"></span>',
        unavailItem: '<span class="t-unavail"></span>',
        selectedItem: '<span class="t-selected"></span>',
        mineItem: '<span class="t-mine"></span>',
        disabledItem: '<span class="t-disabled"></span>',

        items: ['availItem', 'unavailItem', 'selectedItem', 'mineItem', 'disabledItem'],
        weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        duration: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00']

    };

    win.Timekit = {

        el: null,

        time: null,

        fromTimeTo: [],

        init: function (el, options, callback) {
            this.el = doc.querySelector(el);
            this.time = options.time? options.time: new Date();
            this.fromTimeTo = setFromTimeTo();

            var tag = parseDom(config.availItem)[0].tagName;

            this.el.addEventListener('click', function(e){
                var tar = e.target;

                if(tar.tagName == tag){
                    targetClick(tar, tar.className);
                }

            });

            if (callback) callback();
            return this;
        },

        write: function (data) {
            var table = formatHead(getLastSunday(this.time)) + '<tbody>',
                i = 0,
                l = data.length;

            if (l > config.duration.length) {
                alert('数据长度不一致');
                return;
            }

            for(; i< l; i++){
                table += formatTr(data[i], i);
            }
            table += '</tbody>';

            this.el.innerHTML = table;
            return this;
        },

        switchTime: function (param) {
            var date = null;

            if (typeof param === 'string') {
                date = new Date(param);
                if(date == 'Invalid Date'){
                    alert('传入日期不合法');
                }
            } else {
                date = new Date(this.time);
                date.setDate(date.getDate() + (param < 0? -7: 7));
            }
            this.time = date;

            return this;
        }
    }

    function targetClick(tar, cls){
        switch (cls) {
            case 't-avail':
                tar.classList.remove(cls);
                tar.classList.add('t-selected');
                break;
            case 't-selected':
                tar.classList.remove(cls);
                tar.classList.add('t-avail');
                break;
            default: break;
        }
    }

    function setFromTimeTo(){
        var array = [],
            date = new Date(getLastSunday(Timekit.time));

        array[0] = date.toLocaleDateString();
        date.setDate(date.getDate() + 6);
        array[1] = date.toLocaleDateString();

        return array;
    }

    function parseDom( html ) {
        var div = doc.createElement('DIV');
        div.innerHTML = html;
        return div.childNodes;
    }

    function formatHead( sunday ){
        var thead = '<thead><tr><td>' + config.title + '</td>',
            i = 0,
            date = new Date(sunday);

        for(; i< 7; i++){
            thead += '<td>'+ padZero(date.getMonth() + 1) +'-'+ padZero(date.getDate()) +'<br>'+ config.weeks[i] +'</td>';
            date.setDate(date.getDate() + 1);
        }

        return thead + '</tr></thead>';
    }

    function formatTr(data, row){
        var tr = '<tr><td>'+ config.duration[row] + '</td>',
            i = 0;

        for(; i< 7; i++){
            tr += '<td>'+ config[config.items[data[i]]] +'</td>';
        }

        return tr + '</tr>';
    }

    function getLastSunday( date ){
        date = new Date(date);
        return date.setDate(date.getDate() - date.getDay());
    }

    function padZero( n ){
        return n > 9 ? (n + "") : ("0" + n);
    }

})(window, document);
