import {Injectable} from '@angular/core';
import {Loading, Toast} from 'ionic-angular';

@Injectable()
export class UtilProvider {
    getLoader(content) {
        let loading = Loading.create({
            content: content,
            duration: 3000
        });
        return loading;
    }
    
    getToast(message) {
        let toast = Toast.create({
            message: message,
            duration: 2000
        });
        return toast;
    }
}
