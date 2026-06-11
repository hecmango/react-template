import { Cursos } from "../pages/cursos/Cursos";

const cursosRoutes = [
    {
        path: "/cursos",
        element: <Cursos />
    },
    {
        path: "/cursos/crear/:id?",
        element: <Cursos />
    }
]

export default cursosRoutes;