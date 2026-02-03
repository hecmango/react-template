import { Button } from 'primereact/button';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">
        ¡Entorno Listo!
      </h1>
      <Button 
        label="Confirmar Configuración" 
        icon="pi pi-check" 
        className="p-button-rounded p-button-success shadow-lg hover:scale-105 transition-transform" 
      />
    </div>
  );
}

export default App;