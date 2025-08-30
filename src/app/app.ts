import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map } from './map/map';
import { Panel } from './panel/panel';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Map, Panel],
  templateUrl: './app.html'
})
export class App {
  locked = signal(false);
  displayCode = signal<string | null>(null);
  meta = signal<any | null>(null);
  indicators = signal<Record<string, number | null> | null>(null);

  onHover(code: string | null) {
    if (this.locked() || code === this.displayCode()) return;
    this.clearPanel();
    if (code !== null) {
      this.displayCountryData(code);
    }
  }
  onClick(code: string) {
    if (!this.locked()) this.locked.set(true);
    else if (this.displayCode() === code) { this.locked.set(false); this.clearPanel(); return; }
    if (code !== this.displayCode()) this.displayCountryData(code);
  }
  private clearPanel() {
    this.displayCode.set(null);
    this.meta.set(null);
    this.indicators.set(null);
  }
  private displayCountryData(code: string) {
    this.clearPanel();
    this.displayCode.set(code);
    this.country.getCountryMeta(code).subscribe(m => {
      this.meta.set(m);
      this.country.getPopAndGdp(m.id, ['SP.POP.TOTL','NY.GDP.MKTP.CD'])
        .subscribe(vals => this.indicators.set(vals));
    });
  }
  private readonly regionColors: Record<string, string> & { default: string } = {
    'East Asia & Pacific': '#8c0093ff',
    'Europe & Central Asia': '#400068ff',
    'North America': '#0010c2ff',
    'Latin America & Caribbean ': '#bd8b00ff',
    'Middle East, North Africa, Afghanistan & Pakistan': '#005c09ff',
    'South Asia': '#bb3c23ff',
    'Sub-Saharan Africa ': '#c40000ff',
    default: '#2a2831'
  };
  get regionColor(): string {
    const region = this.meta()?.region;
    return region ? this.regionColors[region] || this.regionColors.default : this.regionColors.default;
  }
  constructor(private country: CountryService) {}
}
