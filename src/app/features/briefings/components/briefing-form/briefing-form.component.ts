import { booleanAttribute, Component, input, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { v4 as uuidv4 } from 'uuid';

import airports from './data/airports.json';
import countries from './data/countries.json';
import { BriefingParams } from '../../interfaces/birefing-params.interface';
import { ReportType } from '../../enums/report-type.enum';
import { ChipsInputComponent } from '../../../../shared/components/chips-input/chips-input.component';
import { requiredOneOf } from '../../../../shared/directives/required-one-of.directive';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-briefing-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ChipsInputComponent,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './briefing-form.component.html',
  styleUrl: './briefing-form.component.scss'
})
export class BriefingFormComponent {
  public messageTypes = input<ReportType[]>([ReportType.METAR, ReportType.SIGMET, ReportType.TAF]);
  public loading = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  public disabled = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  public create = output<BriefingParams>();

  public readonly form = new FormGroup(
    {
      types: new FormControl<ReportType[]>([], [Validators.required]),
      airports: new FormControl<string[]>([]),
      countries: new FormControl<string[]>([]),
    }, 
    [requiredOneOf(['airports', 'countries'], 'airportOrCountryRequired')],
  );

  get types(): AbstractControl {
    return this.form.get('types')!;
  }

  get airports(): AbstractControl {
    return this.form.get('airports')!;
  }

  get countries(): AbstractControl {
    return this.form.get('countries')!;
  }

  public readonly airtportsHints = airports
    .map(a => ({ name: `${a.name} (${a.icao})`, value: a.icao }));

  public readonly countriesHints = countries
    .map(c => ({ name: `${c.name} (${c.wmo})`, value: c.wmo }));

  public onSubmit(): void {
    if (this.loading())
      return;

    const reportTypes = this.form.get('types')?.value ?? [];
    const stations = this.form.get('airports')?.value ?? [];
    const countries = this.form.get('countries')?.value ?? [];

    this.create.emit({
      id: uuidv4(),
      reportTypes,
      stations,
      countries,
    });
  }
}
