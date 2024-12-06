import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {checkPostCount} from "../middlewares/checkPostCount.middleware";
import PostService from "../modules/services/data.service";
import Joi from "joi";

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    private postService = new PostService();

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
        return res.status(200).json(await this.postService.getAll());
    }

    private getXElements = async (req: Request, res: Response, next: NextFunction) => {
        const {x} = req.params;
        const parsedX = parseInt(x);
        return res.status(200).json({data: testArr.slice(0, parsedX)});
    }

    private deleteAll = async (req: Request, res: Response, next: NextFunction) => {
        await this.postService.deleteAllPosts();
        return res.status(200).json({message: 'OK'});
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        });

        try {
            const validatedData = await schema.validateAsync({title, text, image});
            await this.postService.createPost(validatedData);
            response.status(200).json(validatedData);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.postService.getById(id);
        response.status(200).json(allData);
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.postService.deleteById(id);
        response.sendStatus(200);
    };
}

export default PostController;
