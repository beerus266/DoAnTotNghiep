import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {

    makeRandomKey(length = 16) {
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
}
