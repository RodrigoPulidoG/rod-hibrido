// src/app/react-wrapper/react-wrapper.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-react-wrapper',
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.css']
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reactLoginContainer', { static: true }) reactLoginContainer!: ElementRef;

  showErrorModal: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) { }

  async ngAfterViewInit(): Promise<void> {
    window.addEventListener('loginSuccess', this.handleLoginSuccess as EventListener);
    window.addEventListener('loginFailure', this.handleLoginFailure as EventListener);

    try {
      const mfLoginModule = await loadRemoteModule({
        remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteName: 'mfLogin',
        exposedModule: './bootstrap'
      });

      if (mfLoginModule && typeof mfLoginModule.mount === 'function') {
        mfLoginModule.mount(this.reactLoginContainer.nativeElement);
        console.log('MF-Login de React montado exitosamente.');
      } else {
        console.error('Error: La función mount no se encontró en el módulo mfLogin.');
        this.showErrorModal = true;
        this.errorMessage = 'Error interno: No se pudo cargar el componente de login.';
      }
    } catch (err) {
      console.error('Error al cargar o montar mfLogin:', err);
      this.showErrorModal = true;
      this.errorMessage = 'Error al cargar el módulo de login. Intente de nuevo.';
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('loginSuccess', this.handleLoginSuccess as EventListener);
    window.removeEventListener('loginFailure', this.handleLoginFailure as EventListener);
  }

  private handleLoginSuccess = (event: CustomEvent) => {
    console.log('Login exitoso recibido en Angular:', event.detail);
    this.router.navigate(['/home/dashboard']);
  };

  private handleLoginFailure = (event: CustomEvent) => {
    console.error('Login fallido recibido en Angular:', event.detail);
    this.errorMessage = event.detail.message || 'Error desconocido al iniciar sesión.';
    this.showErrorModal = true;
  };

  closeErrorModal(): void {
    this.showErrorModal = false;
    this.errorMessage = '';
  }
}
