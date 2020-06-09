import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { spawn } from 'child_process';

export interface Props {
    test?: string
}

export interface State {
    value: string,
    inputError?: boolean,
    outputError?: boolean,
    output: string[]
}

export default class CommandBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
            output: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { value, inputError, output } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    placeholder="add a command"
                    type="text"
                    value={value}
                    onChange={this.handleChange}
                    error={inputError}
                />

                <Form.Button
                    icon={'arrow right'}
                >
                    Submit
                </Form.Button>

                <Form.TextArea
                    type="text"
                    value={output.join('')}
                />
            </Form>
        );
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value });
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const { value } = this.state;

        const outputBuffer: string[] = [];

        if (value.length > 0) {
            this.resetShow();
            const args = value.trim().split(' ');
            console.log(`command: ${args}`);
            const child =
                args.length === 1 ? spawn(args[0]) : spawn(args[0], args.slice(1));

            child.on('error', (err: Error) => {
                console.log(`child process exited error ${err.message.toString()}`);
                outputBuffer.push(err.message.toString());
                this.setState({ output: outputBuffer, outputError: true });
            });

            child.stdout.on('data', data => {
                this.resetErrors()
                outputBuffer.push(data.toString())
                this.setState({ output: outputBuffer })
            });

            child.stderr.on('data', data => {
                outputBuffer.push(data.toString());
                this.setState({ output: outputBuffer });
                console.log(`child stderr:\n${data.toString()}`);
            });

            child.on('exit', (code, signal) => {
                console.log(`child process exited with code ${code} and signal ${signal}`);
            });

            event.preventDefault();
        } else {
            // no command provided
            this.setState({ inputError: true });
        }
    }

    private resetShow() {
        console.log('show reset');
        this.setState({ output: [] });
    }

    private resetErrors() {
        this.setState({ inputError: false, outputError: false });
    }
}
