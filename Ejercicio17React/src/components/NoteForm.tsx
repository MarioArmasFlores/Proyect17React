import { Col, Row, Form, Stack, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

import CreateReactSelect from "react-select/creatable"


export function NoteForm() {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement >(null)





    return (

        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreateReactSelect isMulti />
                        </Form.Group>

                    </Col>

                </Row>
                <Col>
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control ref={markdownRef} required as="textarea" rows={15} />
                    </Form.Group>

                </Col>

                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to ="..">
                        <Button type='button' variant='outline-secondar y'>Cancel</Button>
                    </Link>
                </Stack>



            </Stack>

        </Form>


    )

}