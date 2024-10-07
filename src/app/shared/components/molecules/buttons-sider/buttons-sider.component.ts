import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons-sider',
  templateUrl: './buttons-sider.component.html',
  styleUrls: ['./buttons-sider.component.scss']
})
export class ButtonsSiderComponent {
  sidebarButtons = [
    { label: 'Gastos', link: '/homedos/gastos' },
    { label: 'Estadísticas', link: '/homedos/estadisticas' },
    { label: 'Plan de Ahorros', link: '/homedos/movimientos' },
    { label: '¿Necesitas Ayuda?', link: '/homedos/ayuda' }
  ];
}
