import * as React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

export default class VerticalSidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Sidebar
            as={Menu}
            animation='push'
            icon='labeled'
            visible={true}
            width='thin'
            vertical={true}
        >
            <Menu.Item as='a'>
                <Icon name='home'/>
                Home
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad'/>
                Games
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera'/>
                Channels
            </Menu.Item>
        </Sidebar>;
    }
}