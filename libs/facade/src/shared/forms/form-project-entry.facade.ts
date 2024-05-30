import { Inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, retry, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ScriptLoadInterface, ScriptLoadStatusEnum } from './interfaces';
import { EnvironmentService } from '@cu-std-shared';

@Injectable({
  providedIn: 'root',
})
export class FormProjectEntryFacade {
  scripts: Record<string, boolean> = {};

  constructor(
    @Inject(DOCUMENT) private readonly __doc__: Document,
    private readonly environmentService: EnvironmentService
  ) {
    this.load$().pipe(take(1)).subscribe();
  }

  load$(): Observable<boolean> {
    const formsUrl = this.environmentService.config.externalFormsImportBaseUrl;
    const id = new Date().getUTCMilliseconds();

    const main = `${formsUrl}/main.js`;
    const polyfills = `${formsUrl}/polyfills.js`;
    const runtime = `${formsUrl}/runtime.js`;

    return forkJoin([
      this.loadScript$(main),
      this.loadScript$(runtime),
      this.loadScript$(polyfills),
    ]).pipe(
      map(([main, runtime, polyfills]: ScriptLoadInterface[]) => {
        return main.loaded && runtime.loaded && polyfills.loaded;
      })
    );
  }

  loadScript$(scriptUrl: string) {
    return new Observable<ScriptLoadInterface>((subscriber) => {
      if (!this.scripts[scriptUrl]) {
        this.scripts[scriptUrl] = false;
        const script = this.__doc__.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptUrl;

        script.onload = () => {
          this.scripts[scriptUrl] = true;
          subscriber.next({
            script: scriptUrl,
            loaded: true,
            status: ScriptLoadStatusEnum.Loaded,
          });
          subscriber.complete();
        };

        script.onerror = () => {
          subscriber.error({
            script: scriptUrl,
            loaded: false,
            status: ScriptLoadStatusEnum.NotLoaded,
          });
          subscriber.complete();
        };

        this.__doc__.body.appendChild(script);
      } else {
        subscriber.next({
          script: scriptUrl,
          loaded: true,
          status: ScriptLoadStatusEnum.AlreadyLoaded,
        });
        subscriber.complete();
      }
    }).pipe(retry(2));
  }
}
