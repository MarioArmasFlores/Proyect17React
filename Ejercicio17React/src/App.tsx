
import "bootstrap/dist/css/bootstrap.min.css" //importacion de bootstrap luego de su instalacion en consola.
import { Container } from "react-bootstrap"; //importacion de clase de bootstrap - container
import { Routes, Route, Navigate } from "react-router-dom" //importacion de funciones precedentes de react router dom luego de su instalacion en consola.
import { NewNote } from "./components/NewNotes"; //importacion de componente que tambien es capturado en la red "Routes"
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4} from "uuid"
import { NoteList } from "./NoteList";



 // esto es lenguaje typscript para tipificar los tipos de datos y exportandolos como propiedades.


 export type Note = { 
  id: string
} & NoteData

 export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export type RawNote = {
   id: string
}& RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]

}















function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id)}, 
      ]
    })

  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  






  return (

    <Container className="my-4"> {/* clase container que englobatoda la etiquetas Route para estilizar con sistema grid */}
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} />} /> {/* capa principal de la pagina, home */}
        <Route path="/new" element={<NewNote onSubmit ={onCreateNote}
        onAddTag ={addTag} availableTags = {tags}/>} /> {/* ruta de creacion de tareas, new */}
        <Route path="/:id">  {/* anidacion de rutas basadas en un id */}
          <Route index element={<h1>Show</h1>} /> {/* sub ruta precedentes de lo anterior */}
          <Route path="edit" element={<h1>Edit</h1>} /> {/* ruta para la edicion de las tareas */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> {/* redireccionamiento a la pagina principal en caso de que no consiga ninguna ruta */}
      </Routes>
    </Container>





  )
}

export default App;
