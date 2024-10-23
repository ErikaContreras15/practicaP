import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import{FormsModule} from '@angular/forms';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
 /*
  nuevaTarea: string = '';
  tareas: any[] = [];

  private readonly LOCAL_STORAGE_KEY = 'tareas';

  constructor() {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    const tareasGuardadas = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  agregarTarea(): void {
    if (this.nuevaTarea.trim() === '') {
      return;
    }
  

  const nuevaTarea = {
    id: this.generarId(),
    titulo: this.nuevaTarea.trim()
  };

  this.tareas.push(nuevaTarea);
  this.actualizarLocalStorage();
  this.nuevaTarea = '';
}

editarTarea(tareaId: string): void {
  
}

eliminarTarea(tareaId: string): void {
  this.tareas = this.tareas.filter(t => t.id !== tareaId);
  this.actualizarLocalStorage();
}

private actualizarLocalStorage(): void {
  localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.tareas));
}

private generarId(): string {
  return Math.random().toString(36).substring(2);
}

}*/

nuevaTarea: any = {
  nombre: '',
  docente: '',
  curso: '',
  fechaEntrega: '',
  descripcion: ''
};
tareas: any[] = [];
editando: boolean = false;
tareaIdEditando: number | null = null;
mostrarMensajeError: boolean = false;

private readonly LOCAL_STORAGE_KEY = 'tareas';
private readonly LOCAL_STORAGE_ID_KEY = 'tareasIdCounter';

constructor() {}

ngOnInit(): void {
  this.cargarTareas();
}

cargarTareas(): void {
  const tareasGuardadas = localStorage.getItem(this.LOCAL_STORAGE_KEY);
  this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

/*agregarTarea(): void {
  if (!this.formularioValido()) {
    return;
  }*/

  agregarTarea(): void {
    if (!this.formularioValido()) {
      this.mostrarMensajeError = true;
      console.error('Todos los campos son obligatorios');  // Mensaje de error en la consola del navegador
      return;
    }
    this.mostrarMensajeError = false;

    
  const nuevaTarea = {
    id: this.generarId(),
    nombre: this.nuevaTarea.nombre.trim(),
    docente: this.nuevaTarea.docente.trim(),
    curso: this.nuevaTarea.curso.trim(),
    fechaEntrega: this.nuevaTarea.fechaEntrega,
    descripcion: this.nuevaTarea.descripcion.trim()
  };

  this.tareas.push(nuevaTarea);
  this.actualizarLocalStorage();
  this.resetearFormulario();
}

eliminarTarea(tareaId: number): void {
  this.tareas = this.tareas.filter(t => t.id !== tareaId);
  this.actualizarLocalStorage();
}

editarTarea(tareaId: number): void {
  const tarea = this.tareas.find(t => t.id === tareaId);
  if (tarea) {
    this.nuevaTarea = { ...tarea };
    this.editando = true;
    this.tareaIdEditando = tareaId;
  }
}

confirmarEdicion(): void {
  if (this.tareaIdEditando !== null && this.formularioValido()) {
    this.tareas = this.tareas.map(t => 
      t.id === this.tareaIdEditando
        ? {
            ...t,
            nombre: this.nuevaTarea.nombre,
            docente: this.nuevaTarea.docente,
            curso: this.nuevaTarea.curso,
            fechaEntrega: this.nuevaTarea.fechaEntrega,
            descripcion: this.nuevaTarea.descripcion
          }
        : t
    );

    this.actualizarLocalStorage();
    this.resetearFormulario();
    this.editando = false;
    this.tareaIdEditando = null;
    this.mostrarMensajeError = false;
  }
}

formularioValido(): boolean {
  return this.nuevaTarea.nombre.trim() !== '' &&
         this.nuevaTarea.docente.trim() !== '' &&
         this.nuevaTarea.curso.trim() !== '' &&
         this.nuevaTarea.fechaEntrega !== '' &&
         this.nuevaTarea.descripcion.trim() !== '';
}

private actualizarLocalStorage(): void {
  localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.tareas));
}

private generarId(): number {
  let idCounter = Number(localStorage.getItem(this.LOCAL_STORAGE_ID_KEY)) || 0;
  localStorage.setItem(this.LOCAL_STORAGE_ID_KEY, (idCounter + 1).toString());
  return idCounter;
}

private resetearFormulario(): void {
  this.nuevaTarea = {
    nombre: '',
    docente: '',
    curso: '',
    fechaEntrega: '',
    descripcion: ''
  };
  this.mostrarMensajeError = false;
}
}