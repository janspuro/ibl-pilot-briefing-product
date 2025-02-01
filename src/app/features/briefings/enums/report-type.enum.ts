export enum ReportType {
  SYNOP = 'SYNOP',                                          // SYNOP reports.
  METAR = 'METAR',                                          // METAR reports.
  SPECI = 'SPECI',                                          // SPECI reports.
  METAR_SPECI = 'METAR_SPECI',                              // METAR/SPECI reports, SPECI overrides METAR.
  TAF = 'TAF',                                              // TAF (FC) reports.
  LONGTAF = 'LONGTAF',                                      // TAF (FT) reports.
  RAFOR = 'RAFOR',                                          // RAFOR reports.
  TAF_LONGTAF = 'TAF_LONGTAF',                              // TAF/LONGTAF reports.
  TAF_LONGTAF_RAFOR = 'TAF_LONGTAF_RAFOR',                  // TAF/LONGTAF/RAFOR reports.
  SIGMET = 'SIGMET',                                        // SIGMET (WS) reports.
  SIGMET_VA = 'SIGMET_VA',                                  // Volcanic Ash SIGMET (WV) reports.
  SIGMET_TC = 'SIGMET_TC',                                  // Tropical Cyclone SIGMET (WC) reports.
  SIGMET_ALL = 'SIGMET_ALL',                                // All SIGMETs (WS/WV/WC).
  AIRMET = 'AIRMET',                                        // AIRMET (WA) reports.
  GAMET = 'GAMET',                                          // GAMET (FA) reports.
  VAA = 'VAA',                                              // Volcanic Ash Advisory (FV) reports (Available only for VAA centres).
  TCA = 'TCA',                                              // Tropical Cyclone Advisory (FK) reports (Available only for FCA centres).
  AIREP_SPECIAL = 'AIREP_SPECIAL',                          // Airep Special (available only for FIR/country).
  TROPICAL_CYCLONE_WARNING = 'TROPICAL_CYCLONE_WARNING',    // Tropical Cyclone Warning (WT).
  AD_WRNG = 'AD_WRNG',                                      // Aerodrome Warning.
  WS_WRNG = 'WS_WRNG',                                      // Wind Shear Warning.
}