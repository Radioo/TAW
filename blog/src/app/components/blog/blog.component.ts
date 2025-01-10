import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {CommonModule} from "@angular/common";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {Editor} from "primeng/editor";
import {MessageService} from "primeng/api";
import {GalleriaModule} from "primeng/galleria";
import {FilterTextPipe} from "../../pipes/filter-text.pipe";

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, BlogItemComponent, Card, Button, FloatLabel, InputText, FormsModule, Editor, GalleriaModule, FilterTextPipe],
    providers: [DataService],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
    public items: any[] = [];
    @Input() filter: string = '';

    protected showNewPostForm: boolean = false;
    protected newPostContent: string = '';
    protected newPostTitle: string = '';
    protected galleryVisible: boolean = false;
    protected postsLoading = true;

    constructor(
        private service: DataService,
        private readonly messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.getPosts();
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

    refreshPosts() {
        this.getPosts();
    }

    private getPosts() {
        this.postsLoading = true;

        setTimeout(() => {
            this.service.getAll().subscribe(items => {
                this.items = items;
                this.postsLoading = false;
            });
        }, 1000);
    }
}
