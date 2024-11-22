import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getAll);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.post(`${this.path}`, this.addData);
        this.router.delete(`${this.path}/:id`, this.deleteOne);
        this.router.post(`${this.path}/:x`, this.getXElements);
        this.router.delete(`${this.path}`, this.deleteAll);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({data: testArr});
    }

    private addData = async (req: Request, res: Response, next: NextFunction) => {
        const {elem} = req.body;
        testArr.push(elem);
        return res.status(200).json({data: testArr});
    }

    private getById = async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        const parsedId = parseInt(id);
        return res.status(200).json({data: testArr[parsedId]});
    }

    private deleteOne = async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        const parsedId = parseInt(id);
        testArr = testArr.filter((elem, index) => index !== parsedId);
        return res.status(200).json({data: testArr});
    }

    private getXElements = async (req: Request, res: Response, next: NextFunction) => {
        const {x} = req.params;
        const parsedX = parseInt(x);
        return res.status(200).json({data: testArr.slice(0, parsedX)});
    }

    private deleteAll = async (req: Request, res: Response, next: NextFunction) => {
        testArr = [];
        return res.status(200).json({data: testArr});
    }
}

export default PostController;
