import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-alert',
  imports: [
    MatIcon,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  public icon = input<string>('info');
  public color = input<'info' | 'warning' | 'error'>('info');
  public size = input<'sm' | 'md' | 'lg'>('md');
  public layout = input<'horizontal' | 'vertical'>('horizontal');

  public classes = computed(() => {
    const color = this.color();
    const size = this.size();
    const layout = this.layout();

    return [
      ['info', 'warning', 'error'].includes(color) ? color : 'info',
      ['sm', 'md', 'lg'].includes(size) ? size : 'md',
      ['horizontal', 'vertical'].includes(layout) ? layout : 'horizontal',
    ];
  })
}
