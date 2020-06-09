import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { Grid, Header } from 'semantic-ui-react';
import SidebarContainer from '../containers/SidebarContainer';
import CommandContainer from '../containers/CommandContainer';

const Application = () => (
    <Grid padded={'horizontally'} container columns={2}>
        <Grid.Row>
            <Header as='h3'>Boost</Header>
        </Grid.Row>
        <Grid.Column key={1} width={7} stretched >
            <SidebarContainer/>
        </Grid.Column>
        <Grid.Column key={2} floated={'left'}>
            <CommandContainer/>
        </Grid.Column>
    </Grid>
);

export default hot(Application);
