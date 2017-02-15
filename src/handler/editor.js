import Reflux from 'reflux';

export const EditorAction = Reflux.createActions({
    focus: {asyncResult: true}
});

export const EditorStore = Reflux.createStore({

    listenables: EditorAction,

    onFocus() {
        this.trigger(null, 'EditorFocus');
    }

});