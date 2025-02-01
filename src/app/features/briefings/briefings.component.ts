import { Component, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { BriefingsService } from './briefings.service';
import { BriefingFormComponent } from './components/briefing-form/briefing-form.component';
import { BriefingResultComponent } from './components/briefing-result/briefing-result.component';
import { Briefing } from './interfaces/birefing.interface';
import { JsonRpcError } from '../../core/json-rpc/errors/json-rpc.error';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-briefings',
  imports: [
    BriefingFormComponent,
    BriefingResultComponent,
    AlertComponent,
  ],
  templateUrl: './briefings.component.html',
  styleUrl: './briefings.component.scss'
})
export class BriefingsComponent {
  public readonly busy = signal<boolean>(false);
  public readonly error = signal<string | undefined>(undefined);
  public readonly briefing = signal<Briefing | null>(null);

  constructor(
    private briefingsService: BriefingsService,
  ) {}

  public async onCreate(params: any): Promise<void> {
    const request = this.briefingsService.create(params);

    try {
      this.busy.set(true);
      const response = await firstValueFrom(request);
      this.briefing.set(response);
      this.error.set(undefined);
    } catch (error) {
      if (error instanceof HttpErrorResponse)
        this.error.set(error.status === 0 ? 'Connection error' : error.error.message);
      else if (error instanceof JsonRpcError)
        this.error.set(error.message);
      else
        this.error.set('Unknown error');
    } finally {
      this.busy.set(false);
    }
  }
}
