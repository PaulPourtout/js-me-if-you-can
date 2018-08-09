import * as React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';
import 'brace/theme/tomorrow';


interface Props {
    onChange?: (e:string) => void;
    value: string;
    width?: any;
    height?: string;
    readOnly?: boolean;
}

export class ACE extends React.Component<Props, {}> {
    reactAceEditor;

    componentDidMount() {
        this.reactAceEditor.editor.resize()
    }

    componentDidUpdate() {
        this.reactAceEditor.editor.resize()
    }

    render () {
        return (
            <AceEditor
                ref={ref=>this.reactAceEditor = ref}
                editorProps={{$blockScrolling: Infinity}}
                mode="javascript"
                theme="twilight"
                height={this.props.height || "100%"}
                fontSize={12}
                width={this.props.width || "auto"}
                readOnly={this.props.readOnly}
                setOptions={{
                    // enableBasicAutocompletion: false,
                    // enableLiveAutocompletion: false,
                }}
                onChange={this.props.onChange ? this.props.onChange : () => null}
                value={this.props.value}
                name="div_id"
            />
        )
    }
}