export const formatScheduleShiftToString = (time) => {
    if (!time) return '';
    return `${time.start.hour}:${time.start.minute} ~ ${time.end.hour}:${time.end.minute}`;
}

export const formatStringToScheduleTime = (str) => {
    return {
        start: {
            hour: str.split('~')[0].trim().split(':')[0], 
            minute: str.split('~')[0].trim().split(':')[1]
        },
        end: {
            hour: str.split('~')[1].trim().split(':')[0], 
            minute: str.split('~')[1].trim().split(':')[1]
        }, 
    }
}

export const renderShiftToRange = (shifts, timePer) => {
    let dataReturn = [];
    shifts.map((shift) => {
        let _shift = {
            start: {
                hour: parseInt(shift.start.hour),
                minute: parseInt(shift.start.minute),
            },
            end: {
                hour: parseInt(shift.end.hour),
                minute: parseInt(shift.end.minute),
            }
        }

        while (_shift.start.hour <= _shift.end.hour) {
            dataReturn.push(`${_shift.start.hour}h${_shift.start.minute || ''}`);

            _shift.start.minute += timePer;
            if (_shift.start.minute >= 60) {
                _shift.start.minute = _shift.start.minute % 60;
                _shift.start.hour++;
            }

            if (_shift.start.hour == _shift.end.hour && _shift.start.minute > _shift.end.minute) 
                break;
        }
    });

    return dataReturn;
}

export const createCookie = (name, value, days) => {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    } else {
        expires = '';
    }
    document.cookie = name + '=' + encodeURI(value) + expires + '; path=/';
}

export const getCookie = (name) => {
    console.log(document.cookie);
}

export const makeRandomKey = (length = 16) => {
    let key = '';
    const chars = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    const count = chars.length;

    for (let i = 0; i < length; i++) {
        key = key.concat(chars[Math.floor(Math.random() * count)]);
    }

    return key;
}

export const removeVietnameseTones = (str) =>  {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

export const formatPhoneNumber = (phoneNumber) => {
    let _phoneNumber = phoneNumber;
    _phoneNumber = phoneNumber.split('').map((c, i) => {
        if (i == 3 || i == 6) {
            return c + '.';
        }
        return c;
    })

    return _phoneNumber.join('');
}