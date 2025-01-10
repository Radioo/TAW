import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-item-details',
  imports: [],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent implements OnInit {
    protected post: any;

    constructor(
        private readonly dataService: DataService,
        private readonly route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            console.log('id', id);
            if(!id) {
                return;
            }

            this.dataService.getOne(id).subscribe(post => {
                this.post = post[0];
            })
        })
    }
}
