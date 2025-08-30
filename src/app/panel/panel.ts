import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './panel.html'
})
export class Panel {
    @Input() code: string | null = null;
    @Input() meta: any | null = null;
    @Input() indicators: Record<string, number | null> | null = null;
    @Input() locked = false;
    get gdpMillions() {
        const gdp = this.indicators?.['NY.GDP.MKTP.CD'];
        return gdp ? gdp / 1000000 : null;
    }
}