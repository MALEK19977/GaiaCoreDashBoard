import { Injectable } from '@angular/core';
import * as pbi from 'powerbi-client';

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {
  private powerbi: pbi.service.Service;

  constructor() {
    this.powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }

  embedReport(element: HTMLElement, config: pbi.IEmbedConfiguration) {
    return this.powerbi.embed(element, config);
  }
}