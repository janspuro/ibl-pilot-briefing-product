import { Component, computed, input, SecurityContext } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Briefing } from '../../interfaces/birefing.interface';
import { BriefingResultStation } from './interfaces/briefing-result-station.interface';

@Component({
  selector: 'app-briefing-result',
  imports: [
    DatePipe,
  ],
  templateUrl: './briefing-result.component.html',
  styleUrl: './briefing-result.component.scss'
})
export class BriefingResultComponent {
  public briefing = input<Briefing | null>();
  public timeFormat = input<string>('dd.LL.yyyy HH:mm');

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  private highlight(text: string): SafeHtml {
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, text) ?? '';

    const highlighted = sanitized.replace(/(?:BKN|FEW|SCT)(\d{3})/, (match, value) => { 
      const color = (parseInt(value) > 30) ? 'var(--metric-red)' : 'var(--metric-blue)';
      return `<span style="color: ${color}">${match}</span>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  };

  public stations = computed<BriefingResultStation[]>(() => {
    const { reports = [] } = this.briefing() ?? {};
    const stations: Map<string, BriefingResultStation> = new Map();
    
    for (const report of reports) {
      const { stationId, text } = report;
      const station = stations.get(stationId) ?? { name: stationId, reports: [] };
     
      station.reports.push({
        ...report,
        textHTML: this.highlight(text),
      });

      stations.set(stationId, station);
    }

    return Array.from(stations.values());
  });
}
