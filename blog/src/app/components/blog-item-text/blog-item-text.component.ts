import {Component, Input} from '@angular/core';
import {SummaryPipe} from "../../pipes/summary.pipe";

@Component({
    selector: 'app-blog-item-text',
    imports: [
        SummaryPipe
    ],
    templateUrl: './blog-item-text.component.html',
    styleUrl: './blog-item-text.component.scss'
})
export class BlogItemTextComponent {
    @Input() text?: string;
}
