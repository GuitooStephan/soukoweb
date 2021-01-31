import { Injectable } from '@angular/core';
import { MinLengthValidator } from '@angular/forms';

declare const Lobibox;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor() { }

  /*********** Alerts ***********/
    /**
     * Show an info notification
     * @param notifTitle title
     * @param message message to display
     */
    info(notifTitle, message) {
        Lobibox.notify('info', {
            position: 'top right',
            sound: false,
            size: MinLengthValidator,
            delayIndicator: false,
            title: notifTitle,
            msg: message
        });
    }

    /**
     * Show an error notification
     * @param notifTitle title
     * @param message message to display
     */
    error(notifTitle, message) {
        Lobibox.notify('error', {
            position: 'center top',
            icon: false,
            sound: false,
            size: 'mini',
            delayIndicator: false,
            title: notifTitle,
            msg: message
        });
    }

    /**
     * Show a success notification
     * @param notifTitle title
     * @param message message to display
     */
    success(notifTitle, message) {
        Lobibox.notify('success', {
            position: 'center top',
            icon: false,
            sound: false,
            size: 'mini',
            delayIndicator: false,
            title: notifTitle,
            msg: message
        });
    }

    /**
     * Show a warning notification
     * @param notifTitle title
     * @param message message to display
     */

    warning(notifTitle, message) {
        Lobibox.notify('warning', {
            position: 'center top',
            icon: false,
            sound: false,
            size: 'mini',
            delayIndicator: false,
            title: notifTitle,
            msg: message,
        });
    }

    /**
     * Show a default notification
     * @param notifTitle title
     * @param message message to display
     */
    default(notifTitle, message) {
        Lobibox.notify('default', {
            position: 'center top',
            sound: false,
            delayIndicator: false,
            title: notifTitle,
            msg: message
        });
    }

    /**
     * Show a progress notification
     * @param notifTitle message title
     * @param message label to display
     */
    progress(notifTitle, message) {
        Lobibox.progress('progress', {
            position: 'top right',
            sound: false,
            title: notifTitle,
            label: message
        });
    }
  /*********** Dialogs ***********/
    /**
     * Shows a success alert that blocks the whole page
     * @param message message to display
     */
    dialogSuccess(message) {
        Lobibox.alert('success', { msg: message });
    }

    /**
     * Shows an info alert that blocks the whole page
     * @param message message to display
     */
    dialogInfo(message) {
        Lobibox.alert('info', { msg: message });
    }

    /**
     * Shows an error alert that blocks the whole page
     * @param message message to display
     */
    dialogError(message) {
        Lobibox.alert('error', { msg: message });
    }

    /**
     * Shows a warning alert that blocks the whole page
     * @param message message to display
     */
    dialogWarning(message) {
        Lobibox.alert('warning', { msg: message });
    }

}
