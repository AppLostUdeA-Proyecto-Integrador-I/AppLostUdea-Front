import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  active = true;

  constructor() {}

  ngOnInit() {
  }
  showSidebar(){
    this.active = !this.active;
  }

}
