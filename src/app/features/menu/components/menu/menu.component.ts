import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuStateService } from '../../menu.state';
import { MenuCategoryComponent } from '../menu-category/menu-category.component';

@Component({
  selector: 'app-menu',
  imports: [MenuCategoryComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly menuState = inject(MenuStateService);

  readonly categories = this.menuState.categories;
}
