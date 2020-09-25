import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmPage } from './farm.page';

describe('FarmPage', () => {
  let component: FarmPage;
  let fixture: ComponentFixture<FarmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
