import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private ls: LocalStorageService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ) {
        const token = "Bearer " + this.ls.retrieve("token");
        const lang = this.ls.retrieve("lang") || "el";

        const duplicate = req.clone({
            headers: req.headers
                .set("authorization", token)
                .set("lang", lang)
        });
        return next.handle(duplicate);
    }
}
