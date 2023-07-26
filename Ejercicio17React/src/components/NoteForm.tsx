import { Col, Row, Form, Stack, Button } from 'react-bootstrap' //importacion de clases de bootstrap
import { Link, useNavigate } from 'react-router-dom' //importacion de funcion Link de react Router Dom
import { FormEvent, useRef, useState } from 'react' // importacion de useRef para vincular los inputs del html a la seccion tsx
import CreateReactSelect from "react-select/creatable" //importacion de react-select de la carpeta creatable
import { NoteData, Tag } from '../App'
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void //void value
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({ onSubmit,
    onAddTag,
    availableTags,
    title = "",
    markdown = "",
    tags = [],
}: NoteFormProps) { //componente

    const titleRef = useRef<HTMLInputElement>(null) //usamos la etiqueta <HTMLInputElement> en el useRef es una especificacion de tipo genero que da informacion al compliador que tipo de ref espera 
    const markdownRef = useRef<HTMLTextAreaElement>(null) //misma referencia
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {

        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,

        })


        navigate("..")
    }














    return (

        <Form onSubmit={handleSubmit}> {/* etiqueta formulario de bootstrap */}
            <Stack gap={4}> {/* etiqueta stack para agrupar por lotes los elementos (bootstrap) ademeas tiene un gap (espacios horizontales y verticales.) */}
                <Row> {/* etiqueta row para crear fila, tambien de bootstrap grid. */}
                    <Col> {/* etiqueta para crear columna */}
                        <Form.Group controlId="title"> {/* Form group es para agrupar los elementos relacionados del form. */}
                            <Form.Label>Title</Form.Label> {/* form label es para añadir descripcion al form control */}
                            <Form.Control ref={titleRef} required defaultValue={title} /> {/* form control es el input tipo texto. Cuya ref es el useRef "titleRef" - Required indica que el campo debe llenarse si o si */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreateReactSelect
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])

                                }}
                                value={selectedTags.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableTags.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti /> {/* aqui se invoca la funcion de react select para crear selecciones y guardarlas ademas de que tiene la prop is multi para indicar que sera de multiples selecciones. */}
                        </Form.Group>

                    </Col>

                </Row>
                <Col>
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control ref={markdownRef} defaultValue={markdown} required as="textarea" rows={15} />
                    </Form.Group>

                </Col>

                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button type='button' variant='outline-secondar y'>Cancel</Button>
                    </Link>
                </Stack>



            </Stack>

        </Form>


    )

}