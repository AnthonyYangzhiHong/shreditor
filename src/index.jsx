import React from 'react';

import Editor from './editor';

import { IntlProvider, addLocaleData } from 'react-intl';

import en_message from './languages/en.message';
import zh_message from './languages/zh.message';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import 'intl';

addLocaleData([...en, ...zh]);

export default class extends React.Component {

    render() {
        return (
            <IntlProvider locale="zh" messages={zh_message}>
                <Editor {...this.props}/>
            </IntlProvider>
        );
    }

}