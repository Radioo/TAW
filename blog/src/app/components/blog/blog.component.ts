import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {CommonModule} from "@angular/common";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {Ripple} from "primeng/ripple";
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {Editor} from "primeng/editor";
import {MessageService} from "primeng/api";
import {GalleriaModule} from "primeng/galleria";

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, BlogItemComponent, Ripple, Card, Button, FloatLabel, InputText, FormsModule, Editor, GalleriaModule],
    providers: [DataService],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
    public items: any;

    protected showNewPostForm: boolean = false;
    protected newPostContent: string = '';
    protected newPostTitle: string = '';
    protected galleryVisible: boolean = false;

    constructor(
        private service: DataService,
        private readonly messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.items = this.service.getAll();
    }

    addNewPost() {
        if (!this.newPostTitle) {
            this.messageService.add({severity:'error', summary:'Błąd', detail:'Tytuł jest wymagany'});
            return;
        }

        if (!this.newPostContent) {
            this.messageService.add({severity:'error', summary:'Błąd', detail:'Treść jest wymagana'});
            return;
        }

        this.service.addPost(this.newPostTitle, this.newPostContent);
        this.showNewPostForm = false;
        this.newPostContent = '';
        this.newPostTitle = '';

        this.messageService.add({severity:'success', summary:'Sukces', detail:'Post został dodany'});
    }

    getImagesFromPosts(): string[] {
        return this.items.map((item: any) => item.image);
    }
}
