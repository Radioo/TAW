import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BlogComponent} from "./components/blog/blog.component";
import {PrimeNG} from "primeng/config";
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {NavbarComponent} from "./shared/navbar/navbar.component";

@Component({
    selector: 'app-root',
    imports: [BlogComponent, Toast, RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    constructor(
        private readonly primeng: PrimeNG,
    ) {
    }

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
