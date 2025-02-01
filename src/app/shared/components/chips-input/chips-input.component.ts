import { Component, computed, ElementRef, forwardRef, input, model, OnInit, Renderer2, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatInputModule } from '@angular/material/input';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ChipsInputHint } from './interfaces/chips-input-hint.interface';

@Component({
  selector: 'app-chips-input',
  imports: [
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsInputComponent),
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
  templateUrl: './chips-input.component.html',
  styleUrl: './chips-input.component.scss'
})
export class ChipsInputComponent implements ControlValueAccessor, OnInit {
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');
  private onChangeCallback: (value: string[]) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  public label = input<string>();
  public value = model<string[]>([]);
  public hints = input<ChipsInputHint[]>();
  public chipPattern = input<string | RegExp>();

  public readonly disabled = signal<boolean>(false);
  public readonly separators = [ENTER, COMMA, SPACE];
  public readonly query = model('');

  public readonly autocomplete = computed(() => {
    const query = this.query().toLowerCase();
    const hints = this.hints() ?? [];

    const filtered = (query) 
      ? hints.filter(i => 
        !this.value().includes(i.value) && 
        i.name.toLowerCase().includes(query)
      )
      : hints;

    if (!filtered.length) {
      return [
        { 
          name: '- No results match your criteria -', 
          value: '', 
          disabled: true,
        },
      ];
    }

    if (filtered.length > 100) {
      return [
        ...filtered.slice(0, 100),
        { 
          name: '- Showing first 100 results -', 
          value: '', 
          disabled: true,
        },
      ];
    }

    return filtered;
  });

  public readonly validator = computed(() => {
    const  pattern = this.chipPattern();
    
    if (typeof pattern === 'string')
      return (value: string) => new RegExp(pattern).test(value);

    if (pattern instanceof RegExp)
      return (value: string) => pattern.test(value);

    return () => true;
  });

  constructor(
    private renderer: Renderer2,
  ) {}

  public ngOnInit(): void {
    this.value.subscribe(value => this.onChangeCallback?.(value));
  }

  public onAdd(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const validate = this.validator();

    if (value && validate(value)) {
      this.value.update(values => {
        if (values.includes(value))
          return values;

        return [...values, value];
      });
    }
    
    event.chipInput!.clear();
    this.query.set('');
  }

  public onRemove(value: string): void {
    this.value.update(values => {
      const idx = values.indexOf(value);

      if (idx < 0)
        return values;

      values.splice(idx, 1);
      return [...values];
    });
  }

  public onEdit(value: string, event: MatChipEditedEvent): void {
    const newValue = event.value.trim();
    const validate = this.validator();

    if (!newValue) 
      return this.onRemove(value);

    if (!validate(newValue))
      return;

    this.value.update(values => {
      const idx = values.indexOf(value);

      if (idx >= 0) {
        values[idx] = newValue;
        return [...values];
      }

      return values;
    });
  }

  public onSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    const validate = this.validator();

    if (validate(value)) {
      this.value.update(values => {
        if (values.includes(value))
          return values;
  
        return [...values, value];
      });
    }

    event.option.deselect();
    this.renderer.setProperty(
      this.inputRef()?.nativeElement,
      'value',
      ''
    );
    this.query.set('');
  }

  public onBlur(): void {
    this.onTouchedCallback?.();
  }
  
  public writeValue(value: string[]): void {
    this.value.set(value);
  }

  public registerOnChange(handler: (value: string[]) => void): void {
    this.onChangeCallback = handler;
  }

  public registerOnTouched(handler: () => void): void {
    this.onTouchedCallback = handler;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
