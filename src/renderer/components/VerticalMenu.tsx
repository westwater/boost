import * as React from 'react';
import { Accordion, Button, Icon, AccordionTitleProps } from 'semantic-ui-react';
import * as _ from 'lodash';

interface Content {
    key: string
    title: string
    content: string | Content[]
}

interface State {
    activeIndexes: string[]
    content: Content[]
}

export default class VerticalMenu extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeIndexes: [],
            content: [
                {
                    key: 'aws', title: 'aws', content: 'mad'
                },
                {
                    key: 'janus', title: 'janus', content: [
                        {
                            key: 'one', 'title': 'yeah boi', content: 'kek'
                        }
                    ]
                }
            ]
        };
    }

    render() {
        const { content } = this.state;

        return (
            <div>
                <Button compact>
                    <Icon name={'plus'} fitted/>
                </Button>
                <p/>
                {
                    (content.length > 0) && (
                        <Accordion styled exclusive={false} fluid>
                            {content.map((c, i) => this.buildAccordion(i.toString(), c))}
                        </Accordion>
                    )
                }
            </div>
        );
    }

    private buildAccordion(index: string, content: Content) {
        const { activeIndexes } = this.state;
        return (
            <div>
                <Accordion.Title
                    active={activeIndexes.includes(index)}
                    index={index}
                    key={index}
                    onClick={this.handleTitleClick}
                >
                    <Icon name='dropdown'/>
                    {content.title}
                </Accordion.Title>
                <Accordion.Content active={activeIndexes.includes(index)}>
                    <div>
                        {
                            (typeof content.content === 'string') ? content.content :
                                (typeof content.content === 'object') && content.content.map((c, i) => {
                                    const nestedIndex = `${index}-${i}`;
                                    return (
                                        <Accordion.Accordion key={nestedIndex}>
                                            {this.buildAccordion(nestedIndex, c)}
                                        </Accordion.Accordion>
                                    );
                                })
                        }
                    </div>
                </Accordion.Content>
            </div>
        );
    }

    private handleTitleClick = (e: React.MouseEvent, { index }: AccordionTitleProps) => {
        if (typeof index === 'string') {
            const { activeIndexes } = this.state;

            const newActiveIndexes = activeIndexes.includes(index)
                ? (_.filter(activeIndexes, (elem) => elem !== index))
                : activeIndexes.concat([index]);

            console.log(`index = ${index}`);
            console.log(`active indexes = ${newActiveIndexes.toString()}`);

            this.setState({ activeIndexes: newActiveIndexes });
        }
    };
}
