import {Component, Input} from '@angular/core';
import {SummaryPipe} from "../../pipes/summary.pipe";
import {Button} from "primeng/button";

@Component({
    selector: 'app-blog-item-text',
    imports: [
        SummaryPipe,
        Button

    ],
    templateUrl: './blog-item-text.component.html',
    styleUrl: './blog-item-text.component.scss'
})
export class BlogItemTextComponent {
    @Input() text?: string;
}
