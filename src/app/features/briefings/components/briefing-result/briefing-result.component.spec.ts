import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingResultComponent } from './briefing-result.component';

describe('BriefingResultComponent', () => {
  let component: BriefingResultComponent;
  let fixture: ComponentFixture<BriefingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefingResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('text cell should contain red highlighted value', async () => {
    fixture.componentRef.setInput('briefing', {
      reports: [
        {
          "placeId": "icao:LKPR",
          "queryType": "METAR",
          "receptionTime": "2025-02-01T18:35:21.249Z",
          "refs": [
              "briefing01"
          ],
          "reportTime": "2025-02-01T18:30:00Z",
          "reportType": "MSG_METAR",
          "stationId": "LKPR",
          "text": "LKPR 011830Z 06005KT 030V120 9999 SCT032 00/M04 Q1029 NOSIG=",
          "textHTML": "LKPR 011830Z 06005KT 030V120 <font color=\"blue\">9999</font> <font color=\"blue\">SCT032</font> 00/M04 Q1029 NOSIG="
        },
      ]
    });

    fixture.detectChanges();
    await fixture.whenStable();

    const textCell: HTMLTableCellElement = fixture.nativeElement.querySelector('td.text');

    expect(textCell.innerHTML).toContain('<span style="color: var(--metric-red)">SCT032</span>');
  });

  it('text cell should contain blue highlighted value', async () => {
    fixture.componentRef.setInput('briefing', {
      reports: [
        {
          "placeId": "icao:LZTT",
          "queryType": "METAR",
          "receptionTime": "2025-02-01T18:35:23.214Z",
          "refs": [
              "briefing01"
          ],
          "reportTime": "2025-02-01T18:30:00Z",
          "reportType": "MSG_METAR",
          "stationId": "LZTT",
          "text": "LZTT 011830Z VRB02KT 9999 FEW030 M05/M07 Q1027=",
          "textHTML": "LZTT 011830Z VRB02KT <font color=\"blue\">9999</font> FEW030 M05/M07 Q1027="
        },
      ],
    });

    fixture.detectChanges();
    await fixture.whenStable();

    const textCell: HTMLTableCellElement = fixture.nativeElement.querySelector('td.text');

    expect(textCell.innerHTML).toContain('<span style="color: var(--metric-blue)">FEW030</span>');
  });
});
