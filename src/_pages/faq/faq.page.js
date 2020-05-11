import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

import AccordionComponent from './accordionComponent'

const beforeYouBook = [
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`}
];

const bookingYourRoom = [
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`}
];

const duringYourStay = [
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`}
];

const commonQuestions = [
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`},
    {
        title: `What is a dog?`,
        content: `A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households
    across the world.`}
];


class FaqPage extends React.Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    render() {
        const { activeIndex } = this.state

        return (
            <div>FAQs page
                <Accordion >
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    >
                        <h3>
                            <Icon name='dropdown' />
                            Before You Book
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0} className="mx-4">
                        <AccordionComponent questions={beforeYouBook} />

                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <h3>
                            <Icon name='dropdown' />
                            Booking Your Room
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1} className="mx-4">
                        <AccordionComponent questions={bookingYourRoom} />

                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <h3>
                            <Icon name='dropdown' />
                            During Your Stay
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2} className="mx-4">
                        <AccordionComponent questions={duringYourStay} />

                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    >
                        <h3>
                            <Icon name='dropdown' />
                            Common Questions
                        </h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3} className="mx-4">
                        <AccordionComponent questions={commonQuestions} />

                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}

export default FaqPage