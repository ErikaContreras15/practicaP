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

}


