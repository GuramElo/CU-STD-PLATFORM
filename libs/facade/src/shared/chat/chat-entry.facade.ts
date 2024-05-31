import { Inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, retry, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { EnvironmentService } from '@cu-std-shared';
import { ScriptLoadInterface, ScriptLoadStatusEnum } from '../forms/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatProjectEntryFacade {
  scripts: Record<string, boolean> = {};

  constructor(
    @Inject(DOCUMENT) private readonly __doc__: Document,
    private readonly environmentService: EnvironmentService
  ) {
    this.load$().pipe(take(1)).subscribe();
  }

  load$(): Observable<boolean> {
    const chatUrl = this.environmentService.config.externalChatImportBaseUrl;
    const id = new Date().getUTCMilliseconds();

    const main = `${chatUrl}/main.js`;
    const polyfills = `${chatUrl}/polyfills.js`;
    const runtime = `${chatUrl}/runtime.js`;

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
