import {Component, Input, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Editor} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'app-blog-item-comments',
    imports: [
        Button,
        Editor,
        FormsModule
    ],
    templateUrl: './blog-item-comments.component.html',
    styleUrl: './blog-item-comments.component.scss'
})
export class BlogItemCommentsComponent implements OnInit {
    @Input({required: true}) postId?: string;

    protected showNewCommentForm = false;
    protected newCommentContent = '';
    protected comments: string[] = [];

    constructor(
        private readonly dataService: DataService,
    ) {
    }

    ngOnInit() {
        this.loadComments();
    }

    onSaveComment() {
        if (!this.postId) {
            return;
        }

        this.showNewCommentForm = false;
        this.dataService.addComment(this.postId, this.newCommentContent);
        this.loadComments();
        this.newCommentContent = '';
    }

    private loadComments() {
        if (!this.postId) {
            return;
        }

        this.comments = this.dataService.getComments(this.postId);
    }
}
