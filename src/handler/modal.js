import Reflux from 'reflux';

export const ModalAction = Reflux.createActions({
    show: {asyncResult: true},
    hideAll: {asyncResult: true}
});

export const ModalStore = Reflux.createStore({

    listenables: ModalAction,

    onShow(id) {
        this.trigger(id, 'ShowModal');
    },

    onHideAll() {
        this.trigger(null, 'HideAll');
    }

});