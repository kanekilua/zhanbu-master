// 录音
export function _executeRecord (media) { 
}

// 停止录音
export function _stopRecord () {}

// 获取录音文件
export function _getRecordFile (name) {
    if( device.platform === 'Android' ) {
        return new Promise((resolve, reject) => {
            resolveLocalFileSystemURL(cordova.file.externalRootDirectory + '/' + name, (fileEntry) => {
                fileEntry.file( (file) => {
                    var reader = new FileReader()
                    reader.onloadend = function() {
                        resolve(this.result)
                    }
                    reader.readAsDataURL(file)
                })
            })
        })
    }else if( device.platform === 'iOS' ) {

    }
}

// 删除录音文件
export function _deleteRecordFile (name) {
    if( device.platform === 'Android' ) {
        resolveLocalFileSystemURL(cordova.file.externalRootDirectory + '/' + name, (fileEntry) => {
            fileEntry.remove()
        })
    }else if( device.platform === 'iOS' ) {

    }
}