import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Modal, IModal} from './Modal';

interface IPortal extends IModal{
}

export class Portal extends React.Component<IPortal, any> {
    rootSelector;
    container;
    
    constructor(props) {
        super(props)
        this.rootSelector = document.getElementById('root-modal')
        this.container = document.createElement('root-container')
    }

    componentDidMount() {
        this.rootSelector.appendChild(this.container);
    }

    componentWillUnmont() {
        this.rootSelector.removeChild(this.container);
    }


    render () {
        return ReactDOM.createPortal(<Modal {...this.props}/>, this.container)
    }
}
