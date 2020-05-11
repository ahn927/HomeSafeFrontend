import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

class AccordionComponent extends React.Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    render() {
        const { activeIndex } = this.state
        const questions = this.props.questions
        const renderEachItem = (title, content, index) => {
            return (
                <div>
                    <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={this.handleClick}
                    >

                        <h5><Icon name='dropdown' />Q: {title}</h5>

                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index} className="mx-4 mb-3">
                        <p>
                            {content}
                        </p>
                    </Accordion.Content>
                </div>
            )
        }
        let questionsElements = [];

        for (var i = 0; i < questions.length; i++) {
            questionsElements.push(renderEachItem(questions[i].title, questions[i].content, i))
        }
        return (
            <Accordion fluid styled>
                {questionsElements}
            </Accordion>
        )
    }
}

export default AccordionComponent;