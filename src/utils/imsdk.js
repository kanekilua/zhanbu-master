const imsdkUtils = {
    getFriendAlias: function (userInfo) {
        userInfo.alias = userInfo.alias ? userInfo.alias.trim() : ''
        return userInfo.alias || userInfo.nick || userInfo.account
    },
    parseSession:function (sessionId) {
        if (/^p2p-/.test(sessionId)) {
            return {
                scene: 'p2p',
                to: sessionId.replace(/^p2p-/, '')
            }
        }
    },
    formatDate:function (datetime, simple = false) {
        let tempDate = (new Date()).getTime()
        let result = this.stringifyDate(datetime, simple)
        let thatDay = result.thatDay
        let deltaTime = (tempDate - thatDay) / 1000
    
        if (deltaTime < 3600 * 24) {
            return result.withHour
        } else if (deltaTime < 3600 * 24 * 2) {
            return result.withLastDay
        } else if (deltaTime < 3600 * 24 * 7) {
            return result.withDay
        } else if (deltaTime < 3600 * 24 * 30) {
            return result.withMonth
        } else {
            return result.withYear
        }
    },
    stringifyDate:function(datetime, simple = false) {
        // let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        datetime = new Date(datetime)
        let year = datetime.getFullYear()
        let simpleYear = datetime.getYear() - 100
        let month = datetime.getMonth() + 1
        month = month > 9 ? month : '0' + month
        let day = datetime.getDate()
        day = day > 9 ? day : '0' + day
        let hour = datetime.getHours()
        hour = hour > 9 ? hour : '0' + hour
        let min = datetime.getMinutes()
        min = min > 9 ? min : '0' + min
        let week = datetime.getDay()
        week = weekMap[week]
        let thatDay = (new Date(year, month - 1, day, 0, 0, 0)).getTime()

        if (simple) {
            return {
                withYear: `${day}/${month}/${simpleYear}`,
                withMonth: `${month}-${day}`,
                withDay: `${week}`,
                withLastDay: `昨天`,
                withHour: `${hour}:${min}`,
                thatDay
            }
        } else {
            return {
                withYear: `${year}-${month}-${day} ${hour}:${min}`,
                withMonth: `${month}-${day} ${hour}:${min}`,
                withDay: `${week} ${hour}:${min}`,
                withLastDay: `昨天 ${hour}:${min}`,
                withHour: `${hour}:${min}`,
                thatDay
            }
        }
    },
    mergeObject:function(dest, src) {
        if (typeof dest !== 'object' || dest === null) {
            dest = Object.create(null)
        }
        dest = Object.assign(Object.create(null), dest, src)
        return dest
    },
    escape : (function () {
        let _reg = /<br\/?>$/
        let _map = {
            r:/\<|\>|\&|\r|\n|\s|\'|\"/g,
            '<':'&lt;',
            '>':'&gt;',
            '&':'&amp;',
            ' ':'&nbsp;',
            '"':'&quot;',
            "'":'&#39;',
            '\n':'<br/>',
            '\r':''
        }
        return function(_content){
            _content = imsdkUtils.encode(_map, _content)
            return _content.replace(_reg, '<br/>')
        }
    })(),
    encode : function (_map, _content) {
        _content = '' + _content
        if (!_map || !_content) {
            return _content||''
        }
        return _content.replace(_map.r, function ($1) {
            var _result = _map[!_map.i ? $1.toLowerCase() : $1]
            return _result != null ? _result : $1
        })
    }
}

export default imsdkUtils