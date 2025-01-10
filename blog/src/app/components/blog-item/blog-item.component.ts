import { Component, Input } from '@angular/core';
import {BlogItemImageComponent} from "../blog-item-image/blog-item-image.component";
import {BlogItemTextComponent} from "../blog-item-text/blog-item-text.component";
import {Card} from "primeng/card";
import {Panel} from "primeng/panel";
import {BlogItemCommentsComponent} from "../blog-item-comments/blog-item-comments.component";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-blog-item',
    standalone: true,
    imports: [BlogItemImageComponent, BlogItemTextComponent, Card, Panel, BlogItemCommentsComponent, Button, RouterLink],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.scss'
})
export class BlogItemComponent {
    @Input() post: any;
    @Input({required: true}) postId?: string;
    @Input() title?: string;
    @Input() image?: string;
    @Input() text?: string;
}
