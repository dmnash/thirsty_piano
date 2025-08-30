import { Component, EventEmitter, output, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './map.html'
})
export class Map {
    @Output() countryHover = new EventEmitter<string | null>();
    @Output() countryClick = new EventEmitter<string>();

    onSvgHover(evt: MouseEvent) {
        const target = evt.target as SVGElement;
        const code = target?.id || null;
        if (code) this.countryHover.emit(code);
    }
    onSvgClick(evt: MouseEvent) {
        const target = evt.target as SVGElement;
        const code = target?.id || null;
        if (code) this.countryClick.emit(code);
    }
}