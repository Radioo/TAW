import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {checkPostCount} from "../middlewares/checkPostCount.middleware";
import DataService from "../modules/services/data.service";

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    private dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getAll);
        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.post(`${this.path}`, this.addData);
        this.router.delete(`${this.path}/:id`, this.removePost);
        this.router.post(`${this.path}/:x`, checkPostCount, this.getXElements);
        this.router.delete(`${this.path}`, this.deleteAll);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json(await this.dataService.getAll());
    }

    private getXElements = async (req: Request, res: Response, next: NextFunction) => {
        const {x} = req.params;
        const parsedX = parseInt(x);
        return res.status(200).json({data: testArr.slice(0, parsedX)});
    }

    private deleteAll = async (req: Request, res: Response, next: NextFunction) => {
        await this.dataService.deleteAllPosts();
        return res.status(200).json({message: 'OK'});
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;

        const readingData = {
            title,
            text,
            image
        };

        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.getById(id);
        response.status(200).json(allData);
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteById(id);
        response.sendStatus(200);
    };
}

export default PostController;
