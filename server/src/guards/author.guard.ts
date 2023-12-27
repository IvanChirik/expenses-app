import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { TransactionService } from "src/transaction/transaction.service";



@Injectable()
export class AuthorGuard implements CanActivate {

    constructor(
        private readonly categoryService: CategoryService,
        private readonly transactionService: TransactionService
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { id } = request.params;
        const url = request.url.split('/')[2];
        let entity;
        switch (url) {
            case 'transactions':
                entity = await this.transactionService.findOne(id)
                break;
            case 'categories':
                entity = await this.categoryService.findOne(id)
                break
        }
        const user = request.user;
        if (user && entity && entity.user.id == user.id)
            return true
        throw new BadRequestException('Что-то пошло не так....');
    }
}