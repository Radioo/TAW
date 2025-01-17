import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MenuItem, MenuItemCommandEvent, PrimeIcons} from "primeng/api";
import {Menubar} from "primeng/menubar";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule, Menubar],
    providers: [AuthService],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    protected items: MenuItem[] = [];

    constructor(public authService: AuthService, public router: Router) {

    }

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            this.items = [
                {
                    label: 'Home',
                    icon: PrimeIcons.HOME,
                    routerLink: ['/']
                },
                {
                    label: 'Blog',
                    icon: PrimeIcons.BOOK,
                    routerLink: ['/blog'],
                    visible: this.authService.isLoggedIn(),
                },
                {
                    label: 'Stats',
                    icon: PrimeIcons.LIST,
                    visible: this.authService.isLoggedIn(),
                    routerLink: ['/stats']
                },
                {
                    label: 'Login',
                    icon: PrimeIcons.USER,
                    routerLink: ['/login'],
                    visible: !this.authService.isLoggedIn()
                },
                {
                    label: 'Sign Up',
                    icon: PrimeIcons.USER_PLUS,
                    routerLink: ['/signup'],
                    visible: !this.authService.isLoggedIn()
                },
                {
                    label: 'Logout',
                    icon: PrimeIcons.TIMES,
                    visible: this.authService.isLoggedIn(),
                    command: (event: MenuItemCommandEvent) => {
                        this.signOut();
                    }
                },
            ]
        })
    }

    signOut() {
        this.authService.logout().subscribe((result: any) => {
            this.router.navigate(['/']);
            return result;
        });
    }

}
