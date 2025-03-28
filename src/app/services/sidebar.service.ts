import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarCollapsed$ = new BehaviorSubject<boolean>(false);

  getSidebarState() {
    return this.sidebarCollapsed$.asObservable();
  }

  toggleSidebar() {
    this.sidebarCollapsed$.next(!this.sidebarCollapsed$.value);
  }
}
