import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GroupedMemberData, GroupedProjectData } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class OverviewTabComponent {
  @Input() overviewStats$!: Observable<any>;
  @Input() groupedMemberData$!: Observable<GroupedMemberData[]>;
  @Input() groupedProjectData$!: Observable<GroupedProjectData[]>;

  constructor() {}
}