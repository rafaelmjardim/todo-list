import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() initialTitle!: string;
  @Input() finalTitle?: string;
  @Input() icon!: string;

}
