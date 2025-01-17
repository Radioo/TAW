import {Component, EventEmitter, Output} from '@angular/core';
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {filter} from "rxjs";
import {TextFormatDirective} from "../../directives/text-format.directive";

@Component({
  selector: 'app-search-bar',
    imports: [
        FloatLabel,
        InputText,
        FormsModule,
        TextFormatDirective
    ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
    public filterText: string = '';

    @Output() name = new EventEmitter<string>();

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.filterText = params['name'];
            this.sendFilter(this.filterText);
        });
    }

    sendFilter($event: any): void {
        this.name.emit($event);
        this.router.navigate(['/blog'], {queryParams: {name:
                    $event?.toLowerCase()
            }});
    }
}
