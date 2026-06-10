import { Cursos } from "../pages/cursos/Cursos";
import { CrearCursos } from "../pages/cursos/CrearCursos";


const cursosRoutes = [
    {
        path: "/cursos",
        element: <Cursos />
    },
    {
        path: "/cursos/crear/:id?",
        element: <CrearCursos />
    }
]

export default cursosRoutes;