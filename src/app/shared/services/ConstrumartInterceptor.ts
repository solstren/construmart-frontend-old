import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UtilitiesService} from "./utilities.service";
import {HttpHandler, HttpRequest} from "@angular/common/http";

@Injectable()
export class ConstrumartInterceptor implements ConstrumartInterceptor {
  constructor(private router: Router, private utilService: UtilitiesService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.split('/')[req.url.split('/').length - 1] == 'user'
      || req.url.split('/')[req.url.split('/').length - 1] == 'reset-password'
      || req.url.split('/')[req.url.split('/').length - 1] == 'forgot-password'
    ) {
      return next.handle(req);
    }

    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${JSON.parse(localStorage.token)}`)
    });

    return next.handle(newReq);
  }
}
